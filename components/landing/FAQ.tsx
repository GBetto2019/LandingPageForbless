'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Em quanto tempo vou perceber resultado?',
    a: 'Cada organismo responde no seu tempo. Como o ciclo de renovação dos fios é longo, recomendamos o uso contínuo por no mínimo 90 dias. Muitos usuários relatam percepções a partir do segundo mês. Resultados podem variar.',
  },
  {
    q: 'Como devo tomar?',
    a: '2 cápsulas por dia, junto a uma refeição, com um copo de água (200 ml). Uso contínuo por no mínimo 90 dias para acompanhar o ciclo completo de renovação capilar.',
  },
  {
    q: 'Tem alguma contraindicação?',
    a: 'É um suplemento alimentar. Gestantes, lactantes, pessoas com condições de saúde pré-existentes ou em uso de medicamentos devem consultar um médico antes de iniciar qualquer suplementação.',
  },
  {
    q: 'A fórmula é aprovada?',
    a: 'Sim. A fórmula é baseada em evidência científica aprovada pela ANVISA. O produto é um suplemento alimentar regulamentado, não um medicamento.',
  },
  {
    q: 'Como recebo meu pedido?',
    a: 'Enviamos para todas as regiões do Brasil. O prazo e o valor de frete aparecem no checkout da loja oficial. Frete grátis disponível conforme política vigente.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="duvidas" className="section-py" style={{ background: 'var(--fg-cream)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="h2" style={{ marginTop: 16 }}>
            Perguntas<br /><em style={{ fontStyle: 'italic', color: 'var(--fg-green-700)' }}>frequentes.</em>
          </h2>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--fg-line-soft)', ...(i === 0 ? { borderTop: '1px solid var(--fg-line-soft)' } : {}) }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', padding: '22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, background: 'none', border: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600, color: 'var(--fg-green-900)', textAlign: 'left' }}
                aria-expanded={open === i}
              >
                {faq.q}
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: open === i ? 'var(--fg-green-900)' : 'var(--fg-green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 280ms, transform 280ms', transform: open === i ? 'rotate(45deg)' : 'none' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke={open === i ? 'var(--fg-cream)' : 'var(--fg-green-700)'} strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div style={{ maxHeight: open === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s var(--ease-out)', paddingBottom: open === i ? 22 : 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-ink-3)' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-ink-3)', marginBottom: 20 }}>Ainda tem alguma dúvida?</p>
          <button
            className="btn btn--ghost"
            onClick={() => {
              const btn = document.querySelector<HTMLButtonElement>('.chat-btn');
              btn?.click();
            }}
          >
            Falar com o especialista
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
