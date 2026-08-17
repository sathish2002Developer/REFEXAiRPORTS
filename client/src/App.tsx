
import { useEffect } from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import AOS from 'aos';
import { hashShouldStayOnSection, scrollToPageTop } from '@/lib/scrollToPageTop';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (hashShouldStayOnSection(id)) {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
          return;
        }
        scrollToPageTop();
      });
      return;
    }
    scrollToPageTop();
  }, [pathname, hash]);

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
