'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{ background: 'rgba(251,246,238,0.1)', border: '1px solid rgba(251,246,238,0.2)', borderRadius: 'var(--r-pill)', padding: '8px 18px', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'rgba(251,246,238,0.7)', cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 200ms' }}
    >
      Sair
    </button>
  );
}
