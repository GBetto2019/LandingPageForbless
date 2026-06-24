'use client';

interface Lead {
  id: string;
  nome: string | null;
  email: string | null;
  whatsapp: string | null;
  origem: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string | null;
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  function exportCSV() {
    window.open('/api/admin/leads?format=csv', '_blank');
  }

  const th: React.CSSProperties = {
    padding: '10px 14px',
    fontFamily: 'var(--font-ui)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--fg-ink-4)',
    textAlign: 'left' as const,
    borderBottom: '1px solid var(--fg-line)',
    whiteSpace: 'nowrap' as const,
  };

  const td: React.CSSProperties = {
    padding: '12px 14px',
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    color: 'var(--fg-ink-2)',
    borderBottom: '1px solid var(--fg-line-soft)',
    whiteSpace: 'nowrap' as const,
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={{ background: 'var(--fg-paper)', borderRadius: 'var(--r-lg)', border: '1px solid var(--fg-line-soft)', overflow: 'hidden', boxShadow: '0 1px 3px rgba(7,41,42,0.06)' }}>
      <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--fg-line-soft)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, color: 'var(--fg-green-900)' }}>Leads captados</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-ink-4)', marginTop: 2 }}>{leads.length} registros</div>
        </div>
        <button onClick={exportCSV} className="btn btn--ghost" style={{ padding: '9px 18px', fontSize: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Exportar CSV
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Email</th>
              <th style={th}>WhatsApp</th>
              <th style={th}>Origem</th>
              <th style={th}>UTM Source</th>
              <th style={th}>Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ ...td, textAlign: 'center', padding: '40px', color: 'var(--fg-ink-4)' }}>
                  Nenhum lead ainda.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} style={{ transition: 'background 150ms' }}>
                  <td style={td}>{lead.nome ?? '—'}</td>
                  <td style={td}>
                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--fg-green-700)', textDecoration: 'none' }}>
                      {lead.email ?? '—'}
                    </a>
                  </td>
                  <td style={td}>{lead.whatsapp ?? '—'}</td>
                  <td style={td}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: lead.origem === 'chat' ? 'rgba(63,183,188,0.12)' : 'var(--fg-green-100)', borderRadius: 'var(--r-pill)', padding: '3px 10px', fontSize: 11, fontWeight: 600, color: lead.origem === 'chat' ? 'var(--fg-green-700)' : 'var(--fg-green-700)' }}>
                      {lead.origem ?? '—'}
                    </span>
                  </td>
                  <td style={td}>{lead.utm_source ?? '—'}</td>
                  <td style={{ ...td, color: 'var(--fg-ink-4)', fontSize: 12 }}>
                    {lead.created_at ? new Date(lead.created_at).toLocaleString('pt-BR') : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
