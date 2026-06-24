import Anthropic from '@anthropic-ai/sdk';
import { supabaseAdmin } from '@/lib/supabase';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ??
  'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

const SYSTEM_PROMPT = `Você é o Especialista Forbless — assistente virtual da Forbless Hair, Skin & Nails.

FORMATO DAS RESPOSTAS (obrigatório):
- Texto simples, sem markdown, sem asteriscos, sem #, sem listas com hífen
- Sem emojis
- Máximo 3 parágrafos curtos
- Tom acolhedor, humano e direto

REGRAS DE CONTEÚDO:
- Responda SOMENTE sobre Forbless Hair, Skin & Nails e temas relacionados (cabelo, pele, unhas, suplementação)
- Nunca prometa cura ou resultado garantido
- Use linguagem de percepção: "auxilia", "contribui", "muitos usuários relatam perceber", "resultados podem variar"
- Se o assunto for fora do escopo, redirecione gentilmente

PRODUTO — KIT 90 DIAS:
- 3 potes de Forbless Hair, Skin & Nails
- Preço: R$ 179,90 (6× R$ 29,98 sem juros · PIX com desconto adicional)
- Fórmula: Biotina, Zinco e Complexo de Vitaminas
- Posologia: 2 cápsulas por dia com refeição + 200ml de água, por 90 dias contínuos
- Resultados percebidos geralmente a partir do 2º mês
- Aprovado pela ANVISA como suplemento alimentar

USO DAS FERRAMENTAS:
- "gerar_link_checkout": use quando o usuário demonstrar intenção de comprar. Antes de chamar a ferramenta, escreva UMA frase curta e acolhedora (ex: "Ótimo! Vou gerar o link agora."). Após o retorno da ferramenta, escreva APENAS uma frase final curta incentivando o clique, sem repetir preço, URL ou detalhes do produto — o card de compra já mostra tudo.
- "registrar_lead": use quando o usuário fornecer nome E email durante a conversa. Após o registro, confirme brevemente e ofereça continuar ajudando.`;

const tools: Anthropic.Tool[] = [
  {
    name: 'gerar_link_checkout',
    description:
      'Gera o link de compra do Kit 90 Dias quando o usuário demonstra intenção de comprar. Use com uma resposta motivadora.',
    input_schema: {
      type: 'object' as const,
      properties: {
        mensagem: {
          type: 'string',
          description: 'Mensagem curta e motivadora para acompanhar o link de compra',
        },
      },
      required: ['mensagem'],
    },
  },
  {
    name: 'registrar_lead',
    description:
      'Registra nome e email do usuário no sistema quando ele fornece esses dados voluntariamente.',
    input_schema: {
      type: 'object' as const,
      properties: {
        nome: { type: 'string', description: 'Nome completo ou primeiro nome do usuário' },
        email: { type: 'string', description: 'Endereço de email do usuário' },
      },
      required: ['nome', 'email'],
    },
  },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function sse(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: ChatMessage[] = body.messages ?? [];

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return new Response('Bad request', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) =>
        controller.enqueue(encoder.encode(sse(data)));

      try {
        const anthropicMessages: Anthropic.MessageParam[] = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        let continueLoop = true;
        let currentMessages = [...anthropicMessages];

        while (continueLoop) {
          const response = client.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            tools,
            messages: currentMessages,
          });

          // Stream text deltas as they arrive
          response.on('text', (text) => {
            send({ t: 'text', v: text });
          });

          const finalMsg = await response.finalMessage();

          if (finalMsg.stop_reason === 'tool_use') {
            const toolUseBlocks = finalMsg.content.filter(
              (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
            );

            const toolResults: Anthropic.ToolResultBlockParam[] = [];

            for (const tool of toolUseBlocks) {
              if (tool.name === 'gerar_link_checkout') {
                const input = tool.input as { mensagem?: string };
                send({ t: 'checkout', url: CHECKOUT_URL, msg: input.mensagem ?? '' });
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: tool.id,
                  content: `Link gerado: ${CHECKOUT_URL}`,
                });
              } else if (tool.name === 'registrar_lead') {
                const input = tool.input as { nome?: string; email?: string };
                const nome = (input.nome ?? '').slice(0, 120);
                const email = (input.email ?? '').slice(0, 255);

                if (nome && email) {
                  await supabaseAdmin
                    .from('leads')
                    .insert({ nome, email, origem: 'chat', consentimento: true })
                    .single();
                  send({ t: 'lead_ok', nome });
                }

                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: tool.id,
                  content: nome && email ? `Lead registrado: ${nome} <${email}>` : 'Dados incompletos',
                });
              }
            }

            // Append assistant message + tool results and loop
            currentMessages = [
              ...currentMessages,
              { role: 'assistant', content: finalMsg.content },
              { role: 'user', content: toolResults },
            ];
          } else {
            continueLoop = false;
          }
        }

        send({ t: 'done' });
        controller.close();
      } catch (err) {
        console.error('[/api/chat]', err);
        send({ t: 'error', msg: 'Ocorreu um erro. Tente novamente.' });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
