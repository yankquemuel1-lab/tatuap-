'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DINAMICAS, CATEGORIAS } from '@/data/dinamicas'
import { getDinamicaProgress, marcarLeituraCompleta } from '@/lib/progress'
import { ArrowLeft, Clock, Users, ChevronDown, ChevronUp, BookOpen, CheckCircle, ArrowRight, Heart } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'
import { toggleFavorito, isFavorito } from '@/lib/favoritos'

const ICONES_DINAMICA: Record<string, string> = {
  'samba-de-roda': '🥁', 'coco-de-roda': '🌊', 'ciranda': '🤝', 'jongo': '🔥',
  'tambor-de-crioula': '🥁', 'maculele': '🪵', 'danca-do-tore': '🌿', 'danca-do-awe': '🌸',
  'bate-coxa': '👐', 'obwisana': '🪨', 'a-canoa-virou': '⛵', 'brincadeira-da-mandioca': '🌱',
  'passa-o-anel': '💍', 'terra-mar': '🌊', 'fogo-na-montanha': '⛰️', 'mamba-em-roda': '🐍',
  'jogo-do-pilao': '🌾', 'ampe': '✋', 'peteca-em-roda': '🪶', 'kameshi-mpuku-ne': '🐭',
  'roda-de-historias-grio': '📖', 'roda-das-plantas-medicinais': '🌿', 'toque-do-coracao': '❤️',
  'roda-dos-elementos': '🌍', 'mandala-de-corpos': '✨', 'espelho-vivo': '🪞',
  'roda-da-gratidao': '🙏', 'roda-do-nome-sagrado': '📛', 'roda-das-sementes': '🌰',
  'roda-da-floresta': '🌳', 'teia-da-vida': '🕸️', 'roda-de-abayomi': '🪆',
  'roda-de-encerramento': '🌅',
}

const CAT_GRAD: Record<string, string> = {
  'dancas-musicas': 'linear-gradient(135deg, #e2715a 0%, #f4a261 100%)',
  'jogos-tradicao': 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)',
  'expressao-cura': 'linear-gradient(135deg, #1b4332 0%, #40916c 100%)',
  'construcao-coletiva': 'linear-gradient(135deg, #1a1a5e 0%, #3a3a9a 100%)',
}

export default function DinamicaPage() {
  const params = useParams()
  const id = params.id as string
  const [flipped, setFlipped] = useState(false)
  const [leituraFeita, setLeituraFeita] = useState(false)
  const [showFacilitador, setShowFacilitador] = useState(false)
  const [favorito, setFavorito] = useState(false)

  const din = DINAMICAS.find(d => d.id === id)

  useEffect(() => {
    if (!din) return
    const dp = getDinamicaProgress(id)
    setLeituraFeita(dp.leituraCompleta)
    setFavorito(isFavorito(id))
  }, [din, id])

  const handleToggleFavorito = () => {
    const adicionado = toggleFavorito(id)
    setFavorito(adicionado)
  }

  if (!din) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg)' }}>
        <span className="text-5xl">🌀</span>
        <p className="font-bold text-xl" style={{ color: 'var(--primary)' }}>Brincadeira não encontrada</p>
        <Link href="/trilha" className="btn-secondary">← Voltar para Explorar</Link>
      </div>
    )
  }

  const cat = CATEGORIAS[din.categoria]
  const dp = getDinamicaProgress(id)
  const icone = ICONES_DINAMICA[din.id] ?? '🌀'
  const gradiente = CAT_GRAD[din.categoria]
  const proxima = DINAMICAS.find(d => d.numero === din.numero + 1)

  const handleLerHistoria = () => {
    setFlipped(true)
    if (!leituraFeita) {
      marcarLeituraCompleta(id)
      setLeituraFeita(true)
    }
  }

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{
          background: 'rgba(248,246,246,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <Link
          href="/trilha"
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.cor }}>
            #{din.numero} · {cat.label}
          </p>
          <p className="text-sm font-extrabold truncate" style={{ color: 'var(--text)' }}>
            {din.nome}
          </p>
        </div>
        <button onClick={handleToggleFavorito}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: favorito ? 'var(--primary-bg)' : 'rgba(0,0,0,0.05)' }}>
          <Heart size={18}
            fill={favorito ? 'var(--primary)' : 'none'}
            style={{ color: favorito ? 'var(--primary)' : 'var(--text-light)' }} />
        </button>
        {dp.quizCompleto && (
          <CheckCircle size={22} style={{ color: 'var(--green)', flexShrink: 0 }} />
        )}
      </header>

      <div className="px-4 pt-4 max-w-lg mx-auto">

        {/* Hero banner */}
        <div
          className="rounded-2xl overflow-hidden mb-4 relative h-40 flex items-center justify-center shadow-md"
          style={{ background: gradiente }}
        >
          <span className="text-7xl drop-shadow-lg">{icone}</span>
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-white font-extrabold text-xl leading-tight drop-shadow">{din.nome}</p>
            <p className="text-white/80 text-xs mt-0.5 italic">{din.origem}</p>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { icon: <Clock size={12} />, text: `${din.tempoMin}-${din.tempoMax} min` },
            { icon: <Users size={12} />, text: `${din.pessoasMin}${din.pessoasMax >= 999 ? '+' : `-${din.pessoasMax}`} pessoas` },
            { icon: <span className="text-xs">🎂</span>, text: `${din.idadeMin}+ anos` },
            { icon: <span className="text-xs">🛠️</span>, text: din.material },
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${cat.cor}12`, color: 'var(--text)', border: `1px solid ${cat.cor}25` }}
            >
              {item.icon} {item.text}
            </span>
          ))}
        </div>

        {/* Flip Card */}
        <div className={`card-flip-container mb-4 ${flipped ? 'flipped' : ''}`} style={{ minHeight: 420 }}>
          <div className="card-flip-inner" style={{ minHeight: 420 }}>

            {/* FRENTE */}
            <div
              className="card-face rounded-2xl overflow-hidden"
              style={{
                position: 'absolute', inset: 0, overflowY: 'auto',
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="p-5">
                {/* Objetivo */}
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cat.cor }}>
                    ✦ Objetivo
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                    {din.objetivo}
                  </p>
                </div>

                {/* Valores */}
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cat.cor }}>
                    ✦ Valores
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {din.valores.map(v => (
                      <span
                        key={v}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: `${cat.cor}12`, color: cat.cor, border: `1px solid ${cat.cor}25` }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tecnologia ancestral */}
                <div
                  className="rounded-xl p-3.5 mb-4"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                    ⚡ Tecnologia Ancestral
                  </p>
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text)' }}>
                    &ldquo;{din.tecnologiaAncestral}&rdquo;
                  </p>
                </div>

                <button
                  onClick={handleLerHistoria}
                  className="btn-primary w-full"
                  style={{ background: cat.cor }}
                >
                  <BookOpen size={17} /> Raízes Ancestrais
                </button>
              </div>
            </div>

            {/* VERSO — Raízes */}
            <div
              className="card-face card-back rounded-2xl overflow-hidden"
              style={{
                position: 'absolute', inset: 0, overflowY: 'auto',
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="p-5">
                {/* Verso header */}
                <div className="rounded-xl p-3.5 mb-4" style={{ background: 'var(--indigo)' }}>
                  <p className="text-white font-bold text-base">🌍 Raízes Ancestrais</p>
                  <p className="text-white/70 text-xs">{din.nome}</p>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text)' }}>
                  {din.raizesHistoricas}
                </p>

                {din.patrimonios && din.patrimonios.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--indigo)' }}>
                      🏛️ Reconhecimentos
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {din.patrimonios.map(p => (
                        <span
                          key={p}
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ background: 'rgba(26,26,94,0.08)', color: 'var(--indigo)', border: '1px solid rgba(26,26,94,0.15)' }}
                        >
                          🏆 {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setFlipped(false)}
                  className="btn-secondary w-full"
                >
                  ← Voltar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Passo a passo */}
        <div
          className="rounded-2xl p-5 mb-4 bg-white"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}
        >
          <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>
            📋 Como Fazer — Passo a Passo
          </p>
          <ol className="space-y-3">
            {din.passoAPasso.map((passo, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: cat.cor }}
                >
                  {i + 1}
                </span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>{passo}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Variação */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: `${cat.cor}08`,
            border: `1.5px dashed ${cat.cor}40`,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: cat.cor }}>
            🔄 Variação
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{din.variacao}</p>
        </div>

        {/* Dica do Facilitador */}
        <button
          onClick={() => setShowFacilitador(!showFacilitador)}
          className="w-full text-left rounded-2xl p-4 mb-4 transition-all"
          style={{
            background: showFacilitador ? 'var(--green-bg)' : 'white',
            border: `1.5px solid ${showFacilitador ? 'var(--green)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>
              🌿 Dica do Facilitador
            </p>
            {showFacilitador
              ? <ChevronUp size={18} style={{ color: 'var(--green)' }} />
              : <ChevronDown size={18} style={{ color: 'var(--text-light)' }} />
            }
          </div>
          {showFacilitador && (
            <p className="text-sm mt-2 leading-relaxed animate-fadein" style={{ color: 'var(--text)' }}>
              {din.dicaFacilitador}
            </p>
          )}
        </button>

        {/* Action */}
        {dp.quizCompleto ? (
          <div
            className="rounded-2xl p-5 text-white text-center mb-4"
            style={{ background: 'linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%)' }}
          >
            <CheckCircle size={32} className="mx-auto mb-2 opacity-90" />
            <p className="font-extrabold text-lg mb-1">Brincadeira Conquistada!</p>
            <p className="text-white/80 text-sm mb-4">
              Pontuação: {dp.quizPontuacao}/3 no quiz
            </p>
            {proxima && (
              <Link
                href={`/dinamica/${proxima.id}`}
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                Próxima: {proxima.nome} <ArrowRight size={16} />
              </Link>
            )}
          </div>
        ) : leituraFeita ? (
          <Link href={`/quiz/${din.id}`} className="btn-primary w-full text-base">
            🎯 Fazer o Quiz para Conquistar
          </Link>
        ) : (
          <button onClick={handleLerHistoria} className="btn-secondary w-full">
            📖 Leia as Raízes para Liberar o Quiz
          </button>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
