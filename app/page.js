"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // ✅ Let Telegram know the app is ready
      tg.expand(); // ✅ Expand app to full height
      console.log("✅ Telegram initialized:", tg.initDataUnsafe);
    } else {
      console.log("⚠️ Not inside Telegram");
    }
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Showzy Ads</h1>
      <p>Welcome to your Telegram Mini App 🎉</p>
    </div>
  );
}
