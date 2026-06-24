'use client';

import { useState } from 'react';

export default function CountdownForm({ currentTarget }: { currentTarget?: string | null }) {
  const initial = currentTarget ? new Date(currentTarget) : null;
  const [date, setDate] = useState(initial ? initial.toISOString().split('T')[0] : '');
  const [time, setTime] = useState(initial ? initial.toISOString().split('T')[1].slice(0, 5) : '23:59');
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle');

  async function handleSave() {
    if (!date) return;
    setStatus('saving');
    const iso = new Date(`${date}T${time}:00`).toISOString();
    const res = await fetch('/api/admin/countdown', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: iso }),
    });
    setStatus(res.ok ? 'ok' : 'error');
    setTimeout(() => setStatus('idle'), 3000);
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--fg-green-100)',
    border: '1.5px solid var(--fg-green-300)',
    borderRadius: 'var(--r-md)',
    padding: '10px 14px',
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    color: 'var(--fg-ink)',
    outline: 'none',
  };

  return (
    <div style={{ background: 'var(--fg-paper)', borderRadius: 'var(--r-lg)', padding: '24px 28px', boxShadow: '0 1px 3px rgba(7,41,42,0.06)', border: '1px solid var(--fg-line-soft)' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-ink-3)', marginBottom: 16 }}>
        Countdown da oferta
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
        <button
          onClick={handleSave}
          disabled={status === 'saving' || !date}
          className="btn btn--primary"
          style={{ padding: '10px 22px', fontSize: 13 }}
        >
          {status === 'saving' ? 'Salvando…' : status === 'ok' ? '✓ Salvo' : status === 'error' ? 'Erro' : 'Salvar'}
        </button>
      </div>
      {currentTarget && (
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--fg-ink-4)', marginTop: 10 }}>
          Atual: {new Date(currentTarget).toLocaleString('pt-BR')}
        </p>
      )}
    </div>
  );
}
