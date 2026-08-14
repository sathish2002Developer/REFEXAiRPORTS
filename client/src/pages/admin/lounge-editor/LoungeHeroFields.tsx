import type { AirportLoungeData } from './loungeData';

const inp = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm';
const lab = 'block text-sm font-semibold text-slate-700 mb-2';

export default function LoungeHeroFields({ draft, setField }: { draft: AirportLoungeData; setField: (k: keyof AirportLoungeData, v: string) => void }) {
  return (
    <div className="p-6 space-y-4">
      <div><label className={lab}>Title</label><input className={inp} value={draft.heroTitle} onChange={(e) => setField('heroTitle', e.target.value)} /></div>
      <div><label className={lab}>Subtitle</label><input className={inp} value={draft.heroSubtitle} onChange={(e) => setField('heroSubtitle', e.target.value)} /></div>
      <div><label className={lab}>Tagline</label><textarea className={`${inp} resize-none`} rows={3} value={draft.heroTagline} onChange={(e) => setField('heroTagline', e.target.value)} /></div>
      <div>
        <label className={lab}>Background Image URL</label>
        <input className={inp} value={draft.heroBackground} onChange={(e) => setField('heroBackground', e.target.value)} />
        {draft.heroBackground && <div className="mt-2 w-full h-40 rounded-lg overflow-hidden border"><img src={draft.heroBackground} alt="" className="w-full h-full object-cover" /></div>}
      </div>
    </div>
  );
}
