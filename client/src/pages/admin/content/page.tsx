import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';

const contentSections = [
  { key: 'home_hero_title', label: 'Home — Hero Title', page: 'Home', value: 'Refex Airports & Transportation', type: 'text' },
  { key: 'home_hero_subtitle', label: 'Home — Hero Subtitle', page: 'Home', value: 'Creating world-class airport infrastructure...', type: 'text' },
  { key: 'about_hero_title', label: 'About — Hero Title', page: 'About', value: 'About Us', type: 'text' },
  { key: 'about_intro', label: 'About — Introduction', page: 'About', value: 'Refex Airports & Transportation Pvt. Ltd...', type: 'textarea' },
  { key: 'about_vision', label: 'About — Vision', page: 'About', value: 'To be the most trusted and preferred partner...', type: 'textarea' },
  { key: 'about_mission', label: 'About — Mission', page: 'About', value: 'To create exceptional airport experiences...', type: 'textarea' },
  { key: 'pune_passengers', label: 'Pune — Passengers', page: 'Pune Airport', value: '9 Million', type: 'text' },
  { key: 'pune_destinations', label: 'Pune — Destinations', page: 'Pune Airport', value: '35+', type: 'text' },
  { key: 'srinagar_passengers', label: 'Srinagar — Passengers', page: 'Srinagar Airport', value: '3.5 Million', type: 'text' },
  { key: 'trichy_passengers', label: 'Trichy — Passengers', page: 'Trichy Airport', value: '4.5 Million', type: 'text' },
  { key: 'aurangabad_passengers', label: 'Aurangabad — Passengers', page: 'Aurangabad Airport', value: '1.2 Million', type: 'text' },
  { key: 'shirdi_passengers', label: 'Shirdi — Passengers', page: 'Shirdi Airport', value: '1.5 Million', type: 'text' },
];

export default function AdminContentPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Content Manager</h1>
            <p className="text-slate-500 mt-1">Edit all CMS-managed content sections</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-slate-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
            />
          </div>
          <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]">
            <option>All Pages</option>
            <option>Home</option>
            <option>About</option>
            <option>Pune Airport</option>
            <option>Srinagar Airport</option>
            <option>Trichy Airport</option>
            <option>Aurangabad Airport</option>
            <option>Shirdi Airport</option>
          </select>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Section Key
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contentSections.map((section) => (
                  <tr key={section.key} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-500">{section.key}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{section.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {section.page}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 truncate max-w-xs block">
                        {section.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/pages/${section.page.toLowerCase().replace(/\s+/g, '-')}`}
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