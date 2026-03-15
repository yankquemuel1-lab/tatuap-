'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'
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
              <Image src="/tatu-risada.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
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

      {/* Aviso newsletter em breve */}
      <section className="px-4 pt-6 pb-4">
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center gap-4"
          style={{
            background: 'white',
            border: '1.5px solid rgba(226,113,90,0.18)',
            boxShadow: '0 4px 24px rgba(226,113,90,0.10)',
          }}
        >
          <div className="text-5xl">📬</div>
          <div>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              A newsletter do Tatu chegando pra vocês!
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Em breve o Apé vai te trazer histórias, curiosidades e dicas da cultura popular direto na sua caixa de entrada. 🌿
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}
          >
            🕐 Em breve
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
