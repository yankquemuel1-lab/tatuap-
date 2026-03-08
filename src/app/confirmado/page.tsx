'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

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
            E-mail confirmado!
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Sua conta no <span className="font-bold" style={{ color: 'var(--primary)' }}>Tatuapé</span> está pronta. Agora é só entrar e começar a explorar as brincadeiras ancestrais com o Apé!
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="btn-primary w-full text-lg py-4 rounded-2xl flex items-center justify-center gap-2"
        >
          Fazer login <ArrowRight size={20} />
        </Link>

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
