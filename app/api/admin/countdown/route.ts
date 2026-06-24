import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function isAdmin(req: NextRequest) {
  return req.cookies.get('fb_admin')?.value === process.env.ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data } = await supabaseAdmin
    .from('config')
    .select('value')
    .eq('key', 'countdown_target')
    .maybeSingle();

  return NextResponse.json({ target: data?.value ?? null });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { target } = await req.json();
  if (!target || isNaN(Date.parse(target))) {
    return NextResponse.json({ error: 'Data inválida' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('config')
    .upsert({ key: 'countdown_target', value: target, updated_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
