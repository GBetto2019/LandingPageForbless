const reviews = [
  {
    badge: '60 DIAS DE USO',
    badgeStyle: 'pill--dark',
    bg: 'linear-gradient(155deg, var(--fg-green-100), var(--fg-cyan-300))',
    emoji: '🌿',
    quote: 'Percebi muito menos queda no escovão. Cabelo ficou mais brilhoso e forte. Vale demais o kit de 90 dias.',
    name: 'Marina S.',
    meta: 'Kit 90 dias · São Paulo',
  },
  {
    badge: '90 DIAS — CICLO COMPLETO',
    badgeStyle: 'pill--cyan',
    bg: 'linear-gradient(155deg, var(--fg-cyan-300), var(--fg-green-300))',
    emoji: '💆',
    quote: 'As cápsulas mudaram tudo. Cabelo, unhas e pele — os três sentiram a diferença. Comprei o segundo kit sem pensar duas vezes.',
    name: 'Beatriz L.',
    meta: 'Kit 90 dias · Belo Horizonte',
  },
  {
    badge: 'CABELO COM QUÍMICA',
    badgeStyle: '',
    badgeInline: { background: 'rgba(217,119,6,0.15)', color: '#D97706', border: '1px solid rgba(217,119,6,0.3)' },
    bg: 'linear-gradient(155deg, var(--fg-green-300), var(--fg-peach))',
    emoji: '✨',
    quote: 'Cabelo com química, ressecado — hoje está macio e com vida. A consistência de 90 dias realmente faz diferença.',
    name: 'Júlia P.',
    meta: 'Kit 90 dias · Rio de Janeiro',
  },
];

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path d="M12 2l2.9 7L22 9.8l-5.5 4.8L18 22l-6-3.5L6 22l1.5-7.4L2 9.8 9.1 9z" fill="var(--fg-cyan-600)" />
  </svg>
);

export default function Reviews() {
  return (
    <section className="section-py" style={{ background: 'var(--fg-cream)' }}>
      <div className="wrap">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">Nossos Clientes</span>
          <h2 className="h2" style={{ marginTop: 16 }}>
            Histórias reais<br />de quem <em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>percebeu.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="rv-grid">
          {reviews.map(r => (
            <article key={r.name} style={{ background: 'var(--fg-paper)', borderRadius: 'var(--r-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ aspectRatio: '1.1', position: 'relative', overflow: 'hidden', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                {r.emoji}
                <span className={`pill ${r.badgeStyle}`} style={{ position: 'absolute', bottom: 14, left: 14, ...(r.badgeInline ?? {}) }}>{r.badge}</span>
              </div>
              <div style={{ padding: '26px 28px 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <span style={{ display: 'inline-flex', gap: 2 }}>{[...Array(5)].map((_, i) => <Star key={i} />)}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.3, color: 'var(--fg-green-900)' }}>"{r.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--fg-line-soft)', marginTop: 'auto' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--fg-green-900)' }}>{r.name}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-3)', marginTop: 2 }}>{r.meta}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: 'var(--fg-green-700)', letterSpacing: '0.1em' }}>✓ VERIF.</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-4)', fontStyle: 'italic' }}>
          Depoimentos reais de clientes. Resultados individuais podem variar.
        </p>
      </div>
      <style>{`
        @media(max-width:768px){
          .rv-grid{
            display:flex!important;
            overflow-x:auto;
            scroll-snap-type:x mandatory;
            -webkit-overflow-scrolling:touch;
            gap:16px!important;
            padding-bottom:16px;
            margin:0 -20px;
            padding-left:20px;
            padding-right:20px;
          }
          .rv-grid>*{
            min-width:280px;
            max-width:300px;
            scroll-snap-align:start;
            flex-shrink:0;
          }
        }
      `}</style>
    </section>
  );
}
