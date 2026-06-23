'use client';

import { useEffect, useState } from 'react';

const CHECKOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ?? 'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  expired: boolean;
  urgent: boolean;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true, urgent: false };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
    expired: false,
    urgent: diff < 3600000,
  };
}

export default function CountdownBar({ targetISO }: { targetISO?: string }) {
  const target = targetISO
    ? new Date(targetISO)
    : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000);

  const [tl, setTl] = useState<TimeLeft>(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTl(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (tl.expired) {
    return (
      <div
        id="countdown-bar"
        style={{ background: '#7B3A1E', position: 'sticky', top: 0, zIndex: 100, padding: '0 20px', minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}
      >
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#FAF7F2', letterSpacing: '0.08em' }}>
          Esta oferta foi encerrada. Fale com nosso especialista para condições atuais.
        </span>
      </div>
    );
  }

  const barBg = tl.urgent ? '#1DF300' : '#1DF300';
  const blockBg = tl.urgent ? 'rgba(217,119,6,0.18)' : 'rgba(7,41,42,0.12)';
  const blockBorder = tl.urgent ? 'rgba(217,119,6,0.4)' : 'rgba(7,41,42,0.2)';
  const numColor = tl.urgent ? '#FCD34D' : 'var(--fg-green-900)';

  const blocks = [
    { val: pad(tl.days), unit: 'dias' },
    { val: pad(tl.hours), unit: 'horas' },
    { val: pad(tl.mins), unit: 'min' },
    { val: pad(tl.secs), unit: 'seg' },
  ];

  return (
    <>
    <style>{`
      @media(max-width:640px){ .cd-label { display:none!important; } }
      @media(max-width:420px){ .cd-cta { display:none!important; } }
    `}</style>
    <div
      id="countdown-bar"
      role="banner"
      aria-label="Oferta por tempo limitado"
      style={{ background: barBg, position: 'sticky', top: 0, zIndex: 100, padding: '0 20px', minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 2px 20px rgba(192,86,33,0.5)' }}
    >
      <span
        className="cd-label"
        style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--fg-green-900)', whiteSpace: 'nowrap' }}
      >
        Oferta de lançamento do kit 90 dias termina em
      </span>

      <div aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {blocks.map((b, i) => (
          <span key={b.unit} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: 'var(--fg-green-900)', fontSize: 20, fontWeight: 700, lineHeight: 1, alignSelf: 'center', marginBottom: 10 }}>:</span>}
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: blockBg, border: `1px solid ${blockBorder}`, borderRadius: 'var(--r-sm)', padding: '4px 10px', minWidth: 46 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 600, color: numColor, lineHeight: 1 }}>{b.val}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(7,41,42,0.55)', marginTop: 2 }}>{b.unit}</span>
            </span>
          </span>
        ))}
      </div>

      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cd-cta"
        style={{ background: 'var(--fg-green-900)', color: '#1DF300', borderRadius: 'var(--r-pill)', padding: '9px 20px', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
      >
        Garantir agora
      </a>
    </div>
    </>
  );
}
