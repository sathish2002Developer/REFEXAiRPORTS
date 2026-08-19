import CmsImageField from '@/components/feature/CmsImageField';
import { assetsSections } from './assetsData';

export default function AssetsFields({
  activeSection, values, handleChange,
}: {
  activeSection: string;
  values: Record<string, string>;
  handleChange: (key: string, value: string) => void;
}) {
  const section = assetsSections.find((s) => s.id === activeSection);
  const fields = section?.fields || [];
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-6 py-4 border-b bg-slate-50/50">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <i className={section?.icon || 'ri-file-text-line'}></i>{section?.title}
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {activeSection === 'comingsoon' && (
          <p className="text-sm text-slate-500">
            Shown on the public airport page when Coming Soon is turned on. Leave the image empty to reuse the hero background.
          </p>
        )}
        {fields.map((field) => (
          <div key={field.key} className="border border-slate-100 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold">{field.label}</label>
              <span className="text-xs font-mono text-slate-400">{field.key}</span>
            </div>
            {field.type === 'image' ? (
              <CmsImageField
                value={values[field.key] || ''}
                onChange={(next) => handleChange(field.key, next)}
                fit="cover"
              />
            ) : field.type === 'textarea' ? (
              <textarea value={values[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)} rows={4} className="w-full px-4 py-3 bg-slate-50 border rounded-lg resize-none" />
            ) : (
              <input type="text" value={values[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)} className="w-full px-4 py-3 bg-slate-50 border rounded-lg" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
