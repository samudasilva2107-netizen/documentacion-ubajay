import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Ubajay Digital | Guía Comercial y Turística - Tierra de Palmares",
  description: "Portal oficial de Ubajay, Entre Ríos. Guía comercial, servicios y naturaleza. Corazón del Sitio Ramsar Palmar Yatay.",
  keywords: ["Ubajay", "Entre Ríos", "Palmar Yatay", "Turismo", "Guía Comercial", "Tierra de Palmares"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Merriweather:ital,wght@0,400;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
