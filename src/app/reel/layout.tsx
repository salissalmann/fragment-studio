import type { Metadata } from "next";

const title = "Salis Salman — Intro reel";
const description = "A one-minute introduction from Salis Salman, full-stack engineer.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/reel" },
  openGraph: {
    title,
    description,
    url: "/reel",
    type: "video.other",
    siteName: "Salis Salman",
    locale: "en_US",
    images: [{ url: "/reel/poster.jpg", width: 720, height: 1280, alt: title }],
    videos: [
      {
        url: "/reel/salis-salman-reel.mp4",
        type: "video/mp4",
        width: 1080,
        height: 1920,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/reel/poster.jpg"],
  },
};

export default function ReelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
