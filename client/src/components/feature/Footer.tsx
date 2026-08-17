import { mediaUrl } from '@/lib/api';
import { useFooterCms } from '@/lib/cmsFooter';
import { scrollToPageTop } from '@/lib/scrollToPageTop';

const Footer = () => {
  const footer = useFooterCms();

  const goToHash = (to: string) => {
    const hashIndex = to.indexOf('#');
    const path = hashIndex === -1 ? to : to.slice(0, hashIndex) || '/';
    const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1);
    const scroll = () => {
      if (!hash || hash === 'intro' || hash === 'who-we-are') {
        scrollToPageTop();
        return;
      }
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (!to || to === '#') {
      e.preventDefault();
      return;
    }
    if (to.startsWith('#') || to.includes('#')) {
      e.preventDefault();
      goToHash(to);
      return;
    }
    if (to.startsWith('/') && !to.startsWith('//')) {
      e.preventDefault();
      window.REACT_APP_NAVIGATE(to);
      scrollToPageTop();
    }
  };

  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <img
              src={mediaUrl(footer.logo_url)}
              alt={footer.logo_alt}
              className="h-12 w-auto brightness-0 invert"
            />
            <h3 className="text-xl font-bold whitespace-pre-line">{footer.tagline}</h3>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">{footer.quick_links_title}</h4>
            <nav className="space-y-3">
              {footer.links.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.to || '#'}
                  onClick={(e) => handleLinkClick(e, item.to)}
                  className="block text-gray-300 hover:text-[#2879b1] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">{footer.cta_title}</h4>
            <a
              href={footer.cta_to || '#contact'}
              onClick={(e) => handleLinkClick(e, footer.cta_to || '#contact')}
              className="inline-flex items-center gap-2 bg-[#2879b1] hover:bg-[#1b598a] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{footer.cta_button}</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <p className="text-gray-400 text-center">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
