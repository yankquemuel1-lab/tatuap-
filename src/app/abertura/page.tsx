'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function AberturaPage() {
  return (
    <main
      className="relative flex flex-col items-center justify-between min-h-screen w-full overflow-hidden bg-pattern"
      style={{ background: 'var(--bg)', minHeight: '100dvh' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--green-light)' }} />
      <div className="absolute bottom-32 left-0 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--blue)' }} />

      {/* Header / Logo */}
      <div className="flex flex-col items-center mt-14 gap-4 z-10 px-6">
        {/* Logo circle */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: 'var(--primary)', transform: 'scale(1.3)' }} />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-white overflow-hidden shadow-xl"
            style={{ background: 'var(--primary)' }}>
            <Image
              src="/avatar-tatuape.jpg"
              alt="Tatuapé — Tatu Canastra"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
          Tatuapé
        </h1>
        <p className="text-base font-medium text-center max-w-[260px]" style={{ color: 'var(--text-muted)' }}>
          Explorando brincadeiras ancestrais com alegria.
        </p>
      </div>

      {/* Mascot illustration */}
      <div className="relative flex-1 flex items-center justify-center w-full z-10 my-6">
        <div className="absolute w-56 h-56 rounded-full blur-3xl opacity-15 -left-8"
          style={{ background: 'var(--primary)' }} />
        <div className="absolute w-56 h-56 rounded-full blur-3xl opacity-15 -right-8"
          style={{ background: 'var(--green-light)' }} />
        <Image
          src="/avatar-tatuape.jpg"
          alt="Tatu Apé"
          width={320}
          height={320}
          className="relative z-10 w-72 h-72 object-contain drop-shadow-2xl animate-pulse-soft"
          style={{ borderRadius: '40% 40% 50% 50%' }}
          priority
        />
        {/* Ground shadow */}
        <div className="absolute bottom-4 w-40 h-5 rounded-full blur-lg opacity-25"
          style={{ background: 'var(--text)' }} />
      </div>

      {/* Bottom CTA */}
      <div className="w-full px-6 pb-10 flex flex-col items-center gap-5 z-10">
        {/* Dots indicator */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-8 rounded-full" style={{ background: 'var(--primary)' }} />
          <span className="h-1.5 w-2 rounded-full" style={{ background: 'var(--primary)', opacity: 0.3 }} />
          <span className="h-1.5 w-2 rounded-full" style={{ background: 'var(--primary)', opacity: 0.3 }} />
        </div>

        <Link href="/" className="btn-primary w-full text-lg py-4 rounded-2xl">
          Vamos Começar <ArrowRight size={20} />
        </Link>

        <Link href="/login" className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
          Já tenho uma conta
        </Link>

        {/* Bottom decorative icons */}
        <div className="flex items-center gap-8 mt-1" style={{ color: 'var(--primary)', opacity: 0.3 }}>
          <span className="text-2xl">🌿</span>
          <span className="text-2xl">📖</span>
          <span className="text-2xl">🧭</span>
        </div>
      </div>
    </main>
  )
}
