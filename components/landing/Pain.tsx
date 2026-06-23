const symptoms = [
  'Queda e afinamento que parecem aumentar a cada lavagem',
  'Fios fracos, quebradiços e sem brilho',
  'Unhas que descamam e não crescem',
  'Oleosidade no couro cabeludo que incomoda',
];

const stats = [
  { num: '7 em 10', lbl: 'mulheres relatam queda ou fragilidade capilar relacionada à nutrição deficiente' },
  { num: '90 dias', lbl: 'é o tempo do ciclo de renovação capilar completo — o motivo do kit ter 3 potes' },
  { num: '2 cápsulas', lbl: 'por dia junto a uma refeição — rotina simples que a maioria já tem' },
];

export default function Pain() {
  return (
    <section className="section-py" style={{ background: 'var(--fg-sand)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="pain-grid">
          <div>
            <span className="eyebrow">Você se identifica?</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Você reconhece<br />algum destes{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>sinais?</em>
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
              {symptoms.map(s => (
                <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fg-green-700)', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--fg-ink-2)' }}>{s}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 28, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--fg-ink-3)', fontStyle: 'italic' }}>
              Muitas vezes, a origem está na nutrição do fio — e é exatamente aí que o Forbless atua.
            </p>
          </div>

          <div style={{ background: 'var(--fg-green-100)', borderRadius: 'var(--r-xl)', padding: 40, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(63,183,188,0.2) 0%, transparent 70%)' }} />
            {stats.map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 20, background: 'var(--fg-paper)', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--fg-green-900)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--fg-ink-3)', letterSpacing: '0.1em' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.pain-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}
