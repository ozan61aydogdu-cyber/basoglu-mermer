import { useEffect, useState } from "react";

const splashImages = [
  "/images/products/marmara.jpg",
  "/images/products/traverten.jpg",
  "/images/products/star-galaxy.jpg",
];

export function BrandSplash({ onComplete }: { onComplete: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const imageTimer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % splashImages.length);
    }, 850);
    const leavingTimer = window.setTimeout(() => setLeaving(true), 2700);
    const completeTimer = window.setTimeout(onComplete, 3200);

    return () => {
      window.clearInterval(imageTimer);
      window.clearTimeout(leavingTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`brand-splash${leaving ? " brand-splash-leaving" : ""}`} aria-label="Başoğlu Mermer Sanayi">
      <div className="brand-splash-images" aria-hidden="true">
        {splashImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            className={index === activeImage ? "brand-splash-image-active" : ""}
          />
        ))}
      </div>
      <div className="brand-splash-shade" />
      <div className="brand-splash-copy">
        <span className="brand-splash-monogram">B</span>
        <span className="brand-splash-eyebrow">DOĞAL TAŞ · ESTETİK · İŞÇİLİK</span>
        <h1>BAŞOĞLU<br /><em>MERMER SANAYİ</em></h1>
      </div>
    </div>
  );
}
