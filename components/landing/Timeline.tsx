const CHECKOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ?? 'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

const phases = [
  {
    num: '01',
    day: 'Primeiros 30 dias',
    title: 'Nutrição',
    body: 'O organismo começa a receber o aporte diário de Biotina, Zinco e vitaminas. É a base do processo: nutrir para fortalecer.',
    bg: 'linear-gradient(165deg, var(--fg-green-100), var(--fg-cyan-300))',
  },
  {
    num: '02',
    day: '60 dias',
    title: 'Fortalecimento',
    body: 'Período em que muitos usuários começam a perceber fios mais resistentes, unhas menos quebradiças e pele com aparência mais saudável.',
    bg: 'linear-gradient(165deg, var(--fg-cyan-300), var(--fg-cyan-600))',
  },
  {
    num: '03',
    day: '90 dias — ciclo completo',
    title: 'Vitalidade',
    body: 'Ao completar o ciclo, a percepção mais relatada é de fios com mais vitalidade e brilho, unhas mais firmes e pele com aparência renovada.',
    bg: 'linear-gradient(165deg, var(--fg-green-300), var(--fg-green-600))',
  },
];

export default function Timeline() {
  return (
    <section style={{ background: 'var(--fg-cream)', padding: '100px 0' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
          <span className="eyebrow">A jornada completa</span>
          <h2 className="h2" style={{ marginTop: 16 }}>
            Por que <em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>90 dias?</em>
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            O ciclo de renovação dos fios e unhas não acontece da noite para o dia. Por isso o tratamento é pensado em 3 fases — e o kit traz os 3 potes para você ir até o fim.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, position: 'relative' }} className="tl-cards">
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 52, left: 'calc(16.67% + 10px)', right: 'calc(16.67% + 10px)', height: 2, background: 'linear-gradient(to right, var(--fg-green-300), var(--fg-cyan-600), var(--fg-green-300))' }} className="tl-line" />

          {phases.map(p => (
            <div key={p.num} style={{ borderRadius: 'var(--r-xl)', padding: '40px 32px', background: p.bg, position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--fg-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: 'var(--sh-2)', position: 'relative', zIndex: 2 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, fontWeight: 600, color: 'var(--fg-green-900)' }}>{p.num}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-green-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>{p.day}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--fg-green-900)', lineHeight: 1.05, marginBottom: 14 }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-ink-2)' }}>{p.body}</div>
              <div style={{ marginTop: 16, fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-3)', fontStyle: 'italic' }}>*Resultados individuais podem variar</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            Iniciar meu ciclo de 90 dias
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.tl-cards{grid-template-columns:1fr!important}.tl-line{display:none!important}}
      `}</style>
    </section>
  );
}
