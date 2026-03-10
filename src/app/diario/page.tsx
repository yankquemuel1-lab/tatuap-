'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowLeft, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

interface EntradaDiario {
  id: string
  data: string
  brincadeira: string
  texto: string
}

const STORAGE_KEY = 'tatuape-diario'

function carregarEntradas(): EntradaDiario[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function salvarEntradas(entradas: EntradaDiario[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas))
}

export default function DiarioPage() {
  const [entradas, setEntradas] = useState<EntradaDiario[]>([])
  const [brincadeira, setBrincadeira] = useState('')
  const [texto, setTexto] = useState('')
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set())

  useEffect(() => {
    setEntradas(carregarEntradas())
  }, [])

  function handleSalvar() {
    if (!texto.trim()) return
    const nova: EntradaDiario = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString('pt-BR'),
      brincadeira: brincadeira.trim(),
      texto: texto.trim(),
    }
    const novas = [nova, ...entradas]
    setEntradas(novas)
    salvarEntradas(novas)
    setBrincadeira('')
    setTexto('')
  }

  function handleDeletar(id: string) {
    const novas = entradas.filter(e => e.id !== id)
    setEntradas(novas)
    salvarEntradas(novas)
  }

  function toggleExpandido(id: string) {
    setExpandidos(prev => {
      const novo = new Set(prev)
      if (novo.has(id)) {
        novo.delete(id)
      } else {
        novo.add(id)
      }
      return novo
    })
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
          href="/"
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-base font-extrabold" style={{ color: 'var(--text)' }}>Diário do Tatu</p>
        </div>
      </header>

      <div className="px-4 pt-5 max-w-lg mx-auto">

        {/* Avatar + título */}
        <div className="flex flex-col items-center text-center mb-5">
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-lg mb-3"
            style={{ borderColor: 'var(--primary)' }}
          >
            <Image
              src="/tatu-perfil.jpg"
              alt="Apé"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
            Diário do Tatu
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Anote como foi sua roda de hoje!
          </p>
        </div>

        {/* Formulário */}
        <div
          className="rounded-2xl p-5 bg-white mb-5"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-md)' }}
        >
          {/* Badge em breve */}
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(226,113,90,0.1)', color: 'var(--primary)' }}
          >
            📸 Em breve: salve fotos da sua roda
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                Qual brincadeira você fez?
              </label>
              <input
                type="text"
                value={brincadeira}
                onChange={e => setBrincadeira(e.target.value)}
                placeholder="Samba de Roda, Ciranda..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: 'var(--bg)',
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                Como foi a roda hoje?
              </label>
              <textarea
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder="Escreva o que aconteceu, o que sentiu, o que funcionou..."
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                style={{
                  background: 'var(--bg)',
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button
              onClick={handleSalvar}
              disabled={!texto.trim()}
              className="btn-primary w-full text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Salvar no Diário 📔
            </button>
          </div>
        </div>

        {/* Lista de entradas */}
        <div className="mb-4">
          <h2 className="text-base font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Suas Anotações ({entradas.length})
          </h2>

          {entradas.length === 0 ? (
            <div className="flex flex-col items-center text-center py-10 gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-sm"
                style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <Image src="/tatu-perfil.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Nenhuma anotação ainda.<br />Faça sua primeira roda e registre aqui!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {entradas.map(entrada => {
                const expandido = expandidos.has(entrada.id)
                const textoLongo = entrada.texto.length > 120
                return (
                  <div
                    key={entrada.id}
                    className="rounded-2xl p-4 bg-white"
                    style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                          {entrada.data}
                        </p>
                        {entrada.brincadeira && (
                          <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--primary)' }}>
                            {entrada.brincadeira}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeletar(entrada.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-colors"
                        style={{ background: 'rgba(226,113,90,0.08)', color: 'var(--primary)' }}
                        aria-label="Deletar entrada"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'var(--text)',
                        display: '-webkit-box',
                        WebkitLineClamp: expandido ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: expandido ? 'visible' : 'hidden',
                      } as React.CSSProperties}
                    >
                      {entrada.texto}
                    </p>
                    {textoLongo && (
                      <button
                        onClick={() => toggleExpandido(entrada.id)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                        style={{ color: 'var(--primary)' }}
                      >
                        {expandido ? (
                          <><ChevronUp size={14} /> Ver menos</>
                        ) : (
                          <><ChevronDown size={14} /> Ver mais</>
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
