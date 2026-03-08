'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProgress } from '@/lib/progress'
import { DINAMICAS, CATEGORIAS } from '@/data/dinamicas'
import { ARTIGOS_CULTURA } from '@/data/cultura'
import { ChevronRight, Lightbulb, Megaphone, Heart, Sparkles, Clock, Mail, Info, X } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

const LABEL_CURTO: Record<string, string> = {
  'dancas-musicas': 'Danças de Roda',
  'jogos-tradicao': 'Jogos de Roda',
  'expressao-cura': 'Rodas de Cura',
  'construcao-coletiva': 'Rodas de Construção',
}

const CAT_IMAGE: Record<string, string> = {
  'dancas-musicas': '/dancas-de-roda.png',
  'jogos-tradicao': '/jogos-de-roda.png',
  'expressao-cura': '/rodas-de-cura.png',
  'construcao-coletiva': '/rodas-de-construcao.png',
}

const CAT_ICON: Record<string, string> = {
  'dancas-musicas': '🥁',
  'jogos-tradicao': '🎯',
  'expressao-cura': '🌿',
  'construcao-coletiva': '🌱',
}

export default function HomePage() {
  const router = useRouter()
  const [sementes, setSementes] = useState(0)
  const [completos, setCompletos] = useState(0)
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    getProgress().then(p => {
      setSementes(p.sementes)
      setCompletos(Object.values(p.dinamicas).filter(d => d.quizCompleto).length)
    })

    // Mostra popup uma vez por sessão (fecha ao navegar e voltar não reabre)
    if (!sessionStorage.getItem('tatuape-popup-sessao')) {
      sessionStorage.setItem('tatuape-popup-sessao', '1')
      setPopup(true)
    }
  }, [])

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>

      {/* Popup de boas-vindas */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 flex flex-col items-center gap-5 text-center relative"
            style={{
              background: 'white',
              boxShadow: '0 12px 48px rgba(226,113,90,0.22)',
              animation: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {/* Fechar */}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#666' }}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {/* Avatar Apé */}
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg"
              style={{ borderColor: 'var(--primary)' }}
            >
              <Image
                src="/tatu-risada.jpg"
                alt="Apé"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="flex gap-3 text-2xl">🎉 🌿 🥁</div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
                Bem-vindo ao{' '}
                <span style={{ color: 'var(--primary)' }}>Tatuapé App!</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                Explore brincadeiras ancestrais com o{' '}
                <strong style={{ color: 'var(--primary)' }}>Apé</strong>, nosso tatu
                canastra da cultura popular 🐾
              </p>
            </div>

            <Link
              href="/trilha"
              onClick={() => setPopup(false)}
              className="btn-primary w-full text-base py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
              style={{ fontFamily: 'inherit' }}
            >
              Iniciar a trilha agora! 🚀
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
        style={{
          background: 'rgba(248,246,246,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(226,113,90,0.1)',
        }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-sm"
          style={{ borderColor: 'var(--primary)' }}>
          <Image src="/tatu-rosto.jpg" alt="Apé" width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
          Tatuapé App
        </h2>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
          style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
          🌱 <span>{sementes}</span>
        </div>
      </header>

      {/* Mascot guide */}
      <section className="px-4 pt-5 pb-1">
        <div className="flex items-center gap-4 p-4 rounded-2xl"
          style={{ background: 'rgba(226,113,90,0.08)', border: '1px solid rgba(226,113,90,0.15)' }}>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-md"
            style={{ borderColor: 'rgba(226,113,90,0.3)' }}>
            <Image src="/tatu-perfil.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--primary)' }}>
              OI, EU SOU O APÉ!
            </p>
            <p className="text-sm leading-snug" style={{ color: '#374151' }}>
              Vamos explorar nossas brincadeiras ancestrais hoje? 🎉
            </p>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <div className="flex gap-4 px-4 py-4 overflow-x-auto no-scrollbar">
        {[
          { icon: <Info size={22} />, label: 'Conheça o App', color: 'var(--primary)', href: '/conheca-o-app' },
          { icon: <Lightbulb size={22} />, label: 'Dicas pra você', color: 'var(--green)', href: '/dicas' },
          { icon: <Megaphone size={22} />, label: 'Novidades', color: 'var(--blue)', href: '/novidades' },
          { icon: <Heart size={22} />, label: 'Favoritos', color: '#e05a77', href: '/favoritos' },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 min-w-[72px]">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md border-4 border-white"
              style={{ background: item.color }}>
              {item.icon}
            </div>
            <p className="text-xs font-bold text-center leading-tight" style={{ color: item.color }}>
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Categories 2x2 grid */}
      <section className="px-4 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>
            Conheça as Brincadeiras 🎡
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(CATEGORIAS).map(([key]) => {
            const count = DINAMICAS.filter(d => d.categoria === key).length
            return (
              <Link key={key} href={`/trilha?categoria=${key}`}
                className="rounded-2xl flex flex-col justify-end aspect-square shadow-md relative overflow-hidden">
                <Image
                  src={CAT_IMAGE[key]}
                  alt={LABEL_CURTO[key]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 50vw, 240px"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                <div className="relative z-10 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{CAT_ICON[key]}</span>
                    <p className="text-white font-bold text-sm leading-tight">{LABEL_CURTO[key]}</p>
                  </div>
                  <p className="text-white/70 text-xs mt-1">{count} brincadeiras</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Cultura Popular — blog */}
      <section className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎭</span>
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Cultura Popular</h2>
          </div>
          <Link href="/newsletter" className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
            Ver tudo
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {ARTIGOS_CULTURA.map((artigo) => (
            <Link key={artigo.slug} href={`/cultura/${artigo.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white"
              style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: artigo.corClara }}>
                {artigo.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>
                  {artigo.titulo}
                </h3>
                <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {artigo.resumo}
                </p>
                <span className="inline-flex items-center gap-1 text-xs mt-1" style={{ color: artigo.cor }}>
                  <Clock size={10} /> {artigo.tempoLeitura}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: artigo.corClara, color: artigo.cor }}>
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Progress */}
      {completos > 0 && (
        <section className="px-4 pt-5 pb-2">
          <div className="rounded-2xl p-5 text-white"
            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-bold opacity-90">Sua Jornada</p>
                <p className="text-3xl font-extrabold">{completos}<span className="text-lg opacity-70">/{DINAMICAS.length}</span></p>
              </div>
              <div className="text-5xl opacity-80">🏆</div>
            </div>
            <div className="w-full h-2 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <div className="h-2 rounded-full transition-all"
                style={{ width: `${(completos / DINAMICAS.length) * 100}%`, background: 'white' }} />
            </div>
            <Link href="/trilha"
              className="inline-flex items-center gap-1 text-sm font-bold py-2 px-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.25)' }}>
              Continuar trilha →
            </Link>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={18} style={{ color: 'var(--primary)' }} />
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Newsletter do Tatu</h2>
        </div>
        <div className="rounded-2xl text-white relative overflow-hidden"
          style={{ background: 'var(--primary)', minHeight: 140 }}>
          <div className="relative z-10 p-5 pr-32">
            <h3 className="text-xl font-extrabold mb-1">Fique por dentro!</h3>
            <p className="text-sm opacity-90 mb-4">Receba dicas de cultura e brincadeiras toda semana.</p>
            <Link href="/newsletter"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.25)' }}>
              Ir para Newsletter <ChevronRight size={14} />
            </Link>
          </div>
          <Image
            src="/tatu-news.jpg"
            alt="Apé newsletter"
            width={120}
            height={140}
            className="absolute right-0 bottom-0 object-cover object-top"
            style={{ height: '100%', width: 'auto', maxWidth: 130 }}
          />
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
