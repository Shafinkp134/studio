"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SantaLogo() {
  const [isDecember, setIsDecember] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setIsDecember(currentMonth === 11);
  }, []);

  if (!isDecember) {
    return (
      <Link href="/" className="flex items-center gap-2">
        <span className="font-bold text-lg">CloudVault</span>
      </Link>
    );
  }

  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <div
          className="tenor-gif-embed"
          data-postid="1852247738431148827"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="60px"
        >
          <a
            href="https://tenor.com/view/santa-claus-gif-1852247738431148827"
            aria-hidden="true"
            style={{ pointerEvents: 'none', visibility: 'hidden' }}
          >
            Santa Claus Sticker
          </a>
          from{" "}
          <a 
            href="https://tenor.com/search/santa+claus-stickers"
            aria-hidden="true"
            style={{ pointerEvents: 'none', visibility: 'hidden' }}
          >
            Santa Claus Stickers
          </a>
        </div>
      </Link>
      <Script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></Script>
    </>
  );
}
