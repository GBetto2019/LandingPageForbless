export default function VideoSection() {
  return (
    <section className="section-py" style={{ background: 'var(--fg-green-800)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(63,183,188,0.15) 0%, transparent 65%)' }} />
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }} className="video-grid">
          <div className="video-content">
            <span className="eyebrow eyebrow--cream">Veja na prática</span>
            <h3 className="h3" style={{ color: 'var(--fg-cream)', marginTop: 16 }}>Veja como faz parte<br />da rotina.</h3>
            <p className="lede" style={{ color: 'rgba(251,246,238,0.75)', marginTop: 20 }}>
              Depoimento real de quem usa o Forbless. Conheça a experiência de quem completou o ciclo de 90 dias.
            </p>
            <p style={{ marginTop: 20, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(251,246,238,0.45)', letterSpacing: '0.06em', fontStyle: 'italic', lineHeight: 1.5 }}>
              Resultados podem variar de pessoa para pessoa. Informação baseada em evidência científica aprovada pela ANVISA. Suplemento alimentar não substitui alimentação equilibrada.
            </p>
          </div>

          <div className="video-media" style={{ aspectRatio: '16/9', borderRadius: 'var(--r-xl)', overflow: 'hidden', position: 'relative', background: 'var(--fg-green-900)' }}>
            <video
              controls
              preload="metadata"
              poster="/images/video-poster.webp"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
            >
              <source src="/video/campanha-forbless.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(7,41,42,0.7)', backdropFilter: 'blur(4px)', padding: '8px 16px', fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(251,246,238,0.6)', textAlign: 'center', letterSpacing: '0.06em' }}>
              Resultados podem variar · Depoimento real com autorização de uso de imagem
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .video-grid{grid-template-columns:1fr!important;gap:40px!important}
          .video-media{order:-1!important}
        }
      `}</style>
    </section>
  );
}
