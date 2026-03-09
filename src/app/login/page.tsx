'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('E-mail ou senha incorretos. Tente novamente.')
    } else {
      router.push('/')
    }
    setCarregando(false)
  }

  async function handleEsqueceuSenha() {
    if (!email) {
      setErro('Digite seu e-mail acima primeiro.')
      return
    }
    setCarregando(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      setErro('Não foi possível enviar o e-mail. Tente novamente.')
    } else {
      setSucesso('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
    }
    setCarregando(false)
  }

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-5 py-8 overflow-hidden"
      style={{ background: 'var(--bg)', minHeight: '100dvh' }}
    >
      {/* Decorative blobs */}
      <div className="fixed -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }} />
      <div className="fixed -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: 'var(--primary-bg)' }} />

      {/* Logo */}
      <div className="flex flex-col items-center mb-8 z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4"
          style={{ background: 'var(--primary)' }}>
          <Image src="/tatu-rosto.jpg" alt="Apé" width={96} height={96} className="w-full h-full object-cover" priority />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
          Tatuapé App
        </h1>
        <p className="text-sm text-center mt-2 leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
          Explore as brincadeiras de roda com o Apé, nosso tatu canastra da cultura popular
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Acesse sua conta</h2>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Digite seu e-mail e senha para entrar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold px-1" style={{ color: 'var(--text)' }}>E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)', opacity: 0.6 }} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full h-14 pl-11 pr-4 rounded-xl text-sm outline-none"
                style={{ background: 'white', border: '1.5px solid rgba(226,113,90,0.2)', color: 'var(--text)', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
              />
            </div>
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold px-1" style={{ color: 'var(--text)' }}>Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)', opacity: 0.6 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className="w-full h-14 pl-11 pr-12 rounded-xl text-sm outline-none"
                style={{ background: 'white', border: '1.5px solid rgba(226,113,90,0.2)', color: 'var(--text)', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--primary)', opacity: 0.6 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Esqueci senha */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEsqueceuSenha}
              className="text-sm font-semibold"
              style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Mensagens */}
          {erro && (
            <div className="text-sm text-center py-2 px-3 rounded-xl font-medium"
              style={{ background: '#fff0ee', color: '#c0392b', border: '1px solid #f5c6c0' }}>
              {erro}
            </div>
          )}
          {sucesso && (
            <div className="text-sm text-center py-2 px-3 rounded-xl font-medium"
              style={{ background: '#e8f5e9', color: '#2d6a4f', border: '1px solid #a5d6a7' }}>
              {sucesso}
            </div>
          )}

          {/* Botão principal */}
          <button
            type="submit"
            disabled={carregando}
            className="btn-primary w-full text-base py-4 rounded-xl flex items-center justify-center gap-2"
            style={{ opacity: carregando ? 0.7 : 1, fontFamily: 'inherit' }}
          >
            {carregando ? 'Aguarde...' : 'Entrar'}
            {!carregando && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          O acesso é liberado após a compra do Tatuapé App.
        </p>
      </div>
    </main>
  )
}
