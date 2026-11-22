import { useCallback, useEffect, useState } from "react";
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
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(
    null,
    "",
    `${basePath}${redirectPath}${window.location.hash}`,
  );
}

function RevealObserver() {
  useEffect(() => {
    const selector = ".reveal:not(.is-visible)";
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -24px 0px" });

    const observeNode = (node: Node) => {
      if (!(node instanceof Element)) return;
      if (node.matches(selector)) observer.observe(node);
      node.querySelectorAll(selector).forEach((element) => observer.observe(element));
    };

    document.querySelectorAll(selector).forEach((element) => observer.observe(element));
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeNode));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
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
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
        <Seo />
        <ScrollToTop />
        <RevealObserver />
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
