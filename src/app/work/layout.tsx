import type { Metadata } from "next";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PAGES.work);

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
