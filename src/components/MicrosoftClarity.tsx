"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function MicrosoftClarity() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("gdpr-consent-accepted") === "true") {
      setConsented(true);
      return;
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "gdpr-consent-accepted" && e.newValue === "true") {
        setConsented(true);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!consented) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","wib1x4kxzt");`,
      }}
    />
  );
}
