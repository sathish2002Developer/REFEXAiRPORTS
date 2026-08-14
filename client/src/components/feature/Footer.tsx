const Footer = () => {
  const handlePartnerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.REACT_APP_NAVIGATE('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Logo and Tagline */}
          <div className="space-y-6">
            <img
              src="https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png"
              alt="Refex Airports"
              className="h-12 w-auto brightness-0 invert"
            />
            <h3 className="text-xl font-bold">
              Bringing World-Class<br />Retail to Pune Airport.
            </h3>
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              <a href="/" className="block text-gray-300 hover:text-[#2879b1] transition-colors">
                Home
              </a>
              <a href="/about" className="block text-gray-300 hover:text-[#2879b1] transition-colors">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-[#2879b1] transition-colors">
                Our Assets
              </a>
              <a href="#" className="block text-gray-300 hover:text-[#2879b1] transition-colors">
                For Travelers
              </a>
              <a href="/news" className="block text-gray-300 hover:text-[#2879b1] transition-colors">
                News & Updates
              </a>
              <a href="#contact" onClick={handlePartnerClick} className="block text-gray-300 hover:text-[#2879b1] transition-colors cursor-pointer">
                Partner with Us
              </a>
            </nav>
          </div>

          {/* Right Column - CTA */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">
              Let's Elevate Your Retail Business Together
            </h4>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#2879b1] hover:bg-[#1b598a] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Enquire now</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <p className="text-gray-400 text-center">
            © 2024 Refex Airports & Transports
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
