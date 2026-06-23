'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get('_honey')) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.get('nome'),
          email: data.get('email'),
          whatsapp: data.get('whatsapp') || null,
          consentimento: true,
          origem: 'form',
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Ocorreu um erro. Tente novamente.');
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(251,246,238,0.08)',
    border: '1px solid rgba(251,246,238,0.15)',
    borderRadius: 'var(--r-pill)',
    padding: '16px 22px',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--fg-cream)',
    outline: 'none',
    width: '100%',
  };

  return (
    <section id="cupom" className="section-py" style={{ background: 'var(--fg-blush)' }}>
      <div className="wrap">
        <div style={{ background: 'var(--fg-green-900)', borderRadius: 'var(--r-xl)', padding: '72px 80px', maxWidth: 900, margin: '0 auto', position: 'relative', overflow: 'hidden' }} className="lead-card">
          <div style={{ position: 'absolute', bottom: '-30%', right: '-10%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(63,183,188,0.18) 0%, transparent 65%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(63,183,188,0.15)', border: '1px solid rgba(63,183,188,0.3)', borderRadius: 'var(--r-pill)', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--fg-cyan-300)', textTransform: 'uppercase', marginBottom: 28 }}>
              🎁 Cupom exclusivo
            </div>

            <h2 className="h2" style={{ color: 'var(--fg-cream)', marginBottom: 16 }}>
              Ainda com dúvidas?<br />Receba um cupom.
            </h2>
            <p className="lede" style={{ color: 'rgba(251,246,238,0.7)', maxWidth: 540, margin: '0 auto 36px' }}>
              Deixe seu contato: enviamos um cupom para a sua primeira compra e tiramos suas dúvidas sobre o tratamento.
            </p>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--fg-cream)' }}>Enviado!</div>
                <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(251,246,238,0.7)', marginTop: 8 }}>Verifique seu e-mail — o cupom chegará em instantes.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 520, margin: '0 auto' }}>
                {/* Honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="lead-row">
                  <input name="nome" type="text" placeholder="Seu nome" required style={inputStyle} />
                  <input name="email" type="email" placeholder="seu@email.com" required style={inputStyle} />
                </div>
                <input name="whatsapp" type="tel" placeholder="WhatsApp (opcional)" style={inputStyle} />

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textAlign: 'left' }}>
                  <input type="checkbox" required style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, accentColor: 'var(--fg-cyan-600)' }} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(251,246,238,0.5)', lineHeight: 1.5 }}>
                    Aceito receber comunicações da Forbless e concordo com a{' '}
                    <a href="/politica-de-privacidade" style={{ color: 'var(--fg-cyan-300)', textDecoration: 'underline' }}>Política de Privacidade</a>.
                    Você pode cancelar a qualquer momento.
                  </span>
                </label>

                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#FCA5A5', textAlign: 'center' }}>{errorMsg}</p>
                )}

                <button type="submit" className="btn btn--cyan btn--block" style={{ fontSize: 14, padding: 18 }} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando…' : 'Quero meu cupom'}
                  {status !== 'loading' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  )}
                </button>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(251,246,238,0.35)', letterSpacing: '0.06em', textAlign: 'center' }}>Sem spam · Cancelamento a qualquer momento · LGPD</p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:640px){.lead-card{padding:48px 28px!important}.lead-row{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
