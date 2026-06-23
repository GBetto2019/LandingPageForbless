import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;

// Para operações de admin (bypass de RLS): usar service role key
// Para operações públicas (insert com RLS): usar anon key
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY!;

export const supabaseAdmin = createClient(url, serviceKey || anonKey);

export const supabasePublic = createClient(url, anonKey);
