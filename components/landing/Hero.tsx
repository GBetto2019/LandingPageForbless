import Image from 'next/image';

const CHECKOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ?? 'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

export default function Hero() {
  return (
    <section style={{ background: 'var(--fg-cream)', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          {/* Copy */}
          <div>
            <span className="eyebrow" style={{ marginBottom: 16 }}>Biotina · Zinco · Vitaminas</span>
            <h1 className="h1" style={{ marginBottom: 24 }}>
              Nutra seus <em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>fios, pele<br />e unhas</em><br />de dentro para fora.
            </h1>
            <p className="lede" style={{ marginBottom: 28, maxWidth: '52ch' }}>
              O ciclo de renovação dos fios exige consistência. O kit de 90 dias da Forbless acompanha esse ciclo com{' '}
              <strong>Biotina, Zinco e Complexo de Vitaminas</strong> — em 2 cápsulas por dia.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--fg-ink-4)', textDecoration: 'line-through' }}>De R$ 239,90</span>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 42, color: 'var(--fg-green-900)', lineHeight: 1 }}>R$ 179,90</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-ink-3)' }}>ou 6× R$ 29,98</span>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                Quero meu kit de 90 dias
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <a href="#duvidas" className="btn btn--ghost btn--lg">Tirar dúvidas</a>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Fórmula aprovada pela ANVISA', 'Checkout seguro na loja oficial', 'Frete para todo o Brasil'].map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--fg-ink-3)', fontWeight: 500 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--fg-green-700)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  {t}
                </span>
              ))}
            </div>

            <p style={{ marginTop: 20, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.04em', color: 'var(--fg-ink-4)', lineHeight: 1.5 }}>
              *Informação baseada em evidência científica aprovada pela ANVISA. Resultados podem variar.
            </p>
          </div>

          {/* Visual */}
          <div style={{ position: 'relative', aspectRatio: '0.92', borderRadius: 'var(--r-xl)', overflow: 'hidden', background: 'linear-gradient(155deg, var(--fg-green-100) 0%, var(--fg-cyan-300) 55%, var(--fg-green-300) 100%)' }}>
            <Image
              src="/images/forbless-3-potes.png"
              alt="Forbless Kit 90 Dias – 3 potes Hair, Skin & Nails"
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
              priority
            />

            {/* Floating chips */}
            <div style={{ position: 'absolute', left: 20, top: 28, padding: '14px 18px', background: 'var(--fg-paper)', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-3)', fontFamily: 'var(--font-ui)', zIndex: 5, display: 'flex', alignItems: 'center', gap: 12, animation: 'floatChip 4s ease-in-out infinite alternate', animationDelay: '0.5s' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, fontWeight: 600, color: 'var(--fg-green-800)', lineHeight: 1 }}>90</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--fg-ink-3)', textTransform: 'uppercase', marginTop: 3 }}>dias de ciclo</div>
              </div>
            </div>

            <div style={{ position: 'absolute', right: 20, bottom: '26%', background: 'var(--fg-green-900)', color: 'var(--fg-cream)', padding: '14px 18px', borderRadius: 'var(--r-md)', display: 'flex', flexDirection: 'column', gap: 3, zIndex: 5, animation: 'floatChip 4s ease-in-out infinite alternate', animationDelay: '1.2s', boxShadow: 'var(--sh-3)' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--fg-cyan-300)', textTransform: 'uppercase' }}>Kit Completo</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1 }}>3 potes</div>
            </div>

            <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', background: 'var(--fg-green-100)', border: '1px solid var(--fg-green-300)', padding: '8px 16px', borderRadius: 'var(--r-md)', whiteSpace: 'nowrap', zIndex: 5 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: 'var(--fg-green-700)', letterSpacing: '0.06em' }}>✓ Aprovado ANVISA</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
