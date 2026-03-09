'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DINAMICAS, CATEGORIAS, type Categoria } from '@/data/dinamicas'
import { getProgress, type UserProgress } from '@/lib/progress'
import { ArrowLeft, Search, Zap, Users, CheckCircle } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

function truncarTexto(texto: string, max = 62): string {
  if (texto.length <= max) return texto + '...'
  let cortado = texto.slice(0, max)
  const ultimoEspaco = cortado.lastIndexOf(' ')
  if (ultimoEspaco > max * 0.6) cortado = cortado.slice(0, ultimoEspaco)
  const palavras = cortado.trimEnd().split(' ')
  if (palavras[palavras.length - 1].length <= 2 && palavras.length > 1) {
    palavras.pop()
    cortado = palavras.join(' ')
  }
  return cortado.trimEnd() + '...'
}

const LABEL_CURTO: Record<string, string> = {
  'dancas-musicas': 'Danças de Roda',
  'jogos-tradicao': 'Jogos de Roda',
  'expressao-cura': 'Rodas de Cura',
  'construcao-coletiva': 'Rodas de Construção',
}

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

function TrilhaContent() {
  const searchParams = useSearchParams()
  const categoriaFiltro = searchParams.get('categoria') as Categoria | null
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [filtro, setFiltro] = useState<Categoria | 'todas'>(categoriaFiltro ?? 'todas')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    getProgress().then(setProgress)
  }, [])

  useEffect(() => {
    if (categoriaFiltro) setFiltro(categoriaFiltro)
  }, [categoriaFiltro])

  const dinamicasFiltradas = (filtro === 'todas' ? DINAMICAS : DINAMICAS.filter(d => d.categoria === filtro))
    .filter(d => busca === '' || d.nome.toLowerCase().includes(busca.toLowerCase()))

  const getStatus = (id: string) => {
    if (!progress) return 'disponivel'
    return progress.dinamicas[id]?.quizCompleto ? 'completo' : 'disponivel'
  }

  const tituloHeader = filtro === 'todas' ? 'Todas as Brincadeiras' : LABEL_CURTO[filtro]
  const catAtual = filtro !== 'todas' ? CATEGORIAS[filtro] : null

  const totalCompletos = progress
    ? Object.values(progress.dinamicas).filter(d => d.quizCompleto).length
    : 0

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{
          background: 'rgba(248,246,246,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(226,113,90,0.1)',
        }}
      >
        <Link
          href="/"
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-extrabold flex-1 tracking-tight" style={{ color: 'var(--text)' }}>
          {tituloHeader}
        </h1>
        {progress && (
          <span className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
            {totalCompletos}/{DINAMICAS.length}
          </span>
        )}
      </header>

      {/* Mascot welcome (only when category selected) */}
      {catAtual && (
        <section className="px-4 pt-4">
          <div
            className="flex gap-3 items-start p-4 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2"
              style={{ borderColor: `${catAtual.cor}40` }}>
              <Image src="/avatar-tatuape.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold mb-0.5" style={{ color: catAtual.cor }}>
                Olá! Sou o Apé
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {catAtual.descricao} Vamos descobrir juntos?
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-light)' }} />
          <input
            type="text"
            placeholder="Buscar brincadeiras..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl text-sm outline-none"
            style={{
              background: 'white',
              border: '1.5px solid rgba(0,0,0,0.07)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              boxShadow: 'var(--shadow)',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.07)')}
          />
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFiltro('todas')}
          className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
          style={{
            background: filtro === 'todas' ? 'var(--primary)' : 'white',
            color: filtro === 'todas' ? 'white' : 'var(--text-muted)',
            border: '1.5px solid',
            borderColor: filtro === 'todas' ? 'var(--primary)' : 'rgba(0,0,0,0.08)',
            boxShadow: filtro === 'todas' ? '0 2px 8px rgba(226,113,90,0.3)' : 'none',
            fontFamily: 'inherit',
          }}
        >
          Todas
        </button>
        {Object.entries(CATEGORIAS).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setFiltro(key as Categoria)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: filtro === key ? cat.cor : 'white',
              color: filtro === key ? 'white' : cat.cor,
              border: '1.5px solid',
              borderColor: filtro === key ? cat.cor : `${cat.cor}40`,
              boxShadow: filtro === key ? `0 2px 8px ${cat.cor}40` : 'none',
              fontFamily: 'inherit',
            }}
          >
            {LABEL_CURTO[key]}
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-base font-bold" style={{ color: 'var(--text)' }}>
          {filtro === 'todas' ? 'Explore os Ritmos' : `${LABEL_CURTO[filtro]}`}
        </h3>
        <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
          {dinamicasFiltradas.length} brincadeiras
        </span>
      </div>

      {/* Cards grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {dinamicasFiltradas.map((din) => {
          const status = getStatus(din.id)
          const cat = CATEGORIAS[din.categoria]
          const icone = ICONES_DINAMICA[din.id] ?? '🌀'
          const gradClass = {
            'dancas-musicas': 'cat-dancas',
            'jogos-tradicao': 'cat-jogos',
            'expressao-cura': 'cat-cura',
            'construcao-coletiva': 'cat-construcao',
          }[din.categoria]

          return (
            <Link
              key={din.id}
              href={`/dinamica/${din.id}`}
              className="flex flex-col rounded-2xl overflow-hidden shadow-sm relative"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'white' }}
            >
              {/* Brincadeira image */}
              <div className="h-32 relative overflow-hidden">
                <Image
                  src={`/brincadeiras/${din.id}.png`}
                  alt={din.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 50vw, 240px"
                />
                {status === 'completo' && (
                  <div
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'white' }}
                  >
                    <CheckCircle size={18} style={{ color: 'var(--green)' }} />
                  </div>
                )}
                {din.novidade && status !== 'completo' && (
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: '#fef3c7', color: '#92400e' }}
                  >
                    NOVA
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 flex-1 flex flex-col">
                <h4 className="text-sm font-bold leading-tight mb-1" style={{ color: 'var(--text)' }}>
                  {din.nome}
                </h4>
                <p className="text-xs italic mb-2" style={{ color: 'var(--text-muted)' }}>
                  &ldquo;{truncarTexto(din.tecnologiaAncestral)}&rdquo;
                </p>
                <div className="mt-auto flex gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: '#fef9c3', color: '#a16207' }}>
                    <Zap size={10} style={{ color: '#eab308' }} /> {din.tempoMin}min
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: '#dcfce7', color: '#166534' }}>
                    <Users size={10} style={{ color: '#22c55e' }} /> {din.pessoasMin}+
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {dinamicasFiltradas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <span className="text-5xl mb-3">🔍</span>
          <p className="font-bold text-base" style={{ color: 'var(--text)' }}>Nenhuma brincadeira encontrada</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Tente outro termo de busca</p>
        </div>
      )}

      <BottomNav />
    </main>
  )
}

export default function TrilhaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-5xl animate-spin-slow">🌀</div>
      </div>
    }>
      <TrilhaContent />
    </Suspense>
  )
}
