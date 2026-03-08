'use client'

import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function ConfirmadoPage() {

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-5 py-8 overflow-hidden"
      style={{ background: 'var(--bg)', minHeight: '100dvh' }}
    >
      {/* Decorative blobs */}
      <div className="fixed -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }} />
      <div className="fixed -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }} />

      <div className="flex flex-col items-center gap-6 z-10 max-w-sm w-full text-center">

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg"
          style={{ background: 'var(--primary)' }}>
          <Image src="/tatu-risada.jpg" alt="Apé" width={96} height={96} className="w-full h-full object-cover" priority />
        </div>

        {/* Check icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
          style={{ background: '#e8f5e9' }}>
          <CheckCircle size={36} style={{ color: '#2d6a4f' }} />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
            Cadastro confirmado!
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Sua conta no <span className="font-bold" style={{ color: 'var(--primary)' }}>Tatuapé</span> está pronta!
          </p>
        </div>

        {/* Instruction box */}
        <div
          className="w-full rounded-2xl p-5 text-center"
          style={{ background: 'white', border: '1.5px solid rgba(226,113,90,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--primary)' }}>Próximo passo</p>
          <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
            Feche esta aba e retorne ao navegador onde você abriu o Tatuapé para fazer seu acesso.
          </p>
        </div>

        {/* Decorative emojis */}
        <div className="flex items-center gap-6 mt-2" style={{ opacity: 0.4 }}>
          <span className="text-2xl">🌿</span>
          <span className="text-2xl">🎉</span>
          <span className="text-2xl">🥁</span>
        </div>
      </div>
    </main>
  )
}
