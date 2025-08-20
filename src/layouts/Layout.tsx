import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ScrollToTop from "../components/scrollToTop/scrolltotop";

function Layout() {
  const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
  const main = document.querySelector('main');
  if (main) main.focus();
}, [location]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.href.startsWith(window.location.origin)) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Header />
      <main className="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
