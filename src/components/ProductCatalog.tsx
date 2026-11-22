import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  marbleColorCategories,
  naturalStoneCategories,
  products,
  surfaceFinishes,
  type CatalogGroup,
  type Product,
} from "../data";
import { ProductCard } from "./ProductCard";

function normaliseSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ı/g, "i")
    .trim();
}

function matchesSearch(product: Product, search: string) {
  if (!search) return true;
  const searchableText = [
    product.name,
    product.description,
    product.color,
    product.stoneType,
    product.colorCategory ?? "",
    ...product.surfaceExamples,
    ...(product.searchTerms ?? []),
  ].join(" ");
  return normaliseSearch(searchableText).includes(normaliseSearch(search));
}

export function ProductCatalog({ group }: { group: CatalogGroup }) {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const categories = group === "marble" ? marbleColorCategories : naturalStoneCategories;
  const activeCategory = categories.find((category) => category.slug === categorySlug);
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [stoneFilter, setStoneFilter] = useState("");
  const [finishFilter, setFinishFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");

  useEffect(() => {
    setSearch("");
    setColorFilter("");
    setStoneFilter("");
    setFinishFilter("");
    setSortOrder("featured");
  }, [categorySlug, group]);

  const groupProducts = products.filter((product) => product.group === group);
  const visibleProducts = useMemo(() => {
    const filtered = groupProducts.filter((product) => {
      const inCategory = !activeCategory
        || (group === "marble"
          ? product.colorCategory === activeCategory.label
          : product.stoneType === activeCategory.label);
      return inCategory
        && matchesSearch(product, search)
        && (!colorFilter || product.colorCategory === colorFilter || product.color === colorFilter)
        && (!stoneFilter || product.stoneType === stoneFilter)
        && (!finishFilter || product.surfaceExamples.includes(finishFilter as Product["surfaceExamples"][number]));
    });

    return filtered.sort((left, right) => {
      if (sortOrder === "az") return left.name.localeCompare(right.name, "tr");
      if (sortOrder === "za") return right.name.localeCompare(left.name, "tr");
      return Number(Boolean(right.featured)) - Number(Boolean(left.featured))
        || left.name.localeCompare(right.name, "tr");
    });
  }, [activeCategory, colorFilter, finishFilter, group, groupProducts, search, sortOrder, stoneFilter]);

  const resetFilters = () => {
    setSearch("");
    setColorFilter("");
    setStoneFilter("");
    setFinishFilter("");
    setSortOrder("featured");
    navigate(group === "marble" ? "/mermerlerimiz" : "/granitler");
  };

  const heading = activeCategory?.label ?? (group === "marble" ? "Mermerlerimiz" : "Granitler");
  const subtitle = group === "marble"
    ? "Türkiye'den mermer çeşitlerini renklerine göre keşfedin."
    : "Doğanın sınırlarını aşan güçlü granit çeşitlerini keşfedin.";

  return (
    <main className="route-page catalog-page">
      <section className="page-banner">
        <div className="content-width page-banner-content">
          <div className="breadcrumbs"><Link to="/">Ana Sayfa</Link><span>/</span><span>{heading}</span></div>
          <span className="eyebrow"><span /> BAŞOĞLU MERMER SANAYİ</span>
          <h1>{heading}</h1>
          <p>{subtitle} Stok, ölçü, yüzey seçeneği ve güncel fiyat bilgisi için bize danışın.</p>
        </div>
      </section>
      <section className="catalog-section section-pad">
        <div className="content-width">
          <div className="catalog-header">
            <div>
              <span className="section-kicker">ÜRÜN KEŞFİ</span>
              <h2>{visibleProducts.length} <span>ürün grubu</span></h2>
            </div>
            <label className="catalog-search">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ürün ara (örn. beyaz mermer)"
                aria-label="Ürünlerde ara"
              />
              {search && <button type="button" onClick={() => setSearch("")} aria-label="Aramayı temizle"><X size={15} /></button>}
            </label>
          </div>

          <nav className="catalog-categories" aria-label="Ürün kategorileri">
            <Link className={!activeCategory ? "category-active" : ""} to={group === "marble" ? "/mermerlerimiz" : "/granitler"}>Tümü</Link>
            {categories.map((category) => (
              <Link
                className={categorySlug === category.slug ? "category-active" : ""}
                key={category.slug}
                to={`${group === "marble" ? "/mermerlerimiz" : "/granitler"}/${category.slug}`}
                aria-current={categorySlug === category.slug ? "page" : undefined}
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <details className="filter-disclosure">
            <summary><SlidersHorizontal size={15} /> Renk, taş türü ve yüzey filtreleri</summary>
            <div className="advanced-filters">
              <label>
                Renk
                <select value={colorFilter} onChange={(event) => setColorFilter(event.target.value)}>
                  <option value="">Tüm renkler</option>
                  {Array.from(new Set(groupProducts.map((product) => product.colorCategory ?? product.color))).sort((a, b) => a.localeCompare(b, "tr")).map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </label>
              <label>
                Taş türü
                <select value={stoneFilter} onChange={(event) => setStoneFilter(event.target.value)}>
                  <option value="">Tüm taş türleri</option>
                  {Array.from(new Set(groupProducts.map((product) => product.stoneType))).sort((a, b) => a.localeCompare(b, "tr")).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label>
                Yüzey örneği
                <select value={finishFilter} onChange={(event) => setFinishFilter(event.target.value)}>
                  <option value="">Tüm yüzey örnekleri</option>
                  {surfaceFinishes.map((finish) => <option key={finish} value={finish}>{finish}</option>)}
                </select>
              </label>
              <label>
                Sıralama
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option value="featured">Öne çıkanlar</option>
                  <option value="az">Alfabetik: A–Z</option>
                  <option value="za">Alfabetik: Z–A</option>
                </select>
              </label>
              {(colorFilter || stoneFilter || finishFilter || search || activeCategory) && (
                <button className="clear-filters" type="button" onClick={resetFilters}>Filtreleri temizle <X size={14} /></button>
              )}
            </div>
            <p className="filter-note">Yüzey adları genel bilgilendirme örneğidir; her taş ve uygulama için uygunluk ayrıca teyit edilmelidir.</p>
          </details>

          {visibleProducts.length ? (
            <div className="catalog-grid">
              {visibleProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
            </div>
          ) : (
            <div className="empty-results">
              <h2>Aramanızla eşleşen ürün bulunamadı.</h2>
              <p>Farklı bir kelime deneyebilir veya filtreleri temizleyebilirsiniz.</p>
              <button className="button button-dark" type="button" onClick={resetFilters}>Filtreleri temizle</button>
            </div>
          )}
          <p className="catalog-disclaimer">Doğal taşın renk, damar ve kristal görünümü plakaya göre değişebilir. Stok ve güncel tedarik durumu firmadan teyit edilmelidir.</p>
        </div>
      </section>
    </main>
  );
}
