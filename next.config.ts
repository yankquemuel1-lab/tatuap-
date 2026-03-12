import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yzhmscgsxhyiftwhpleq.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Impede o site de ser carregado dentro de iframes (clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Impede o navegador de "adivinhar" o tipo de arquivo (MIME sniffing)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Força HTTPS por 1 ano
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Controla quais informações de referência são enviadas
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restringe acesso a recursos do dispositivo (câmera, microfone, etc.)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
};

export default nextConfig;
