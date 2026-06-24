import { supabaseAdmin } from '@/lib/supabase';
import CountdownForm from './CountdownForm';
import LeadsTable from './LeadsTable';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [leadsRes, configRes] = await Promise.all([
    supabaseAdmin
      .from('leads')
      .select('id, nome, email, whatsapp, origem, utm_source, utm_medium, utm_campaign, created_at')
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('config')
      .select('value')
      .eq('key', 'countdown_target')
      .maybeSingle(),
  ]);

  const leads = leadsRes.data ?? [];
  const countdownTarget = configRes.data?.value ?? null;

  const today = new Date().toISOString().split('T')[0];
  const todayCount = leads.filter((l) => l.created_at?.startsWith(today)).length;
  const chatCount = leads.filter((l) => l.origem === 'chat').length;
  const formCount = leads.filter((l) => l.origem === 'form').length;

  const stats = [
    { label: 'Total de leads', value: leads.length },
    { label: 'Hoje', value: todayCount },
    { label: 'Via chat', value: chatCount },
    { label: 'Via formulário', value: formCount },
  ];

  return (
    <>
      {/* Header */}
      <header style={{ background: 'var(--fg-green-900)', padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--fg-cream)' }}>Forbless</div>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(251,246,238,0.35)', paddingLeft: 12, borderLeft: '1px solid rgba(251,246,238,0.15)' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(251,246,238,0.5)', textDecoration: 'none', letterSpacing: '0.06em' }}
          >
            Ver landing page ↗
          </a>
          <LogoutButton />
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: 'var(--fg-paper)', borderRadius: 'var(--r-lg)', padding: '20px 24px', border: '1px solid var(--fg-line-soft)', boxShadow: '0 1px 3px rgba(7,41,42,0.06)' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-ink-4)', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--fg-green-900)', lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Countdown config */}
        <CountdownForm currentTarget={countdownTarget} />

        {/* Leads table */}
        <LeadsTable leads={leads} />

      </main>

      <style>{`
        @media(max-width:768px){
          header{padding:0 20px!important}
          main{padding:24px 16px!important}
          .stats-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){
          .stats-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </>
  );
}
