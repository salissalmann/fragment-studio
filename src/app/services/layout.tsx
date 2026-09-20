import type { Metadata } from "next";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PAGES.services);

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
