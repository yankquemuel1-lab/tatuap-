'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getProgress } from '@/lib/progress'
import { DINAMICAS, CATEGORIAS } from '@/data/dinamicas'
import { ChevronRight, Lightbulb, Megaphone, Heart, Sparkles, Mail, Compass, X, MessageCircleHeart } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'
import { FaleConoscoForm } from '@/components/FaleConoscoForm'
import { ApeChat } from '@/components/ApeChat'

const LABEL_CURTO: Record<string, string> = {
  'dancas-musicas': 'Danças de Roda',
  'jogos-tradicao': 'Jogos de Roda',
  'expressao-cura': 'Rodas de Cura',
  'construcao-coletiva': 'Rodas de Construção',
}

const CAT_IMAGE: Record<string, string> = {
  'dancas-musicas': '/dancas-de-roda-02.jpg',
  'jogos-tradicao': '/jogos-de-roda-02.jpg',
  'expressao-cura': '/rodas-de-cura-02.jpg',
  'construcao-coletiva': '/rodas-de-construcao-02.jpg',
}

const CAT_ICON: Record<string, string> = {
  'dancas-musicas': '🥁',
  'jogos-tradicao': '🎯',
  'expressao-cura': '🌿',
  'construcao-coletiva': '🌱',
}

export default function HomePage() {
  const [sementes, setSementes] = useState(0)
  const [completos, setCompletos] = useState(0)
  const [popup, setPopup] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [chatAberto, setChatAberto] = useState(false)
  const [girando, setGirando] = useState(false)
  const [resultadoSorteio, setResultadoSorteio] = useState<typeof DINAMICAS[0] | null>(null)

  function girar() {
    setGirando(true)
    setResultadoSorteio(null)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * DINAMICAS.length)
      setResultadoSorteio(DINAMICAS[idx])
      setGirando(false)
    }, 1200)
  }

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

            <button
              onClick={() => setPopup(false)}
              className="btn-primary w-full text-base py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
              style={{ fontFamily: 'inherit' }}
            >
              Iniciar a trilha agora! 🚀
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
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
        <style>{`
          @keyframes ape-float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-5px); }
          }
          @keyframes ape-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(226,113,90,0.0), 0 4px 16px rgba(226,113,90,0.15); }
            50%       { box-shadow: 0 0 0 6px rgba(226,113,90,0.12), 0 4px 20px rgba(226,113,90,0.25); }
          }
          @keyframes ape-shimmer {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .ape-card {
            background: linear-gradient(135deg, rgba(226,113,90,0.10) 0%, rgba(244,162,97,0.08) 50%, rgba(226,113,90,0.10) 100%);
            border: 1px solid rgba(226,113,90,0.2);
            animation: ape-glow 3s ease-in-out infinite;
          }
          .ape-avatar {
            animation: ape-float 3s ease-in-out infinite;
          }
          .ape-label {
            background: linear-gradient(90deg, #e2715a, #f4a261, #e2715a);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: ape-shimmer 3s linear infinite;
          }
        `}</style>
        <button onClick={() => setChatAberto(true)} className="ape-card w-full flex items-center gap-4 p-4 rounded-2xl text-left" style={{ border: 'none', cursor: 'pointer' }}>
          <div className="ape-avatar w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-md"
            style={{ borderColor: 'rgba(226,113,90,0.35)' }}>
            <Image src="/tatu-perfil.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div style={{ flex: 1 }}>
            <p className="ape-label text-xs font-bold uppercase tracking-wider mb-0.5">
              OI, EU SOU O APÉ!
            </p>
            <p className="text-sm leading-snug" style={{ color: '#374151' }}>
              Vamos explorar nossas brincadeiras ancestrais hoje? 🎉
            </p>
            <p className="text-xs mt-1 font-semibold" style={{ color: 'rgba(226,113,90,0.7)' }}>
              Toque para conversar comigo →
            </p>
          </div>
        </button>
        {chatAberto && <ApeChat onClose={() => setChatAberto(false)} />}
      </section>

      {/* Quick access */}
      <div className="flex gap-4 px-4 py-4 overflow-x-auto no-scrollbar">
        {[
          { icon: <Compass size={22} />, label: 'Conheça o App', color: 'var(--primary)', href: '/conheca-o-app' },
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
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Sorteio da Roda */}
      <section className="px-4 pt-5 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎲</span>
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Sorteio da Roda</h2>
        </div>
        <style>{`
          @keyframes sorteio-gradient {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .sorteio-card {
            background: linear-gradient(-45deg, #1a1a5e, #3a2060, #2d0a6b, #1a3a6e, #4a1a7a, #1a1a5e);
            background-size: 300% 300%;
            animation: sorteio-gradient 6s ease infinite;
          }
        `}</style>
        <div className="sorteio-card rounded-2xl p-5 text-white text-center"
          style={{ boxShadow: '0 4px 32px rgba(58,32,96,0.4)' }}>

          {/* avatar do Apé */}
          <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 mx-auto mb-4 shadow-lg ${girando ? 'animate-spin' : ''}`}>
            <Image src="/tatu-rosto.jpg" alt="Apé" width={80} height={80} className="w-full h-full object-cover" />
          </div>

          {!resultadoSorteio && !girando && (
            <>
              <p className="font-bold text-base mb-1">Deixa o Apé escolher!</p>
              <p className="text-white/65 text-xs mb-4">Não sabe qual brincadeira fazer hoje? Gira a roda!</p>
              <button onClick={girar} className="py-2.5 px-6 rounded-full font-bold text-sm animate-pulse-soft"
                style={{ background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
                Girar a Roda! 🎲
              </button>
            </>
          )}

          {girando && (
            <p className="font-bold text-base">A roda está girando...</p>
          )}

          {resultadoSorteio && !girando && (
            <>
              <p className="text-white/70 text-xs mb-1 uppercase tracking-wider">A brincadeira de hoje é</p>
              <p className="text-2xl font-extrabold mb-0.5">{resultadoSorteio.nome}</p>
              <p className="text-white/60 text-xs mb-4">{resultadoSorteio.origem}</p>
              <div className="flex gap-2 justify-center">
                <Link href={`/dinamica/${resultadoSorteio.id}`}
                  className="py-2.5 px-5 rounded-full font-bold text-sm"
                  style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  Vamos Brincar! 🎉
                </Link>
                <button onClick={girar}
                  className="py-2.5 px-4 rounded-full text-sm font-bold"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  🎲
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Materiais de Apoio */}
      <section className="px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📦</span>
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Materiais de Apoio</h2>
        </div>
        <div className="flex flex-col gap-3">
          {/* Card ativo: Musicalidade */}
          <Link href="/materiais" className="flex items-center gap-4 p-4 rounded-2xl bg-white"
            style={{ border: '1px solid rgba(226,113,90,0.25)', boxShadow: 'var(--shadow)', textDecoration: 'none' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #e2715a 0%, #f4a261 100%)' }}>
              🎵
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>Musicalidade</h3>
              <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Aprenda toques, ritmos e cantos para aplicar nas suas aulas
              </p>
              <span className="inline-flex items-center gap-1 text-xs mt-1.5 font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: '#fdf0ed', color: '#c4503c' }}>
                ▶ Acessar agora
              </span>
            </div>
          </Link>
          {/* Card em breve: Histórias Cantadas */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white"
            style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)' }}>
              🎶
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>Histórias Cantadas</h3>
              <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Aprenda histórias cantadas da cultura popular afro-indígena brasileira para aplicar na sua roda
              </p>
              <span className="inline-flex items-center gap-1 text-xs mt-1.5 font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: '#edf7f0', color: '#2d6a4f' }}>
                🕐 Em breve
              </span>
            </div>
          </div>
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

      {/* Card Fale Conosco */}
      <section className="px-4 pb-4">
        <button
          onClick={() => setFeedbackModal(true)}
          className="w-full rounded-2xl p-5 flex items-center gap-4 text-left"
          style={{
            background: 'white',
            boxShadow: 'var(--shadow)',
            border: '1.5px solid rgba(226,113,90,0.15)',
          }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}
          >
            <MessageCircleHeart size={26} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-base leading-tight" style={{ color: 'var(--text)' }}>
              Fale com a gente
            </p>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
              Sugestões, elogios, críticas — o Apé escuta tudo 🌿
            </p>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
        </button>
      </section>

      {/* Modal Fale Conosco */}
      {feedbackModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center px-0"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setFeedbackModal(false) }}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl p-6 flex flex-col gap-5"
            style={{
              background: 'white',
              boxShadow: '0 -8px 48px rgba(0,0,0,0.18)',
              animation: 'slideUp 0.3s cubic-bezier(0.34,1.2,0.64,1) both',
              maxHeight: '90dvh',
              overflowY: 'auto',
            }}
          >
            {/* Handle + fechar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircleHeart size={20} style={{ color: 'var(--primary)' }} />
                <h2 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Fale com a gente</h2>
              </div>
              <button
                onClick={() => setFeedbackModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(0,0,0,0.06)', color: '#666' }}
              >
                <X size={16} />
              </button>
            </div>

            <FaleConoscoForm compact onSuccess={() => setTimeout(() => setFeedbackModal(false), 2500)} />
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
