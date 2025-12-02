import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yearly 40",
  description: "40 questions to ask yourself every year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.loli.net" />
        <link rel="preconnect" href="https://gstatic.loli.net" crossOrigin="" />
        <link
          href="https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased font-serif bg-[#fdfbf7] text-gray-900"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {children}
      </body>
    </html>
  );
}
