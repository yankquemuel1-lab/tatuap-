'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookOpen, User } from 'lucide-react'

export function BottomNav() {
  const path = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return path === '/'
    return path.startsWith(href)
  }

  const links = [
    { href: '/', icon: <Home size={24} />, label: 'Início' },
    { href: '/trilha', icon: <Compass size={24} />, label: 'Explorar' },
    { href: '/diario', icon: <BookOpen size={24} />, label: 'Diário' },
    { href: '/perfil', icon: <User size={24} />, label: 'Perfil' },
  ]

  return (
    <nav className="bottom-nav">
      {links.map(({ href, icon, label }) => (
        <Link key={href} href={href} className={isActive(href) ? 'active' : ''}>
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
