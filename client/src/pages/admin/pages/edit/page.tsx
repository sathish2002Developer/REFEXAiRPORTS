import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';
import { adminToast } from '@/lib/adminToast';

// Mock CMS sections for each page type
const mockSections: Record<string, Array<{ key: string; label: string; type: string; value: string }>> = {
  '/': [
    { key: 'hero_title', label: 'Hero Title', type: 'text', value: 'Refex Airports & Transportation' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', value: 'Creating world-class airport infrastructure and retail experiences' },
    { key: 'stats_passengers', label: 'Passengers Served', type: 'text', value: '10M+' },
    { key: 'stats_airports', label: 'Airports Operated', type: 'text', value: '5' },
    { key: 'stats_brands', label: 'Brand Partners', type: 'text', value: '150+' },
    { key: 'who_we_are_title', label: 'Who We Are Title', type: 'text', value: 'Who We Are' },
    { key: 'who_we_are_desc', label: 'Who We Are Description', type: 'textarea', value: 'Refex Airports & Transportation is a commercial venture of Refex Group, committed to being a best-in-class developer and operator of airports and transportation services infrastructure across India.' },
  ],
  '/about': [
    { key: 'hero_title', label: 'Hero Title', type: 'text', value: 'About Us' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', value: 'Building the future of airport infrastructure in India' },
    { key: 'intro_text', label: 'Introduction', type: 'textarea', value: 'Refex Airports & Transportation Pvt. Ltd. is a leading developer and operator of airport infrastructure, committed to delivering world-class passenger experiences through innovative retail, dining, and lounge solutions.' },
    { key: 'vision', label: 'Vision', type: 'textarea', value: 'To be the most trusted and preferred partner for airport development and operations in India.' },
    { key: 'mission', label: 'Mission', type: 'textarea', value: 'To create exceptional airport experiences that delight passengers and drive value for stakeholders through operational excellence and innovation.' },
  ],
  default: [
    { key: 'hero_title', label: 'Hero Title', type: 'text', value: 'Airport Title' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', value: 'Discover world-class retail and dining' },
    { key: 'airport_code', label: 'Airport Code', type: 'text', value: 'PNQ' },
    { key: 'passengers_annual', label: 'Annual Passengers', type: 'text', value: '9 Million' },
    { key: 'destinations', label: 'Destinations', type: 'text', value: '35+' },
    { key: 'retail_outlets', label: 'Retail Outlets', type: 'text', value: '50+' },
  ],
};

export default function AdminPageEditor() {
  const { '*': pagePath } = useParams();
  const fullPath = pagePath ? `/${pagePath}` : '/';

  const sections = mockSections[fullPath] || mockSections.default;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    sections.forEach((s) => { initial[s.key] = s.value; });
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Placeholder — will save to Supabase in Phase 2
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      adminToast.saved();
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const pageName = fullPath === '/' ? 'Home' : fullPath.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Breadcrumb + Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/pages" className="hover:text-[#2879b1] transition-colors">
              Pages
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-800 font-medium">{pageName}</span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                <i className="ri-check-line"></i>
                Saved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2879b1] hover:bg-[#20618e] text-white font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="ri-save-line"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Page Info Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2879b1]/10 rounded-xl flex items-center justify-center">
              <i className="ri-file-edit-line text-[#2879b1] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{pageName}</h1>
              <p className="text-sm text-slate-500 font-mono">{fullPath}</p>
            </div>
          </div>
        </div>

        {/* Sections Editor */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.key}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {section.label}
                <span className="ml-2 text-xs font-normal text-slate-400 font-mono">{section.key}</span>
              </label>
              {section.type === 'textarea' ? (
                <textarea
                  value={values[section.key] || ''}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] transition-all resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={values[section.key] || ''}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] transition-all"
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Save */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#2879b1] hover:bg-[#20618e] text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i>
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}