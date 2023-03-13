import Admin from '@/components/Admin';
import AuthRequired from '@/utils/authRequire';

export default function AdminPage() {
  return (
    <AuthRequired>
      <Admin />;
    </AuthRequired>
  );
}
