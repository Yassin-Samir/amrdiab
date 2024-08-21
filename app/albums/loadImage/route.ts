"use server";
import { storage } from "@/app/firebase";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const src = searchParams.get("src");
  try {
    // Extract the path by removing the unnecessary parts of the URL
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/amrdiab-64119.appspot.com/o/";
    const decodedPath = decodeURIComponent(
      src.split(baseUrl)[1].split("?alt=")[0]
    );

    const [fileBuffer] = await storage.file(decodedPath).download();
    const thumbnailBuffer = await sharp(fileBuffer)
      .blur(75)
      .resize({ fit: "contain", width: 600, height: 600 })
      .toBuffer();
    return new NextResponse(thumbnailBuffer, { status: 200 });
  } catch (error) {
    console.log({ error });
    return new NextResponse(null, { status: 500 });
  }
}
