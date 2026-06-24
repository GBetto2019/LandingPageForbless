export const metadata = { title: 'Forbless Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '100vh', background: '#F2F6F5' }}>{children}</div>;
}
