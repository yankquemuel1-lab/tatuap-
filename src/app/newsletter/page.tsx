'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Clock, ChevronRight, Mail } from 'lucide-react'
import { ARTIGOS_CULTURA } from '@/data/cultura'
import { BottomNav } from '@/components/BottomNav'
import { supabase } from '@/lib/supabase'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'carregando' | 'sucesso' | 'erro'>('idle')
  const [mensagem, setMensagem] = useState('')

  async function handleAssinar(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('carregando')
    const { error } = await supabase.from('newsletter_emails').insert({ email })
    if (error) {
      if (error.code === '23505') {
        setMensagem('Este e-mail já está cadastrado. Obrigado!')
        setStatus('sucesso')
      } else {
        setMensagem('Erro ao assinar. Tente novamente.')
        setStatus('erro')
      }
    } else {
      setMensagem('Assinatura confirmada! Bem-vindo à comunidade 🎉')
      setStatus('sucesso')
      setEmail('')
    }
  }

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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Newsletter do Tatu</h1>
      </header>

      {/* Hero subscription */}
      <section className="px-4 pt-5 pb-2">
        <div
          className="rounded-2xl p-5 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}
        >
          <div className="flex gap-4 items-start relative z-10">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
              <Image src="/avatar-tatuape.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-lg leading-tight">Fique por dentro!</p>
              <p className="text-white/85 text-sm mt-1 leading-relaxed">
                Receba artigos sobre cultura popular, dicas de brincadeiras e novidades do Tatuapé toda semana.
              </p>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleAssinar} className="mt-4 relative z-10">
            {status === 'sucesso' ? (
              <div className="text-center py-3 px-4 rounded-xl font-bold text-sm"
                style={{ background: 'rgba(255,255,255,0.3)' }}>
                ✅ {mensagem}
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="flex-1 h-11 px-4 rounded-xl text-sm outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      color: 'white',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'carregando'}
                    className="h-11 px-4 rounded-xl font-bold text-sm flex-shrink-0"
                    style={{ background: 'white', color: 'var(--primary)', fontFamily: 'inherit', opacity: status === 'carregando' ? 0.7 : 1 }}
                  >
                    {status === 'carregando' ? '...' : 'Assinar'}
                  </button>
                </div>
                {status === 'erro' && (
                  <p className="text-white text-xs mt-2 font-medium">{mensagem}</p>
                )}
              </>
            )}
          </form>

          <Mail size={90} className="absolute -right-4 -bottom-4 opacity-10" />
        </div>
      </section>

      {/* Cultura Popular articles */}
      <section className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>
            🎭 Cultura Popular
          </h2>
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
            {ARTIGOS_CULTURA.length} artigos
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {ARTIGOS_CULTURA.map(artigo => (
            <Link
              key={artigo.slug}
              href={`/cultura/${artigo.slug}`}
              className="flex gap-4 items-center p-4 rounded-2xl bg-white"
              style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: artigo.corClara }}
              >
                {artigo.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>
                  {artigo.titulo}
                </h3>
                <p className="text-xs mt-0.5 mb-1.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {artigo.resumo}
                </p>
                <span className="inline-flex items-center gap-1 text-xs" style={{ color: artigo.cor }}>
                  <Clock size={10} /> {artigo.tempoLeitura} de leitura
                </span>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: artigo.corClara, color: artigo.cor }}
              >
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon editions */}
      <section className="px-4 pt-6 pb-2">
        <h2 className="text-xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          📬 Edições da Newsletter
        </h2>
        <div
          className="flex flex-col items-center py-10 px-4 text-center rounded-2xl"
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <span className="text-4xl mb-3">📭</span>
          <p className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>
            Em breve
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            As edições da newsletter aparecerão aqui quando publicadas.
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
