'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, LogOut, Sprout, Star, Trophy, BookOpen, Pencil, Check, X, Camera, KeyRound, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getProgress, defaultProgress, type UserProgress } from '@/lib/progress'
import { BottomNav } from '@/components/BottomNav'

interface UserInfo {
  nome: string
  email: string
  avatarUrl: string | null
}

const CONQUISTAS_INFO: Record<string, { emoji: string; label: string }> = {
  'primeira-roda': { emoji: '🌱', label: 'Primeira Roda' },
  'cinco-rodas': { emoji: '⭐', label: 'Cinco Rodas' },
  'guardiao': { emoji: '🛡️', label: 'Guardião' },
  'mestre': { emoji: '🏆', label: 'Mestre' },
  'roda-completa': { emoji: '🎯', label: 'Roda Completa' },
}

export default function PerfilPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState<UserInfo | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [saindo, setSaindo] = useState(false)
  const [progresso, setProgresso] = useState<UserProgress>(defaultProgress())

  // Edição de nome
  const [editandoNome, setEditandoNome] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [salvandoNome, setSalvandoNome] = useState(false)
  const [erroNome, setErroNome] = useState('')

  // Upload de foto
  const [uploadandoFoto, setUploadandoFoto] = useState(false)
  const [erroFoto, setErroFoto] = useState('')

  // Troca de senha
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [salvandoSenha, setSalvandoSenha] = useState(false)
  const [erroSenha, setErroSenha] = useState('')
  const [sucessoSenha, setSucessoSenha] = useState('')

  const totalConcluidas = Object.values(progresso.dinamicas).filter(d => d.quizCompleto).length

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          nome: data.user.user_metadata?.nome || data.user.email?.split('@')[0] || 'Explorador',
          email: data.user.email || '',
          avatarUrl: data.user.user_metadata?.avatar_url || null,
        })
        setNovoNome(data.user.user_metadata?.nome || '')
      }
      setCarregando(false)
    })
    getProgress().then(setProgresso)
  }, [])

  async function handleSair() {
    setSaindo(true)
    await supabase.auth.signOut()
    router.push('/login')
  }

  async function trocarSenha() {
    setErroSenha('')
    setSucessoSenha('')
    if (novaSenha.length < 6) {
      setErroSenha('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (novaSenha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem.')
      return
    }
    setSalvandoSenha(true)
    const { error } = await supabase.auth.updateUser({ password: novaSenha })
    if (error) {
      setErroSenha('Não foi possível trocar a senha. Tente novamente.')
    } else {
      setSucessoSenha('Senha alterada com sucesso!')
      setNovaSenha('')
      setConfirmarSenha('')
    }
    setSalvandoSenha(false)
  }

  async function salvarNome() {
    if (!novoNome.trim()) {
      setErroNome('O nome não pode estar vazio.')
      return
    }
    setSalvandoNome(true)
    setErroNome('')
    const { error } = await supabase.auth.updateUser({ data: { nome: novoNome.trim() } })
    if (error) {
      setErroNome('Não foi possível salvar. Tente novamente.')
    } else {
      setUser(u => u ? { ...u, nome: novoNome.trim() } : u)
      setEditandoNome(false)
    }
    setSalvandoNome(false)
  }

  async function handleFotoSelecionada(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadandoFoto(true)
    setErroFoto('')

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) throw new Error('Sem sessão')

      const ext = file.name.split('.').pop()
      const path = `${currentUser.id}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      })
      if (updateError) throw updateError

      setUser(u => u ? { ...u, avatarUrl: publicUrl } : u)
    } catch {
      setErroFoto('Não foi possível enviar a foto. Verifique se o bucket "avatars" está criado no Supabase Storage.')
    } finally {
      setUploadandoFoto(false)
    }
  }

  if (carregando) {
    return (
      <main className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="text-4xl mb-3">🐾</div>
          <p style={{ color: 'var(--text-muted)' }}>Carregando...</p>
        </div>
      </main>
    )
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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Meu Perfil</h1>
      </header>

      <div className="px-4 pt-6 flex flex-col gap-5">

        {/* Avatar + info */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}
        >
          {/* Foto com botão de troca */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {user?.avatarUrl ? (
                <Image src={user.avatarUrl} alt="Foto de perfil" width={80} height={80} className="w-full h-full object-cover" />
              ) : (
                <Image src="/tatu-rosto.jpg" alt="Apé" width={80} height={80} className="w-full h-full object-cover" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadandoFoto}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow"
              style={{ background: 'var(--primary)' }}
              title="Trocar foto"
            >
              {uploadandoFoto
                ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Camera size={13} color="white" />
              }
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoSelecionada}
            />
          </div>

          <div className="text-white flex-1 min-w-0">
            {user ? (
              <>
                {/* Nome editável */}
                {editandoNome ? (
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      value={novoNome}
                      onChange={e => setNovoNome(e.target.value)}
                      className="text-base font-bold rounded-lg px-2 py-1 flex-1 min-w-0"
                      style={{ color: 'var(--text)', background: 'white', border: 'none', outline: 'none', fontFamily: 'inherit' }}
                      autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') salvarNome(); if (e.key === 'Escape') setEditandoNome(false) }}
                    />
                    <button onClick={salvarNome} disabled={salvandoNome}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20">
                      <Check size={14} color="white" />
                    </button>
                    <button onClick={() => setEditandoNome(false)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20">
                      <X size={14} color="white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-extrabold text-xl leading-tight truncate">{user.nome}</p>
                    <button onClick={() => { setNovoNome(user.nome); setEditandoNome(true) }}
                      className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 flex-shrink-0">
                      <Pencil size={11} color="white" />
                    </button>
                  </div>
                )}
                {erroNome && <p className="text-xs text-yellow-200 mb-1">{erroNome}</p>}
                {erroFoto && <p className="text-xs text-yellow-200 mb-1">{erroFoto}</p>}
                <p className="text-white/80 text-sm truncate">{user.email}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Sprout size={14} />
                  <span className="text-sm font-bold">{progresso.sementes} sementes</span>
                </div>
              </>
            ) : (
              <>
                <p className="font-extrabold text-xl">Explorador Anônimo</p>
                <p className="text-white/80 text-sm mt-0.5">Seu progresso fica só neste dispositivo</p>
                <Link href="/login"
                  className="inline-block mt-2 text-sm font-bold py-1 px-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
                  Criar conta →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center py-4 rounded-2xl bg-white"
            style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <Sprout size={22} style={{ color: 'var(--primary)' }} />
            <p className="font-extrabold text-xl mt-1" style={{ color: 'var(--text)' }}>{progresso.sementes}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Sementes</p>
          </div>
          <div className="flex flex-col items-center py-4 rounded-2xl bg-white"
            style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <BookOpen size={22} style={{ color: '#4a7c59' }} />
            <p className="font-extrabold text-xl mt-1" style={{ color: 'var(--text)' }}>{totalConcluidas}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Concluídas</p>
          </div>
          <div className="flex flex-col items-center py-4 rounded-2xl bg-white"
            style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <Star size={22} style={{ color: '#f4a261' }} />
            <p className="font-extrabold text-xl mt-1" style={{ color: 'var(--text)' }}>{progresso.streak}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Dias seguidos</p>
          </div>
        </div>

        {/* Conquistas */}
        <div className="rounded-2xl bg-white p-4" style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={18} style={{ color: 'var(--primary)' }} />
            <h2 className="font-extrabold text-base" style={{ color: 'var(--text)' }}>Conquistas</h2>
          </div>
          {progresso.conquistasBadges.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-3xl mb-2">🥚</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Complete sua primeira dinâmica para ganhar conquistas!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {progresso.conquistasBadges.map(id => {
                const info = CONQUISTAS_INFO[id]
                if (!info) return null
                return (
                  <div key={id}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-bold"
                    style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
                    <span>{info.emoji}</span>
                    <span>{info.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Trocar senha */}
        {user && (
          <div className="rounded-2xl bg-white p-4" style={{ boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 mb-3">
              <KeyRound size={18} style={{ color: 'var(--primary)' }} />
              <h2 className="font-extrabold text-base" style={{ color: 'var(--text)' }}>Trocar senha</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type={showNovaSenha ? 'text' : 'password'}
                  placeholder="Nova senha (mín. 6 caracteres)"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  className="w-full h-12 pl-4 pr-11 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg)', border: '1.5px solid rgba(226,113,90,0.2)', color: 'var(--text)', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
                />
                <button
                  type="button"
                  onClick={() => setShowNovaSenha(!showNovaSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--primary)', opacity: 0.6 }}
                >
                  {showNovaSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                className="w-full h-12 pl-4 pr-4 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg)', border: '1.5px solid rgba(226,113,90,0.2)', color: 'var(--text)', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
              />
              {erroSenha && (
                <p className="text-xs font-medium px-1" style={{ color: '#c0392b' }}>{erroSenha}</p>
              )}
              {sucessoSenha && (
                <p className="text-xs font-medium px-1" style={{ color: '#2d6a4f' }}>{sucessoSenha}</p>
              )}
              <button
                onClick={trocarSenha}
                disabled={salvandoSenha || !novaSenha || !confirmarSenha}
                className="w-full py-3 rounded-xl font-bold text-sm"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  fontFamily: 'inherit',
                  opacity: (salvandoSenha || !novaSenha || !confirmarSenha) ? 0.5 : 1,
                }}
              >
                {salvandoSenha ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </div>
          </div>
        )}

        {/* Botão sair */}
        {user && (
          <button
            onClick={handleSair}
            disabled={saindo}
            className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            style={{
              background: 'white',
              border: '1.5px solid rgba(226,113,90,0.3)',
              color: 'var(--primary)',
              fontFamily: 'inherit',
              opacity: saindo ? 0.7 : 1,
            }}
          >
            <LogOut size={16} />
            {saindo ? 'Saindo...' : 'Sair da conta'}
          </button>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
