import type { Metadata } from "next";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PAGES.team);

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
