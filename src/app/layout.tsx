import type { Metadata, Viewport } from "next";
import "@fontsource/open-sans/latin-300.css";
import "@fontsource/open-sans/latin-400.css";
import "@fontsource/open-sans/latin-500.css";
import "@fontsource/open-sans/latin-600.css";
import "@fontsource/open-sans/latin-700.css";
import "./globals.css";
import "./experience.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orthotrack-everyday.hazyfawn32.chatgpt.site"),
  title: "Orthotrack — Be kind to your knees. Keep moving.",
  description: "Discover the comfort beneath every step. Explore Orthotrack’s 15 mm shock-absorbing cushion, six-layer construction, and outdoor walking spaces through an interactive journey.",
  openGraph: { title: "Orthotrack — Movement should feel better.", description: "Built for your body. Designed for your everyday. Discover cushioned walking surfaces for parks, communities, and wellness spaces.", type: "website", locale: "en_IN", images: [{ url: "/images/hero-walk.webp", width: 638, height: 766, alt: "A morning walk on an Orthotrack path" }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f7f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
