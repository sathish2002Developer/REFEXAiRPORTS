import { looksLikeHtml, sanitizeCmsHtml } from '@/lib/cmsHtml';

export default function CmsHtml({
  html,
  className = "",
  as: Tag = "div",
}: {
  html?: string;
  className?: string;
  as?: "div" | "p" | "span";
}) {
  const raw = html || "";
  if (!raw) return null;
  if (!looksLikeHtml(raw)) {
    return <Tag className={className}>{raw}</Tag>;
  }
  return (
    <Tag
      className={`cms-rich [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_a]:text-[#2879b1] [&_a]:underline ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(raw) }}
    />
  );
}
