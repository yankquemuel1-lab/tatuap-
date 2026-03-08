'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ConfirmadoPage() {
  const router = useRouter()
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    // Supabase picks up the token from the URL hash automatically.
    // We wait briefly for the session to settle, then show the popup.
    const timer = setTimeout(() => setPronto(true), 600)
    return () => clearTimeout(timer)
  }, [])

  function irParaTrilha() {
    router.push('/')
  }

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      style={{ background: 'var(--bg)', minHeight: '100dvh' }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }}
      />
      <div
        className="fixed -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }}
      />

      {/* Loading state */}
      {!pronto && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
          />
          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
            Confirmando seu acesso…
          </p>
        </div>
      )}

      {/* Welcome popup */}
      {pronto && (
        <div
          className="z-10 mx-5 flex flex-col items-center gap-6 rounded-3xl px-6 py-8 text-center max-w-sm w-full"
          style={{
            background: 'white',
            boxShadow: '0 8px 40px rgba(226,113,90,0.18)',
            border: '1.5px solid rgba(226,113,90,0.15)',
            animation: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* Apé */}
          <div
            className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg"
            style={{ borderColor: 'var(--primary)' }}
          >
            <Image
              src="/tatu-risada.jpg"
              alt="Apé"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Confete emoji */}
          <div className="flex items-center gap-4 text-3xl" style={{ marginTop: -8 }}>
            <span>🎉</span>
            <span>🌿</span>
            <span>🥁</span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
              Seja muito bem-vindo ao{' '}
              <span style={{ color: 'var(--primary)' }}>Tatuapé App!</span>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
              Você tá com tudo pra começar a brincar com o{' '}
              <strong style={{ color: 'var(--primary)' }}>Apé</strong>, nosso tatu canastra
              da cultura popular 🐾
            </p>
          </div>

          {/* CTA button */}
          <button
            onClick={irParaTrilha}
            className="btn-primary w-full text-base py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
            style={{ fontFamily: 'inherit' }}
          >
            Iniciar a trilha agora! 🚀
          </button>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </main>
  )
}
