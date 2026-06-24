import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function isAdmin(req: NextRequest) {
  return req.cookies.get('fb_admin')?.value === process.env.ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('id, nome, email, whatsapp, origem, utm_source, utm_medium, utm_campaign, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const format = req.nextUrl.searchParams.get('format');
  if (format === 'csv') {
    const headers = ['id', 'nome', 'email', 'whatsapp', 'origem', 'utm_source', 'utm_medium', 'utm_campaign', 'data'];
    const rows = (data ?? []).map((r) => [
      r.id,
      `"${(r.nome ?? '').replace(/"/g, '""')}"`,
      `"${(r.email ?? '').replace(/"/g, '""')}"`,
      `"${(r.whatsapp ?? '').replace(/"/g, '""')}"`,
      r.origem ?? '',
      r.utm_source ?? '',
      r.utm_medium ?? '',
      r.utm_campaign ?? '',
      r.created_at ? new Date(r.created_at).toLocaleString('pt-BR') : '',
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-forbless-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ leads: data ?? [] });
}
