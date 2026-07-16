import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Sistem Absensi KKN",
  description: "Platform absensi real-time untuk kelompok KKN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="main-layout">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
