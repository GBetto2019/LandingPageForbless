'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Erro ao autenticar');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fg-green-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--fg-paper)', borderRadius: 'var(--r-xl)', padding: '48px 40px', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--fg-green-900)', marginBottom: 6 }}>Forbless</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-ink-4)' }}>Painel Administrativo</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            required
            autoFocus
            style={{ background: 'var(--fg-green-100)', border: '1.5px solid var(--fg-green-300)', borderRadius: 'var(--r-md)', padding: '14px 18px', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-ink)', outline: 'none', width: '100%' }}
          />

          {error && (
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#DC2626', textAlign: 'center' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary btn--block"
            style={{ marginTop: 4 }}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--fg-ink-4)', textAlign: 'center', marginTop: 24, lineHeight: 1.5 }}>
          Acesso restrito · Forbless Cosméticos
        </p>
      </div>
    </div>
  );
}
