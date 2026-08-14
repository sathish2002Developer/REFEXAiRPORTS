import type { AirportLoungeData } from './loungeData';

const inp = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm';
const lab = 'block text-sm font-semibold text-slate-700 mb-2';

export default function LoungeOverviewFields({ draft, setField }: { draft: AirportLoungeData; setField: (k: keyof AirportLoungeData, v: string) => void }) {
  return (
    <div className="p-6 space-y-4">
      <div><label className={lab}>Section Title</label><input className={inp} value={draft.overviewTitle} onChange={(e) => setField('overviewTitle', e.target.value)} /></div>
      <div><label className={lab}>Paragraph 1</label><textarea className={`${inp} resize-none`} rows={4} value={draft.overviewPara1} onChange={(e) => setField('overviewPara1', e.target.value)} /></div>
      <div><label className={lab}>Paragraph 2</label><textarea className={`${inp} resize-none`} rows={4} value={draft.overviewPara2} onChange={(e) => setField('overviewPara2', e.target.value)} /></div>
      <div><label className={lab}>Hours Title</label><input className={inp} value={draft.hoursTitle} onChange={(e) => setField('hoursTitle', e.target.value)} /></div>
      <div><label className={lab}>Hours Description</label><input className={inp} value={draft.hoursDesc} onChange={(e) => setField('hoursDesc', e.target.value)} /></div>
      <div><label className={lab}>Capacity Title</label><input className={inp} value={draft.capacityTitle} onChange={(e) => setField('capacityTitle', e.target.value)} /></div>
      <div><label className={lab}>Capacity Description</label><input className={inp} value={draft.capacityDesc} onChange={(e) => setField('capacityDesc', e.target.value)} /></div>
    </div>
  );
}
