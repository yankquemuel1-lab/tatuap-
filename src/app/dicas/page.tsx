import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

type BlocoTexto = { tipo: 'texto'; conteudo: string }
type BlocoDestaque = { tipo: 'destaque'; conteudo: string }
type BlocoCards = { tipo: 'cards'; itens: { titulo: string; texto: string; emoji: string }[] }
type Bloco = BlocoTexto | BlocoDestaque | BlocoCards

const SECOES: { id: string; titulo: string; cor: string; emoji: string; blocos: Bloco[] }[] = [
  {
    id: 'a-roda',
    titulo: 'A roda é nossa forma mais antiga de sermos juntos',
    cor: 'linear-gradient(135deg, #e2715a, #f4a261)',
    emoji: '🔵',
    blocos: [
      {
        tipo: 'texto',
        conteudo:
          'Antes da escola, antes da internet, antes de qualquer sala de aula — havia a roda. O círculo onde vozes se encontram, onde o corpo aprende pelo movimento, onde o mais velho e o mais novo compartilham o mesmo espaço sem hierarquia rígida.',
      },
      {
        tipo: 'texto',
        conteudo:
          'Os povos afro-brasileiros e indígenas sempre souberam o que a ciência da educação hoje confirma: aprendemos com o corpo inteiro, com a comunidade, com o ritmo, com a escuta. As dinâmicas reunidas aqui não são apenas brincadeiras — são tecnologias ancestrais de cuidado e formação humana.',
      },
      {
        tipo: 'destaque',
        conteudo:
          '"Uma criança que brinca em roda aprende que cada voz importa, que o centro pertence a todos, e que o círculo só existe se cada um decidir ficar."',
      },
    ],
  },
  {
    id: 'como-usar',
    titulo: 'Como usar as dinâmicas',
    cor: 'linear-gradient(135deg, #2d6a4f, #52b788)',
    emoji: '🎭',
    blocos: [
      {
        tipo: 'cards',
        itens: [
          {
            titulo: 'Tempo e Espaço',
            texto: 'A maioria das dinâmicas precisa de 15 a 60 minutos e espaço para formação em roda.',
            emoji: '⏱️',
          },
          {
            titulo: 'Faixa Etária',
            texto: 'As indicações de idade são orientações, não regras. Grupos mistos enriquecem a experiência.',
            emoji: '👶',
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
            texto: 'A caixa verde em cada brincadeira traz a sabedoria prática: o detalhe que transforma dinâmica em experiência.',
            emoji: '💡',
          },
        ],
      },
    ],
  },
  {
    id: 'roda-nunca-fecha',
    titulo: 'A Roda Nunca Fecha',
    cor: 'linear-gradient(135deg, #1a1a5e, #3a3a9a)',
    emoji: '♾️',
    blocos: [
      {
        tipo: 'texto',
        conteudo:
          'Cada dinâmica que você realizar é um ato de resistência cultural e cuidado pedagógico. Ao girar com crianças ao ritmo do Samba de Roda, ao passar pedras ao canto Obwisana, ao tecer a Teia da Vida — você não apenas brinca. Você transmite memória.',
      },
      {
        tipo: 'texto',
        conteudo:
          'Os povos africanos e indígenas que criaram essas práticas sobreviveram ao apagamento porque souberam guardar a sabedoria no corpo, no ritmo, na voz coletiva. Agora esse fio passa pelas suas mãos.',
      },
      {
        tipo: 'destaque',
        conteudo:
          '"Ubuntu: Sou porque somos. A roda que criamos juntos é maior do que qualquer um de nós." — Filosofia Bantu',
      },
      {
        tipo: 'texto',
        conteudo:
          'Continue criando rodas. Continue contextualizando. Continue perguntando de onde vêm as brincadeiras. O Tatuapé App segue girando — e agora você também faz parte dela.',
      },
    ],
  },
  {
    id: 'como-aprender-mais',
    titulo: 'Como aprender mais com o app',
    cor: 'linear-gradient(135deg, #1b4332, #40916c)',
    emoji: '📱',
    blocos: [
      {
        tipo: 'cards',
        itens: [
          {
            titulo: 'Leia antes de jogar',
            texto: 'Dentro de cada brincadeira, vire o card para ver as "Raízes Ancestrais". Ler antes do quiz aprofunda o aprendizado.',
            emoji: '📖',
          },
          {
            titulo: 'Use no dia a dia',
            texto: 'Antes de facilitar uma dinâmica com seu grupo, abra o card no app. Os passos, dicas e variações estão todos ali.',
            emoji: '🎯',
          },
          {
            titulo: 'Instale como app',
            texto: 'No celular, toque em "Adicionar à tela inicial" no navegador. O Tatuapé App funciona como um aplicativo completo.',
            emoji: '📲',
          },
          {
            titulo: 'Acompanhe seu progresso',
            texto: 'Veja suas Sementes 🌱, conquistas e brincadeiras concluídas no seu Perfil. Cada dinâmica completa conta.',
            emoji: '🏆',
          },
          {
            titulo: 'Leia a Newsletter',
            texto: 'Na aba Newsletter, há artigos sobre cultura popular, rituais e histórias. Para aprofundar além das brincadeiras.',
            emoji: '📰',
          },
          {
            titulo: 'Contexto é tudo',
            texto: 'Antes de cada roda com seu grupo, compartilhe a origem da brincadeira. O contexto cultural é parte do aprendizado.',
            emoji: '🌍',
          },
        ],
      },
    ],
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
            <Image src="/tatu-risada.jpg" alt="Apé" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-extrabold text-base leading-tight">Aproveite ao Máximo</p>
            <p className="text-white/80 text-sm mt-0.5">Dicas, reflexões e orientações do Apé pra você</p>
          </div>
        </div>
      </section>

      <div className="px-4 pt-3 flex flex-col gap-6">
        {SECOES.map((secao) => (
          <section key={secao.id}>
            {/* Título da seção */}
            <div className="flex items-center gap-2 py-3 px-4 rounded-2xl mb-3"
              style={{ background: secao.cor }}>
              <span className="text-xl">{secao.emoji}</span>
              <h2 className="text-base font-extrabold text-white leading-tight">{secao.titulo}</h2>
            </div>

            <div className="flex flex-col gap-3">
              {secao.blocos.map((bloco, i) => {
                if (bloco.tipo === 'texto') {
                  return (
                    <p key={i} className="text-sm leading-relaxed px-1" style={{ color: '#374151' }}>
                      {bloco.conteudo}
                    </p>
                  )
                }
                if (bloco.tipo === 'destaque') {
                  return (
                    <div key={i}
                      className="p-4 rounded-2xl"
                      style={{ background: 'white', border: '2px solid rgba(226,113,90,0.2)', boxShadow: 'var(--shadow)' }}>
                      <p className="text-sm leading-relaxed font-semibold italic" style={{ color: 'var(--primary)' }}>
                        {bloco.conteudo}
                      </p>
                    </div>
                  )
                }
                if (bloco.tipo === 'cards' && bloco.itens) {
                  return (
                    <div key={i} className="grid grid-cols-2 gap-3">
                      {bloco.itens.map((item) => (
                        <div key={item.titulo}
                          className="p-4 rounded-2xl bg-white flex flex-col gap-2"
                          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}>
                          <span className="text-2xl">{item.emoji}</span>
                          <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{item.titulo}</p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.texto}</p>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              })}
            </div>
          </section>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}
