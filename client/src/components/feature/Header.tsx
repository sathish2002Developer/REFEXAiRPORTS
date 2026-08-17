import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mediaUrl } from '@/lib/api';
import { useNavbarCms, type NavItem } from '@/lib/cmsNavbar';

function goToHash(to: string) {
  const hashIndex = to.indexOf('#');
  const path = hashIndex === -1 ? to : to.slice(0, hashIndex) || '/';
  const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1);

  const scroll = () => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const current = window.location.pathname;
  const targetPath = path.startsWith('#') || path === '' ? current : path;

  if (to === '#contact' || (hash === 'contact' && (targetPath === '/' || targetPath === ''))) {
    window.REACT_APP_NAVIGATE('/partner-with-us');
    return;
  }

  if (current !== targetPath) {
    window.REACT_APP_NAVIGATE(targetPath);
    setTimeout(scroll, 150);
  } else {
    scroll();
  }
}

function handleItemClick(e: React.MouseEvent, item: { to?: string; type?: string }) {
  const to = item.to || '';
  if (!to) {
    e.preventDefault();
    return;
  }
  if (/^https?:/i.test(to)) return;
  if (item.type === 'anchor' || to.includes('#')) {
    e.preventDefault();
    goToHash(to);
  }
}

function itemHref(item: { to?: string }) {
  const to = item.to || '';
  if (!to) return '#';
  if (to.startsWith('#')) return to;
  return to;
}

function NestedDesktopMenu({ item, isActive }: { item: NavItem; isActive: (path: string) => boolean }) {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const groups = item.groups || [];
  const activeGroup = openGroup != null ? groups[openGroup] : null;

  return (
    <div className="relative group" onMouseLeave={() => setOpenGroup(null)}>
      <button
        type="button"
        className="text-gray-700 hover:text-[#2879b1] font-medium transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
      >
        {item.label}
        <i className="ri-arrow-down-s-line"></i>
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50">
        <div className="flex items-start">
          <div className="w-52 shrink-0 bg-white shadow-lg rounded-lg py-1">
            {groups.map((group, gi) => (
              <div
                key={`group-${gi}`}
                className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                  openGroup === gi
                    ? 'bg-blue-50 text-[#2879b1]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#2879b1]'
                }`}
                onMouseEnter={() => setOpenGroup(gi)}
              >
                {group.to ? (
                  <Link to={group.to} className="font-medium text-sm whitespace-nowrap flex-1">
                    {group.label}
                  </Link>
                ) : (
                  <span className="font-medium text-sm whitespace-nowrap">{group.label}</span>
                )}
                <i className="ri-arrow-right-s-line text-lg"></i>
              </div>
            ))}
          </div>
          {activeGroup ? (
            <div className="ml-1 min-w-56 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-4 pt-3 pb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {activeGroup.label}
                </span>
              </div>
              {(activeGroup.children || []).map((airport, ai) => (
                <Link
                  key={`child-${ai}-${airport.to}`}
                  to={airport.to || '/'}
                  className={`block px-5 py-2.5 text-sm transition-colors ${
                    isActive(airport.to)
                      ? 'text-[#2879b1] bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#2879b1]'
                  }`}
                >
                  {airport.label}
                </Link>
              ))}
              <div className="h-2"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const location = useLocation();
  const navbar = useNavbarCms();

  const isActive = (path: string) => location.pathname === path;
  const closeMobile = () => setIsMenuOpen(false);

  const renderDesktopItem = (item: NavItem, index: number) => {
    if (item.type === 'dropdown') {
      const ParentTag: any = item.to && !item.to.includes('#') ? Link : 'button';
      const parentProps =
        ParentTag === Link
          ? { to: item.to }
          : {
              type: 'button',
              onClick: (e: React.MouseEvent) => handleItemClick(e, item),
            };
      return (
        <div key={index} className="relative group">
          <ParentTag
            {...parentProps}
            className={`text-gray-700 hover:text-[#2879b1] font-medium transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              item.to && isActive(item.to) ? 'text-[#2879b1]' : ''
            }`}
          >
            {item.label}
            <i className="ri-arrow-down-s-line"></i>
          </ParentTag>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50">
            <div className="w-52 bg-white shadow-lg rounded-lg overflow-hidden">
              {(item.children || []).map((child, ci) =>
                child.to.includes('#') ? (
                  <a
                    key={ci}
                    href={child.to}
                    onClick={(e) => handleItemClick(e, { ...child, type: 'anchor' })}
                    className="block px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#2879b1] text-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {child.label}
                  </a>
                ) : (
                  <Link
                    key={ci}
                    to={child.to || '/'}
                    className={`block px-5 py-3 text-sm transition-colors whitespace-nowrap ${
                      isActive(child.to)
                        ? 'text-[#2879b1] bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#2879b1]'
                    }`}
                  >
                    {child.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'nested') {
      return <NestedDesktopMenu key={index} item={item} isActive={isActive} />;
    }

    const cls = `text-gray-700 hover:text-[#2879b1] font-medium transition-colors cursor-pointer whitespace-nowrap ${
      item.to && isActive(item.to) ? 'text-[#2879b1]' : ''
    }`;

    if (item.type === 'anchor' || (item.to || '').includes('#')) {
      return (
        <a key={index} href={itemHref(item)} onClick={(e) => handleItemClick(e, item)} className={cls}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={index} to={item.to || '/'} className={cls}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img
              src={mediaUrl(navbar.logo_url)}
              alt={navbar.logo_alt || 'Refex Airports'}
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navbar.nav_links.map(renderDesktopItem)}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 cursor-pointer"
          >
            <i className={`text-2xl ${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navbar.nav_links.map((item, index) => {
              if (item.type === 'dropdown') {
                return (
                  <div key={index} className="space-y-2">
                    <div className="text-gray-700 font-medium flex items-center justify-between">
                      {item.to && !item.to.includes('#') ? (
                        <Link to={item.to} onClick={closeMobile}>
                          {item.label}
                        </Link>
                      ) : (
                        <span>{item.label}</span>
                      )}
                      <button
                        onClick={() => setOpenMobile(openMobile === index ? null : index)}
                        className="text-gray-400 cursor-pointer"
                      >
                        <i className={`text-xl ${openMobile === index ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                      </button>
                    </div>
                    {openMobile === index && (
                      <div className="pl-4 space-y-1">
                        {(item.children || []).map((child, ci) =>
                          child.to.includes('#') ? (
                            <a
                              key={ci}
                              href={child.to}
                              onClick={(e) => {
                                handleItemClick(e, { ...child, type: 'anchor' });
                                closeMobile();
                              }}
                              className="block text-gray-600 hover:text-[#2879b1] text-sm py-1"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={ci}
                              to={child.to || '/'}
                              className={`block text-sm py-1 ${isActive(child.to) ? 'text-[#2879b1]' : 'text-gray-600 hover:text-[#2879b1]'}`}
                              onClick={closeMobile}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.type === 'nested') {
                return (
                  <div key={index} className="space-y-2">
                    <div className="text-gray-700 font-medium">{item.label}</div>
                    {(item.groups || []).map((group, gi) => (
                      <div key={`m-group-${gi}`}>
                        {group.to ? (
                          <Link
                            to={group.to}
                            className="block text-sm font-medium text-gray-700 pl-4 pt-1 hover:text-[#2879b1]"
                            onClick={closeMobile}
                          >
                            {group.label}
                          </Link>
                        ) : (
                          <div className="text-xs font-semibold text-gray-400 uppercase pl-4 pt-1">{group.label}</div>
                        )}
                        {(group.children || []).map((child, ci) => (
                          <Link
                            key={`m-child-${ci}-${child.to}`}
                            to={child.to || '/'}
                            className="block pl-8 text-gray-600 hover:text-[#2879b1] text-sm"
                            onClick={closeMobile}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }

              const cls = `block text-gray-700 hover:text-[#2879b1] font-medium ${
                item.to && isActive(item.to) ? 'text-[#2879b1]' : ''
              }`;

              if (item.type === 'anchor' || (item.to || '').includes('#')) {
                return (
                  <a
                    key={index}
                    href={itemHref(item)}
                    className={cls}
                    onClick={(e) => {
                      handleItemClick(e, item);
                      closeMobile();
                    }}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={index} to={item.to || '/'} className={cls} onClick={closeMobile}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
