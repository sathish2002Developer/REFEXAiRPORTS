
import { useEffect } from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import AOS from 'aos';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
