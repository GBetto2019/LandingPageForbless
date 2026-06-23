import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forbless Kit 90 Dias — Hair, Skin & Nails",
  description: "Nutra seus fios, pele e unhas de dentro para fora. 90 dias para resultados que se sustentam. Biotina, Zinco e Complexo de Vitaminas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Quicksand:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/aviega" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
