import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MaxWithContainer from "@/components/MaxWithContainer";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Website xem phim của Nghiêm Hồng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="select-none scroll-smooth">
      <head>
        <link rel="icon" href="/logo-white.png" sizes="any" />
      </head>
      <body className={`${inter.className} bg-black/90 text-white`}>
        <Header />
        <MaxWithContainer>{children}</MaxWithContainer>
        <Footer />
      </body>
    </html>
  );
}
