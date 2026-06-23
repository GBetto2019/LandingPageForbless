import Link from 'next/link';

export default function Obrigado() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--fg-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ maxWidth: 540, textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>✅</div>
        <h1 className="h2" style={{ marginBottom: 16 }}>Obrigada pelo interesse!</h1>
        <p className="lede" style={{ marginBottom: 32, color: 'var(--fg-ink-3)' }}>
          Recebemos seu contato. Em breve você receberá seu cupom exclusivo e informações sobre o kit de 90 dias.
        </p>
        <Link href="/" className="btn btn--primary btn--lg">
          Voltar para a página
        </Link>
        <p style={{ marginTop: 20, fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-4)' }}>
          *Suplemento alimentar. Resultados podem variar. ANVISA.
        </p>
      </div>
    </main>
  );
}
