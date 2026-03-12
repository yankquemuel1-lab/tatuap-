'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Trash2, ChevronDown, ChevronUp, Camera, X, Loader2 } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'
import { supabase } from '@/lib/supabase'

interface EntradaDiario {
  id: string
  brincadeira: string | null
  texto: string
  foto_url: string | null
  created_at: string
}

export default function DiarioPage() {
  const [entradas, setEntradas] = useState<EntradaDiario[]>([])
  const [brincadeira, setBrincadeira] = useState('')
  const [texto, setTexto] = useState('')
  const [foto, setFoto] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserId(session.user.id)
        const { data } = await supabase
          .from('diario')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
        if (data) setEntradas(data)
      }
      setLoading(false)
    }
    init()
  }, [])

  function handleFotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFoto(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function removerFoto() {
    setFoto(null)
    setFotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSalvar() {
    if (!texto.trim() || !userId) return
    setSalvando(true)

    let foto_url: string | null = null
    if (foto) {
      const ext = foto.name.split('.').pop()
      const path = `${userId}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('diario-fotos').upload(path, foto)
      if (!error) {
        const { data: urlData } = supabase.storage.from('diario-fotos').getPublicUrl(path)
        foto_url = urlData.publicUrl
      }
    }

    const { data } = await supabase
      .from('diario')
      .insert({ user_id: userId, brincadeira: brincadeira.trim() || null, texto: texto.trim(), foto_url })
      .select()
      .single()

    if (data) {
      setEntradas(prev => [data, ...prev])
      setBrincadeira('')
      setTexto('')
      removerFoto()
    }
    setSalvando(false)
  }

  async function handleDeletar(entrada: EntradaDiario) {
    if (entrada.foto_url && userId) {
      const path = entrada.foto_url.split('/diario-fotos/')[1]
      if (path) await supabase.storage.from('diario-fotos').remove([path])
    }
    await supabase.from('diario').delete().eq('id', entrada.id)
    setEntradas(prev => prev.filter(e => e.id !== entrada.id))
  }

  function toggleExpandido(id: string) {
    setExpandidos(prev => {
      const novo = new Set(prev)
      if (novo.has(id)) novo.delete(id)
      else novo.add(id)
      return novo
    })
  }

  function formatarData(iso: string) {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <Link href="/" className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
          <ArrowLeft size={18} />
        </Link>
        <p className="text-base font-extrabold" style={{ color: 'var(--text)' }}>Diário do Tatu</p>
      </header>

      <div className="px-4 pt-5 max-w-lg mx-auto">

        {/* Avatar + título */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-lg mb-3" style={{ borderColor: 'var(--primary)' }}>
            <Image src="/tatu-perfil.jpg" alt="Apé" width={80} height={80} className="w-full h-full object-cover" priority />
          </div>
          <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>Diário do Tatu</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Anote como foi sua roda de hoje!</p>
        </div>

        {/* Formulário */}
        <div className="rounded-2xl p-5 bg-white mb-5"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-md)' }}>

          {/* Aviso de compartilhamento */}
          <div className="flex items-start gap-2 text-xs p-3 rounded-xl mb-4"
            style={{ background: 'rgba(226,113,90,0.08)', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>🤝</span>
            <span>Seu diário é pessoal e compartilhado com a equipe Tatuapé — para acompanharmos nossa comunidade e melhorarmos os conteúdos.</span>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                Qual brincadeira você fez?
              </label>
              <input
                type="text" value={brincadeira} onChange={e => setBrincadeira(e.target.value)}
                placeholder="Samba de Roda, Ciranda..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--bg)', border: '1.5px solid rgba(0,0,0,0.1)', color: 'var(--text)', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                Como foi a roda hoje?
              </label>
              <textarea
                value={texto} onChange={e => setTexto(e.target.value)}
                placeholder="Escreva o que aconteceu, o que sentiu, o que funcionou..."
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                style={{ background: 'var(--bg)', border: '1.5px solid rgba(0,0,0,0.1)', color: 'var(--text)', fontFamily: 'inherit' }}
              />
            </div>

            {/* Upload de foto */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                Foto da roda (opcional)
              </label>
              {fotoPreview ? (
                <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={removerFoto}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.55)', color: 'white' }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl py-4 flex flex-col items-center gap-1.5"
                  style={{ border: '1.5px dashed rgba(226,113,90,0.4)', background: 'rgba(226,113,90,0.04)', color: 'var(--primary)' }}>
                  <Camera size={20} />
                  <span className="text-xs font-semibold">Adicionar foto</span>
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFotoSelect} />
            </div>

            <button
              onClick={handleSalvar}
              disabled={!texto.trim() || salvando}
              className="btn-primary w-full text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {salvando
                ? <><Loader2 size={16} className="animate-spin" /> Salvando...</>
                : 'Salvar no Diário 📔'
              }
            </button>
          </div>
        </div>

        {/* Lista de entradas */}
        <div className="mb-4">
          <h2 className="text-base font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Suas Anotações ({entradas.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 size={24} className="animate-spin" style={{ color: 'var(--primary)' }} />
            </div>
          ) : entradas.length === 0 ? (
            <div className="flex flex-col items-center text-center py-10 gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-sm" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
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
                  <div key={entrada.id} className="rounded-2xl bg-white overflow-hidden"
                    style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>

                    {entrada.foto_url && (
                      <div style={{ height: 180 }}>
                        <img src={entrada.foto_url} alt="Foto da roda" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {formatarData(entrada.created_at)}
                          </p>
                          {entrada.brincadeira && (
                            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--primary)' }}>
                              {entrada.brincadeira}
                            </p>
                          )}
                        </div>
                        <button onClick={() => handleDeletar(entrada)}
                          className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ background: 'rgba(226,113,90,0.08)', color: 'var(--primary)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <p className="text-sm leading-relaxed" style={{
                        color: 'var(--text)',
                        display: '-webkit-box',
                        WebkitLineClamp: expandido ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: expandido ? 'visible' : 'hidden',
                      } as React.CSSProperties}>
                        {entrada.texto}
                      </p>

                      {textoLongo && (
                        <button onClick={() => toggleExpandido(entrada.id)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                          style={{ color: 'var(--primary)' }}>
                          {expandido
                            ? <><ChevronUp size={14} /> Ver menos</>
                            : <><ChevronDown size={14} /> Ver mais</>
                          }
                        </button>
                      )}
                    </div>
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
