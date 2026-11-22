import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { business, products } from "../data";

const defaultDescription =
  "Başoğlu Mermer Sanayi, Sultangazi İstanbul'da mermer ve doğal taş ürünleri ile uygulamalarını keşfedin.";
const canonicalOrigin = "https://basoglumermer.com.tr";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Başoğlu Mermer Sanayi | İstanbul Mermer ve Doğal Taş", description: defaultDescription },
  "/hakkimizda": { title: "Hakkımızda | Başoğlu Mermer Sanayi", description: "Başoğlu Mermer Sanayi'nin doğal taş, kalite, işçilik ve hizmet yaklaşımını keşfedin." },
  "/mermerlerimiz": { title: "Mermer Çeşitleri | Başoğlu Mermer Sanayi", description: "Marmara Homojen, Kaplan Postu, Adranos, Akşehir Siyahı, Olivin Maron, Traverten, Burdur Bej, Bursa Açık Bej ve Alexander Black çeşitlerini keşfedin." },
  "/granitler": { title: "Granit Çeşitleri | Başoğlu Mermer Sanayi", description: "Star Galaxy, Tan Brown, Absolute Black ve diğer granit çeşitlerini keşfedin." },
  "/uygulamalarimiz": { title: "Uygulamalarımız | Başoğlu Mermer Sanayi", description: "Mermer ve doğal taşın mutfak, banyo, zemin ve iç mekânlardaki örnek kullanım alanlarını inceleyin." },
  "/iletisim": { title: "İletişim | Başoğlu Mermer Sanayi", description: "Başoğlu Mermer Sanayi'ne Sultangazi İstanbul'daki adresinden, telefonla veya WhatsApp üzerinden ulaşın." },
};

function getPageMeta(pathname: string) {
  if (pageMeta[pathname]) return pageMeta[pathname];
  const product = pathname.startsWith("/urun/")
    ? products.find((item) => item.slug === pathname.slice("/urun/".length))
    : undefined;
  if (product) {
    return {
      title: `${product.name} | Başoğlu Mermer Sanayi`,
      description: `${product.name} doğal taş örneğini keşfedin. Ürün özellikleri, stok ve fiyat bilgisi için Başoğlu Mermer ile iletişime geçin.`,
    };
  }
  if (pathname.startsWith("/mermerlerimiz/")) {
    return { title: "Mermer Kategorileri | Başoğlu Mermer Sanayi", description: pageMeta["/mermerlerimiz"].description };
  }
  if (pathname.startsWith("/granitler/")) {
    return { title: "Granit Kategorileri | Başoğlu Mermer Sanayi", description: pageMeta["/granitler"].description };
  }
  return { title: "Sayfa Bulunamadı | Başoğlu Mermer Sanayi", description: defaultDescription };
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const canonicalUrl = new URL(pathname, canonicalOrigin).toString();
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  }, [pathname]);

  const canonicalUrl = new URL(pathname, canonicalOrigin).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalOrigin}/#business`,
    name: business.name,
    url: canonicalUrl,
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
