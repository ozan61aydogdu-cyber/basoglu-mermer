export type CatalogGroup = "marble" | "natural";

export type MarbleColorCategory =
  | "Beyaz Mermerler"
  | "Bej Mermerler"
  | "Krem Mermerler"
  | "Gri Mermerler"
  | "Siyah Mermerler"
  | "Kahverengi Mermerler"
  | "Yeşil Mermerler"
  | "Kırmızı ve Bordo Mermerler"
  | "Pembe Mermerler"
  | "Sarı Mermerler"
  | "Damarlı Mermerler";

export type NaturalStoneType =
  | "Granit";

export type SurfaceFinish =
  | "Cilalı"
  | "Honlu"
  | "Patinatolu"
  | "Fırçalı"
  | "Kumlamalı"
  | "Eskitme"
  | "Doğal yüzey";

export type Product = {
  slug: string;
  name: string;
  group: CatalogGroup;
  colorCategory: MarbleColorCategory | null;
  stoneType: string;
  color: string;
  description: string;
  detail: string;
  image: string;
  surfaceExamples: SurfaceFinish[];
  featured?: boolean;
  searchTerms?: string[];
};

export const marbleColorCategories: { label: MarbleColorCategory; slug: string }[] = [
  { label: "Beyaz Mermerler", slug: "beyaz-mermerler" },
  { label: "Bej Mermerler", slug: "bej-mermerler" },
  { label: "Siyah Mermerler", slug: "siyah-mermerler" },
  { label: "Yeşil Mermerler", slug: "yesil-mermerler" },
];

export const naturalStoneCategories: { label: NaturalStoneType; slug: string }[] = [
  { label: "Granit", slug: "granit" },
];

export const surfaceFinishes: SurfaceFinish[] = [
  "Cilalı",
  "Honlu",
  "Patinatolu",
  "Fırçalı",
  "Kumlamalı",
  "Eskitme",
  "Doğal yüzey",
];

const photos = {
  marmara: `${import.meta.env.BASE_URL}images/products/marmara.jpg`,
  kaplanpostu: `${import.meta.env.BASE_URL}images/products/kaplanpostu.jpg`,
  adranos: `${import.meta.env.BASE_URL}images/products/adranos.jpg`,
  aksehir: `${import.meta.env.BASE_URL}images/products/aksehir-siyahi.jpg`,
  olivin: `${import.meta.env.BASE_URL}images/products/olivin-maron.jpg`,
  traverten: `${import.meta.env.BASE_URL}images/products/traverten.jpg`,
  burdur: `${import.meta.env.BASE_URL}images/products/burdur-beji.jpg`,
  bursa: `${import.meta.env.BASE_URL}images/products/bursa-beji.jpg`,
  alexander: `${import.meta.env.BASE_URL}images/products/alexander-black.jpg`,
  starGalaxy: `${import.meta.env.BASE_URL}images/products/star-galaxy.jpg`,
  desertBlack: `${import.meta.env.BASE_URL}images/products/desert-black.jpg`,
  hackBlack: `${import.meta.env.BASE_URL}images/products/hack-black.jpg`,
  rosaPorrino: `${import.meta.env.BASE_URL}images/products/rosa-porrino.jpg`,
  rosaMinho: `${import.meta.env.BASE_URL}images/products/rosa-minho.jpg`,
  tanBrown: `${import.meta.env.BASE_URL}images/products/tan-brown.jpg`,
  verdeStar: `${import.meta.env.BASE_URL}images/products/verde-star.jpg`,
  verdeGuatemala: `${import.meta.env.BASE_URL}images/products/verde-guatemala.jpg`,
  absolute: `${import.meta.env.BASE_URL}images/products/absolute-black.jpg`,
};

const marble = (
  slug: string,
  name: string,
  colorCategory: MarbleColorCategory,
  color: string,
  description: string,
  image: string,
  surfaceExamples: SurfaceFinish[],
  featured = false,
  searchTerms: string[] = [],
): Product => ({
  slug,
  name,
  group: "marble",
  colorCategory,
  stoneType: "Mermer",
  color,
  description,
  detail: `${description} Doğal taşın renk, damar ve plaka hareketleri plakaya göre değişebilir. Güncel stok, ebat ve yüzey seçenekleri için Başoğlu Mermer ile iletişime geçin.`,
  image,
  surfaceExamples,
  featured,
  searchTerms,
});

const naturalStone = (
  slug: string,
  name: string,
  stoneType: NaturalStoneType,
  color: string,
  description: string,
  image: string,
  surfaceExamples: SurfaceFinish[],
  featured = false,
  searchTerms: string[] = [],
): Product => ({
  slug,
  name,
  group: "natural",
  colorCategory: null,
  stoneType,
  color,
  description,
  detail: `${description} Doğal taşın renk, kristal yapısı ve plakaya göre oluşan doku farklılıkları olabilir. Güncel stok, ebat ve yüzey seçenekleri için Başoğlu Mermer ile iletişime geçin.`,
  image,
  surfaceExamples,
  featured,
  searchTerms,
});

export const products: Product[] = [
  marble("marmara", "Marmara Homojen", "Beyaz Mermerler", "Beyaz", "Balıkesir kökenli homojen beyaz mermer.", photos.marmara, ["Cilalı", "Honlu"], true),
  marble("kaplanpostu", "Kaplan Postu", "Siyah Mermerler", "Gri / Siyah", "Koyu zemin üzerinde hareketli açık damar ve benekler.", photos.kaplanpostu, ["Cilalı", "Honlu"], true),
  marble("adranos", "Adranos", "Siyah Mermerler", "Siyah / Gri", "Siyah damarlı ve dengeli yüzey karakteri.", photos.adranos, ["Cilalı", "Honlu"], false),
  marble("aksehir-siyahi", "Akşehir Siyahı", "Siyah Mermerler", "Siyah", "Konya kökenli doğal siyah mermer.", photos.aksehir, ["Cilalı", "Honlu"], true),
  marble("olivin-maron", "Olivin Maron", "Yeşil Mermerler", "Yeşil / Kahverengi", "Doğal yeşil tonları ve kahverengi damar geçişleri.", photos.olivin, ["Cilalı", "Honlu"], true),
  marble("traverten", "Traverten", "Bej Mermerler", "Bej / Krem", "Gözenekli dokusu ve sıcak bej tonlarıyla karakterli doğal taş.", photos.traverten, ["Cilalı", "Honlu", "Patinatolu", "Eskitme"], true),
  marble("burdur-beji", "Burdur Bej", "Bej Mermerler", "Bej", "Burdur kökenli bej tonlu ve hafif beyaz desenli mermer.", photos.burdur, ["Cilalı", "Honlu"], true),
  marble("bursa-beji", "Bursa Açık Bej", "Bej Mermerler", "Bej", "Bursa bölgesinden beyaza yakın bej tonlu mermer.", photos.bursa, ["Cilalı", "Honlu"], false),
  marble("alexander-black", "Alexander Black", "Siyah Mermerler", "Siyah", "Mersin kökenli derin siyah mermer.", photos.alexander, ["Cilalı", "Honlu"], true),

  naturalStone("star-galaxy", "Star Galaxy", "Granit", "Siyah", "Siyah zemin üzerinde yıldız benzeri mineral parıltıları.", photos.starGalaxy, ["Cilalı", "Honlu"], true),
  naturalStone("desert-black", "Desert Black", "Granit", "Siyah", "Derin siyah tonlu güçlü granit yüzeyi.", photos.desertBlack, ["Cilalı", "Honlu"], false),
  naturalStone("hack-black", "Hack Black", "Granit", "Siyah", "Siyah renk paletinde dengeli doğal granit dokusu.", photos.hackBlack, ["Cilalı", "Honlu"], false),
  naturalStone("rosa-porrino", "Rosa Porrino", "Granit", "Pembe / Gri", "Pembe ve gri kristal geçişleriyle karakterli granit.", photos.rosaPorrino, ["Cilalı", "Honlu"], true),
  naturalStone("rosa-minho", "Rosa Minho", "Granit", "Pembe / Bej", "Açık pembe-bej kristal dokulu granit.", photos.rosaMinho, ["Cilalı", "Honlu"], false),
  naturalStone("tan-brown", "Tan Brown", "Granit", "Kahverengi / Siyah", "Kahverengi ve siyah kristal dengesi.", photos.tanBrown, ["Cilalı", "Honlu"], true),
  naturalStone("verde-star", "Verde Star", "Granit", "Yeşil / Siyah", "Yeşil tonlu zemin ve koyu kristal detayları.", photos.verdeStar, ["Cilalı", "Honlu"], false),
  naturalStone("verde-guatemala", "Verde Guatemala", "Granit", "Yeşil / Siyah", "Zengin yeşil damar ve siyah kristal dokusu.", photos.verdeGuatemala, ["Cilalı", "Honlu"], true),
  naturalStone("absolute-black", "Absolute Black", "Granit", "Siyah", "Tekdüze koyu siyah yüzey karakteri.", photos.absolute, ["Cilalı", "Honlu"], true),
];

export const applicationCategories = [
  "Mutfak Tezgâhları",
  "Banyo Uygulamaları",
  "Merdiven Kaplamaları",
  "Zemin Döşemeleri",
  "Duvar Kaplamaları",
  "İç Mekân Uygulamaları",
  "Özel Mermer İşçilikleri",
] as const;

export type ApplicationCategory = (typeof applicationCategories)[number];

const applicationPhotos = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85",
];

export const applications = [
  { id: "counter-01", title: "Taş ve ışık", category: "Mutfak Tezgâhları", image: applicationPhotos[0] },
  { id: "bath-01", title: "Sakin yüzeyler", category: "Banyo Uygulamaları", image: applicationPhotos[1] },
  { id: "stair-01", title: "Doğal geçiş", category: "Merdiven Kaplamaları", image: applicationPhotos[2] },
  { id: "floor-01", title: "Açık mekân", category: "Zemin Döşemeleri", image: applicationPhotos[3] },
  { id: "wall-01", title: "Dokuya odaklanın", category: "Duvar Kaplamaları", image: applicationPhotos[4] },
  { id: "interior-01", title: "Malzeme uyumu", category: "İç Mekân Uygulamaları", image: applicationPhotos[5] },
  { id: "craft-01", title: "Özel detay", category: "Özel Mermer İşçilikleri", image: applicationPhotos[6] },
  { id: "counter-02", title: "Yalın mutfak", category: "Mutfak Tezgâhları", image: applicationPhotos[7] },
  { id: "bath-02", title: "Doğal tonlar", category: "Banyo Uygulamaları", image: applicationPhotos[8] },
  { id: "wall-02", title: "Mekânsal ritim", category: "Duvar Kaplamaları", image: applicationPhotos[9] },
] satisfies { id: string; title: string; category: ApplicationCategory; image: string }[];

export const business = {
  name: "BAŞOĞLU MERMER SANAYİ",
  phoneDisplay: "0539 565 79 07",
  phone: "+905395657907",
  whatsapp: "https://wa.me/905395657907",
  address: "İsmetpaşa Mahallesi, 91. Sokak, No: 45/1, Sultangazi, İstanbul, Türkiye",
  addressLines: ["İsmetpaşa Mahallesi, 91. Sokak, No: 45/1", "Sultangazi, İstanbul, Türkiye"],
  mapUrl: `https://maps.google.com/?q=${encodeURIComponent("İsmetpaşa Mahallesi, 91. Sokak, No: 45/1, Sultangazi, İstanbul, Türkiye")}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("İsmetpaşa Mahallesi, 91. Sokak, No: 45/1, Sultangazi, İstanbul, Türkiye")}`,
};

export function whatsappLink(message: string): string {
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
