'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowLeft, Heart, Zap, Users } from 'lucide-react'
import { DINAMICAS, CATEGORIAS } from '@/data/dinamicas'
import { getFavoritos } from '@/lib/favoritos'
import { BottomNav } from '@/components/BottomNav'

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
  'dancas-musicas': 'linear-gradient(135deg, #e2715a, #f4a261)',
  'jogos-tradicao': 'linear-gradient(135deg, #2d6a4f, #52b788)',
  'expressao-cura': 'linear-gradient(135deg, #1b4332, #40916c)',
  'construcao-coletiva': 'linear-gradient(135deg, #1a1a5e, #3a3a9a)',
}

export default function FavoritosPage() {
  const [favIds, setFavIds] = useState<string[]>([])

  useEffect(() => {
    setFavIds(getFavoritos())
  }, [])

  const favDinamicas = DINAMICAS.filter(d => favIds.includes(d.id))

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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Meus Favoritos</h1>
        {favDinamicas.length > 0 && (
          <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            {favDinamicas.length}
          </span>
        )}
      </header>

      {favDinamicas.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
            style={{ background: 'var(--primary-bg)' }}>
            <Heart size={40} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
            Nenhum favorito ainda
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            Abra qualquer brincadeira e toque no coração ♡ para adicioná-la aqui. Suas favoritas ficam sempre à mão!
          </p>
          <Link href="/trilha" className="btn-primary">
            Explorar Brincadeiras
          </Link>
        </div>
      ) : (
        <>
          {/* Mascot message */}
          <section className="px-4 pt-5 pb-3">
            <div className="flex gap-3 items-center p-3 rounded-xl"
              style={{ background: 'var(--primary-bg)', border: '1px solid rgba(226,113,90,0.15)' }}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/avatar-tatuape.jpg" alt="Apé" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm" style={{ color: 'var(--text)' }}>
                <strong style={{ color: 'var(--primary)' }}>Suas escolhidas! ❤️</strong>{' '}
                {favDinamicas.length} brincadeira{favDinamicas.length > 1 ? 's' : ''} guardada{favDinamicas.length > 1 ? 's' : ''}.
              </p>
            </div>
          </section>

          {/* Grid */}
          <div className="px-4 grid grid-cols-2 gap-3">
            {favDinamicas.map(din => {
              const cat = CATEGORIAS[din.categoria]
              const icone = ICONES_DINAMICA[din.id] ?? '🌀'
              const grad = CAT_GRAD[din.categoria]

              return (
                <Link
                  key={din.id}
                  href={`/dinamica/${din.id}`}
                  className="flex flex-col rounded-2xl overflow-hidden shadow-sm"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'white' }}
                >
                  <div className="h-28 flex items-center justify-center relative" style={{ background: grad }}>
                    <span className="text-4xl drop-shadow-md">{icone}</span>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.9)' }}>
                      <Heart size={12} fill="var(--primary)" style={{ color: 'var(--primary)' }} />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold leading-tight mb-1" style={{ color: 'var(--text)' }}>
                      {din.nome}
                    </h4>
                    <div className="flex gap-1.5">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-muted)' }}>
                        <Zap size={10} /> {din.tempoMin}min
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-muted)' }}>
                        <Users size={10} /> {din.pessoasMin}+
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}

      <BottomNav />
    </main>
  )
}
