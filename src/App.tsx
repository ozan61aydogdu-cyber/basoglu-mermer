import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrandSplash } from "./components/BrandSplash";
import { Footer, FloatingWhatsApp, Header } from "./components/SiteChrome";
import { ScrollToTop, Seo } from "./components/Seo";
import {
  AboutPage,
  ApplicationsPage,
  CatalogPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProductDetailPage,
} from "./pages/Pages";

const redirectPath = new URLSearchParams(window.location.search).get("p");
if (redirectPath) {
  window.history.replaceState(
    null,
    "",
    `/basoglu-mermer${redirectPath}${window.location.hash}`,
  );
}

function App() {
  const [splashVisible, setSplashVisible] = useState(() => {
    try {
      return sessionStorage.getItem("basoglu-brand-splash") !== "seen";
    } catch {
      return true;
    }
  });

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem("basoglu-brand-splash", "seen");
    } catch {
      // Storage may be unavailable in privacy mode.
    }
    setSplashVisible(false);
  }, []);

  return (
    <>
      {splashVisible && <BrandSplash onComplete={finishSplash} />}
      <BrowserRouter basename="/basoglu-mermer">
        <Seo />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/mermerlerimiz" element={<CatalogPage group="marble" />} />
          <Route path="/mermerlerimiz/:categorySlug" element={<CatalogPage group="marble" />} />
          <Route path="/granitler" element={<CatalogPage group="natural" />} />
          <Route path="/granitler/:categorySlug" element={<CatalogPage group="natural" />} />
          <Route path="/urun/:slug" element={<ProductDetailPage />} />
          <Route path="/uygulamalarimiz" element={<ApplicationsPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </BrowserRouter>
    </>
  );
}

export default App;
