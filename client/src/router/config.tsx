import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("../pages/home/page"));
const NewsPage = lazy(() => import("../pages/news/page"));
const AboutPage = lazy(() => import("../pages/about/page"));
const LeadershipPage = lazy(() => import("../pages/leadership/page"));
const PuneAirportPage = lazy(() => import("../pages/pune-airport/page"));
const PuneAirportAssets = lazy(() => import("../pages/pune-airport-assets/page"));
const PuneAirportLounge = lazy(() => import("../pages/pune-airport-lounge/page"));
const SrinagarAirportPage = lazy(() => import("../pages/srinagar-airport/page"));
const SrinagarAirportAssets = lazy(() => import("../pages/srinagar-airport-assets/page"));
const SrinagarAirportLounge = lazy(() => import("../pages/srinagar-airport-lounge/page"));
const TrichyAirportPage = lazy(() => import("../pages/trichy-airport/page"));
const TrichyAirportAssets = lazy(() => import("../pages/trichy-airport-assets/page"));
const TrichyAirportLounge = lazy(() => import("../pages/trichy-airport-lounge/page"));
const AurangabadAirportPage = lazy(() => import("../pages/aurangabad-airport/page"));
const AurangabadAirportAssets = lazy(() => import("../pages/aurangabad-airport-assets/page"));
const AurangabadAirportLounge = lazy(() => import("../pages/aurangabad-airport-lounge/page"));
const ShirdiAirportPage = lazy(() => import("../pages/shirdi-airport/page"));
const ShirdiAirportAssets = lazy(() => import("../pages/shirdi-airport-assets/page"));
const ShirdiAirportLounge = lazy(() => import("../pages/shirdi-airport-lounge/page"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Admin pages
const AdminLoginPage = lazy(() => import("../pages/admin/login/page"));
const AdminDashboardPage = lazy(() => import("../pages/admin/dashboard/page"));
const AdminPagesPage = lazy(() => import("../pages/admin/pages/page"));
const AdminPageEditor = lazy(() => import("../pages/admin/pages/edit/page"));
const AdminContentPage = lazy(() => import("../pages/admin/content/page"));
const AdminMediaPage = lazy(() => import("../pages/admin/media/page"));
const AdminSettingsPage = lazy(() => import("../pages/admin/settings/page"));
const AdminHomeEditor = lazy(() => import("../pages/admin/home-editor/page"));
const AdminAboutEditor = lazy(() => import("../pages/admin/about-editor/page"));
const AdminAssetsEditor = lazy(() => import("../pages/admin/assets-editor/page"));
const AdminTravelersEditor = lazy(() => import("../pages/admin/travelers-editor/page"));
const AdminLoungeEditor = lazy(() => import("../pages/admin/lounge-editor/page"));
const AdminNewsEditor = lazy(() => import("../pages/admin/news-editor/page"));
const AdminNavbarEditor = lazy(() => import("../pages/admin/navbar-editor/page"));

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/leadership", element: <LeadershipPage /> },
  { path: "/pune-airport", element: <PuneAirportPage /> },
  { path: "/pune-airport-assets", element: <PuneAirportAssets /> },
  { path: "/pune-airport-lounge", element: <PuneAirportLounge /> },
  { path: "/srinagar-airport", element: <SrinagarAirportPage /> },
  { path: "/srinagar-airport-assets", element: <SrinagarAirportAssets /> },
  { path: "/srinagar-airport-lounge", element: <SrinagarAirportLounge /> },
  { path: "/trichy-airport", element: <TrichyAirportPage /> },
  { path: "/trichy-airport-assets", element: <TrichyAirportAssets /> },
  { path: "/trichy-airport-lounge", element: <TrichyAirportLounge /> },
  { path: "/aurangabad-airport", element: <AurangabadAirportPage /> },
  { path: "/aurangabad-airport-assets", element: <AurangabadAirportAssets /> },
  { path: "/aurangabad-airport-lounge", element: <AurangabadAirportLounge /> },
  { path: "/shirdi-airport", element: <ShirdiAirportPage /> },
  { path: "/shirdi-airport-assets", element: <ShirdiAirportAssets /> },
  { path: "/shirdi-airport-lounge", element: <ShirdiAirportLounge /> },
  // Admin routes
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin/dashboard", element: <AdminDashboardPage /> },
  { path: "/admin/pages", element: <AdminPagesPage /> },
  { path: "/admin/home-editor", element: <AdminHomeEditor /> },
  { path: "/admin/about-editor", element: <AdminAboutEditor /> },
  { path: "/admin/assets-editor", element: <AdminAssetsEditor /> },
  { path: "/admin/travelers-editor", element: <AdminTravelersEditor /> },
  { path: "/admin/lounge-editor", element: <AdminLoungeEditor /> },
  { path: "/admin/news-editor", element: <AdminNewsEditor /> },
  { path: "/admin/navbar-editor", element: <AdminNavbarEditor /> },
  { path: "/admin/pages/*", element: <AdminPageEditor /> },
  { path: "/admin/content", element: <AdminContentPage /> },
  { path: "/admin/media", element: <AdminMediaPage /> },
  { path: "/admin/settings", element: <AdminSettingsPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;