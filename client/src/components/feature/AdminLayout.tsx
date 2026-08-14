import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminToaster from '@/components/feature/AdminToaster';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { path: '/admin/pages', label: 'Pages', icon: 'ri-pages-line' },
  { path: '/admin/navbar-editor', label: 'Navbar', icon: 'ri-menu-line' },
  { path: '/admin/navbar-editor?tab=footer', label: 'Footer', icon: 'ri-layout-bottom-line' },
  { path: '/admin/content', label: 'Content', icon: 'ri-article-line' },
  { path: '/admin/media', label: 'Media', icon: 'ri-image-line' },
  { path: '/admin/settings', label: 'Settings', icon: 'ri-settings-3-line' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    const [pathname, query] = path.split('?');
    if (location.pathname !== pathname) return false;
    const wantTab = new URLSearchParams(query || '').get('tab');
    const currentTab = new URLSearchParams(location.search).get('tab');
    if (pathname === '/admin/navbar-editor') {
      if (wantTab === 'footer') return currentTab === 'footer';
      return currentTab !== 'footer';
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-100">
          <img
            src="https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png"
            alt="Refex"
            className={`h-8 w-auto transition-all ${sidebarOpen ? '' : 'hidden'}`}
          />
          {!sidebarOpen && (
            <span className="text-xl font-bold text-[#2879b1]">R</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {sidebarOpen ? (
              <i className="ri-arrow-left-s-line text-lg"></i>
            ) : (
              <i className="ri-arrow-right-s-line text-lg"></i>
            )}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-[#2879b1]/10 text-[#2879b1]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${link.icon} text-lg`}></i>
              </div>
              {sidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all w-full cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-logout-box-r-line text-lg"></i>
            </div>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-100">
          <img
            src="https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png"
            alt="Refex"
            className="h-8 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <nav className="py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-[#2879b1]/10 text-[#2879b1]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <i className={`${link.icon} text-lg`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all w-full cursor-pointer"
          >
            <i className="ri-logout-box-r-line text-lg"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-8 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
            <h2 className="text-lg font-semibold text-slate-800">
              {sidebarLinks.find((l) => isActive(l.path))?.label || 'Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-slate-500 hover:text-[#2879b1] transition-colors"
            >
              <i className="ri-external-link-line"></i>
              View Website
            </a>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-[#2879b1] rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white text-sm"></i>
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
      <AdminToaster />
    </div>
  );
}