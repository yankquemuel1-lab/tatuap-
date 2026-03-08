'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [nome, setNome] = useState('')
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

    if (modo === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) {
        setErro('E-mail ou senha incorretos. Tente novamente.')
      } else {
        router.push('/')
      }
    } else {
      if (!nome.trim()) {
        setErro('Informe seu nome para continuar.')
        setCarregando(false)
        return
      }
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { nome },
          emailRedirectTo: `${window.location.origin}/`,
        },
      })
      if (error) {
        if (error.message.includes('already registered')) {
          setErro('Este e-mail já está cadastrado. Faça login.')
        } else if (error.message.includes('Password')) {
          setErro('A senha precisa ter pelo menos 6 caracteres.')
        } else {
          setErro('Erro ao criar conta. Tente novamente.')
        }
      } else {
        setSucesso('Conta criada! Verifique seu e-mail para confirmar e depois faça login.')
        setModo('login')
        setNome('')
        setEmail('')
        setSenha('')
      }
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
          <Image src="/avatar-tatuape.jpg" alt="Tatuapé" width={96} height={96} className="w-full h-full object-cover" priority />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
          Tatuapé
        </h1>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        {/* Toggle */}
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(226,113,90,0.2)' }}>
          <button
            onClick={() => { setModo('login'); setErro(''); setSucesso('') }}
            className="flex-1 py-3 text-sm font-bold transition-all"
            style={{
              background: modo === 'login' ? 'var(--primary)' : 'white',
              color: modo === 'login' ? 'white' : 'var(--text-muted)',
              fontFamily: 'inherit',
            }}
          >
            Entrar
          </button>
          <button
            onClick={() => { setModo('cadastro'); setErro(''); setSucesso('') }}
            className="flex-1 py-3 text-sm font-bold transition-all"
            style={{
              background: modo === 'cadastro' ? 'var(--primary)' : 'white',
              color: modo === 'cadastro' ? 'white' : 'var(--text-muted)',
              fontFamily: 'inherit',
            }}
          >
            Criar conta
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
            {modo === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {modo === 'login' ? 'Faça login para continuar sua trilha.' : 'É rápido e gratuito!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nome (só no cadastro) */}
          {modo === 'cadastro' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold px-1" style={{ color: 'var(--text)' }}>Nome</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--primary)', opacity: 0.6 }} />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="w-full h-14 pl-11 pr-4 rounded-xl text-sm outline-none"
                  style={{ background: 'white', border: '1.5px solid rgba(226,113,90,0.2)', color: 'var(--text)', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
                />
              </div>
            </div>
          )}

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
                placeholder={modo === 'cadastro' ? 'Mínimo 6 caracteres' : 'Sua senha secreta'}
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
          {modo === 'login' && (
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
          )}

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
            {carregando ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
            {!carregando && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Ao criar uma conta, você concorda com os nossos termos de uso.
        </p>
      </div>
    </main>
  )
}
