import "./globals.css";
import LocalPreviewOrigin from "../components/LocalPreviewOrigin";

export const metadata = {
  metadataBase: new URL("https://nishan-singh-films-portfolio.sturdyperch4097.chatgpt.site"),
  title: "Nishan Singh Films — Video Editing & AI Visuals",
  description: "Stories with intent. Every frame, a feeling. Explore films, AI filmmaking, mobile cinema and visual art by Nishan Singh.",
  icons: { icon: "/assets/favicon.svg" },
  openGraph: {
    title: "Nishan Singh Films",
    description: "Video editing, AI filmmaking and cinematic portrait art by Nishan Singh.",
    images: ["/assets/twin-earth.webp"],
  },
};

export const viewport = { themeColor: "#101010" };

export default function RootLayout({ children }) {
  return <html lang="en"><body id="top"><LocalPreviewOrigin />{children}</body></html>;
}
