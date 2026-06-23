const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17V7h11v10" /><path d="M14 10h4l3 3v4h-7" />
        <circle cx="7.5" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
      </svg>
    ),
    title: 'Frete grátis',
    sub: 'Para todo o Brasil',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '30 dias de garantia',
    sub: 'Não gostou? Devolvemos.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Checkout seguro',
    sub: 'Pagamento via loja oficial Shopify',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3-3 9-3 9-9 0-7 9-9 9-9-1 4-3 6-3 6s2-1 3 0c-1 4-4 5-7 5-4 0-6 3-6 7Z" />
      </svg>
    ),
    title: 'Aprovado pela ANVISA',
    sub: 'Fórmula com base científica',
  },
];

export default function TrustStrip() {
  return (
    <section style={{ background: 'var(--fg-paper)', padding: '28px 0', borderBottom: '1px solid var(--fg-line-soft)' }}>
      <div className="wrap trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {items.map(item => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 40, height: 40, flexShrink: 0, color: 'var(--fg-cyan-600)', display: 'block' }}>
              {item.icon}
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: 'var(--fg-green-900)' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--fg-ink-3)', marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media(max-width:640px){.trust-grid{grid-template-columns:1fr 1fr!important;gap:16px!important}}
        @media(max-width:380px){.trust-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
