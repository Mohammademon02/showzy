"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
// import WebApp from "@twa-dev/sdk";



export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const snap = await getDocs(collection(db, "ads"));
      setAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAds();
  }, []);

  // useEffect(() => {
  //   WebApp.ready();
  //   const user = WebApp.initDataUnsafe?.user;
  //   console.log("Telegram User:", user);
  // }, []);

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <div key={ad.id} className="border rounded-xl p-3 shadow">
          <img src={ad.image} alt={ad.title} className="rounded-lg mb-2" />
          <h2 className="font-semibold">{ad.title}</h2>
          <p className="text-sm text-gray-600">{ad.description}</p>
        </div>
      ))}
    </main>
  );
}
