import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';
import { cmsGet, cmsAdminPatch } from '@/lib/api';
import { flattenAbout, applyAboutFields } from '@/lib/cmsAbout';
import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import {
  CmsStringList,
  CmsValuesList,
  CmsFocusCardsList,
  CmsKeyAreasList,
  CmsPeopleList,
  CmsImageUrlList,
  type CmsAboutValue,
  type CmsFocusCard,
  type CmsKeyArea,
  type CmsPerson,
} from './AboutRepeatableFields';
import { adminToast } from '@/lib/adminToast';

interface SectionField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'richtext';
  value: string;
}

interface ContentSection {
  id: string;
  title: string;
  icon: string;
  fields: SectionField[];
}

const aboutSections: ContentSection[] = [
  {
    id: 'banner',
    title: 'Who We Are Banner',
    icon: 'ri-image-line',
    fields: [
      { key: 'banner_title', label: 'Banner Title', type: 'text', value: 'Who We Are' },
      { key: 'banner_subtitle', label: 'Banner Subtitle', type: 'richtext', value: 'We create memorable journeys through thoughtfully curated culinary experiences for travellers every day.' },
      { key: 'banner_img', label: 'Banner Image', type: 'image', value: '' },
    ],
  },
  {
    id: 'hero',
    title: 'Hero Section',
    icon: 'ri-text',
    fields: [{ key: 'hero_title', label: 'Page Title', type: 'text', value: 'About us' }],
  },
  {
    id: 'intro',
    title: 'Introduction',
    icon: 'ri-information-line',
    fields: [
      { key: 'intro_title', label: 'Title', type: 'text', value: 'Refex Airport & Transportation' },
      { key: 'intro_img', label: 'Image', type: 'image', value: 'https://refexairports.com/wp-content/uploads/2023/09/About-Airport.png' },
      { key: 'intro_para1', label: 'Paragraph 1', type: 'richtext', value: 'Refex Airports and Transportation is a commercial and transport platform created to be a best-in-class developer and operator of airports and allied transportation services infrastructure' },
      { key: 'intro_para2', label: 'Paragraph 2', type: 'richtext', value: 'Join our journey as we redefine the landscape of global transit…' },
    ],
  },
  {
    id: 'vision_mission',
    title: 'Vision, Mission & Values',
    icon: 'ri-eye-line',
    fields: [
      { key: 'vm_vision_title', label: 'Vision — Title', type: 'text', value: 'Our Vision' },
      { key: 'vm_mission_title', label: 'Mission — Title', type: 'text', value: 'Our Mission' },
      { key: 'vm_values_title', label: 'Values — Title', type: 'text', value: 'Our Values' },
    ],
  },
  {
    id: 'focus_area',
    title: 'Commercial as a Service',
    icon: 'ri-flow-chart',
    fields: [
      { key: 'fa_intro', label: 'Intro Paragraph', type: 'richtext', value: 'At Refex Airports & Transportation, we offer Commercial as a Service (CaaS) - integrating prime retail spaces, comprehensive operational services, and advanced analytics to deliver high-performance retail environments at airports and other transit hubs.' },
    ],
  },
  {
    id: 'three_pillars',
    title: 'Three Pillars',
    icon: 'ri-service-line',
    fields: [
      { key: 'tp_title', label: 'Section Title', type: 'text', value: 'Our Three Pillars' },
      { key: 'tp_subtitle', label: 'Section Subtitle', type: 'richtext', value: 'Transforming airport experiences through strategic excellence' },
      { key: 'tp_retail_title', label: 'Retail Experience — Title', type: 'text', value: 'Retail Experience' },
      { key: 'tp_retail_img', label: 'Retail Experience — Image', type: 'image', value: '' },
      { key: 'tp_retail_para1', label: 'Retail Experience — Paragraph 1', type: 'richtext', value: 'Refex curates and manages premium retail experiences within airports, bringing together global and homegrown brands to enhance passenger satisfaction and non-aero revenue.' },
      { key: 'tp_retail_para2', label: 'Retail Experience — Paragraph 2', type: 'richtext', value: 'Our focus is on creating vibrant, consumer-centric spaces that transform airports into lifestyle destinations.' },
      { key: 'tp_comm_title', label: 'Commercial as a Service — Title', type: 'text', value: 'Commercial as a Service' },
      { key: 'tp_comm_img', label: 'Commercial — Image', type: 'image', value: '' },
      { key: 'tp_comm_para1', label: 'Commercial — Paragraph 1', type: 'richtext', value: 'Refex offers end-to-end commercial management solutions for airport operators from space planning and tenant mix optimization to revenue management and operational efficiency.' },
      { key: 'tp_comm_para2', label: 'Commercial — Paragraph 2', type: 'richtext', value: 'We aim to build sustainable, value-driven partnerships that maximize commercial potential while enriching traveler experiences.' },
    ],
  },
  {
    id: 'our_focus',
    title: 'Key Focus Areas',
    icon: 'ri-focus-3-line',
    fields: [{ key: 'of_key_title', label: 'Section Title', type: 'text', value: 'Our Key Focus Areas' }],
  },
  {
    id: 'leadership_hero',
    title: 'Leadership Page Hero',
    icon: 'ri-image-line',
    fields: [
      { key: 'lt_hero_title', label: 'Hero Title', type: 'text', value: 'Leadership Team' },
      {
        key: 'lt_hero_subtitle',
        label: 'Hero Subtitle',
        type: 'richtext',
        value: 'Conceptualized and created by two industry leaders guiding our vision with decades of expertise.',
      },
      {
        key: 'lt_hero_img',
        label: 'Hero Image',
        type: 'image',
        value:
          'https://readdy.ai/api/search-image?query=Professional%20corporate%20team%20meeting%20in%20modern%20glass%20office%20with%20city%20skyline%20view%2C%20diverse%20business%20leaders%20collaborating%20around%20conference%20table%2C%20warm%20natural%20lighting%2C%20executive%20boardroom%20atmosphere%2C%20leadership%20and%20teamwork%20concept%2C%20editorial%20photography%20style%2C%20clean%20contemporary%20interior&width=1600&height=500&seq=leadership-hero-banner&orientation=landscape',
      },
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership Team',
    icon: 'ri-team-line',
    fields: [
      { key: 'lt_founders_title', label: 'Founders — Section Title', type: 'text', value: 'Founders and Board Members' },
      { key: 'lt_mgmt_title', label: 'Management — Section Title', type: 'text', value: 'Management' },
    ],
  },
  {
    id: 'refex_group',
    title: 'Refex Group Banner',
    icon: 'ri-building-2-line',
    fields: [
      { key: 'rg_logo_img', label: 'Logo Image', type: 'image', value: 'https://refexairports.com/wp-content/uploads/2023/08/REFEX-Logo@2x-8-1.png' },
      { key: 'rg_title', label: 'Title', type: 'text', value: 'Refex Group, the parent company of Refex Airports and Transportation' },
      { key: 'rg_subtitle', label: 'Subtitle', type: 'richtext', value: 'A leading conglomerate that has diversified into various industries over the past two decades.' },
      { key: 'rg_desc', label: 'Description', type: 'richtext', value: "Refex Group is a 23-year-old diversified Indian conglomerate with a strong presence across multiple sectors." },
      { key: 'rg_btn_text', label: 'Button Text', type: 'text', value: 'More about Refex Group' },
      { key: 'rg_btn_link', label: 'Button Link', type: 'text', value: 'http://www.refex.group' },
    ],
  },
  {
    id: 'backed_by',
    title: 'Backed By',
    icon: 'ri-shield-star-line',
    fields: [
      { key: 'bb_title_before', label: 'Title before highlight', type: 'text', value: 'Backed by' },
      { key: 'bb_title_emphasis', label: 'Title highlight', type: 'text', value: 'Refex Group' },
      { key: 'bb_logo', label: 'Logo', type: 'image', value: 'https://refexairports.com/wp-content/uploads/2023/08/REFEX-Logo@2x-8-1.png' },
      { key: 'bb_label', label: 'Logo label', type: 'text', value: 'Refex Group' },
      { key: 'bb_link', label: 'Link (opens refexgroup.com)', type: 'text', value: 'https://refexgroup.com/' },
      { key: 'bb_desc', label: 'Description', type: 'richtext', value: "Refex Group is a 23-year old diversified Indian conglomerate with deep expertise across energy, mobility, healthcare, and infrastructure sectors. Over the past two decades, the Group has grown into one of India's fastest-evolving business groups, championing innovation and sustainability across its operations." },
    ],
  },
];

function asStrings(list: unknown): string[] {
  return Array.isArray(list) ? list.map((v) => String(v ?? '')) : [];
}

function asValues(list: unknown): CmsAboutValue[] {
  if (!Array.isArray(list)) return [];
  return list.map((v: any) => ({ letter: String(v?.letter || ''), name: String(v?.name || ''), desc: String(v?.desc || '') }));
}

function asFocusCards(list: unknown): CmsFocusCard[] {
  if (!Array.isArray(list)) return [];
  return list.map((c: any) => ({ title: String(c?.title || ''), items: asStrings(c?.items) }));
}

function asKeys(list: unknown): CmsKeyArea[] {
  if (!Array.isArray(list)) return [];
  return list.map((k: any) => ({
    title: String(k?.title || ''),
    description: String(k?.description || ''),
    icon: String(k?.icon || 'ri-focus-3-line'),
    color: String(k?.color || 'from-[#2879b1] to-[#1a5a8a]'),
  }));
}

function asPeople(list: unknown): CmsPerson[] {
  if (!Array.isArray(list)) return [];
  return list.map((m: any) => ({
    name: String(m?.name || ''),
    position: String(m?.position || ''),
    image: String(m?.image || ''),
    bio: String(m?.bio || ''),
  }));
}

export default function AdminAboutEditorPage() {
  const [activeSection, setActiveSection] = useState('banner');
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    aboutSections.forEach((section) => {
      section.fields.forEach((field) => {
        initial[field.key] = field.value;
      });
    });
    return initial;
  });
  const [visionItems, setVisionItems] = useState<string[]>([]);
  const [missionItems, setMissionItems] = useState<string[]>([]);
  const [valuesList, setValuesList] = useState<CmsAboutValue[]>([]);
  const [focusCards, setFocusCards] = useState<CmsFocusCard[]>([]);
  const [keys, setKeys] = useState<CmsKeyArea[]>([]);
  const [founders, setFounders] = useState<CmsPerson[]>([]);
  const [management, setManagement] = useState<CmsPerson[]>([]);
  const [slides, setSlides] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const applyCms = (cms: Record<string, any>) => {
    setPayload(cms);
    setValues((prev) => ({ ...prev, ...flattenAbout(cms) }));
    setVisionItems(asStrings(cms.visionMission?.visionItems));
    setMissionItems(asStrings(cms.visionMission?.missionItems));
    setValuesList(asValues(cms.visionMission?.values));
    setFocusCards(asFocusCards(cms.focusArea?.cards));
    setKeys(asKeys(cms.ourFocus?.keys));
    setFounders(asPeople(cms.leadership?.founders));
    setManagement(asPeople(cms.leadership?.management));
    setSlides(asStrings(cms.refexGroup?.slides));
  };

  useEffect(() => {
    let cancelled = false;
    cmsGet<Record<string, any>>('about')
      .then((data) => {
        if (cancelled) return;
        const { updated_at: _updated, ...cms } = data;
        applyCms(cms);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load about CMS');
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

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    dirty();
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const next = applyAboutFields(
        {
          ...payload,
          visionMission: { ...(payload.visionMission || {}), visionItems, missionItems, values: valuesList },
          focusArea: { ...(payload.focusArea || {}), cards: focusCards },
          ourFocus: { ...(payload.ourFocus || {}), keys },
          leadership: { ...(payload.leadership || {}), founders, management },
          refexGroup: { ...(payload.refexGroup || {}), slides },
        },
        values
      );
      const savedPayload = await cmsAdminPatch<Record<string, any>>('about', next);
      const { updated_at: _updated, ...cms } = savedPayload;
      applyCms(cms);
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

  const activeFields = aboutSections.find((s) => s.id === activeSection)?.fields || [];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/pages" className="hover:text-[#2879b1] transition-colors">Pages</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-800 font-medium">About Us Page Editor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={activeSection.startsWith('leadership') ? '/leadership' : '/about'}
              target="_blank"
              className="px-4 py-2.5 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg hover:bg-[#2879b1]/20 transition-colors"
            >
              View Page
            </Link>
            {error && <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium"><i className="ri-error-warning-line"></i>{error}</span>}
            {loading && <span className="text-sm text-slate-500">Loading CMS...</span>}
            {saved && <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium"><i className="ri-check-line"></i>Saved</span>}
            <button onClick={handleSave} disabled={saving || loading} className="flex items-center gap-2 px-5 py-2.5 bg-[#2879b1] hover:bg-[#20618e] text-white font-medium rounded-lg cursor-pointer disabled:opacity-50">
              {saving ? <><i className="ri-loader-4-line animate-spin"></i>Saving...</> : <><i className="ri-save-line"></i>Save Changes</>}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2879b1]/10 rounded-xl flex items-center justify-center">
              <i className="ri-information-line text-[#2879b1] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">About Us & Leadership</h1>
              <p className="text-sm text-slate-500">/about and /leadership</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {aboutSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeSection === section.id ? 'bg-[#2879b1] text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <i className={section.icon}></i>
              {section.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <i className={aboutSections.find((s) => s.id === activeSection)?.icon}></i>
              {aboutSections.find((s) => s.id === activeSection)?.title}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {activeFields.map((field) => (
              <div key={field.key} className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                  <span className="text-xs font-mono text-slate-400">{field.key}</span>
                </div>
                {field.type === 'richtext' ? (
                  <CmsRichTextField value={values[field.key] || ''} onChange={(next) => handleChange(field.key, next)} />
                ) : field.type === 'textarea' ? (
                  <textarea value={values[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] resize-none" />
                ) : field.type === 'image' ? (
                  <CmsImageField value={values[field.key] || ''} onChange={(next) => handleChange(field.key, next)} />
                ) : (
                  <input type="text" value={values[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]" />
                )}
              </div>
            ))}

            {activeSection === 'vision_mission' && (
              <div className="space-y-6">
                <CmsStringList title="Vision points" addLabel="Add point" items={visionItems} onChange={(next) => { setVisionItems(next); dirty(); }} />
                <CmsStringList title="Mission points" addLabel="Add point" items={missionItems} onChange={(next) => { setMissionItems(next); dirty(); }} />
                <CmsValuesList values={valuesList} onChange={(next) => { setValuesList(next); dirty(); }} />
              </div>
            )}
            {activeSection === 'focus_area' && (
              <CmsFocusCardsList cards={focusCards} onChange={(next) => { setFocusCards(next); dirty(); }} />
            )}
            {activeSection === 'our_focus' && (
              <CmsKeyAreasList keys={keys} onChange={(next) => { setKeys(next); dirty(); }} />
            )}
            {activeSection === 'leadership' && (
              <div className="space-y-8">
                <CmsPeopleList title="Founders and Board Members" addLabel="Add founder" people={founders} onChange={(next) => { setFounders(next); dirty(); }} />
                <CmsPeopleList title="Management" addLabel="Add member" people={management} onChange={(next) => { setManagement(next); dirty(); }} />
              </div>
            )}
            {activeSection === 'refex_group' && (
              <CmsImageUrlList title="Background slides" images={slides} onChange={(next) => { setSlides(next); dirty(); }} />
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={handleSave} disabled={saving || loading} className="flex items-center gap-2 px-6 py-3 bg-[#2879b1] hover:bg-[#20618e] text-white font-semibold rounded-lg cursor-pointer disabled:opacity-50">
            {saving ? <><i className="ri-loader-4-line animate-spin"></i>Saving...</> : <><i className="ri-save-line"></i>Save All Changes</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
