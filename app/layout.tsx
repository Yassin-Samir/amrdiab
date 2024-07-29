import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Nav from "@/app/components/Nav/nav";
import Footer from "./components/Footer/Footer";
const RobotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amr Diab",
  description: "Amr Diab Albums",
  applicationName: "Amr Diab",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={RobotoFont.className}>
        <Nav />
        <>{children}</>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-S57HT98K0Y" />
    </html>
  );
}
