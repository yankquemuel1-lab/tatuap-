'use client'

import { useEffect, useState } from 'react'
import { X, Download, Share } from 'lucide-react'

type Mode = 'android' | 'ios' | null
type BannerState = { dismissedAt: number | null; declined: boolean }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null

const STORAGE_KEY = 'pwa-install-v2'
const DISMISS_COOLDOWN_DAYS = 7

function loadState(): BannerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { dismissedAt: null, declined: false }
    return JSON.parse(raw)
  } catch {
    return { dismissedAt: null, declined: false }
  }
}

function shouldShow(): boolean {
  const state = loadState()
  if (state.declined) return false
  if (state.dismissedAt) {
    const daysSince = (Date.now() - state.dismissedAt) / (1000 * 60 * 60 * 24)
    if (daysSince < DISMISS_COOLDOWN_DAYS) return false
  }
  return true
}

function saveDeclined() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedAt: null, declined: true }))
}

function saveDismissed() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedAt: Date.now(), declined: false }))
}

export function PWAInstallBanner() {
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<Mode>(null)
  const [iosInstructions, setIosInstructions] = useState(false)

  useEffect(() => {
    // Registra o service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => null)
    }

    // Já está instalado como PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true
    if (isStandalone) return

    // Checa cooldown/recusa
    if (!shouldShow()) return

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !/chrome|crios|fxios/i.test(navigator.userAgent)

    if (isIOS) {
      const timer = setTimeout(() => {
        setMode('ios')
        setVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }

    // Android/Chrome/Samsung: captura o evento nativo
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      const timer = setTimeout(() => {
        setMode('android')
        setVisible(true)
      }, 3000)
      // Limpa o timer se o componente desmontar antes
      ;(handler as unknown as { cleanup?: () => void }).cleanup = () => clearTimeout(timer)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      ;(handler as unknown as { cleanup?: () => void }).cleanup?.()
    }
  }, [])

  // "Agora não" — reaparecer daqui 7 dias
  function dismiss() {
    saveDismissed()
    setVisible(false)
    setIosInstructions(false)
  }

  // Instalou ou recusou explicitamente — não aparecer mais
  function markDeclined() {
    saveDeclined()
    setVisible(false)
  }

  async function installAndroid() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    deferredPrompt = null
    if (outcome === 'accepted') {
      markDeclined() // instalou — não mostrar mais
    } else {
      saveDismissed() // recusou no prompt nativo — cooldown de 7 dias
      setVisible(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop com instruções iOS */}
      {iosInstructions && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIosInstructions(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4"
            style={{ background: 'white', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg" style={{ color: 'var(--text)' }}>
                Adicionar à Tela Inicial
              </h3>
              <button
                onClick={() => setIosInstructions(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.06)' }}
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Siga os passos abaixo no Safari:
            </p>

            <div className="flex flex-col gap-3">
              {[
                { num: '1', text: 'Toque no ícone de Compartilhar', icon: <Share size={18} /> },
                { num: '2', text: 'Role para baixo e toque em "Adicionar à Tela de Início"', icon: null },
                { num: '3', text: 'Toque em "Adicionar" no canto superior direito', icon: null },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    style={{ background: 'var(--primary)' }}
                  >
                    {step.num}
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{step.text}</p>
                    {step.icon && <span style={{ color: 'var(--primary)' }}>{step.icon}</span>}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={dismiss}
              className="text-sm font-semibold text-center py-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Vou fazer depois
            </button>
          </div>
        </div>
      )}

      {/* Banner flutuante */}
      {!iosInstructions && (
        <div
          className="fixed bottom-20 left-1/2 z-50 w-full max-w-[440px] px-4"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: 'white',
              boxShadow: '0 8px 32px rgba(226,113,90,0.25)',
              border: '1.5px solid rgba(226,113,90,0.2)',
              animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--primary-bg)' }}
            >
              <Download size={20} style={{ color: 'var(--primary)' }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>
                Adicione o app na tela inicial
              </p>
              <p className="text-xs mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>
                Acesse com um toque, sem precisar do link
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={mode === 'android' ? installAndroid : () => setIosInstructions(true)}
                className="px-3 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'var(--primary)' }}
              >
                Adicionar
              </button>
              <button
                onClick={dismiss}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.06)' }}
                aria-label="Fechar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
