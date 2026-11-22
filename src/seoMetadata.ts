import metadata from "./seoMetadata.json";

export type PageMetadata = {
  title: string;
  description: string;
};

export const canonicalOrigin = metadata.canonicalOrigin;
export const defaultDescription = metadata.defaultDescription;
export const pageMeta: Record<string, PageMetadata> = metadata.pageMeta;

export function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function canonicalPathname(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath === "/" ? "/" : `${normalizedPath}/`;
}

export function getRouteMetadata(pathname: string): PageMetadata {
  const normalizedPath = normalizePathname(pathname);
  if (pageMeta[normalizedPath]) return pageMeta[normalizedPath];

  if (normalizedPath.startsWith("/mermerlerimiz/")) {
    return {
      title: "Mermer Kategorileri | Başoğlu Mermer Sanayi",
      description: pageMeta["/mermerlerimiz"].description,
    };
  }

  if (normalizedPath.startsWith("/granitler/")) {
    return {
      title: "Granit Kategorileri | Başoğlu Mermer Sanayi",
      description: pageMeta["/granitler"].description,
    };
  }

  if (normalizedPath.startsWith("/urun/")) {
    return {
      title: "Doğal Taş Ürünleri | Başoğlu Mermer Sanayi",
      description: "Başoğlu Mermer doğal taş ürünleri; ürün özellikleri, stok ve fiyat bilgisi için bizimle iletişime geçin.",
    };
  }

  return {
    title: "Sayfa Bulunamadı | Başoğlu Mermer Sanayi",
    description: defaultDescription,
  };
}
