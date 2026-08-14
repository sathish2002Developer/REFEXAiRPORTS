import type { TravelersDraft } from './cmsDraft';
import { cmsInputCls, cmsLabelCls } from './cmsDraft';

export default function TravelersTerminalFields({
  draft,
  setField,
  updateTerminal,
  addTerminal,
  removeTerminal,
}: {
  draft: TravelersDraft;
  setField: (key: keyof TravelersDraft, value: string) => void;
  updateTerminal: (index: number, field: 'name' | 'count', value: string) => void;
  addTerminal: () => void;
  removeTerminal: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button onClick={addTerminal} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">Add Terminal Area</button>
      </div>
      <div className="p-6 space-y-4">
        <div className="border border-slate-100 rounded-lg p-4">
          <label className={cmsLabelCls}>Section Title</label>
          <input className={cmsInputCls} value={draft.terminalTitle} onChange={(e) => setField('terminalTitle', e.target.value)} />
        </div>
        <div className="border border-slate-100 rounded-lg p-4">
          <label className={cmsLabelCls}>Section Subtitle</label>
          <input className={cmsInputCls} value={draft.terminalSubtitle} onChange={(e) => setField('terminalSubtitle', e.target.value)} />
        </div>
        {draft.terminals.map((terminal, index) => (
          <div key={index} className="border border-slate-200 rounded-xl p-4 flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[220px]">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Area Name</label>
              <input className={cmsInputCls} value={terminal.name} onChange={(e) => updateTerminal(index, 'name', e.target.value)} />
            </div>
            <div className="w-32">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Store Count</label>
              <input className={cmsInputCls} type="number" min={0} value={terminal.count} onChange={(e) => updateTerminal(index, 'count', e.target.value)} />
            </div>
            <button onClick={() => removeTerminal(index)} className="mt-6 text-xs text-red-600 cursor-pointer">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
