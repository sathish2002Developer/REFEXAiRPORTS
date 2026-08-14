import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';

const allPages = [
  { name: 'Navbar', slug: '/navbar', sections: 1, status: 'published', editor: '/admin/navbar-editor' },
  { name: 'Home', slug: '/', sections: 12, status: 'published', editor: '/admin/home-editor' },
  { name: 'About Us', slug: '/about', sections: 8, status: 'published', editor: '/admin/about-editor' },
  { name: 'News & Updates', slug: '/news', sections: 6, status: 'published', editor: '/admin/news-editor' },
  { name: 'Pune Airport — Travelers', slug: '/pune-airport', sections: 14, status: 'published', editor: '/admin/travelers-editor' },
  { name: 'Pune Airport — Retail', slug: '/pune-airport-assets', sections: 10, status: 'published', editor: '/admin/assets-editor' },
  { name: 'Pune Airport — Lounge', slug: '/pune-airport-lounge', sections: 8, status: 'published', editor: '/admin/lounge-editor' },
  { name: 'Srinagar Airport — Travelers', slug: '/srinagar-airport', sections: 14, status: 'published', editor: '/admin/travelers-editor' },
  { name: 'Srinagar Airport — Retail', slug: '/srinagar-airport-assets', sections: 10, status: 'published', editor: '/admin/assets-editor' },
  { name: 'Srinagar Airport — Lounge', slug: '/srinagar-airport-lounge', sections: 8, status: 'published', editor: '/admin/lounge-editor' },
  { name: 'Trichy Airport — Travelers', slug: '/trichy-airport', sections: 14, status: 'published', editor: '/admin/travelers-editor' },
  { name: 'Trichy Airport — Retail', slug: '/trichy-airport-assets', sections: 10, status: 'published', editor: '/admin/assets-editor' },
  { name: 'Trichy Airport — Lounge', slug: '/trichy-airport-lounge', sections: 8, status: 'published', editor: '/admin/lounge-editor' },
  { name: 'Aurangabad Airport — Travelers', slug: '/aurangabad-airport', sections: 14, status: 'published', editor: '/admin/travelers-editor' },
  { name: 'Aurangabad Airport — Retail', slug: '/aurangabad-airport-assets', sections: 10, status: 'published', editor: '/admin/assets-editor' },
  { name: 'Aurangabad Airport — Lounge', slug: '/aurangabad-airport-lounge', sections: 8, status: 'published', editor: '/admin/lounge-editor' },
  { name: 'Shirdi Airport — Travelers', slug: '/shirdi-airport', sections: 14, status: 'published', editor: '/admin/travelers-editor' },
  { name: 'Shirdi Airport — Retail', slug: '/shirdi-airport-assets', sections: 10, status: 'published', editor: '/admin/assets-editor' },
  { name: 'Shirdi Airport — Lounge', slug: '/shirdi-airport-lounge', sections: 8, status: 'published', editor: '/admin/lounge-editor' },
];

export default function AdminPagesPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">All Pages</h1>
            <p className="text-slate-500 mt-1">Manage content across all website pages</p>
          </div>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Page Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sections
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allPages.map((page) => (
                  <tr key={page.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-text-line text-slate-400"></i>
                        </div>
                        <span className="font-medium text-slate-800">{page.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 font-mono">{page.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{page.sections}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={page.editor}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg hover:bg-[#2879b1]/20 transition-colors"
                      >
                        <i className="ri-edit-line"></i>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}