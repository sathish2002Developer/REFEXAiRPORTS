import { Link } from 'react-router-dom';
import { loungeAirports } from './loungeData';

const sections = [
  { id: 'hero', title: 'Hero Section', icon: 'ri-image-line' },
  { id: 'overview', title: 'Overview', icon: 'ri-file-list-3-line' },
  { id: 'amenities', title: 'Amenities', icon: 'ri-service-line' },
  { id: 'access', title: 'Access & Pricing', icon: 'ri-ticket-2-line' },
];

export default function LoungeEditorChrome({
  airportId, setAirportId, currentAirport, saving, saved, loading, error, handleSave, activeSection, setActiveSection, children,
}: any) {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/admin/pages" className="hover:text-[#2879b1]">Pages</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-slate-800 font-medium">Lounge — Page Editor</span>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-sm text-red-600">{error}</span>}
          {loading && <span className="text-sm text-slate-500">Loading CMS...</span>}
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
          <button onClick={handleSave} disabled={saving || loading} className="px-5 py-2.5 bg-[#2879b1] text-white rounded-lg disabled:opacity-50 cursor-pointer">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border p-5 mb-6">
        <h1 className="text-xl font-bold">Lounge Pages</h1>
        <p className="text-sm text-slate-500">Edit lounge content for all five airports</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {loungeAirports.map((a) => (
            <button key={a.id} onClick={() => setAirportId(a.id)} className={`px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${airportId === a.id ? 'bg-[#2879b1] text-white' : 'bg-slate-50 border'}`}>{a.slug}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border p-5 mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex-1"><h2 className="text-lg font-bold">{currentAirport.name}</h2><p className="text-sm text-slate-500 font-mono">{currentAirport.route}</p></div>
        <Link to={currentAirport.route} target="_blank" className="px-4 py-2 text-sm text-[#2879b1] bg-[#2879b1]/10 rounded-lg">View Page</Link>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm cursor-pointer ${activeSection === s.id ? 'bg-[#2879b1] text-white' : 'bg-white border'}`}>
            <i className={s.icon}></i>{s.title}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">{children}</div>
      <div className="mt-8 flex justify-end">
        <button onClick={handleSave} disabled={saving || loading} className="px-6 py-3 bg-[#2879b1] text-white font-semibold rounded-lg disabled:opacity-50 cursor-pointer">
          {saving ? 'Saving...' : `Save ${currentAirport.slug} Changes`}
        </button>
      </div>
    </div>
  );
}
