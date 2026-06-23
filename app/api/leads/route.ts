import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const REQUIRED = ['nome', 'email', 'consentimento'] as const;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Basic validation
  for (const field of REQUIRED) {
    if (!body[field]) {
      return Response.json({ error: `Campo obrigatório: ${field}` }, { status: 422 });
    }
  }

  if (!body.consentimento) {
    return Response.json({ error: 'Consentimento LGPD obrigatório' }, { status: 422 });
  }

  const { error } = await supabaseAdmin.from('leads').insert({
    nome: String(body.nome).slice(0, 200),
    email: String(body.email).slice(0, 320).toLowerCase(),
    whatsapp: body.whatsapp ? String(body.whatsapp).slice(0, 20) : null,
    origem: String(body.origem ?? 'form').slice(0, 20),
    consentimento: true,
    utm_source: body.utm_source ? String(body.utm_source).slice(0, 100) : null,
    utm_medium: body.utm_medium ? String(body.utm_medium).slice(0, 100) : null,
    utm_campaign: body.utm_campaign ? String(body.utm_campaign).slice(0, 100) : null,
    status: 'novo',
  });

  if (error) {
    console.error('[leads] supabase error:', error.message);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
