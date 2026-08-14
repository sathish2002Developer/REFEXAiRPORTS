import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';
import CmsImageField from '@/components/feature/CmsImageField';
import NavbarMenuFields from './NavbarMenuFields';
import { cmsGet, cmsAdminPatch } from '@/lib/api';
import { DEFAULT_NAVBAR, normalizeNavbar, type NavbarCms } from '@/lib/cmsNavbar';

export default function AdminNavbarEditorPage() {
  const [navbar, setNavbar] = useState<NavbarCms>(DEFAULT_NAVBAR);
  const [footer, setFooter] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    cmsGet<{ navbar?: unknown; footer?: Record<string, any> }>('site-chrome')
      .then((data) => {
        if (cancelled) return;
        setNavbar(normalizeNavbar(data?.navbar));
        setFooter(data?.footer && typeof data.footer === 'object' ? data.footer : {});
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load navbar CMS');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const markDirty = () => {
    setSaved(false);
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const savedPayload = await cmsAdminPatch<{ navbar?: unknown; footer?: Record<string, any> }>(
        'site-chrome',
        { navbar, footer }
      );
      setNavbar(normalizeNavbar(savedPayload?.navbar));
      if (savedPayload?.footer) setFooter(savedPayload.footer);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/pages" className="hover:text-[#2879b1] transition-colors">
              Pages
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-800 font-medium">Navbar Editor</span>
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                <i className="ri-error-warning-line"></i>
                {error}
              </span>
            )}
            {loading && <span className="text-sm text-slate-500">Loading CMS...</span>}
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                <i className="ri-check-line"></i>
                Saved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || loading}
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

        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2879b1]/10 rounded-xl flex items-center justify-center">
              <i className="ri-menu-line text-[#2879b1] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Navbar</h1>
              <p className="text-sm text-slate-500">Change menu names and types. The website header updates after save.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Logo</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Logo image</label>
              <CmsImageField
                value={navbar.logo_url}
                onChange={(logo_url) => {
                  setNavbar((p) => ({ ...p, logo_url }));
                  markDirty();
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Logo alt text</label>
              <input
                type="text"
                value={navbar.logo_alt}
                onChange={(e) => {
                  setNavbar((p) => ({ ...p, logo_alt: e.target.value }));
                  markDirty();
                }}
                className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Menus</h2>
          </div>
          <div className="p-6">
            <NavbarMenuFields
              items={navbar.nav_links}
              onChange={(nav_links) => {
                setNavbar((p) => ({ ...p, nav_links }));
                markDirty();
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || loading}
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
