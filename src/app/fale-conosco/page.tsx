'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircleHeart } from 'lucide-react'
import { FaleConoscoForm } from '@/components/FaleConoscoForm'
import { BottomNav } from '@/components/BottomNav'

export default function FaleConoscoPage() {
  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <Link href="/"
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Fale Conosco</h1>
      </header>

      <div className="px-4 pt-6 flex flex-col gap-6">

        {/* Hero com Apé */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image src="/tatu-perfil.jpg" alt="Apé" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircleHeart size={16} />
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">A VOZ DE QUEM USA</p>
            </div>
            <p className="font-extrabold text-lg leading-tight">
              Sua mensagem<br />importa pra roda!
            </p>
            <p className="text-white/80 text-xs mt-1">
              Sugestão, elogio, crítica — o Apé escuta tudo.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div
          className="rounded-2xl bg-white p-5"
          style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <FaleConoscoForm />
        </div>

      </div>

      <BottomNav />
    </main>
  )
}
