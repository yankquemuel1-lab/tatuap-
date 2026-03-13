'use client'

import { useEffect } from 'react'

// Apenas registra o Service Worker — a UI de instalação fica no PwaInstallCard (home)
export function PWAInstallBanner() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => null)
    }
  }, [])

  return null
}
