'use client'

import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null

export type PWAStatus = 'installed' | 'android' | 'ios' | 'samsung' | 'unsupported'

export function usePWAInstall() {
  const [status, setStatus] = useState<PWAStatus>('unsupported')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => null)
    }

    // Já instalado
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true
    if (isStandalone) {
      setStatus('installed')
      setReady(true)
      return
    }

    const ua = navigator.userAgent

    // iOS Safari
    if (/iphone|ipad|ipod/i.test(ua) && !/chrome|crios|fxios/i.test(ua)) {
      setStatus('ios')
      setReady(true)
      return
    }

    // Samsung Internet — não dispara beforeinstallprompt de forma confiável
    if (/SamsungBrowser/i.test(ua)) {
      setStatus('samsung')
      setReady(true)
      return
    }

    // Chrome/Edge/Chromium Android — aguarda o evento
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      setStatus('android')
      setReady(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function install(): Promise<'accepted' | 'dismissed' | 'manual'> {
    if (status === 'ios' || status === 'samsung') return 'manual'
    if (!deferredPrompt) return 'dismissed'
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    deferredPrompt = null
    return outcome as 'accepted' | 'dismissed'
  }

  return { status, ready, install }
}
