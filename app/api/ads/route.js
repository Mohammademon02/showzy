import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adsQuery = query(collection(db, "ads"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(adsQuery);

    const ads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: ads });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch ads" },
      { status: 500 }
    );
  }
}
