'use client'

import { useState } from 'react'
import { X, Share, Smartphone } from 'lucide-react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

export function PwaInstallCard() {
  const { status, ready, install } = usePWAInstall()
  const [iosOpen, setIosOpen] = useState(false)
  const [done, setDone] = useState(false)

  // Não renderiza nada até o hook resolver, se já instalado, ou se o usuário acabou de instalar
  if (!ready || status === 'installed' || status === 'unsupported' || done) return null

  async function handleClick() {
    if (status === 'ios') {
      setIosOpen(true)
      return
    }
    const outcome = await install()
    if (outcome === 'accepted') setDone(true)
  }

  return (
    <>
      {/* Card inline na home */}
      <div
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{
          background: 'white',
          border: '1.5px solid rgba(226,113,90,0.2)',
          boxShadow: '0 2px 12px rgba(226,113,90,0.1)',
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #e2715a, #f4a261)' }}
        >
          <Smartphone size={20} color="white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>
            Salve o app na tela inicial
          </p>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
            Acesse com um toque, sem precisar do link
          </p>
        </div>

        <button
          onClick={handleClick}
          className="px-3 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'var(--primary)' }}
        >
          {status === 'ios' ? 'Como?' : 'Instalar'}
        </button>
      </div>

      {/* Modal iOS */}
      {iosOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIosOpen(false)}
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
                onClick={() => setIosOpen(false)}
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
                { num: '1', text: 'Toque no ícone de Compartilhar', icon: <Share size={16} /> },
                { num: '2', text: 'Role e toque em "Adicionar à Tela de Início"', icon: null },
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
              onClick={() => setIosOpen(false)}
              className="text-sm font-semibold text-center py-2 mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              Vou fazer depois
            </button>
          </div>
        </div>
      )}
    </>
  )
}
