import type { Metadata } from "next";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PAGES.careers);

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
