import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Mobility, considered | Premium vehicle rental in Indonesia",
  description: "Discover a more considered way to travel through Indonesia. Explore a curated fleet for private journeys, airport transfers and travel with a driver.",
  metadataBase: new URL("https://example.com"),
  openGraph: { title: "Mobility, considered | Premium vehicle rental in Indonesia", description: "A considered way to move through Indonesia.", type: "website" },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f0e8" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}