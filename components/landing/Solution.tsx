const chips = [
  { num: '01 · Cabelo', title: 'Fios mais fortes', body: 'Biotina nutre o folículo e auxilia na redução da quebra e da fragilidade capilar.' },
  { num: '02 · Unhas', title: 'Unhas resistentes', body: 'Zinco contribui para a síntese de queratina — a proteína que estrutura as unhas.' },
  { num: '03 · Pele', title: 'Aparência saudável', body: 'Complexo de vitaminas protege contra estresse oxidativo e contribui para vitalidade da pele.' },
  { num: '04 · Couro', title: 'Equilíbrio sebáceo', body: 'Zinco auxilia no equilíbrio da oleosidade do couro cabeludo, um dos gatilhos da queda.' },
];

export default function Solution() {
  return (
    <section style={{ background: 'var(--fg-green-900)', color: 'var(--fg-cream)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(63,183,188,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }} className="solution-grid">
          <div>
            <span className="eyebrow eyebrow--cream">A solução</span>
            <h2 className="h2" style={{ color: 'var(--fg-cream)', marginTop: 16 }}>
              Cuidado de <em style={{ color: 'var(--fg-cyan-300)', fontStyle: 'italic' }}>dentro<br />para fora.</em>
            </h2>
            <p className="lede" style={{ color: 'rgba(251,246,238,0.8)', marginTop: 24 }}>
              O Forbless Hair, Skin &amp; Nails reúne os nutrientes que seus fios, pele e unhas precisam para se manterem fortes. Em vez de agir só por fora, ele nutre a estrutura na origem — no folículo e no ciclo de renovação celular.
            </p>
            <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(251,246,238,0.05)', border: '1px solid rgba(251,246,238,0.12)', borderRadius: 'var(--r-md)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--fg-cyan-300)', lineHeight: 1.1 }}>2 cápsulas por dia.<br />Simples assim.</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(251,246,238,0.5)', marginTop: 6, letterSpacing: '0.08em' }}>Com uma refeição · 200ml de água · uso contínuo por 90 dias</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="solution-chips">
            {chips.map(c => (
              <div key={c.num} style={{ background: 'rgba(251,246,238,0.05)', border: '1px solid rgba(251,246,238,0.1)', borderRadius: 'var(--r-md)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--fg-cyan-600)', fontWeight: 700, textTransform: 'uppercase' }}>{c.num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--fg-cream)', margin: '10px 0 8px', lineHeight: 1 }}>{c.title}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'rgba(251,246,238,0.65)' }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.solution-grid{grid-template-columns:1fr!important}.solution-chips{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
