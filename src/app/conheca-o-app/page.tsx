import Link from 'next/link'
import { ArrowLeft, Map, BookOpen, Gamepad2, Leaf, Users, Star } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

const SUMARIO = [
  {
    categoria: 'Danças e Músicas de Roda',
    cor: 'linear-gradient(135deg, #e2715a, #f4a261)',
    emoji: '🥁',
    itens: [
      { num: '01', nome: 'Samba de Roda' },
      { num: '02', nome: 'Coco de Roda' },
      { num: '03', nome: 'Ciranda' },
      { num: '04', nome: 'Jongo' },
      { num: '05', nome: 'Tambor de Crioula' },
      { num: '06', nome: 'Maculelê' },
      { num: '07', nome: 'Dança do Toré' },
      { num: '08', nome: 'Siriri' },
      { num: '09', nome: 'Bate Coxa' },
    ],
  },
  {
    categoria: 'Jogos de Roda da Tradição',
    cor: 'linear-gradient(135deg, #2d6a4f, #52b788)',
    emoji: '🎯',
    itens: [
      { num: '10', nome: 'Obwisana' },
      { num: '11', nome: 'A Canoa Virou' },
      { num: '12', nome: 'Brincadeira da Mandioca' },
      { num: '13', nome: 'Passa o Anel' },
      { num: '14', nome: 'Terra-Mar' },
      { num: '15', nome: 'Fogo na Montanha' },
      { num: '18', nome: 'Ampe' },
      { num: '19', nome: 'Peteca em Roda' },
      { num: '20', nome: 'Kameshi Mpuku Ne' },
    ],
  },
  {
    categoria: 'Rodas de Expressão e Cura',
    cor: 'linear-gradient(135deg, #1b4332, #40916c)',
    emoji: '🌿',
    itens: [
      { num: '21', nome: 'Roda de Histórias Griô' },
      { num: '22', nome: 'Roda das Plantas Medicinais' },
      { num: '23', nome: 'Toque do Coração' },
      { num: '24', nome: 'Roda dos Elementos' },
      { num: '25', nome: 'Mandala de Corpos' },
      { num: '26', nome: 'Espelho Vivo' },
      { num: '27', nome: 'Roda da Gratidão' },
    ],
  },
  {
    categoria: 'Rodas de Construção Coletiva',
    cor: 'linear-gradient(135deg, #1a1a5e, #3a3a9a)',
    emoji: '🌱',
    itens: [
      { num: '28', nome: 'Roda do Nome Sagrado' },
      { num: '29', nome: 'Roda das Sementes' },
      { num: '30', nome: 'Roda da Floresta' },
      { num: '31', nome: 'Teia da Vida' },
      { num: '32', nome: 'Roda de Abayomi' },
      { num: '33', nome: 'Encerramento' },
    ],
  },
]

const COMO_USAR = [
  {
    titulo: 'Tempo e Espaço',
    texto: 'A maioria das dinâmicas precisa de 15 a 60 minutos e espaço para formação em roda.',
    emoji: '⏱️',
  },
  {
    titulo: 'Faixa Etária',
    texto: 'As indicações de idade são orientações, não regras. Grupos mistos enriquecem a experiência.',
    emoji: '👶🧒🧑',
  },
  {
    titulo: 'Contextualize Sempre',
    texto: 'Antes de cada dinâmica, compartilhe a origem cultural. O contexto transforma o brincar.',
    emoji: '🗺️',
  },
  {
    titulo: 'Segurança Afetiva',
    texto: 'Ninguém é forçado. Crie combinados antes: respeito ao espaço e celebração do erro.',
    emoji: '🤝',
  },
  {
    titulo: 'Variações',
    texto: 'Cada dinâmica traz variações. Use-as para adaptar ao grupo ou resgatar o foco.',
    emoji: '🔄',
  },
  {
    titulo: 'Dica do Facilitador',
    texto: 'Dentro de cada brincadeira há uma caixa de sabedoria prática: o detalhe que transforma dinâmica em experiência.',
    emoji: '💡',
  },
]

const NAVEGACAO = [
  {
    icone: <Map size={20} />,
    titulo: 'Trilha de Brincadeiras',
    texto: 'Acesse pelo ícone de mapa na barra inferior. Explore a coletânea de brincadeiras, filtre por categoria e busque por nome.',
    cor: '#4a7c59',
  },
  {
    icone: <BookOpen size={20} />,
    titulo: 'Dentro de cada Brincadeira',
    texto: 'Leia a frente do card (como jogar) e vire para as "Raízes Ancestrais". Depois responda o quiz para ganhar Sementes 🌱.',
    cor: '#e2715a',
  },
  {
    icone: <Gamepad2 size={20} />,
    titulo: 'Quiz de Desbloqueio',
    texto: 'Cada brincadeira tem 3 perguntas. Acerte para ganhar Sementes e desbloquear a conquista daquela dinâmica.',
    cor: '#4a90e2',
  },
  {
    icone: <Star size={20} />,
    titulo: 'Favoritos',
    texto: 'Toque no coração ♡ dentro de qualquer brincadeira para favoritar. Acesse todos os favoritos pelo atalho rápido na home.',
    cor: '#e05a77',
  },
  {
    icone: <Users size={20} />,
    titulo: 'Seu Perfil',
    texto: 'Acompanhe suas Sementes, dias de streak e conquistas desbloqueadas no ícone de perfil na barra inferior.',
    cor: '#7c3aed',
  },
  {
    icone: <Leaf size={20} />,
    titulo: 'Sementes (XP)',
    texto: '+5 sementes por leitura completa e +10 por resposta certa no quiz. Elas representam seu crescimento no app.',
    cor: '#2d6a4f',
  },
]

export default function ConhecaOAppPage() {
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
        <h1 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>Conheça o App</h1>
      </header>

      <div className="px-4 pt-5 flex flex-col gap-6">

        {/* Hero */}
        <div className="rounded-2xl p-5 text-white"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #f4a261 100%)' }}>
          <h2 className="text-2xl font-extrabold mb-1">Tatuapé App 🐾</h2>
          <p className="text-sm leading-relaxed opacity-90">
            Uma coletânea viva das principais brincadeiras de roda da cultura popular afro-indígena brasileira. Aprenda, jogue e transmita sabedoria ancestral.
          </p>
        </div>

        {/* Como navegar */}
        <section>
          <h2 className="text-lg font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            🗺️ Como navegar no app
          </h2>
          <div className="flex flex-col gap-3">
            {NAVEGACAO.map((item) => (
              <div key={item.titulo}
                className="flex gap-3 p-4 rounded-2xl bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: item.cor }}>
                  {item.icone}
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--text)' }}>{item.titulo}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sumário */}
        <section>
          <h2 className="text-lg font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            📋 Sumário das Brincadeiras
          </h2>
          <div className="flex flex-col gap-3">
            {SUMARIO.map((cat) => (
              <div key={cat.categoria}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
                {/* Categoria header */}
                <div className="px-4 py-3 flex items-center gap-2"
                  style={{ background: cat.cor }}>
                  <span className="text-lg">{cat.emoji}</span>
                  <p className="text-white font-extrabold text-sm">{cat.categoria}</p>
                </div>
                {/* Itens */}
                <div className="bg-white p-3 flex flex-col gap-1">
                  {cat.itens.map((item) => (
                    <Link key={item.num} href={`/trilha`}
                      className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-xs font-bold w-6 text-right flex-shrink-0"
                        style={{ color: 'var(--primary)' }}>{item.num}</span>
                      <span className="text-sm" style={{ color: 'var(--text)' }}>{item.nome}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Estrutura de cada dinâmica */}
        <section className="rounded-2xl p-5 bg-white"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
          <h2 className="font-extrabold text-base mb-3" style={{ color: 'var(--text)' }}>
            🧩 Estrutura de cada dinâmica
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { emoji: '⏱️', label: 'Duração' },
              { emoji: '👥', label: 'Participantes' },
              { emoji: '🎯', label: 'Objetivo' },
              { emoji: '📝', label: 'Passo a passo' },
              { emoji: '🔄', label: 'Variações' },
              { emoji: '💡', label: 'Dica do Facilitador' },
            ].map((item) => (
              <div key={item.label}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-semibold"
                style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      <BottomNav />
    </main>
  )
}
