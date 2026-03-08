import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

const DICAS = [
  {
    numero: '01',
    titulo: 'Comece pela abertura',
    texto: 'Acesse /abertura para ver a tela de boas-vindas do Apé. É por ali que novos participantes entram no universo do Tatuapé pela primeira vez.',
    emoji: '🚀',
  },
  {
    numero: '02',
    titulo: 'Explore as 4 categorias',
    texto: 'Na tela Início, toque em qualquer um dos 4 blocos coloridos para ver as brincadeiras daquela categoria. Danças, Jogos, Cura e Construção — cada uma tem sua energia.',
    emoji: '🎡',
  },
  {
    numero: '03',
    titulo: 'Leia antes de jogar o quiz',
    texto: 'Dentro de cada brincadeira, toque em "Raízes Ancestrais" para virar o card. Você precisa ler as raízes históricas antes de liberar o quiz — é parte do processo de aprendizado.',
    emoji: '📖',
  },
  {
    numero: '04',
    titulo: 'Ganhe Sementes no quiz',
    texto: 'Cada resposta certa no quiz vale 10 Sementes 🌱. Acumule sementes como medalhas do seu aprendizado. Elas aparecem no topo da tela inicial.',
    emoji: '🌱',
  },
  {
    numero: '05',
    titulo: 'Favorite suas preferidas',
    texto: 'Dentro de qualquer brincadeira, toque no coração ♡ para favoritar. Acesse "Favoritos" aqui no menu rápido para ter suas brincadeiras preferidas sempre à mão.',
    emoji: '❤️',
  },
  {
    numero: '06',
    titulo: 'Use no pré-atividade',
    texto: 'Antes de facilitar uma dinâmica com o grupo, abra o card da brincadeira no app. Os passos, dicas do facilitador e variações estão todos ali — uma folha de cola interativa.',
    emoji: '🎯',
  },
  {
    numero: '07',
    titulo: 'Compartilhe o Apé',
    texto: 'O Tatuapé funciona offline como PWA. No celular, toque em "Adicionar à tela inicial" no navegador para ter o app sempre disponível, mesmo sem internet.',
    emoji: '📱',
  },
  {
    numero: '08',
    titulo: 'Leia a Newsletter',
    texto: 'Na aba Newsletter, publicamos artigos sobre cultura popular, rituais, festas e histórias cantadas. É o lugar para aprofundar o conhecimento além das brincadeiras.',
    emoji: '📰',
  },
]

export default function DicasPage() {
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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Dicas pra você</h1>
      </header>

      {/* Hero */}
      <section className="px-4 pt-5 pb-2">
        <div className="flex gap-4 items-center p-4 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #4a7c59, #52b788)' }}>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
            <Image src="/avatar-tatuape.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-extrabold text-base leading-tight">Como usar bem o Tatuapé</p>
            <p className="text-white/80 text-sm mt-0.5">Dicas do Apé para aproveitar ao máximo cada brincadeira</p>
          </div>
        </div>
      </section>

      {/* Dicas list */}
      <div className="px-4 pt-3 flex flex-col gap-3">
        {DICAS.map((dica) => (
          <div key={dica.numero}
            className="flex gap-4 p-4 rounded-2xl bg-white"
            style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'var(--primary-bg)' }}>
              {dica.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>{dica.numero}</span>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{dica.titulo}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{dica.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}
