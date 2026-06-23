import Image from 'next/image';

const CHECKOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ?? 'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

const features = [
  '3 potes — ciclo completo de 90 dias',
  'Frete para todo o Brasil',
  'Checkout seguro via loja oficial Shopify',
  'Parcelamento disponível ou PIX',
];

export default function Offer() {
  return (
    <section id="oferta" style={{ background: 'var(--fg-green-900)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(63,183,188,0.2) 0%, transparent 60%)' }} />
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }} className="offer-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 'var(--r-pill)', background: 'rgba(217,119,6,0.18)', border: '1px solid rgba(217,119,6,0.35)', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#FCD34D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Oferta de lançamento · Válida por tempo limitado</span>
            </div>

            <h2 className="h2">
              Kit 90 Dias<br /><em style={{ color: 'var(--fg-cyan-300)', fontStyle: 'italic' }}>Hair, Skin &amp; Nails.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(251,246,238,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}>3 potes · ciclo completo de 90 dias</p>

            <div style={{ margin: '32px 0' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'rgba(251,246,238,0.4)', textDecoration: 'line-through' }}>De R$ 239,90</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 72, fontWeight: 600, color: 'var(--fg-cyan-300)', lineHeight: 1 }}>R$ 179,90</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'rgba(251,246,238,0.6)', marginTop: 4 }}>ou 6× de R$ 29,98 sem juros · ou PIX com desconto adicional</div>
            </div>

            <div style={{ marginTop: 32 }}>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn--cyan btn--lg btn--block">
                Comprar meu kit de 90 dias
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(251,246,238,0.7)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--fg-green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(251,246,238,0.04)', border: '1px solid rgba(251,246,238,0.1)', borderRadius: 'var(--r-xl)', padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--fg-cyan-600)', textTransform: 'uppercase', fontWeight: 700 }}>✦ Kit incluso</div>
            <div style={{ width: '100%', height: 220, borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', background: 'rgba(251,246,238,0.05)', border: '1px solid rgba(251,246,238,0.1)' }}>
              <Image
                src="/images/forbless-3-potes.png"
                alt="Forbless Kit 90 Dias – 3 potes"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['Quantidade', '3 potes'], ['Ciclo', '90 dias'], ['Posologia', '2 caps/dia'], ['Registro', 'ANVISA']].map(([lbl, val]) => (
                <div key={lbl} style={{ background: 'rgba(251,246,238,0.05)', borderRadius: 'var(--r-md)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.16em', color: 'rgba(251,246,238,0.4)', textTransform: 'uppercase' }}>{lbl}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-cream)', marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 20, borderTop: '1px solid rgba(251,246,238,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(251,246,238,0.4)', letterSpacing: '0.06em', fontStyle: 'italic', lineHeight: 1.6 }}>
                Suplemento alimentar. Não substitui alimentação equilibrada nem acompanhamento médico. Resultados podem variar. *Informação baseada em evidência científica aprovada pela ANVISA.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.offer-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
