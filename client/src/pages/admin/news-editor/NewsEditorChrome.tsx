import { Link } from 'react-router-dom';

type SectionId = 'header' | 'news' | 'stories' | 'highlights' | 'social';

const sections: { id: SectionId; title: string; icon: string }[] = [
  { id: 'header', title: 'Page Header', icon: 'ri-layout-top-line' },
  { id: 'news', title: 'News Articles', icon: 'ri-newspaper-line' },
  { id: 'stories', title: 'Stories', icon: 'ri-book-open-line' },
  { id: 'highlights', title: 'Highlights', icon: 'ri-star-line' },
  { id: 'social', title: 'LinkedIn & Instagram', icon: 'ri-share-line' },
];

export default function NewsEditorChrome({
  saving,
  saved,
  loading,
  error,
  handleSave,
  activeSection,
  setActiveSection,
  children,
}: any) {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/admin/pages" className="hover:text-[#2879b1]">Pages</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-slate-800 font-medium">News & Updates Editor</span>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-sm text-red-600">{error}</span>}
          {loading && <span className="text-sm text-slate-500">Loading CMS...</span>}
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-5 py-2.5 bg-[#2879b1] text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <h1 className="text-xl font-bold text-slate-900">News & Updates</h1>
        <p className="text-sm text-slate-500 font-mono">/news</p>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
              activeSection === s.id ? 'bg-[#2879b1] text-white' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            <i className={s.icon}></i>
            {s.title}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">{children}</div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-6 py-3 bg-[#2879b1] text-white font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
