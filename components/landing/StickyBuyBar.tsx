'use client';

import { useEffect, useState } from 'react';

const CHECKOUT_URL = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL ?? 'https://forbless.com/products/90-dias-forbless-hair-skin-nails';

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function StickyBuyBar({ targetISO }: { targetISO?: string }) {
  const [visible, setVisible] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const target = targetISO
      ? new Date(targetISO)
      : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000);

    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeStr('Encerrado'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeStr(`${pad(d)}d ${pad(h)}h ${pad(m)}m`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  useEffect(() => {
    const hero = document.querySelector('.hero-sentinel');
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0.1 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80, background: 'var(--fg-paper)', borderTop: '1px solid var(--fg-line)', boxShadow: '0 -8px 32px rgba(7,41,42,0.12)', transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.4s var(--ease-out)' }}>
      <div className="wrap sticky-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="sticky-product">
          <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: 'linear-gradient(155deg, var(--fg-green-100), var(--fg-cyan-300))' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--fg-green-900)' }}>Forbless Hair, Skin &amp; Nails</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--fg-ink-3)' }}>Kit 90 dias · 3 potes</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-ink-4)', textDecoration: 'line-through' }}>R$ 239,90</span>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--fg-green-900)', lineHeight: 1, fontWeight: 600 }}>R$ 179,90</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-ink-3)' }}>· 6× R$ 29,98</span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {timeStr && <span className="sticky-timer" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#D97706', fontWeight: 600, whiteSpace: 'nowrap' }}>⏳ {timeStr} restando</span>}
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Comprar agora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
      <style>{`
        @media(max-width:640px){
          .sticky-product{display:none!important}
          .sticky-inner{padding:12px 16px!important;gap:10px!important}
          .sticky-timer{display:none!important}
        }
      `}</style>
    </div>
  );
}
