import AdminLayout from '@/components/feature/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="Refex Airports"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site Description</label>
              <textarea
                rows={3}
                defaultValue="Refex Airports & Transportation - Creating world-class airport infrastructure and retail experiences"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Admin Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@refexairports.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Change Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2879b1] hover:bg-[#20618e] text-white font-semibold rounded-lg transition-all cursor-pointer">
            <i className="ri-save-line"></i>
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}