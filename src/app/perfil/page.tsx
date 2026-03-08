'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, LogOut, Sprout, Star, Trophy, BookOpen } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getProgress, defaultProgress, type UserProgress } from '@/lib/progress'
import { BottomNav } from '@/components/BottomNav'

interface UserInfo {
  nome: string
  email: string
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
  const [user, setUser] = useState<UserInfo | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [saindo, setSaindo] = useState(false)
  const [progresso, setProgresso] = useState<UserProgress>(defaultProgress())

  const totalConcluidas = Object.values(progresso.dinamicas).filter(d => d.quizCompleto).length

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          nome: data.user.user_metadata?.nome || data.user.email?.split('@')[0] || 'Explorador',
          email: data.user.email || '',
        })
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
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image src="/avatar-tatuape.jpg" alt="Apé" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <div className="text-white flex-1 min-w-0">
            {user ? (
              <>
                <p className="font-extrabold text-xl leading-tight truncate">{user.nome}</p>
                <p className="text-white/80 text-sm mt-0.5 truncate">{user.email}</p>
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
