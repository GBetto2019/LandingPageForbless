const ingredients = [
  {
    icon: '💊',
    tag: 'Ativo 01 · Vitamina',
    name: 'Biotina',
    body: 'Atua no metabolismo da queratina — a proteína que dá estrutura aos fios e unhas. Auxilia na redução da fragilidade e da quebra.',
    bg: 'linear-gradient(165deg, #DDE8DC, #6FBDB6)',
  },
  {
    icon: '⚡',
    tag: 'Ativo 02 · Mineral',
    name: 'Zinco',
    body: 'Contribui para a manutenção de cabelo, pele e unhas. Participa da síntese de queratina e auxilia no equilíbrio da oleosidade do couro cabeludo.',
    bg: 'linear-gradient(165deg, #B3E6E8, #3FB7BC)',
  },
  {
    icon: '✨',
    tag: 'Ativo 03 · Complexo',
    name: 'Vitaminas',
    body: 'Potencializam a ação da Biotina e do Zinco, contribuindo para o metabolismo energético das células capilares e proteção antioxidante.',
    bg: 'linear-gradient(165deg, #9CC9C2, #1F7A75)',
  },
];

export default function Ingredients() {
  return (
    <section className="section-py" style={{ background: 'var(--fg-sand)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'end', gap: 40, marginBottom: 56 }} className="ing-head">
          <div>
            <span className="eyebrow">A fórmula</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              O que tem dentro<br />de cada <em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>cápsula.</em>
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: 360 }}>
            Três ativos com respaldo científico, atuando em sinergia no metabolismo capilar, cutâneo e ungueal.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ing-cards">
          {ingredients.map(ing => (
            <div key={ing.name} className="ing-card" style={{ borderRadius: 'var(--r-xl)', padding: 40, background: ing.bg, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 340, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 65%)' }} />
              <div>
                <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 28 }}>{ing.icon}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(7,41,42,0.55)', fontWeight: 700 }}>{ing.tag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'var(--fg-green-900)', lineHeight: 0.95, letterSpacing: '-0.02em', margin: '8px 0 16px' }}>{ing.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'rgba(7,41,42,0.75)' }}>{ing.body}</div>
              </div>
              <div style={{ marginTop: 12, fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(7,41,42,0.45)', fontStyle: 'italic' }}>
                *Informação baseada em evidência científica aprovada pela ANVISA.
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.ing-cards{grid-template-columns:1fr!important}.ing-head{grid-template-columns:1fr!important}}
        @media(max-width:600px){.ing-card{min-height:260px!important;padding:28px!important}}
      `}</style>
    </section>
  );
}
