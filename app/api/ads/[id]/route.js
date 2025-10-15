import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, "ads", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Ad not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id, ...docSnap.data() },
    });
  } catch (error) {
    console.error("Error fetching ad:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch ad" },
      { status: 500 }
    );
  }
}
