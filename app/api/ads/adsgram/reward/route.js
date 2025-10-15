import { NextResponse } from 'next/server';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    // Adsgram থেকে data receive করুন
    const data = await request.json();
    
    console.log('📨 Adsgram Reward Notification:', data);
    
    // Data validation
    if (!data.userId || !data.reward) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      );
    }

    // User এর coins update করুন Firebase এ
    const userId = data.userId;
    const rewardAmount = data.reward || 10;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        coins: increment(rewardAmount),
        lastAdWatched: new Date().toISOString()
      });

      console.log(`✅ ${rewardAmount} coins added to user ${userId}`);

      return NextResponse.json({
        success: true,
        message: 'Reward processed',
        coins: rewardAmount
      });

    } catch (firebaseError) {
      console.error('❌ Firebase Error:', firebaseError);
      return NextResponse.json(
        { error: 'Failed to update coins' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Reward API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'Adsgram Reward API is working!',
    timestamp: new Date().toISOString()
  });
}