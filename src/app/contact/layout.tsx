import type { Metadata } from "next";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PAGES.contact);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
