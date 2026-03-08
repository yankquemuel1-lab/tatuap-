'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const PUBLIC_PATHS = ['/login']

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !isPublic) {
        router.replace('/login')
      }
      setVerificando(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isPublic) {
        router.replace('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [pathname, router])

  // On public pages, always render immediately
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))
  if (isPublic) return <>{children}</>

  if (verificando) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
