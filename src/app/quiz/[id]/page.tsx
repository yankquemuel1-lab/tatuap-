'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DINAMICAS, CATEGORIAS } from '@/data/dinamicas'
import { QUIZ } from '@/data/quiz'
import { marcarQuizCompleto, getDinamicaProgress } from '@/lib/progress'
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react'

const CAT_GRAD: Record<string, string> = {
  'dancas-musicas': 'linear-gradient(135deg, #e2715a 0%, #f4a261 100%)',
  'jogos-tradicao': 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)',
  'expressao-cura': 'linear-gradient(135deg, #1b4332 0%, #40916c 100%)',
  'construcao-coletiva': 'linear-gradient(135deg, #1a1a5e 0%, #3a3a9a 100%)',
}

type Estado = 'intro' | 'respondendo' | 'feedback' | 'resultado'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const din = DINAMICAS.find(d => d.id === id)
  const perguntas = QUIZ[id] ?? []

  const [estado, setEstado] = useState<Estado>('intro')
  const [atual, setAtual] = useState(0)
  const [selecionada, setSelecionada] = useState<number | null>(null)
  const [acertos, setAcertos] = useState(0)
  const [respostas, setRespostas] = useState<boolean[]>([])

  useEffect(() => {
    if (!din) { router.replace('/trilha'); return }
    const dp = getDinamicaProgress(id)
    if (!dp.leituraCompleta) { router.replace(`/dinamica/${id}`); return }
  }, [din, id, router])

  if (!din || perguntas.length === 0) return null

  const cat = CATEGORIAS[din.categoria]
  const pergunta = perguntas[atual]
  const totalPerguntas = perguntas.length
  const gradiente = CAT_GRAD[din.categoria]
  const proximaDin = DINAMICAS.find(d => d.numero === din.numero + 1)

  const handleResponder = (idx: number) => {
    if (selecionada !== null) return
    setSelecionada(idx)
    const acertou = idx === pergunta.correta
    setRespostas(r => [...r, acertou])
    if (acertou) setAcertos(a => a + 1)
    setEstado('feedback')
  }

  const handleProximo = () => {
    if (atual < totalPerguntas - 1) {
      setAtual(a => a + 1)
      setSelecionada(null)
      setEstado('respondendo')
    } else {
      const total = respostas.filter(Boolean).length + (selecionada === pergunta.correta ? 1 : 0)
      marcarQuizCompleto(id, total)
      setEstado('resultado')
    }
  }

  const handleReiniciar = () => {
    setAtual(0)
    setSelecionada(null)
    setAcertos(0)
    setRespostas([])
    setEstado('intro')
  }

  /* ── INTRO ── */
  if (estado === 'intro') {
    return (
      <main className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
        {/* Header */}
        <header
          className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
          style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
        >
          <Link
            href={`/dinamica/${id}`}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Quiz — {din.nome}</p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center">
          {/* Category gradient circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg animate-bounce-in"
            style={{ background: gradiente }}
          >
            🎯
          </div>

          <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
            Quiz de Conhecimento
          </h1>
          <p className="text-base font-bold mb-1" style={{ color: cat.cor }}>{din.nome}</p>
          <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--text-muted)' }}>
            {totalPerguntas} perguntas sobre as Raízes Ancestrais.<br />
            Acerte para conquistar e ganhar Sementes! 🌱
          </p>

          {/* Question dots */}
          <div className="flex gap-3 mb-8">
            {Array.from({ length: totalPerguntas }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white shadow-md"
                style={{ background: gradiente }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <button onClick={() => setEstado('respondendo')} className="btn-primary w-full max-w-xs">
            Começar o Quiz <ArrowRight size={18} />
          </button>
        </div>
      </main>
    )
  }

  /* ── RESULTADO ── */
  if (estado === 'resultado') {
    const totalAcertos = respostas.filter(Boolean).length
    const passou = totalAcertos >= 2
    const sementes = totalAcertos * 10

    return (
      <main className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
        <header
          className="sticky top-0 z-40 flex items-center px-4 py-3"
          style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Resultado — {din.nome}</p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8 text-center">
          {/* Result icon */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-6xl mb-5 shadow-xl animate-bounce-in"
            style={{ background: passou ? 'linear-gradient(135deg, var(--green), var(--green-light))' : gradiente }}
          >
            {passou ? '🏆' : '🌱'}
          </div>

          <h1 className="text-3xl font-extrabold mb-1.5" style={{ color: passou ? 'var(--green)' : 'var(--primary)' }}>
            {passou ? 'Conquistado!' : 'Continue Aprendendo!'}
          </h1>

          <div className="text-5xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
            {totalAcertos}/{totalPerguntas}
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>perguntas corretas</p>

          {passou && (
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold mb-5 animate-bounce-in"
              style={{ background: 'linear-gradient(135deg, var(--green), var(--green-light))' }}
            >
              🌱 +{sementes} Sementes conquistadas!
            </div>
          )}

          {/* Answers summary */}
          <div className="w-full max-w-sm mb-6">
            {respostas.map((acertou, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl mb-2 text-left"
                style={{ background: acertou ? 'var(--green-bg)' : 'var(--primary-bg)' }}
              >
                {acertou
                  ? <CheckCircle size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
                  : <XCircle size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                }
                <span className="text-sm" style={{ color: 'var(--text)' }}>
                  {perguntas[i].pergunta}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            {passou && proximaDin ? (
              <Link href={`/dinamica/${proximaDin.id}`} className="btn-primary">
                Próxima: {proximaDin.nome} <ArrowRight size={16} />
              </Link>
            ) : !passou ? (
              <button onClick={handleReiniciar} className="btn-primary">
                <RefreshCw size={16} /> Tentar Novamente
              </button>
            ) : null}
            <Link href="/trilha" className="btn-secondary">
              ← Voltar para Explorar
            </Link>
          </div>
        </div>
      </main>
    )
  }

  /* ── RESPONDENDO / FEEDBACK ── */
  const progressWidth = ((atual) / totalPerguntas) * 100

  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <Link
          href={`/dinamica/${id}`}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-bold" style={{ color: cat.cor }}>{din.nome}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Pergunta {atual + 1} de {totalPerguntas}
          </p>
        </div>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalPerguntas }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === atual ? 20 : 8,
                background: i < atual ? 'var(--green)' : i === atual ? cat.cor : 'rgba(0,0,0,0.12)',
              }}
            />
          ))}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 w-full" style={{ background: 'rgba(0,0,0,0.07)' }}>
        <div
          className="h-1 transition-all duration-500"
          style={{ width: `${progressWidth}%`, background: cat.cor }}
        />
      </div>

      <div className="flex-1 px-4 pt-6 pb-6 max-w-lg mx-auto w-full">
        {/* Question card */}
        <div
          className="rounded-2xl p-5 mb-5 text-center"
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-md)' }}
        >
          <div
            className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
            style={{ background: `${cat.cor}15` }}
          >
            🎯
          </div>
          <h2 className="text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>
            {pergunta.pergunta}
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-5">
          {pergunta.opcoes.map((opcao, i) => {
            const isCorreta = i === pergunta.correta
            const isSelecionada = i === selecionada
            let bg = 'white'
            let borderColor = 'rgba(0,0,0,0.09)'
            let textColor = 'var(--text)'
            let iconRight: React.ReactNode = null

            if (estado === 'feedback') {
              if (isCorreta) {
                bg = 'var(--green-bg)'
                borderColor = 'var(--green)'
                textColor = 'var(--green)'
                iconRight = <CheckCircle size={18} style={{ color: 'var(--green)', flexShrink: 0 }} />
              } else if (isSelecionada && !isCorreta) {
                bg = 'var(--primary-bg)'
                borderColor = 'var(--primary)'
                textColor = 'var(--primary)'
                iconRight = <XCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              }
            } else if (isSelecionada) {
              bg = `${cat.cor}10`
              borderColor = cat.cor
              textColor = cat.cor
            }

            return (
              <button
                key={i}
                onClick={() => handleResponder(i)}
                disabled={selecionada !== null}
                className="w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all"
                style={{
                  background: bg,
                  border: `1.5px solid ${borderColor}`,
                  color: textColor,
                  fontFamily: 'inherit',
                  boxShadow: isSelecionada ? `0 2px 12px ${cat.cor}25` : 'none',
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: estado === 'feedback' && isCorreta ? 'var(--green)' : isSelecionada ? cat.cor : 'rgba(0,0,0,0.07)',
                    color: (isSelecionada || (estado === 'feedback' && isCorreta)) ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-medium flex-1">{opcao}</span>
                {iconRight}
              </button>
            )
          })}
        </div>

        {/* Feedback explanation */}
        {estado === 'feedback' && (
          <div className="animate-fadein-up">
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: selecionada === pergunta.correta ? 'var(--green-bg)' : 'var(--primary-bg)',
                border: `1.5px solid ${selecionada === pergunta.correta ? 'var(--green)' : 'var(--primary)'}`,
              }}
            >
              <p className="text-sm font-bold mb-1.5" style={{ color: selecionada === pergunta.correta ? 'var(--green)' : 'var(--primary)' }}>
                {selecionada === pergunta.correta ? '✓ Correto!' : '✗ Não foi dessa vez'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {pergunta.explicacao}
              </p>
            </div>
            <button onClick={handleProximo} className="btn-primary w-full">
              {atual < totalPerguntas - 1 ? 'Próxima Pergunta' : 'Ver Resultado 🏆'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
