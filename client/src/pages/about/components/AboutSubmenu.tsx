import { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

interface SubmenuItem {
  id: string;
  label: string;
}

const menuItems: SubmenuItem[] = [
  { id: 'intro', label: 'Who We Are' },
  { id: 'vision-mission', label: 'Vision & Mission' },
  { id: 'our-focus', label: 'Our Key Focus Areas' },
  { id: 'refex-group', label: 'Refex Group' },
];

export default function AboutSubmenu() {
  const [activeId, setActiveId] = useState<string>('intro');

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 200;
    for (let i = menuItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(menuItems[i].id);
      if (el && el.offsetTop <= scrollPosition) {
        setActiveId(menuItems[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeId === item.id
                  ? 'bg-[#2879b1] text-white'
                  : 'text-slate-600 hover:text-[#2879b1] hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/leadership"
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all text-slate-600 hover:text-[#2879b1] hover:bg-slate-100"
          >
            Leadership Team
          </Link>
        </div>
      </div>
    </nav>
  );
}