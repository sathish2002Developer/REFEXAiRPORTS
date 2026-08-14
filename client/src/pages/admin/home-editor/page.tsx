import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/feature/AdminLayout';
import { cmsGet, cmsAdminPatch } from '@/lib/api';
import { flattenHome, applyHomeFields } from '@/lib/cmsHome';
import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import CmsBrandPartnersList, { type CmsBrandPartner } from '@/components/feature/CmsBrandPartnersList';
import CmsStoriesList, { type CmsStoryItem } from '@/components/feature/CmsStoriesList';

interface SectionField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'image' | 'richtext';
  value: string;
}

interface ContentSection {
  id: string;
  title: string;
  icon: string;
  fields: SectionField[];
}

const homeSections: ContentSection[] = [
  {
    id: 'hero',
    title: 'Hero Section',
    icon: 'ri-movie-line',
    fields: [
      { key: 'hero_line1', label: 'Line 1', type: 'text', value: 'Where World-Class' },
      { key: 'hero_line2', label: 'Line 2', type: 'text', value: 'Retail' },
      { key: 'hero_line3', label: 'Line 3', type: 'text', value: 'Meets Global' },
      { key: 'hero_line4', label: 'Line 4', type: 'text', value: 'Travellers...' },
      { key: 'hero_video', label: 'Background Video URL', type: 'text', value: 'https://refexairports.com/wp-content/uploads/2023/08/Hero-BG-Video.mp4' },
    ],
  },
  {
    id: 'stats',
    title: 'Stats Section',
    icon: 'ri-bar-chart-box-line',
    fields: [
      { key: 'stats_title', label: 'Section Title', type: 'text', value: 'Our Impact in Numbers' },
      { key: 'stat1_count', label: 'Stat 1 — Count', type: 'text', value: '2' },
      { key: 'stat1_label', label: 'Stat 1 — Label', type: 'text', value: 'Airports with Active Retail Zones' },
      { key: 'stat1_img', label: 'Stat 1 — Image URL', type: 'image', value: '' },
      { key: 'stat2_count', label: 'Stat 2 — Count', type: 'text', value: '15M+' },
      { key: 'stat2_label', label: 'Stat 2 — Label', type: 'text', value: 'Annual Passengers in Addressable Zones' },
      { key: 'stat2_img', label: 'Stat 2 — Image URL', type: 'image', value: '' },
      { key: 'stat3_count', label: 'Stat 3 — Count', type: 'text', value: '70+' },
      { key: 'stat3_label', label: 'Stat 3 — Label', type: 'text', value: 'Retail Outlets Supported' },
      { key: 'stat3_img', label: 'Stat 3 — Image URL', type: 'image', value: '' },
      { key: 'stat4_count', label: 'Stat 4 — Count', type: 'text', value: '50+' },
      { key: 'stat4_label', label: 'Stat 4 — Label', type: 'text', value: 'Brand Partnerships Across Terminals' },
      { key: 'stat4_img', label: 'Stat 4 — Image URL', type: 'image', value: '' },
      { key: 'stat5_count', label: 'Stat 5 — Count', type: 'text', value: '15K+' },
      { key: 'stat5_label', label: 'Stat 5 — Label', type: 'text', value: 'sq. ft. of Retail Space Curated' },
      { key: 'stat5_img', label: 'Stat 5 — Image URL', type: 'image', value: '' },
    ],
  },
  {
    id: 'who_we_are',
    title: 'Who We Are',
    icon: 'ri-building-line',
    fields: [
      { key: 'wwa_title', label: 'Section Title', type: 'text', value: 'Who We Are' },
      { key: 'wwa_desc', label: 'Description', type: 'richtext', value: 'Refex Airports and Transportation is transport and commercial platform created to be a best-in-class developer and operator of airports and allied transportation services infrastructure. Having successfully managed retail master concessions at Pune and Srinagar airports, RATPL has introduced premium global brands and services that add value and vibrancy to airport spaces. Building on this foundation, the company is expanding its presence across bus terminals, metro rail, heliports, railways, and wayside amenities developing integrated mobility and commercial hubs that connect people, places, and possibilities.' },
      { key: 'wwa_btn', label: 'Button Text', type: 'text', value: 'Know more' },
      { key: 'wwa_img1', label: 'Image 1', type: 'image', value: 'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg' },
      { key: 'wwa_img2', label: 'Image 2', type: 'image', value: 'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-2.jpg' },
    ],
  },
  {
    id: 'traveler',
    title: 'Traveler Experiences',
    icon: 'ri-plane-line',
    fields: [
      { key: 'te_title_line1', label: 'Title line 1', type: 'text', value: 'Creating Unparalleled' },
      { key: 'te_title_line2', label: 'Title line 2', type: 'text', value: 'Experiences' },
      { key: 'te_highlight', label: 'Highlight text', type: 'text', value: 'For Travellers' },
      { key: 'te1_title', label: 'Card 1 — Title', type: 'text', value: 'Travel QSR' },
      { key: 'te1_desc', label: 'Card 1 — Description', type: 'richtext', value: '' },
      { key: 'te1_img', label: 'Card 1 — Image URL', type: 'image', value: '' },
      { key: 'te2_title', label: 'Card 2 — Title', type: 'text', value: 'Lounges' },
      { key: 'te2_desc', label: 'Card 2 — Description', type: 'richtext', value: '' },
      { key: 'te2_img', label: 'Card 2 — Image URL', type: 'image', value: '' },
    ],
  },
  {
    id: 'brands',
    title: 'Brand Partners',
    icon: 'ri-shopping-bag-line',
    fields: [
      { key: 'brands_title', label: 'Section Title', type: 'text', value: 'Brand Partners' },
      { key: 'brands_subtitle', label: 'Subtitle', type: 'richtext', value: 'A portfolio of 50+ brands, united by a single vision' },
    ],
  },
  {
    id: 'gptw',
    title: 'Great Place To Work',
    icon: 'ri-award-line',
    fields: [
      { key: 'gptw_img', label: 'Banner Image URL', type: 'image', value: '' },
      { key: 'gptw_alt', label: 'Image alt text', type: 'text', value: '' },
    ],
  },
  {
    id: 'footprints',
    title: 'Our Footprints',
    icon: 'ri-map-pin-line',
    fields: [
      { key: 'fp_title', label: 'Section Title', type: 'text', value: 'OUR FOOTPRINTS' },
      { key: 'fp_subtitle', label: 'Subtitle', type: 'richtext', value: 'Strategically located across India, connecting travelers to every corner of the nation' },
      { key: 'fp_map_img', label: 'Map Image', type: 'image', value: 'https://static.readdy.ai/image/d0ead66ce635a168f1e83b108be94826/9e38438ecd659e48d4db0d6e0894b904.png' },
      { key: 'fp_airport1_name', label: 'Airport 1 — Name', type: 'text', value: 'Pune Airport' },
      { key: 'fp_airport1_desc', label: 'Airport 1 — Description', type: 'richtext', value: "Pune Airport is one of India's busiest and fastest-growing airports, serving as a key gateway for both business and leisure travelers. Located in the heart of Maharashtra's industrial and cultural hub, the airport reflects the city's progressive spirit and modern outlook." },
      { key: 'fp_airport1_stat1', label: 'Airport 1 — Stat 1', type: 'text', value: '8.5M+ Annual Passengers' },
      { key: 'fp_airport1_stat2', label: 'Airport 1 — Stat 2', type: 'text', value: '25+ Brand Partners' },
      { key: 'fp_airport1_stat3', label: 'Airport 1 — Stat 3', type: 'text', value: '45,000 sq ft Retail Space' },
      { key: 'fp_airport1_link', label: 'Airport 1 — Link', type: 'text', value: '/pune-airport-assets' },
      { key: 'fp_airport1_top', label: 'Airport 1 — Marker top %', type: 'text', value: '58%' },
      { key: 'fp_airport1_left', label: 'Airport 1 — Marker left %', type: 'text', value: '28%' },
      { key: 'fp_airport2_name', label: 'Airport 2 — Name', type: 'text', value: 'Srinagar Airport' },
      { key: 'fp_airport2_desc', label: 'Airport 2 — Description', type: 'richtext', value: 'Srinagar Airport serves as the primary gateway to the beautiful Kashmir Valley, welcoming tourists and business travelers from across the globe. The airport combines modern facilities with warm hospitality, reflecting the rich cultural heritage of the region.' },
      { key: 'fp_airport2_stat1', label: 'Airport 2 — Stat 1', type: 'text', value: '6.5M+ Annual Passengers' },
      { key: 'fp_airport2_stat2', label: 'Airport 2 — Stat 2', type: 'text', value: '20+ Brand Partners' },
      { key: 'fp_airport2_stat3', label: 'Airport 2 — Stat 3', type: 'text', value: '35,000 sq ft Retail Space' },
      { key: 'fp_airport2_link', label: 'Airport 2 — Link', type: 'text', value: '/srinagar-airport' },
      { key: 'fp_airport2_top', label: 'Airport 2 — Marker top %', type: 'text', value: '18%' },
      { key: 'fp_airport2_left', label: 'Airport 2 — Marker left %', type: 'text', value: '30%' },
      { key: 'fp_airport3_name', label: 'Airport 3 — Name', type: 'text', value: 'Aurangabad Airport' },
      { key: 'fp_airport3_link', label: 'Airport 3 — Link', type: 'text', value: '/aurangabad-airport' },
      { key: 'fp_airport3_top', label: 'Airport 3 — Marker top %', type: 'text', value: '53%' },
      { key: 'fp_airport3_left', label: 'Airport 3 — Marker left %', type: 'text', value: '33%' },
      { key: 'fp_airport4_name', label: 'Airport 4 — Name', type: 'text', value: 'Shirdi Airport' },
      { key: 'fp_airport4_link', label: 'Airport 4 — Link', type: 'text', value: '/shirdi-airport' },
      { key: 'fp_airport4_top', label: 'Airport 4 — Marker top %', type: 'text', value: '50%' },
      { key: 'fp_airport4_left', label: 'Airport 4 — Marker left %', type: 'text', value: '30%' },
      { key: 'fp_airport5_name', label: 'Airport 5 — Name', type: 'text', value: 'Trichy Airport' },
      { key: 'fp_airport5_link', label: 'Airport 5 — Link', type: 'text', value: '/trichy-airport' },
      { key: 'fp_airport5_top', label: 'Airport 5 — Marker top %', type: 'text', value: '78%' },
      { key: 'fp_airport5_left', label: 'Airport 5 — Marker left %', type: 'text', value: '48%' },
    ],
  },
  {
    id: 'stories',
    title: 'Stories from our Terminals',
    icon: 'ri-book-open-line',
    fields: [
      { key: 'stories_title', label: 'Section Title', type: 'text', value: 'Stories from our Terminals' },
      { key: 'stories_subtitle', label: 'Section Subtitle', type: 'richtext', value: 'Discover the latest updates, campaigns, and milestones from our airport operations across India' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Section',
    icon: 'ri-contacts-line',
    fields: [
      { key: 'contact_title', label: 'Section Title', type: 'text', value: 'Contact us' },
      { key: 'contact_subtitle', label: 'Subtitle', type: 'richtext', value: 'Your journey to retail excellence begins here. Drop us a message and we\'ll guide the way.' },
      { key: 'contact_form_title', label: 'Form Title', type: 'text', value: "Let's Elevate Your Retail Business Together" },
      { key: 'pune_name', label: 'Pune — Name', type: 'text', value: 'Pune International Airport (PNQ)' },
      { key: 'pune_subtitle', label: 'Pune — Subtitle', type: 'text', value: 'Lohegaon, Pune, Maharashtra' },
      { key: 'pune_phone', label: 'Pune — Phone', type: 'text', value: '+91 95388 82531' },
      { key: 'pune_email', label: 'Pune — Email', type: 'text', value: 'debamita.n@refex.co.in' },
      { key: 'pune_address', label: 'Pune — Address', type: 'textarea', value: 'Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.' },
      { key: 'srinagar_name', label: 'Srinagar — Name', type: 'text', value: 'Srinagar International Airport (SXR)' },
      { key: 'srinagar_subtitle', label: 'Srinagar — Subtitle', type: 'text', value: 'Humhama, Srinagar, Jammu & Kashmir' },
      { key: 'srinagar_phone', label: 'Srinagar — Phone', type: 'text', value: '+91 91497 68998' },
      { key: 'srinagar_email', label: 'Srinagar — Email', type: 'text', value: 'showkatahmad.m@refex.co.in' },
      { key: 'srinagar_address', label: 'Srinagar — Address', type: 'textarea', value: 'Srinagar International Airport, Ground floor, Humhama-Srinagar 190007' },
      { key: 'trichy_name', label: 'Trichy — Name', type: 'text', value: 'Tiruchirappalli International Airport (TRZ)' },
      { key: 'trichy_subtitle', label: 'Trichy — Subtitle', type: 'text', value: 'Tiruchirappalli, Tamil Nadu' },
      { key: 'trichy_phone', label: 'Trichy — Phone', type: 'text', value: '+91 95388 82531' },
      { key: 'trichy_email', label: 'Trichy — Email', type: 'text', value: 'debamita.n@refex.co.in' },
      { key: 'trichy_address', label: 'Trichy — Address', type: 'textarea', value: 'Tiruchirappalli International Airport, Trichy - 620007, Tamil Nadu.' },
      { key: 'aurangabad_name', label: 'Aurangabad — Name', type: 'text', value: 'Aurangabad Airport (IXU)' },
      { key: 'aurangabad_subtitle', label: 'Aurangabad — Subtitle', type: 'text', value: 'Chikalthana, Aurangabad, Maharashtra' },
      { key: 'aurangabad_phone', label: 'Aurangabad — Phone', type: 'text', value: '+91 95388 82531' },
      { key: 'aurangabad_email', label: 'Aurangabad — Email', type: 'text', value: 'debamita.n@refex.co.in' },
      { key: 'aurangabad_address', label: 'Aurangabad — Address', type: 'textarea', value: 'Aurangabad Airport, Chikalthana, Aurangabad - 431007, Maharashtra.' },
      { key: 'shirdi_name', label: 'Shirdi — Name', type: 'text', value: 'Shirdi International Airport (SAG)' },
      { key: 'shirdi_subtitle', label: 'Shirdi — Subtitle', type: 'text', value: 'Kakadi, Shirdi, Maharashtra' },
      { key: 'shirdi_phone', label: 'Shirdi — Phone', type: 'text', value: '+91 95388 82531' },
      { key: 'shirdi_email', label: 'Shirdi — Email', type: 'text', value: 'debamita.n@refex.co.in' },
      { key: 'shirdi_address', label: 'Shirdi — Address', type: 'textarea', value: 'Shirdi International Airport, Kakadi, Shirdi - 423109, Maharashtra.' },
    ],
  },
];

function normalizeBrands(list: unknown): CmsBrandPartner[] {
  if (!Array.isArray(list)) return [];
  return list.map((item: any) => ({
    name: String(item?.name || ''),
    image: String(item?.image || ''),
    url: String(item?.url || ''),
  }));
}

function normalizeStories(list: unknown): CmsStoryItem[] {
  if (!Array.isArray(list)) return [];
  return list.map((item: any) => ({
    tag: String(item?.tag || ''),
    title: String(item?.title || ''),
    description: String(item?.description || ''),
    image: String(item?.image || ''),
  }));
}

export default function AdminHomeEditorPage() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [brands, setBrands] = useState<CmsBrandPartner[]>([]);
  const [stories, setStories] = useState<CmsStoryItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    homeSections.forEach((section) => {
      section.fields.forEach((field) => {
        initial[field.key] = field.value;
      });
    });
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    cmsGet<Record<string, any>>('home')
      .then((data) => {
        if (cancelled) return;
        const { updated_at: _updated, ...cms } = data;
        setPayload(cms);
        setValues((prev) => ({ ...prev, ...flattenHome(cms) }));
        setBrands(normalizeBrands(cms.brandPartners?.brands));
        setStories(normalizeStories(cms.stories?.items));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load home CMS');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setError('');
  };

  const handleBrandsChange = (next: CmsBrandPartner[]) => {
    setBrands(next);
    setSaved(false);
    setError('');
  };

  const handleStoriesChange = (next: CmsStoryItem[]) => {
    setStories(next);
    setSaved(false);
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const next = applyHomeFields(
        {
          ...payload,
          brandPartners: { ...(payload.brandPartners || {}), brands },
          stories: { ...(payload.stories || {}), items: stories },
        },
        values
      );
      const savedPayload = await cmsAdminPatch<Record<string, any>>('home', next);
      const { updated_at: _updated, ...cms } = savedPayload;
      setPayload(cms);
      setValues((prev) => ({ ...prev, ...flattenHome(cms) }));
      setBrands(normalizeBrands(cms.brandPartners?.brands));
      setStories(normalizeStories(cms.stories?.items));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const activeFields = homeSections.find((s) => s.id === activeSection)?.fields || [];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/pages" className="hover:text-[#2879b1] transition-colors">
              Pages
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-800 font-medium">Home Page Editor</span>
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                <i className="ri-error-warning-line"></i>
                {error}
              </span>
            )}
            {loading && (
              <span className="text-sm text-slate-500">Loading CMS...</span>
            )}
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

        {/* Page Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2879b1]/10 rounded-xl flex items-center justify-center">
              <i className="ri-home-4-line text-[#2879b1] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Home Page</h1>
              <p className="text-sm text-slate-500 font-mono">/</p>
            </div>
            <span className="ml-auto text-sm text-slate-400">
              {homeSections.reduce((acc, s) => acc + s.fields.length, 0)} editable fields across {homeSections.length} sections
            </span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {homeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeSection === section.id
                  ? 'bg-[#2879b1] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <i className={section.icon}></i>
              {section.title}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeSection === section.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
              {section.id === 'brands'
                ? brands.length + section.fields.length
                : section.id === 'stories'
                  ? stories.length + section.fields.length
                  : section.fields.length}
              </span>
            </button>
          ))}
        </div>

        {/* Active Section Editor */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <i className={homeSections.find((s) => s.id === activeSection)?.icon || 'ri-file-text-line'}></i>
              {homeSections.find((s) => s.id === activeSection)?.title}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {activeFields.map((field) => (
              <div
                key={field.key}
                className="border border-slate-100 rounded-lg p-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    {field.label}
                  </label>
                  <span className="text-xs font-mono text-slate-400">{field.key}</span>
                </div>
                {field.type === 'richtext' ? (
                  <CmsRichTextField
                    value={values[field.key] || ''}
                    onChange={(next) => handleChange(field.key, next)}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={values[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] transition-all resize-none"
                  />
                ) : field.type === 'image' ? (
                  <CmsImageField
                    value={values[field.key] || ''}
                    onChange={(next) => handleChange(field.key, next)}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1] transition-all"
                  />
                )}
              </div>
            ))}
            {activeSection === 'brands' && (
              <div className="border border-slate-100 rounded-lg p-4">
                <CmsBrandPartnersList brands={brands} onChange={handleBrandsChange} />
              </div>
            )}
            {activeSection === 'stories' && (
              <div className="border border-slate-100 rounded-lg p-4">
                <CmsStoriesList stories={stories} onChange={handleStoriesChange} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Save */}
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