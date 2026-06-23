export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--fg-green-900)', color: 'var(--fg-cream)', padding: '72px 0 32px' }}>
      <style>{`@media(max-width:640px){.site-footer{padding:48px 0 32px!important}.site-footer .wrap>div:first-child{padding-bottom:32px!important}}`}</style>
      <div className="wrap">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: 40, borderBottom: '1px solid rgba(251,246,238,0.1)' }}>
          {/* Logo fallback */}
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--fg-cream)', marginBottom: 14 }}>Forbless</div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(251,246,238,0.6)', lineHeight: 1.6, maxWidth: 440, textAlign: 'center' }}>
            Força e beleza de dentro para fora. Suplementação com base científica para cabelos, pele e unhas mais fortes.
          </p>

          <div style={{ marginTop: 20 }}>
            <a
              href="https://instagram.com/forblesscosmeticos"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(251,246,238,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: 'var(--fg-cream)' }}
            >
              IG
            </a>
          </div>

          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(251,246,238,0.35)', lineHeight: 1.6, maxWidth: 580, textAlign: 'center', marginTop: 28 }}>
            *Suplemento alimentar. Não substitui alimentação equilibrada nem acompanhamento médico. Resultados podem variar. Informação baseada em evidência científica aprovada pela ANVISA.
          </p>
        </div>

        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 24, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(251,246,238,0.35)' }}>
          <span>© 2026 Forbless Cosméticos · CNPJ 42.837.233/0001-58 · Todos os direitos reservados</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="/politica-de-privacidade" style={{ color: 'rgba(251,246,238,0.35)', transition: 'color 280ms' }}>Política de Privacidade</a>
            <a href="https://forbless.com/pages/trocas-e-devolucoes" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(251,246,238,0.35)' }}>Trocas e Devoluções</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
