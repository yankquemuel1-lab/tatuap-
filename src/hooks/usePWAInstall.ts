'use client'

import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null

export type PWAStatus = 'installed' | 'android' | 'ios' | 'unsupported'

export function usePWAInstall() {
  const [status, setStatus] = useState<PWAStatus>('unsupported')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Registra SW
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

    // iOS Safari
    const isIOS =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !/chrome|crios|fxios/i.test(navigator.userAgent)
    if (isIOS) {
      setStatus('ios')
      setReady(true)
      return
    }

    // Android/Chrome/Samsung — aguarda o evento
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      setStatus('android')
      setReady(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function install(): Promise<'accepted' | 'dismissed' | 'ios'> {
    if (status === 'ios') return 'ios'
    if (!deferredPrompt) return 'dismissed'
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    deferredPrompt = null
    return outcome as 'accepted' | 'dismissed'
  }

  return { status, ready, install }
}
