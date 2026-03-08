import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Bell } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

export default function NovididadesPage() {
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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Novidades</h1>
      </header>

      {/* Hero */}
      <section className="px-4 pt-5 pb-2">
        <div className="flex gap-4 items-center p-4 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #4a90e2, #7bc8f5)' }}>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
            <Image src="/avatar-tatuape.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-extrabold text-base leading-tight">Atualizações do Tatuapé</p>
            <p className="text-white/80 text-sm mt-0.5">Fique por dentro de tudo que está chegando</p>
          </div>
        </div>
      </section>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'var(--blue-bg)' }}>
          <Bell size={40} style={{ color: 'var(--blue)' }} />
        </div>

        <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Em breve por aqui!
        </h2>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
          Atualizações e novidades do Tatuapé aparecerão aqui.
          Novas brincadeiras, artigos, recursos para educadores e muito mais.
        </p>

        <div className="mt-8 p-4 rounded-2xl w-full max-w-xs"
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--blue)' }}>
            📬 Seja o primeiro a saber
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Assine a Newsletter do Tatu para receber novidades diretamente no seu e-mail.
          </p>
          <Link href="/newsletter"
            className="btn-primary w-full mt-3 text-sm py-3 rounded-xl"
            style={{ background: 'var(--blue)' }}>
            Ver Newsletter
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
