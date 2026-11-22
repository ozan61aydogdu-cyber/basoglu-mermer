import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronRight, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductCatalog } from "../components/ProductCatalog";
import {
  applicationCategories,
  applications,
  business,
  marbleColorCategories,
  naturalStoneCategories,
  products,
  whatsappLink,
} from "../data";

const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90";

function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);
  const featuredApplications = applications.slice(0, 4);

  return (
    <main className="route-page home-page">
      <section className="home-hero" id="top">
        <img src={heroImage} alt="Doğal taş yüzeylerin kullanıldığı aydınlık mimari iç mekân" loading="eager" />
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <span className="eyebrow"><span /> BAŞOĞLU MERMER SANAYİ · İSTANBUL</span>
          <h1>Doğanın Zarafeti,<br /><em>Mekânların Karakteri.</em></h1>
          <p>Doğal taşın eşsiz dokusunu, kalite ve estetik anlayışımızla yaşam alanlarına taşıyoruz.</p>
          <div className="home-hero-actions">
            <Link className="button button-light" to="/mermerlerimiz">Mermer Koleksiyonunu Keşfet <ArrowUpRight size={16} /></Link>
            <a className="hero-text-link" href={whatsappLink("Merhaba, doğal taş ürünleriniz hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp ile İletişime Geç
            </a>
          </div>
        </div>
        <div className="home-hero-foot">
          <span>DOĞAL TAŞ · TASARIM · İŞÇİLİK</span>
          <a href="#anasayfa-hakkimizda"><ArrowDown size={16} /> KEŞFET</a>
          <span>SULTANGAZİ · İSTANBUL</span>
        </div>
      </section>

      <section className="home-categories section-pad" id="anasayfa-hakkimizda">
        <div className="content-width">
          <div className="home-section-intro">
            <div>
              <span className="section-kicker">DOĞAL TAŞ KOLEKSİYONU</span>
              <h2 className="section-title">Doğal taşta<br /><em>kendinize ait bir doku.</em></h2>
            </div>
            <Link className="underlined-link" to="/mermerlerimiz">Tüm mermerleri inceleyin <ArrowRight size={16} /></Link>
          </div>
          <div className="category-feature-grid">
            <Link className="category-feature category-feature-large" to="/mermerlerimiz/beyaz-mermerler">
              <img src={products.find((product) => product.slug === "marmara")!.image} alt="Marmara Homojen mermer yüzey görseli" loading="lazy" />
              <span>01 / MERMER</span><strong>Beyaz tonlar</strong><ArrowUpRight size={18} />
            </Link>
            <Link className="category-feature" to="/mermerlerimiz/bej-mermerler">
              <img src={products.find((product) => product.slug === "burdur-beji")!.image} alt="Burdur Bej mermer yüzey görseli" loading="lazy" />
              <span>02 / MERMER</span><strong>Bej palet</strong><ArrowUpRight size={18} />
            </Link>
            <Link className="category-feature" to="/mermerlerimiz">
              <img src={products.find((product) => product.slug === "traverten")!.image} alt="Traverten doğal taş yüzey görseli" loading="lazy" />
              <span>03 / DOĞAL TAŞ</span><strong>Traverten</strong><ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-about section-pad">
        <div className="content-width home-about-grid">
          <div className="home-about-image reveal">
            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=85" alt="Doğal taş detaylı modern iç mekân" loading="lazy" />
            <span>DOĞAL TAŞIN HER PLAKASINDA FARKLI BİR HİKÂYE</span>
          </div>
          <div className="home-about-copy reveal">
            <span className="section-kicker">BAŞOĞLU MERMER SANAYİ</span>
            <h2 className="section-title">Doğal taşta<br /><em>kalite ve estetik.</em></h2>
            <p>Doğal taşın kendine özgü renk ve dokusunu, özenli işçilik ve estetik bir yaklaşımla yaşam alanlarına taşıyoruz.</p>
            <p>Ürünleri inceleyin, ihtiyaçlarınıza uygun seçenekleri birlikte değerlendirmek için bize doğrudan ulaşın.</p>
            <Link className="underlined-link" to="/hakkimizda">Hakkımızda <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="home-products section-pad">
        <div className="content-width">
          <div className="home-section-intro">
            <div>
              <span className="section-kicker">ÜRÜN KEŞFİ</span>
              <h2 className="section-title">Öne çıkan<br /><em>doğal taşlar.</em></h2>
            </div>
            <Link className="underlined-link" to="/mermerlerimiz">Kataloğun tamamı <ArrowRight size={16} /></Link>
          </div>
          <div className="catalog-grid home-product-grid">
            {featuredProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
          </div>
          <p className="catalog-disclaimer">Stok, ebat, yüzey işleme ve güncel fiyat bilgisi için firmayla iletişime geçin.</p>
        </div>
      </section>

      <section className="home-applications section-pad">
        <div className="content-width">
          <div className="home-section-intro">
            <div>
              <span className="section-kicker">UYGULAMA ALANLARI</span>
              <h2 className="section-title">Taşın mekânla<br /><em>buluştuğu yer.</em></h2>
            </div>
            <Link className="underlined-link" to="/uygulamalarimiz">Uygulama galerisini aç <ArrowRight size={16} /></Link>
          </div>
          <div className="home-application-grid">
            {featuredApplications.map((item, index) => (
              <Link className={`home-application home-application-${index + 1}`} to="/uygulamalarimiz" key={item.id}>
                <img src={item.image} alt={`${item.category} için temsilî görsel`} loading="lazy" />
                <span>{item.category}</span><ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <p className="catalog-disclaimer">Görseller örnek amaçlıdır; tamamlanmış Başoğlu Mermer uygulamaları olarak sunulmaz.</p>
        </div>
      </section>

      <section className="home-cta">
        <div className="content-width home-cta-inner">
          <div><span className="section-kicker">BAŞOĞLU MERMER SANAYİ</span><h2>Projeniz için<br /><em>birlikte çalışalım.</em></h2></div>
          <div className="home-cta-actions">
            <a className="button button-light" href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp ile yazın</a>
            <a href={`tel:${business.phone}`} className="home-phone-link"><Phone size={15} /> {business.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="route-page inner-page">
      <section className="page-banner page-banner-photo">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85" alt="Taş yüzeylerin kullanıldığı örnek mimari iç mekân" />
        <div className="page-banner-photo-shade" />
        <div className="content-width page-banner-content">
          <div className="breadcrumbs"><Link to="/">Ana Sayfa</Link><span>/</span><span>Hakkımızda</span></div>
          <span className="eyebrow"><span /> BAŞOĞLU MERMER SANAYİ</span>
          <h1>Doğal taşta<br /><em>kalite ve özen.</em></h1>
          <p>Doğal taşın kendine özgü karakterini, müşteri memnuniyeti ve estetik çözümlerle buluşturuyoruz.</p>
        </div>
      </section>
      <section className="about-story section-pad">
        <div className="content-width about-story-grid">
          <div className="about-story-copy reveal">
            <span className="section-kicker">HAKKIMIZDA</span>
            <h2 className="section-title">Başoğlu Mermer<br /><em>Sanayi</em></h2>
            <p><strong>30 yılı aşkın deneyimiyle</strong> Başoğlu Mermer Sanayi, doğal taş sektöründe mermer, granit, traverten ve özel taş çözümlerinde kapsamlı bir hizmet anlayışı sunar.</p>
            <p>İstanbul Sultangazi’de müşterilerimizin ihtiyaçlarını taşın renk, doku ve damar karakterine göre titizlikle değerlendirir; konut, otel, ticari yapı, mimari uygulama ve özel tasarım projeleri için güvenilir seçim ve profesyonel işçilik desteği sağlar.</p>
            <p>Yurtiçi çalışmalarının yanı sıra yurt dışı işlerde ve uluslararası doğal taş tedarikinde edindiği deneyimle, plaka, kesim, yüzey işlemleri, uygulama ve teslimat süreçlerinde titiz, şeffaf ve müşteri odaklı bir yaklaşım benimser.</p>
            <p>Her plakada oluşan doğal renk ve damar farkları göz önünde bulundurulur; doğru ürünün seçilmesi, uygun yüzey işlemesinin belirlenmesi ve uygulama detaylarının müşterimizle birlikte planlanması esastır.</p>
            <a className="button button-dark" href={business.whatsapp} target="_blank" rel="noreferrer">Bize WhatsApp'tan ulaşın <ArrowUpRight size={16} /></a>
          </div>
          <figure className="about-story-image reveal">
            <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85" alt="Doğal taş görünümünde yüzey örneği" loading="lazy" />
            <figcaption>Görsel temsilidir. Gerçek ürün dokusu plakaya göre değişebilir.</figcaption>
          </figure>
        </div>
      </section>
      <section className="about-values-band">
        <div className="content-width about-values-list">
          {["Doğal Taş", "Kaliteli Ürün", "Özenli İşçilik", "Estetik Çözümler", "Müşteri Memnuniyeti"].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>
    </main>
  );
}

function CatalogPage({ group }: { group: "marble" | "natural" }) {
  const { categorySlug } = useParams();
  const categories = group === "marble" ? marbleColorCategories : naturalStoneCategories;
  if (categorySlug && !categories.some((category) => category.slug === categorySlug)) return <NotFoundPage />;
  return <ProductCatalog group={group} />;
}

function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFoundPage />;

  const relatedProducts = products.filter((item) => item.slug !== product.slug && item.group === product.group).slice(0, 3);
  const catalogPath = product.group === "marble" ? "/mermerlerimiz" : "/granitler";

  return (
    <main className="route-page product-detail-page">
      <div className="content-width">
        <div className="breadcrumbs product-breadcrumbs">
          <Link to="/">Ana Sayfa</Link><span>/</span><Link to={catalogPath}>{product.group === "marble" ? "Mermerlerimiz" : "Granitler"}</Link><span>/</span><span>{product.name}</span>
        </div>
        <section className="product-detail-layout">
          <div className="product-detail-image reveal">
            <img
              src={product.image}
              alt={`${product.name} ${product.group === "marble" ? "mermer" : "granit"} yüzey görseli`}
            />
            <span>ÜRÜN YÜZEYİ İNCELEME GÖRSELİ</span>
          </div>
          <div className="product-detail-copy reveal">
            <span className="section-kicker">{product.group === "marble" ? product.colorCategory : product.stoneType}</span>
            <h1>{product.name}</h1>
            <p className="product-detail-lead">{product.description}</p>
            <p className="product-detail-body">{product.detail}</p>
            <dl className="product-spec-list">
              <div><dt>Taş türü</dt><dd>{product.stoneType}</dd></div>
              <div><dt>Renk grubu</dt><dd>{product.color}</dd></div>
              <div><dt>Yüzey örnekleri</dt><dd>{product.surfaceExamples.join(" · ")}</dd></div>
            </dl>
            <p className="finish-disclaimer">Yüzey adları genel bilgilendirme örneğidir. Her taş ve uygulama için uygunluk, stok ve fiyat bilgisi firmadan teyit edilmelidir.</p>
            <div className="product-detail-actions">
              <a className="button button-dark" href={whatsappLink(`Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`)} target="_blank" rel="noreferrer">
                Bu Ürün Hakkında Bilgi Al <MessageCircle size={16} />
              </a>
              <a className="button button-outline-dark" href={`tel:${business.phone}`}><Phone size={15} /> Ara</a>
            </div>
            <a className="underlined-link" href={business.whatsapp} target="_blank" rel="noreferrer">Fiyat ve tedarik bilgisi isteyin <ArrowRight size={16} /></a>
          </div>
        </section>
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <div className="home-section-intro">
              <div><span className="section-kicker">KEŞFETMEYE DEVAM EDİN</span><h2 className="section-title">Benzer <em>ürün grupları.</em></h2></div>
              <Link className="underlined-link" to={catalogPath}>Kataloğa dön <ArrowRight size={16} /></Link>
            </div>
            <div className="catalog-grid">
              {relatedProducts.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function GalleryLightbox({ image, onClose }: { image: (typeof applications)[number]; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("dialog-is-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("dialog-is-open");
    };
  }, [onClose]);

  return (
    <div className="gallery-lightbox" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <figure role="dialog" aria-modal="true" aria-label={`${image.category}: ${image.title}`}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Görseli kapat"><X size={21} /></button>
        <img src={image.image} alt={`${image.category} için temsilî uygulama görseli`} />
        <figcaption><span>{image.category}</span><strong>{image.title}</strong><small>Temsilî görsel</small></figcaption>
      </figure>
    </div>
  );
}

function ApplicationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");
  const [selectedImage, setSelectedImage] = useState<(typeof applications)[number] | null>(null);
  const filteredApplications = activeCategory === "Tümü"
    ? applications
    : applications.filter((item) => item.category === activeCategory);

  return (
    <main className="route-page applications-page">
      <section className="page-banner">
        <div className="content-width page-banner-content">
          <div className="breadcrumbs"><Link to="/">Ana Sayfa</Link><span>/</span><span>Uygulamalarımız</span></div>
          <span className="eyebrow"><span /> TAŞIN MEKÂNLA BULUŞMASI</span>
          <h1>Uygulamalarımız</h1>
          <p>Mermer ve doğal taşın farklı kullanım alanlarına dair seçilmiş görsel öneriler.</p>
        </div>
      </section>
      <section className="applications-gallery section-pad">
        <div className="content-width">
          <div className="gallery-filter" role="group" aria-label="Uygulama kategorileri">
            <button type="button" className={activeCategory === "Tümü" ? "active" : ""} onClick={() => setActiveCategory("Tümü")}>Tümü</button>
            {applicationCategories.map((category) => (
              <button type="button" className={activeCategory === category ? "active" : ""} key={category} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <div className="work-gallery-grid">
            {filteredApplications.map((item, index) => (
              <button className={`work-gallery-item work-gallery-item-${index % 5}`} key={item.id} type="button" onClick={() => setSelectedImage(item)} aria-label={`${item.category}: görseli büyüt`}>
                <img src={item.image} alt={`${item.category} için temsilî görsel`} loading="lazy" />
                <span>{item.category}</span><strong>{item.title}</strong><ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <p className="catalog-disclaimer">Bu galerideki fotoğraflar görsel öneri amaçlıdır; Başoğlu Mermer tarafından tamamlanmış gerçek projeler olarak sunulmaz. Şirket fotoğrafları sağlandığında kolayca değiştirilebilir.</p>
        </div>
      </section>
      {selectedImage && <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </main>
  );
}

function ContactPage() {
  return (
    <main className="route-page contact-page">
      <section className="page-banner">
        <div className="content-width page-banner-content">
          <div className="breadcrumbs"><Link to="/">Ana Sayfa</Link><span>/</span><span>İletişim</span></div>
          <span className="eyebrow"><span /> BAŞOĞLU MERMER SANAYİ</span>
          <h1>Size yardımcı<br /><em>olmaktan mutluluk duyarız.</em></h1>
          <p>Ürün, fiyat ve uygulama bilgisi için telefonla ya da WhatsApp üzerinden bize ulaşın.</p>
        </div>
      </section>
      <section className="contact-page-content section-pad">
        <div className="content-width contact-page-grid">
          <div className="contact-page-info reveal">
            <span className="section-kicker">İLETİŞİM BİLGİLERİ</span>
            <h2>Başoğlu Mermer Sanayi</h2>
            <p>Mermer ve doğal taş seçenekleri hakkında doğrudan bilgi alın.</p>
            <a className="contact-info-line" href={`tel:${business.phone}`}><Phone size={18} /><span><small>TELEFON</small><strong>{business.phoneDisplay}</strong></span><ArrowUpRight size={16} /></a>
            <a className="contact-info-line" href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WHATSAPP</small><strong>Mesaj gönderin</strong></span><ArrowUpRight size={16} /></a>
            <div className="contact-info-line contact-address"><MapPin size={18} /><span><small>ADRES</small><strong>{business.addressLines[0]}<br />{business.addressLines[1]}</strong></span></div>
            <a className="button button-dark contact-map-link" href={business.directionsUrl} target="_blank" rel="noreferrer">Google Maps'te yol tarifi <ArrowUpRight size={16} /></a>
          </div>
          <div className="contact-map reveal">
            <iframe
              title="Başoğlu Mermer Sanayi, Sultangazi İstanbul konum haritası"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a href={business.directionsUrl} target="_blank" rel="noreferrer"><MapPin size={14} /> Yol tarifi al <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="route-page not-found-page">
      <div className="content-width">
        <span className="section-kicker">404 · SAYFA BULUNAMADI</span>
        <h1>Aradığınız sayfayı<br /><em>bulamadık.</em></h1>
        <Link className="button button-dark" to="/">Ana sayfaya dön <ChevronRight size={16} /></Link>
      </div>
    </main>
  );
}

export {
  AboutPage,
  ApplicationsPage,
  CatalogPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProductDetailPage,
};
