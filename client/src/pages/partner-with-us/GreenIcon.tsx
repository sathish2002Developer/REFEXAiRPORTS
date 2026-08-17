const ICON_CLASS = 'text-[#7bbf45] shrink-0';

export function GreenIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: 'plane' | 'phone' | 'mail' | 'pin';
  className?: string;
}) {
  const cls = `${ICON_CLASS} ${className}`;
  if (name === 'plane') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
        <path d="M2 16l8-4 4-8 2 6 6 2-8 4-4 8-2-6-6-2z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
        <path d="M6.5 3.5l3 2.2-1.6 2.4a15 15 0 007 7l2.4-1.6 2.2 3-1.3 1.3C16.4 19.6 4.4 16.2 3 8.8L4.3 7.5 6.5 3.5z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
      <path d="M12 21s7-6.2 7-11.2A7 7 0 005 9.8C5 14.8 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="9.8" r="2.2" />
    </svg>
  );
}
