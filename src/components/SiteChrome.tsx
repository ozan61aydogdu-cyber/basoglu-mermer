import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { business, whatsappLink } from "../data";

const links = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "Mermerlerimiz", to: "/mermerlerimiz" },
  { label: "Granitler", to: "/granitler" },
  { label: "Uygulamalarımız", to: "/uygulamalarimiz" },
  { label: "İletişim", to: "/iletisim" },
];

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand${light ? " brand-inverse" : ""}`} to="/" aria-label="Başoğlu Mermer ana sayfa">
      <span className="brand-monogram" aria-hidden="true">B</span>
      <span className="brand-name">BAŞOĞLU <span>MERMER SANAYİ</span></span>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const solidHeader = pathname !== "/" || scrolled || menuOpen;

  return (
    <header className={`site-header${solidHeader ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Ana menü">
          {links.map((link) => (
            <NavLink className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`} end={link.to === "/"} key={link.to} to={link.to}>{link.label}</NavLink>
          ))}
          <a
            className="nav-link"
            href={business.directionsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Başoğlu Mermer mağazasına Google Maps ile yol tarifi"
          >
            Yol Tarifi
          </a>
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={`tel:${business.phone}`} aria-label={`Ara: ${business.phoneDisplay}`}>
            <Phone size={15} />
            <span className="header-phone-copy">
              <span>{business.phoneDisplay}</span>
              <small>Mustafa Baş</small>
            </span>
          </a>
          <a className="header-cta" href={business.whatsapp} target="_blank" rel="noreferrer">
            Teklif Al <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>
        </div>
        <button
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav className={`mobile-nav${menuOpen ? " mobile-nav-open" : ""}`} id="mobile-navigation" aria-label="Mobil menü" aria-hidden={!menuOpen}>
        {links.map((link) => (
          <NavLink className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`} end={link.to === "/"} key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
        ))}
        <a
          className="nav-link"
          href={business.directionsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Yol Tarifi
        </a>
        <a className="mobile-nav-cta" href={`tel:${business.phone}`} onClick={() => setMenuOpen(false)}><Phone size={15} /> Ara: {business.phoneDisplay}</a>
        <a className="mobile-nav-cta" href={business.whatsapp} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><MessageCircle size={15} /> WhatsApp ile Teklif Al <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}

export function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Brand light />
            <p>Mermer ve doğal taş koleksiyonlarını, uygulama fikirlerini ve ürün bilgilerini keşfedin.</p>
            <a className="footer-social" href={business.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp üzerinden yazın <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-links">
            <span>KEŞFEDİN</span>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/hakkimizda">Hakkımızda</Link>
            <Link to="/mermerlerimiz">Mermerlerimiz</Link>
            <Link to="/granitler">Granitler</Link>
            <Link to="/uygulamalarimiz">Uygulamalarımız</Link>
          </div>
          <div className="footer-links footer-contact-links">
            <span>İLETİŞİM</span>
            <a href={`${import.meta.env.BASE_URL}image-credits.html`}>Görsel kaynakları</a>
            <a href={`tel:${business.phone}`}><Phone size={13} /> {business.phoneDisplay}</a>
            <a href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={13} /> WhatsApp</a>
            <a href={business.mapUrl} target="_blank" rel="noreferrer"><MapPin size={13} /> {business.address}</a>
            <a href={business.directionsUrl} target="_blank" rel="noreferrer"><MapPin size={13} /> Google Maps'te Yol Tarifi</a>
          </div>
          <Link className="footer-top-link" to="/" aria-label="Sayfanın başına dön" onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}><ArrowUpRight size={19} /></Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BAŞOĞLU MERMER SANAYİ</span>
          <span>Doğal taş, kendine özgü bir iz bırakır.</span>
          <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-contact"
      href={whatsappLink("Merhaba, doğal taş ürünleriniz hakkında bilgi almak istiyorum.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Başgöğlu Mermer ile WhatsApp üzerinden iletişime geç"
    >
      <MessageCircle size={17} />
      <span>WHATSAPP</span>
    </a>
  );
}
