import type { Metadata, Viewport } from "next"
import "./globals.css"
import { AuthGuard } from "@/components/AuthGuard"
import { PWAInstallBanner } from "@/components/PWAInstallBanner"

export const metadata: Metadata = {
  title: "Tatuapé — Brincadeiras da Cultura Popular",
  description: "Explore danças, jogos e rodas da cultura popular afro-indígena brasileira. Brincadeiras ancestrais para crianças e adultos.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tatuapé",
  },
  openGraph: {
    title: "Tatuapé — Brincadeiras da Cultura Popular",
    description: "Uma coletânea das principais brincadeiras de roda da cultura popular afro-indígena brasileira.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#e2715a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="min-h-screen max-w-[480px] mx-auto relative">
          <AuthGuard>{children}</AuthGuard>
          <PWAInstallBanner />
        </div>
      </body>
    </html>
  )
}
