import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';

const stats = [
  { label: 'Total Pages', value: '19', icon: 'ri-pages-line', color: 'bg-blue-500' },
  { label: 'Content Sections', value: '86', icon: 'ri-article-line', color: 'bg-emerald-500' },
  { label: 'Images', value: '24', icon: 'ri-image-line', color: 'bg-amber-500' },
  { label: 'Last Updated', value: 'Today', icon: 'ri-time-line', color: 'bg-rose-500' },
];

const recentPages = [
  { name: 'Home', slug: '/', updated: '2 hours ago', sections: 12, editor: '/admin/home-editor' },
  { name: 'About Us', slug: '/about', updated: '1 day ago', sections: 8, editor: '/admin/about-editor' },
  { name: 'Pune Airport', slug: '/pune-airport', updated: '3 days ago', sections: 14, editor: '/admin/travelers-editor' },
  { name: 'News & Updates', slug: '/news', updated: '5 days ago', sections: 6, editor: '/admin/news-editor' },
  { name: 'Srinagar Airport', slug: '/srinagar-airport', updated: '1 week ago', sections: 14, editor: '/admin/travelers-editor' },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/admin/navbar-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-menu-line text-xl"></i>
              Edit Navbar
            </Link>
            <Link
              to="/admin/navbar-editor?tab=footer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-layout-bottom-line text-xl"></i>
              Edit Footer
            </Link>
            <Link
              to="/admin/home-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-home-4-line text-xl"></i>
              Edit Home Page
            </Link>
            <Link
              to="/admin/about-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-information-line text-xl"></i>
              Edit About Us Page
            </Link>
            <Link
              to="/admin/assets-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-building-line text-xl"></i>
              Edit Our Assets Pages
            </Link>
            <Link
              to="/admin/travelers-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-flight-takeoff-line text-xl"></i>
              Edit For Travelers Pages
            </Link>
            <Link
              to="/admin/lounge-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-vip-crown-line text-xl"></i>
              Edit Lounge Pages
            </Link>
            <Link
              to="/admin/news-editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-newspaper-line text-xl"></i>
              Edit News &amp; Updates Page
            </Link>
            <Link
              to="/admin/content"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#2879b1]/10 hover:text-[#2879b1] transition-all text-slate-700 font-medium"
            >
              <i className="ri-article-line text-xl"></i>
              Manage Content
            </Link>
          </div>
        </div>

        {/* Recent Pages */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Recently Updated Pages</h3>
            <Link
              to="/admin/pages"
              className="text-sm text-[#2879b1] hover:text-[#20618e] font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentPages.map((page) => (
              <div
                key={page.slug}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="ri-file-text-line text-slate-400 text-lg"></i>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{page.name}</p>
                    <p className="text-sm text-slate-500">{page.sections} sections</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">{page.updated}</span>
                  <Link
                    to={page.editor}
                    className="px-3 py-1.5 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg hover:bg-[#2879b1]/20 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}