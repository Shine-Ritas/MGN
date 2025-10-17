import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _adsbygoogleLoaded?: boolean;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function GoogleTestAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // 1️⃣ Load Google Ads script only once
    if (!window._adsbygoogleLoaded) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9433165378532456";
      s.crossOrigin = "anonymous";
      s.onload = () => {
        window._adsbygoogleLoaded = true;
        renderAd();
      };
      document.head.appendChild(s);
    } else {
      renderAd();
    }

    // 2️⃣ Function to create <ins> and push ad
    function renderAd() {
      if (!adRef.current) return;

      // Clear previous content to prevent duplicate ads
      adRef.current.innerHTML = "";

      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", "ca-pub-9433165378532456");
      ins.setAttribute("data-ad-slot", "4739513364");
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");

      adRef.current.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("adsbygoogle push skipped (already rendered)", e);
      }
    }

    // 3️⃣ Cleanup on unmount
    return () => {
      if (adRef.current) adRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={adRef}></div>;
}
