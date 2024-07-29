import { MetadataRoute } from "next";
import { db } from "./firebase";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

const baseUrl = "https://www.amrdiab.vercel.app/";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const albums = await db.collection("albums").get();
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/albums`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...albums.docs.map(
      (
        songDoc
      ): {
        url: string;
        lastModified?: string | Date;
        changeFrequency?:
          | "always"
          | "hourly"
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly"
          | "never";
        priority?: number;
        alternates?: {
          languages?: Languages<string>;
        };
      } => ({
        url: `${baseUrl}/albums/${songDoc.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      })
    ),
  ];
}
