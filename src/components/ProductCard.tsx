import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappLink, type Product } from "../data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className={`catalog-card reveal${index % 3 === 1 ? " reveal-later" : ""}`}>
      <Link className="catalog-card-image" to={`/urun/${product.slug}`} aria-label={`${product.name} ürün detaylarını incele`}>
        <img
          src={product.image}
          alt={`${product.name} ${product.group === "marble" ? "mermer" : "granit"} yüzey görseli`}
          loading="lazy"
        />
        <span className="catalog-card-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="catalog-card-open"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="catalog-card-meta">
        <span>{product.group === "marble" ? product.colorCategory : product.stoneType}</span>
        <span>{product.color}</span>
      </div>
      <h3><Link to={`/urun/${product.slug}`}>{product.name}</Link></h3>
      <p className="catalog-card-description">{product.description}</p>
      <div className="catalog-card-actions">
        <Link className="catalog-detail-link" to={`/urun/${product.slug}`}>Ürünü İncele <ArrowUpRight size={14} /></Link>
        <a
          className="catalog-whatsapp"
          href={whatsappLink(`Merhaba, ${product.name} hakkında fiyat ve bilgi almak istiyorum.`)}
          target="_blank"
          rel="noreferrer"
          aria-label={`${product.name} için WhatsApp'tan fiyat ve bilgi al`}
        >
          <MessageCircle size={16} /><span>Fiyat ve Bilgi Al</span>
        </a>
      </div>
    </article>
  );
}
