// Adsgram Controller Instance
let adControllerInstance = null;

// Adsgram Script Load করার function
export const loadAdsgramScript = () => {
  return new Promise((resolve, reject) => {
    // Check করুন script already আছে কিনা
    if (window.Adsgram) {
      resolve(window.Adsgram);
      return;
    }

    // Script tag তৈরি করুন
    const script = document.createElement('script');
    script.src = 'https://sad.adsgram.ai/js/sad.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Adsgram) {
        console.log('✅ Adsgram script loaded!');
        resolve(window.Adsgram);
      } else {
        reject(new Error('Adsgram not found'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Adsgram script'));
    };
    
    document.head.appendChild(script);
  });
};

// Adsgram Initialize করার function
export const initAdsgram = async (blockId) => {
  try {
    // Script load করুন
    const Adsgram = await loadAdsgramScript();
    
    if (!adControllerInstance) {
      adControllerInstance = Adsgram.init({
        blockId: blockId,
      });
      console.log('✅ Adsgram initialized with Block ID:', blockId);
    }
    
    return adControllerInstance;
  } catch (error) {
    console.error('❌ Adsgram init error:', error);
    return null;
  }
};

// Ad দেখানোর function
export const showAd = async () => {
  if (!adControllerInstance) {
    console.error('❌ Adsgram initialize হয়নি!');
    return { success: false, error: 'Not initialized' };
  }

  try {
    console.log('🎬 Ad showing...');
    
    // Ad show করুন
    await adControllerInstance.show();
    
    // Ad সফলভাবে দেখানো হয়েছে
    console.log('✅ Ad দেখানো সম্পূর্ণ!');
    return { success: true, rewarded: true };
    
  } catch (error) {
    // User ad skip করেছে বা error হয়েছে
    console.error('❌ Ad error:', error);
    
    if (error.message?.includes('User skipped')) {
      return { success: true, rewarded: false };
    }
    
    return { success: false, error: error.message };
  }
};