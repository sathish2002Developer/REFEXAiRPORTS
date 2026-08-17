import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';
import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import CmsContactLocationsList, { type CmsContactLocation } from '@/components/feature/CmsContactLocationsList';
import { cmsGetPartner, cmsSavePartner } from '@/lib/api';
import { adminToast } from '@/lib/adminToast';

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
const labelCls = 'block text-sm font-semibold text-slate-700 mb-2';

type PartnerCms = {
  hero: { title: string; subtitle: string; image: string };
  connect: { title: string; highlight: string; subtitle: string; image: string };
  addresses: { title: string; highlight: string; intro: string };
  locations: CmsContactLocation[];
};

const DEFAULT_CMS: PartnerCms = {
  hero: {
    title: 'Partner with Us',
    subtitle:
      'Every great partnership starts with a conversation. Reach out, and let’s explore how we can grow together.',
    image: 'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg',
  },
  connect: {
    title: 'Connect',
    highlight: 'with us',
    subtitle:
      "Your feedback is valuable in helping us enhance your travel experience. Whether you have a question, suggestion, or simply want to share your thoughts, we're here to listen.",
    image: '/images/partner-connect.jpg',
  },
  addresses: {
    title: 'Our',
    highlight: 'Addresses',
    intro: 'Reach us at any of our airport offices. We would love to hear from you.',
  },
  locations: [],
};

function normalize(raw: any): PartnerCms {
  const src = raw && typeof raw === 'object' ? raw : {};
  return {
    hero: {
      title: String(src.hero?.title ?? DEFAULT_CMS.hero.title),
      subtitle: String(src.hero?.subtitle ?? DEFAULT_CMS.hero.subtitle),
      image: String(src.hero?.image ?? DEFAULT_CMS.hero.image),
    },
    connect: {
      title: String(src.connect?.title ?? DEFAULT_CMS.connect.title),
      highlight: String(src.connect?.highlight ?? DEFAULT_CMS.connect.highlight),
      subtitle: String(src.connect?.subtitle ?? DEFAULT_CMS.connect.subtitle),
      image: String(src.connect?.image ?? DEFAULT_CMS.connect.image),
    },
    addresses: {
      title: String(src.addresses?.title ?? DEFAULT_CMS.addresses.title),
      highlight: String(src.addresses?.highlight ?? DEFAULT_CMS.addresses.highlight),
      intro: String(src.addresses?.intro ?? DEFAULT_CMS.addresses.intro),
    },
    locations: Array.isArray(src.locations)
      ? src.locations.map((loc: any) => ({
          name: String(loc?.name || ''),
          subtitle: String(loc?.subtitle || ''),
          phone: String(loc?.phone || ''),
          email: String(loc?.email || ''),
          address: String(loc?.address || ''),
        }))
      : [],
  };
}

const sections = [
  { id: 'hero', title: 'Hero', icon: 'ri-image-line' },
  { id: 'connect', title: 'Connect with us', icon: 'ri-chat-1-line' },
  { id: 'addresses', title: 'Addresses', icon: 'ri-map-pin-line' },
] as const;

export default function AdminPartnerEditorPage() {
  const [draft, setDraft] = useState<PartnerCms>(DEFAULT_CMS);
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]['id']>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    cmsGetPartner()
      .then((data) => {
        if (!cancelled) setDraft(normalize(data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load partner CMS');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dirty = () => {
    setSaved(false);
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const savedPayload = await cmsSavePartner(draft);
      setDraft(normalize(savedPayload));
      setSaved(true);
      adminToast.saved();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
      adminToast.error(err.message || 'Failed to save');
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
            <span className="text-slate-800 font-medium">Partner with Us Editor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/partner-with-us"
              target="_blank"
              className="px-4 py-2.5 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg hover:bg-[#2879b1]/20 transition-colors"
            >
              View Page
            </Link>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2879b1] hover:bg-[#20618e] text-white font-medium rounded-lg cursor-pointer disabled:opacity-50"
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
              <i className="ri-handshake-line text-[#2879b1] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Partner with Us</h1>
              <p className="text-sm text-slate-500 font-mono">/partner-with-us</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeSection === section.id
                  ? 'bg-[#2879b1] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <i className={section.icon}></i>
              {section.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">
              {sections.find((s) => s.id === activeSection)?.title}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {activeSection === 'hero' && (
              <>
                <div>
                  <label className={labelCls}>Title</label>
                  <input
                    className={inputCls}
                    value={draft.hero.title}
                    onChange={(e) => {
                      setDraft((p) => ({ ...p, hero: { ...p.hero, title: e.target.value } }));
                      dirty();
                    }}
                  />
                </div>
                <div>
                  <label className={labelCls}>Subtitle</label>
                  <CmsRichTextField
                    value={draft.hero.subtitle}
                    onChange={(subtitle) => {
                      setDraft((p) => ({ ...p, hero: { ...p.hero, subtitle } }));
                      dirty();
                    }}
                  />
                </div>
                <div>
                  <label className={labelCls}>Banner image</label>
                  <CmsImageField
                    value={draft.hero.image}
                    onChange={(image) => {
                      setDraft((p) => ({ ...p, hero: { ...p.hero, image } }));
                      dirty();
                    }}
                  />
                </div>
              </>
            )}

            {activeSection === 'connect' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Title</label>
                    <input
                      className={inputCls}
                      value={draft.connect.title}
                      onChange={(e) => {
                        setDraft((p) => ({ ...p, connect: { ...p.connect, title: e.target.value } }));
                        dirty();
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Highlight (blue text)</label>
                    <input
                      className={inputCls}
                      value={draft.connect.highlight}
                      onChange={(e) => {
                        setDraft((p) => ({ ...p, connect: { ...p.connect, highlight: e.target.value } }));
                        dirty();
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Intro text</label>
                  <CmsRichTextField
                    value={draft.connect.subtitle}
                    onChange={(subtitle) => {
                      setDraft((p) => ({ ...p, connect: { ...p.connect, subtitle } }));
                      dirty();
                    }}
                  />
                </div>
                <div>
                  <label className={labelCls}>Left image</label>
                  <CmsImageField
                    value={draft.connect.image}
                    onChange={(image) => {
                      setDraft((p) => ({ ...p, connect: { ...p.connect, image } }));
                      dirty();
                    }}
                    fit="contain"
                  />
                </div>
              </>
            )}

            {activeSection === 'addresses' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Title</label>
                    <input
                      className={inputCls}
                      value={draft.addresses.title}
                      onChange={(e) => {
                        setDraft((p) => ({ ...p, addresses: { ...p.addresses, title: e.target.value } }));
                        dirty();
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Highlight (blue text)</label>
                    <input
                      className={inputCls}
                      value={draft.addresses.highlight}
                      onChange={(e) => {
                        setDraft((p) => ({ ...p, addresses: { ...p.addresses, highlight: e.target.value } }));
                        dirty();
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Intro</label>
                  <CmsRichTextField
                    value={draft.addresses.intro}
                    onChange={(intro) => {
                      setDraft((p) => ({ ...p, addresses: { ...p.addresses, intro } }));
                      dirty();
                    }}
                  />
                </div>
                <CmsContactLocationsList
                  locations={draft.locations}
                  onChange={(locations) => {
                    setDraft((p) => ({ ...p, locations }));
                    dirty();
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
