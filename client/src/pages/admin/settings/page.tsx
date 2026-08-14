import { useEffect, useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';
import { adminToast } from '@/lib/adminToast';
import { adminCreateUser, adminListUsers } from '@/lib/api';

type AdminUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  is_active: boolean;
};

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const loadUsers = () => {
    setLoading(true);
    adminListUsers()
      .then(setUsers)
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await adminCreateUser(form);
      adminToast.added();
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to add user');
      adminToast.error(err.message || 'Failed to add user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add CMS user</h2>
          <p className="text-sm text-slate-500 mb-4">
            New users can sign in at /admin/login with the email and password you set here.
          </p>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2879b1] hover:bg-[#20618e] text-white font-medium rounded-lg cursor-pointer disabled:opacity-50"
            >
              <i className="ri-user-add-line"></i>
              {saving ? 'Adding...' : 'Add user'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">CMS users</h2>
          </div>
          {loading ? (
            <p className="p-6 text-sm text-slate-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">No users yet. Add one above or on the login page.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-3 text-sm text-slate-800">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">{user.email}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{user.user_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
