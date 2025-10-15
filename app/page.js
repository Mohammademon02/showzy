'use client';

import { useEffect, useState } from 'react';
import { initAdsgram, showAd } from '@/lib/adsgram';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState(0); // User এর coins track করার জন্য
  const [message, setMessage] = useState('');

  // Page load হলে Adsgram initialize করুন
  useEffect(() => {
    const initAds = async () => {
      const blockId = process.env.NEXT_PUBLIC_ADSGRAM_BLOCK_ID;
      
      if (blockId) {
        const result = await initAdsgram(blockId);
        if (result) {
          console.log('✅ Adsgram ready!');
        } else {
          console.error('❌ Adsgram init failed!');
        }
      } else {
        console.error('❌ Block ID পাওয়া যায়নি! .env.local চেক করুন');
      }
    };
    
    initAds();
  }, []);

  // Ad দেখানোর button এ click করলে
  const handleWatchAd = async () => {
    setIsLoading(true);
    setMessage('Ad loading...');

    // Ad show করুন
    const result = await showAd();

    setIsLoading(false);

    if (result.success && result.rewarded) {
      // User পুরো ad দেখেছে - reward দিন
      const reward = 10; // প্রতি ad এ 10 coins
      setCoins(coins + reward);
      setMessage(`🎉 আপনি ${reward} coins পেয়েছেন!`);
    } else if (result.success && !result.rewarded) {
      // User ad skip করেছে
      setMessage('❌ Ad skip করা হয়েছে। Reward পাবেন না।');
    } else {
      // Error হয়েছে
      setMessage('⚠️ Ad দেখাতে সমস্যা হয়েছে। আবার try করুন।');
    }

    // 3 second পর message মুছে দিন
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a2e',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        Showzy Ads 🎬
      </h1>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#aaa' }}>
        Welcome to your Telegram Mini App 🎉
      </p>

      {/* Coins Display */}
      <div style={{
        backgroundColor: '#16213e',
        padding: '20px 40px',
        borderRadius: '15px',
        marginBottom: '30px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        💰 Your Coins: {coins}
      </div>

      {/* Watch Ad Button */}
      <button
        onClick={handleWatchAd}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? '#666' : '#0f3460',
          color: 'white',
          padding: '15px 40px',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '10px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 4px 15px rgba(15, 52, 96, 0.4)'
        }}
        onMouseEnter={(e) => {
          if (!isLoading) e.target.style.backgroundColor = '#16213e';
        }}
        onMouseLeave={(e) => {
          if (!isLoading) e.target.style.backgroundColor = '#0f3460';
        }}
      >
        {isLoading ? '⏳ Loading...' : '📺 Watch Ad & Earn Coins'}
      </button>

      {/* Message Display */}
      {message && (
        <div style={{
          marginTop: '30px',
          padding: '15px 30px',
          backgroundColor: message.includes('🎉') ? '#27ae60' : 
                          message.includes('❌') ? '#e74c3c' : '#f39c12',
          borderRadius: '10px',
          fontSize: '1.1rem',
          animation: 'fadeIn 0.5s'
        }}>
          {message}
        </div>
      )}

      {/* Info Box */}
      <div style={{
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#16213e',
        borderRadius: '10px',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '10px', color: '#4ecca3' }}>
          কিভাবে কাজ করে?
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          textAlign: 'left',
          lineHeight: '2'
        }}>
          <li>✅ Button এ click করুন</li>
          <li>✅ Ad পুরো দেখুন</li>
          <li>✅ 10 coins পান!</li>
        </ul>
      </div>
    </div>
  );
}