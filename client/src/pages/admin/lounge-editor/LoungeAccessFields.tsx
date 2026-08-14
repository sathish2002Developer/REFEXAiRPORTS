import type { AirportLoungeData } from './loungeData';

const inp = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm';
const lab = 'block text-sm font-semibold text-slate-700 mb-2';

export default function LoungeAccessFields({
  draft, setField, updateAccess, addAccess, removeAccess,
}: {
  draft: AirportLoungeData;
  setField: (k: keyof AirportLoungeData, v: string) => void;
  updateAccess: (i: number, field: keyof AirportLoungeData['accessOptions'][number], value: string) => void;
  addAccess: () => void;
  removeAccess: (i: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b bg-slate-50/50 flex justify-between items-center">
        <div className="flex-1 mr-4"><label className={lab}>Section Title</label><input className={inp} value={draft.accessTitle} onChange={(e) => setField('accessTitle', e.target.value)} /></div>
        <button onClick={addAccess} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">Add Access Option</button>
      </div>
      <div className="p-6 space-y-4">
        {draft.accessOptions.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 space-y-3">
            <div className="flex justify-between"><span className="text-sm font-semibold">Option {index + 1}</span><button onClick={() => removeAccess(index)} className="text-xs text-red-600 cursor-pointer">Remove</button></div>
            <div><label className={lab}>Icon class</label><input className={inp} value={item.icon} onChange={(e) => updateAccess(index, 'icon', e.target.value)} /></div>
            <div><label className={lab}>Type</label><input className={inp} value={item.type} onChange={(e) => updateAccess(index, 'type', e.target.value)} /></div>
            <div><label className={lab}>Description</label><textarea className={`${inp} resize-none`} rows={2} value={item.desc} onChange={(e) => updateAccess(index, 'desc', e.target.value)} /></div>
          </div>
        ))}
        <div><label className={lab}>Info Box Title</label><input className={inp} value={draft.infoTitle} onChange={(e) => setField('infoTitle', e.target.value)} /></div>
        <div><label className={lab}>Info Box Text</label><textarea className={`${inp} resize-none`} rows={4} value={draft.infoDesc} onChange={(e) => setField('infoDesc', e.target.value)} /></div>
      </div>
    </div>
  );
}
