import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { ARTIGOS_CULTURA, getArtigoPorSlug } from '@/data/cultura'
import { BottomNav } from '@/components/BottomNav'

export async function generateStaticParams() {
  return ARTIGOS_CULTURA.map(a => ({ slug: a.slug }))
}

export default async function CulturaArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artigo = getArtigoPorSlug(slug)
  if (!artigo) notFound()

  const outros = ARTIGOS_CULTURA.filter(a => a.slug !== slug)

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(248,246,246,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <Link href="/newsletter"
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: artigo.corClara, color: artigo.cor }}>
          <ArrowLeft size={18} />
        </Link>
        <p className="text-sm font-bold truncate flex-1" style={{ color: 'var(--text)' }}>
          {artigo.titulo}
        </p>
        <span className="inline-flex items-center gap-1 text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
          <Clock size={12} /> {artigo.tempoLeitura}
        </span>
      </header>

      {/* Hero */}
      <div
        className="px-4 pt-6 pb-8"
        style={{ background: `linear-gradient(180deg, ${artigo.corClara} 0%, var(--bg) 100%)` }}
      >
        <div className="text-5xl mb-3">{artigo.emoji}</div>
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: artigo.cor }}>
          Cultura Popular
        </p>
        <h1 className="text-3xl font-extrabold leading-tight mb-2" style={{ color: 'var(--text)' }}>
          {artigo.titulo}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {artigo.subtitulo}
        </p>
      </div>

      {/* Resumo destacado */}
      <div className="px-4 pb-5">
        <div
          className="p-4 rounded-2xl"
          style={{ background: artigo.corClara, borderLeft: `4px solid ${artigo.cor}` }}
        >
          <p className="text-sm leading-relaxed font-medium italic" style={{ color: 'var(--text)' }}>
            {artigo.resumo}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-5 pb-6">
        {artigo.paragrafos.map((p, i) => (
          <div key={i}>
            {p.subtitulo && (
              <h2 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                {p.subtitulo}
              </h2>
            )}
            <p className="text-base leading-relaxed" style={{ color: '#374151', lineHeight: '1.8' }}>
              {p.texto}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-4 my-4 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />

      {/* Read more */}
      {outros.length > 0 && (
        <section className="px-4 pb-4">
          <h3 className="text-base font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Leia também
          </h3>
          <div className="flex flex-col gap-3">
            {outros.map(outro => (
              <Link
                key={outro.slug}
                href={`/cultura/${outro.slug}`}
                className="flex gap-3 items-center p-3 rounded-xl bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: outro.corClara }}
                >
                  {outro.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text)' }}>
                    {outro.titulo}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: outro.cor }}>
                    <Clock size={10} className="inline mr-1" />{outro.tempoLeitura}
                  </p>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </main>
  )
}
