import { useEffect, useRef } from 'react';
import { toEditorHtml } from '@/lib/cmsHtml';

const btn = 'px-2 py-1 text-sm rounded hover:bg-slate-100 text-slate-700 cursor-pointer';

export default function CmsRichTextField({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (document.activeElement === ref.current) return;
    const next = toEditorHtml(value);
    if (ref.current.innerHTML !== next) ref.current.innerHTML = next;
  }, [value]);

  const run = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML || '');
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
        <button type="button" className={btn} onMouseDown={(e) => { e.preventDefault(); run('bold'); }}><b>B</b></button>
        <button type="button" className={btn} onMouseDown={(e) => { e.preventDefault(); run('italic'); }}><i>I</i></button>
        <button type="button" className={btn} onMouseDown={(e) => { e.preventDefault(); run('underline'); }}><u>U</u></button>
        <button type="button" className={btn} onMouseDown={(e) => { e.preventDefault(); run('insertUnorderedList'); }}>• List</button>
        <button type="button" className={btn} onMouseDown={(e) => { e.preventDefault(); run('insertOrderedList'); }}>1. List</button>
        <span className="ml-auto text-xs text-slate-400 self-center px-2">Enter for new paragraph</span>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[140px] px-4 py-3 text-slate-800 text-sm leading-relaxed focus:outline-none [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5"
        onInput={() => onChange(ref.current?.innerHTML || '')}
      />
    </div>
  );
}
