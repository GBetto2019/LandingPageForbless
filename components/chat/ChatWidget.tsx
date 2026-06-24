'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ??
  'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

interface Message {
  role: 'agent' | 'user';
  text: string;
  checkout?: { url: string; msg: string };
  leadOk?: string;
  streaming?: boolean;
}

type HistoryEntry = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'Como funciona o tratamento?',
  'Em quanto tempo vejo resultado?',
  'Como tomar?',
  'Quero comprar',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      text: 'Oi! Sou o especialista Forbless. Posso te ajudar a entender como o kit de 90 dias funciona, como usar e qual a melhor forma de começar. O que você gostaria de saber?',
    },
  ]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (loading) return;
      setShowSuggestions(false);
      setLoading(true);

      const userMsg: Message = { role: 'user', text };
      setMessages((prev) => [...prev, userMsg]);

      const nextHistory: HistoryEntry[] = [...history, { role: 'user', content: text }];

      // Placeholder for streaming agent response
      const agentIdx = (prev: Message[]) => prev.length;
      setMessages((prev) => [...prev, { role: 'agent', text: '', streaming: true }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextHistory }),
        });

        if (!res.ok || !res.body) throw new Error('stream error');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accText = '';
        let checkoutData: { url: string; msg: string } | undefined;
        let leadName: string | undefined;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const raw = line.slice(6).trim();
            if (!raw) continue;

            let event: { t: string; v?: string; url?: string; msg?: string; nome?: string };
            try { event = JSON.parse(raw); } catch { continue; }

            if (event.t === 'text' && event.v) {
              accText += event.v;
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === 'agent') next[next.length - 1] = { ...last, text: accText, streaming: true };
                return next;
              });
            } else if (event.t === 'checkout') {
              checkoutData = { url: event.url ?? CHECKOUT_URL, msg: event.msg ?? '' };
            } else if (event.t === 'lead_ok') {
              leadName = event.nome;
            } else if (event.t === 'done') {
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === 'agent') {
                  next[next.length - 1] = {
                    ...last,
                    text: accText,
                    streaming: false,
                    checkout: checkoutData,
                    leadOk: leadName,
                  };
                }
                return next;
              });
            } else if (event.t === 'error') {
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: 'agent', text: 'Desculpe, tive um problema técnico. Tente novamente.' };
                return next;
              });
            }
          }
        }

        setHistory([...nextHistory, { role: 'assistant', content: accText }]);
      } catch {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'agent', text: 'Não consegui me conectar. Verifique sua conexão e tente novamente.' };
          return next;
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, history],
  );

  function handleSend() {
    const t = input.trim();
    if (!t) return;
    setInput('');
    sendMessage(t);
  }

  return (
    <>
      {/* Bubble */}
      {showBubble && !open && (
        <div
          className="chat-bubble"
          style={{ position: 'fixed', bottom: 100, right: 28, zIndex: 90, background: 'var(--fg-paper)', borderRadius: '16px 16px 0 16px', padding: '14px 18px', boxShadow: 'var(--sh-3)', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: 'var(--fg-green-900)', maxWidth: 220, lineHeight: 1.4, animation: 'fadeInRight 0.6s var(--ease-out) 2s both' }}
        >
          Oi! Posso te ajudar com dúvidas sobre o kit de 90 dias? 💬
        </div>
      )}

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Chat com Especialista Forbless"
        aria-hidden={!open}
        className="chat-panel-responsive"
        style={{ position: 'fixed', bottom: 100, right: 28, zIndex: 91, width: 380, background: 'var(--fg-paper)', borderRadius: 'var(--r-xl)', boxShadow: '0 32px 80px rgba(7,41,42,0.22), 0 0 0 1px rgba(7,41,42,0.06)', display: 'flex', flexDirection: 'column', maxHeight: 560, overflow: 'hidden', transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)', transformOrigin: 'bottom right', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'transform 320ms var(--ease-out), opacity 280ms var(--ease-out)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'var(--fg-green-900)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, var(--fg-cyan-600), var(--fg-green-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-cream)', position: 'relative', flexShrink: 0 }}>
              F
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid var(--fg-green-900)' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--fg-cream)' }}>Especialista Forbless</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(251,246,238,0.5)', marginTop: 2 }}>
                {loading ? 'digitando…' : 'Online · responde em instantes'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
            style={{ background: 'rgba(251,246,238,0.1)', border: 0, color: 'rgba(251,246,238,0.6)', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}
          >✕</button>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}
        >
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: m.role === 'agent' ? 'linear-gradient(135deg, var(--fg-cyan-600), var(--fg-green-700))' : 'var(--fg-green-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: m.role === 'agent' ? 'var(--font-display)' : 'var(--font-ui)', fontStyle: m.role === 'agent' ? 'italic' : 'normal', fontSize: m.role === 'agent' ? 13 : 10, color: m.role === 'agent' ? 'var(--fg-cream)' : 'var(--fg-green-900)', fontWeight: m.role === 'user' ? 700 : 400 }}>
                {m.role === 'agent' ? 'F' : 'Eu'}
              </div>
              <div style={{ maxWidth: '82%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(m.text || m.streaming) && (
                  <div style={{ padding: '12px 16px', borderRadius: m.role === 'agent' ? '18px 18px 18px 4px' : '18px 18px 4px 18px', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: m.role === 'agent' ? 'var(--fg-ink-2)' : 'var(--fg-cream)', background: m.role === 'agent' ? 'var(--fg-green-100)' : 'var(--fg-green-900)', whiteSpace: 'pre-line', minHeight: 20 }}>
                    {m.text}
                    {m.streaming && (
                      <span style={{ display: 'inline-flex', gap: 3, marginLeft: 4, verticalAlign: 'middle' }}>
                        {[0, 150, 300].map((d) => (
                          <span key={d} style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--fg-green-500)', display: 'inline-block', animation: 'dot-bounce 1.2s ease-in-out infinite', animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                    )}
                  </div>
                )}

                {/* Checkout CTA card */}
                {m.checkout && (
                  <div style={{ background: 'var(--fg-green-900)', borderRadius: 'var(--r-md)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {m.checkout.msg && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(251,246,238,0.8)', lineHeight: 1.5 }}>{m.checkout.msg}</p>
                    )}
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-cyan-300)' }}>Kit exclusivo · oferta de lançamento</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--fg-cream)', lineHeight: 1.1 }}>Forbless 90 Dias</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(251,246,238,0.6)' }}>3 potes · R$ 179,90 · 6× sem juros</div>
                    <a
                      href={m.checkout.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: 'var(--fg-cyan-600)', color: 'var(--fg-green-900)', border: 0, borderRadius: 'var(--r-pill)', padding: '10px 16px', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
                    >
                      Comprar agora
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                )}

                {/* Lead registered confirmation */}
                {m.leadOk && (
                  <div style={{ background: 'var(--fg-green-100)', borderRadius: 'var(--r-md)', padding: '12px 16px', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-green-700)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>✓</span>
                    <span>Contato de <strong>{m.leadOk}</strong> registrado! Você receberá o cupom por e-mail.</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Suggestions */}
          {showSuggestions && !loading && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{ background: 'var(--fg-paper)', border: '1.5px solid var(--fg-green-300)', borderRadius: 'var(--r-pill)', padding: '8px 14px', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500, color: 'var(--fg-green-700)', cursor: 'pointer' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '14px 16px', borderTop: '1px solid var(--fg-line-soft)', flexShrink: 0 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Escreva sua dúvida…"
            autoComplete="off"
            disabled={loading}
            style={{ flex: 1, background: 'var(--fg-green-100)', border: '1.5px solid var(--fg-green-300)', borderRadius: 'var(--r-pill)', padding: '11px 18px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-ink)', outline: 'none', opacity: loading ? 0.6 : 1 }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Enviar"
            style={{ width: 40, height: 40, borderRadius: '50%', background: loading || !input.trim() ? 'var(--fg-green-300)' : 'var(--fg-green-900)', color: 'var(--fg-cream)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: loading || !input.trim() ? 'default' : 'pointer', flexShrink: 0, transition: 'background 200ms' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
          </button>
        </div>

        <div style={{ padding: '9px 16px', textAlign: 'center', flexShrink: 0, fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-4)', borderTop: '1px solid var(--fg-line-soft)' }}>
          Suplemento alimentar · Respostas com IA · Resultados podem variar
        </div>
      </div>

      {/* Trigger button */}
      <div
        className="chat-trigger-wrap"
        style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}
      >
        <button
          className="chat-btn"
          onClick={() => { setOpen((o) => !o); setShowBubble(false); }}
          aria-label="Abrir chat com especialista"
          style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--fg-green-900)', color: 'var(--fg-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(7,41,42,0.4)', border: 0, cursor: 'pointer', position: 'relative' }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          )}
          {!open && (
            <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: 'var(--fg-cyan-600)', border: '2px solid var(--fg-cream)', fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: 'var(--fg-green-900)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @media(max-width:768px){
          .chat-trigger-wrap{bottom:84px!important}
          .chat-bubble{bottom:160px!important}
        }
        @media(max-width:480px){
          .chat-panel-responsive{width:calc(100vw - 24px)!important;right:12px!important;bottom:160px!important;max-height:65vh!important}
          .chat-trigger-wrap{right:12px!important}
          .chat-bubble{right:12px!important}
        }
      `}</style>
    </>
  );
}
