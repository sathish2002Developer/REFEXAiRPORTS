import CmsImageField from '@/components/feature/CmsImageField';
import { adminToast } from '@/lib/adminToast';
import type { FooterCms, FooterLink } from '@/lib/cmsFooter';

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
const labelCls = 'block text-sm font-semibold text-slate-700 mb-2';

export default function FooterFields({
  footer,
  onChange,
}: {
  footer: FooterCms;
  onChange: (next: FooterCms) => void;
}) {
  const setField = <K extends keyof FooterCms>(key: K, value: FooterCms[K]) => {
    onChange({ ...footer, [key]: value });
  };

  const updateLink = (index: number, patch: Partial<FooterLink>) => {
    setField(
      'links',
      footer.links.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Logo image</label>
        <CmsImageField value={footer.logo_url} onChange={(logo_url) => setField('logo_url', logo_url)} />
      </div>
      <div>
        <label className={labelCls}>Logo alt text</label>
        <input
          className={inputCls}
          value={footer.logo_alt}
          onChange={(e) => setField('logo_alt', e.target.value)}
        />
      </div>
      <div>
        <label className={labelCls}>Tagline</label>
        <textarea
          rows={3}
          className={`${inputCls} resize-none`}
          value={footer.tagline}
          onChange={(e) => setField('tagline', e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-1">Use a new line to break the tagline on the website.</p>
      </div>
      <div>
        <label className={labelCls}>Quick links title</label>
        <input
          className={inputCls}
          value={footer.quick_links_title}
          onChange={(e) => setField('quick_links_title', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            Quick links
            <span className="ml-2 text-xs font-normal text-slate-400">{footer.links.length} items</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setField('links', [...footer.links, { label: '', to: '/' }]);
              adminToast.added();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
          >
            <i className="ri-add-line"></i>
            Add link
          </button>
        </div>
        {footer.links.length === 0 && (
          <p className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
            No links yet. Click Add link to create one.
          </p>
        )}
        {footer.links.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Label</label>
              <input
                className={inputCls}
                value={item.label}
                placeholder="Home"
                onChange={(e) => updateLink(index, { label: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">URL</label>
              <input
                className={inputCls}
                value={item.to}
                placeholder="/about or #contact"
                onChange={(e) => updateLink(index, { to: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setField(
                  'links',
                  footer.links.filter((_, i) => i !== index)
                );
                adminToast.deleted();
              }}
              className="text-xs font-medium text-red-600 cursor-pointer whitespace-nowrap mb-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <label className={labelCls}>CTA title</label>
        <input
          className={inputCls}
          value={footer.cta_title}
          onChange={(e) => setField('cta_title', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>CTA button text</label>
          <input
            className={inputCls}
            value={footer.cta_button}
            onChange={(e) => setField('cta_button', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>CTA button URL</label>
          <input
            className={inputCls}
            value={footer.cta_to}
            placeholder="#contact"
            onChange={(e) => setField('cta_to', e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Copyright</label>
        <input
          className={inputCls}
          value={footer.copyright}
          onChange={(e) => setField('copyright', e.target.value)}
        />
      </div>
    </div>
  );
}
