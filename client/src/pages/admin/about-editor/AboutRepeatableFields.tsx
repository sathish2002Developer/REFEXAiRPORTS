import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import { adminToast } from '@/lib/adminToast';

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
const labelCls = 'block text-sm font-semibold text-slate-700 mb-2';

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        adminToast.added();
      }}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
    >
      <i className="ri-add-line"></i>
      {label}
    </button>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
        adminToast.deleted();
      }}
      className="text-xs text-red-600 cursor-pointer whitespace-nowrap"
    >
      Delete
    </button>
  );
}

export function CmsStringList({
  title,
  addLabel,
  items,
  onChange,
}: {
  title: string;
  addLabel: string;
  items: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          {title}
          <span className="ml-2 text-xs font-normal text-slate-400">{items.length}</span>
        </p>
        <AddBtn label={addLabel} onClick={() => onChange([...items, ''])} />
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            rows={2}
            className={`${inputCls} resize-none`}
            value={item}
            onChange={(e) => onChange(items.map((row, n) => (n === i ? e.target.value : row)))}
          />
          <DeleteBtn onClick={() => onChange(items.filter((_, n) => n !== i))} />
        </div>
      ))}
    </div>
  );
}

export type CmsAboutValue = { letter: string; name: string; desc: string };

export function CmsValuesList({
  values,
  onChange,
}: {
  values: CmsAboutValue[];
  onChange: (next: CmsAboutValue[]) => void;
}) {
  const update = (i: number, patch: Partial<CmsAboutValue>) => {
    onChange(values.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Values ({values.length})</p>
        <AddBtn label="Add value" onClick={() => onChange([...values, { letter: '', name: '', desc: '' }])} />
      </div>
      {values.map((v, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Value {i + 1}{v.name ? ` — ${v.name}` : ''}</span>
            <DeleteBtn onClick={() => onChange(values.filter((_, n) => n !== i))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className={labelCls}>Letter</label><input className={inputCls} value={v.letter} onChange={(e) => update(i, { letter: e.target.value })} /></div>
            <div className="md:col-span-2"><label className={labelCls}>Name</label><input className={inputCls} value={v.name} onChange={(e) => update(i, { name: e.target.value })} /></div>
          </div>
          <div><label className={labelCls}>Description</label><CmsRichTextField value={v.desc} onChange={(desc) => update(i, { desc })} /></div>
        </div>
      ))}
    </div>
  );
}

export type CmsFocusCard = { title: string; items: string[] };

export function CmsFocusCardsList({
  cards,
  onChange,
}: {
  cards: CmsFocusCard[];
  onChange: (next: CmsFocusCard[]) => void;
}) {
  const update = (i: number, patch: Partial<CmsFocusCard>) => {
    onChange(cards.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Cards ({cards.length})</p>
        <AddBtn label="Add card" onClick={() => onChange([...cards, { title: '', items: [''] }])} />
      </div>
      {cards.map((card, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Card {i + 1}{card.title ? ` — ${card.title}` : ''}</span>
            <DeleteBtn onClick={() => onChange(cards.filter((_, n) => n !== i))} />
          </div>
          <div><label className={labelCls}>Title</label><input className={inputCls} value={card.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
          <CmsStringList title="Items" addLabel="Add item" items={card.items || []} onChange={(items) => update(i, { items })} />
        </div>
      ))}
    </div>
  );
}

export type CmsKeyArea = { title: string; description: string; icon: string; color: string };

const KEY_COLORS = ['from-[#2879b1] to-[#1a5a8a]', 'from-[#8bc34a] to-[#689f38]', 'from-[#ff7043] to-[#e64a19]'];

export function CmsKeyAreasList({
  keys,
  onChange,
}: {
  keys: CmsKeyArea[];
  onChange: (next: CmsKeyArea[]) => void;
}) {
  const update = (i: number, patch: Partial<CmsKeyArea>) => {
    onChange(keys.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Key focus areas ({keys.length})</p>
        <AddBtn
          label="Add area"
          onClick={() =>
            onChange([
              ...keys,
              { title: '', description: '', icon: 'ri-focus-3-line', color: KEY_COLORS[keys.length % KEY_COLORS.length] },
            ])
          }
        />
      </div>
      {keys.map((k, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Area {i + 1}{k.title ? ` — ${k.title}` : ''}</span>
            <DeleteBtn onClick={() => onChange(keys.filter((_, n) => n !== i))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className={labelCls}>Title</label><input className={inputCls} value={k.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
            <div><label className={labelCls}>Icon class</label><input className={inputCls} value={k.icon} placeholder="ri-plane-line" onChange={(e) => update(i, { icon: e.target.value })} /></div>
          </div>
          <div><label className={labelCls}>Description</label><CmsRichTextField value={k.description} onChange={(description) => update(i, { description })} /></div>
        </div>
      ))}
    </div>
  );
}

export type CmsPerson = { name: string; position: string; image: string; bio: string };

export function CmsPeopleList({
  title,
  addLabel,
  people,
  onChange,
}: {
  title: string;
  addLabel: string;
  people: CmsPerson[];
  onChange: (next: CmsPerson[]) => void;
}) {
  const update = (i: number, patch: Partial<CmsPerson>) => {
    onChange(people.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          {title}
          <span className="ml-2 text-xs font-normal text-slate-400">{people.length}</span>
        </p>
        <AddBtn label={addLabel} onClick={() => onChange([...people, { name: '', position: '', image: '', bio: '' }])} />
      </div>
      {people.map((p, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 flex justify-between">
            <span className="text-sm font-semibold">{i + 1}. {p.name || 'Untitled'}</span>
            <DeleteBtn onClick={() => onChange(people.filter((_, n) => n !== i))} />
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className={labelCls}>Name</label><input className={inputCls} value={p.name} onChange={(e) => update(i, { name: e.target.value })} /></div>
              <div><label className={labelCls}>Position</label><input className={inputCls} value={p.position} onChange={(e) => update(i, { position: e.target.value })} /></div>
            </div>
            <div><label className={labelCls}>Photo</label><CmsImageField value={p.image} onChange={(image) => update(i, { image })} /></div>
            <div><label className={labelCls}>Bio</label><CmsRichTextField value={p.bio} onChange={(bio) => update(i, { bio })} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CmsImageUrlList({
  title,
  images,
  onChange,
}: {
  title: string;
  images: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          {title}
          <span className="ml-2 text-xs font-normal text-slate-400">{images.length}</span>
        </p>
        <AddBtn label="Add image" onClick={() => onChange([...images, ''])} />
      </div>
      {images.map((url, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Image {i + 1}</span>
            <DeleteBtn onClick={() => onChange(images.filter((_, n) => n !== i))} />
          </div>
          <CmsImageField value={url} onChange={(next) => onChange(images.map((row, n) => (n === i ? next : row)))} />
        </div>
      ))}
    </div>
  );
}
