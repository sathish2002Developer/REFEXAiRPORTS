import type { AirportLoungeData } from './loungeData';

const inp = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm';
const lab = 'block text-sm font-semibold text-slate-700 mb-2';

export default function LoungeAmenityFields({
  draft, setField, updateAmenity, addAmenity, removeAmenity,
}: {
  draft: AirportLoungeData;
  setField: (k: keyof AirportLoungeData, v: string) => void;
  updateAmenity: (i: number, field: keyof AirportLoungeData['amenities'][number], value: string) => void;
  addAmenity: () => void;
  removeAmenity: (i: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b bg-slate-50/50 flex justify-between items-center">
        <div className="flex-1 mr-4"><label className={lab}>Section Title</label><input className={inp} value={draft.amenitiesTitle} onChange={(e) => setField('amenitiesTitle', e.target.value)} /></div>
        <button onClick={addAmenity} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">Add Amenity</button>
      </div>
      <div className="p-6 space-y-4">
        {draft.amenities.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 space-y-3">
            <div className="flex justify-between"><span className="text-sm font-semibold">Amenity {index + 1}</span><button onClick={() => removeAmenity(index)} className="text-xs text-red-600 cursor-pointer">Remove</button></div>
            <div><label className={lab}>Icon class</label><input className={inp} value={item.icon} onChange={(e) => updateAmenity(index, 'icon', e.target.value)} /></div>
            <div><label className={lab}>Title</label><input className={inp} value={item.title} onChange={(e) => updateAmenity(index, 'title', e.target.value)} /></div>
            <div><label className={lab}>Description</label><textarea className={`${inp} resize-none`} rows={2} value={item.description} onChange={(e) => updateAmenity(index, 'description', e.target.value)} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
