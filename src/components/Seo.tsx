import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { business, products } from "../data";
import {
  canonicalPathname,
  canonicalOrigin,
  getRouteMetadata,
  normalizePathname,
} from "../seoMetadata";

export function Seo() {
  const { pathname } = useLocation();
  const normalizedPath = normalizePathname(pathname);
  const product = normalizedPath.startsWith("/urun/")
    ? products.find((item) => item.slug === normalizedPath.slice("/urun/".length))
    : undefined;
  const meta = product
    ? {
        title: `${product.name} | Başoğlu Mermer Sanayi`,
        description: `${product.name} doğal taş örneğini keşfedin. Ürün özellikleri, stok ve fiyat bilgisi için Başoğlu Mermer ile iletişime geçin.`,
      }
    : getRouteMetadata(normalizedPath);
  const canonicalUrl = new URL(canonicalPathname(pathname), canonicalOrigin).toString();

  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  }, [canonicalUrl, meta.description, meta.title]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalOrigin}/#business`,
    name: business.name,
    url: canonicalOrigin,
    logo: `${canonicalOrigin}/favicon-192.png`,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "İsmetpaşa Mahallesi, 91. Sokak, No: 45/1",
      addressLocality: "Sultangazi",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  };

  return <script type="application/ld+json">{JSON.stringify(structuredData)}</script>;
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
