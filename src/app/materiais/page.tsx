'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp, Music, Sparkles } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

const RITMOS = [
  {
    id: 'samba-pandeiro',
    titulo: 'Aprenda Samba de Roda no Pandeiro',
    videoId: 'WxwMxnHMFEw',
  },
  {
    id: 'coco-pandeiro',
    titulo: 'Aprenda Samba Coco no Pandeiro',
    videoId: 'WtwgsiEpAXM',
  },
  {
    id: 'canoa-virou',
    titulo: 'Cantiga de Roda — A Canoa Virou, Marinheiro',
    videoId: 'iwUCK6XxfTc',
  },
  {
    id: 'ajuda-mamae',
    titulo: 'Cantiga de Roda — Ajuda Mamãe Lava Roupa',
    videoId: 'a8zngSTOhtI',
  },
  {
    id: 'peixinhos',
    titulo: 'Cantiga de Roda — Peixinhos do Mar',
    videoId: 'RPHwzexIhz8',
  },
  {
    id: 'abelha-arapua',
    titulo: 'Cantiga de Coco de Roda — Abelha Arapuá',
    videoId: 'vm_kZmMWy64',
  },
]

export default function MateriaisPage() {
  const [abertos, setAbertos] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setAbertos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ background: '#f8f6f6', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e2715a 0%, #f4a261 100%)',
        padding: '20px 20px 28px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '640px', margin: '0 auto' }}>
          <Link href="/" style={{
            color: 'white', background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center',
          }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
              Materiais de Apoio
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', margin: '2px 0 0' }}>
              Recursos para suas rodas
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Seção 1 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #e2715a, #f4a261)',
              borderRadius: '12px', padding: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Music size={22} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.3 }}>
                Aprenda ritmos, toques e cantos
              </h2>
              <p style={{ fontSize: '13px', color: '#e2715a', fontWeight: 600, margin: '4px 0 0' }}>
                Ferramentas para suas rodas!
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {RITMOS.map((item) => {
              const aberto = abertos[item.id]
              return (
                <div key={item.id} style={{
                  background: 'white',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: aberto ? '1.5px solid #e2715a' : '1.5px solid transparent',
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => toggle(item.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '14px 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      fontSize: '14px', fontWeight: 600,
                      color: aberto ? '#e2715a' : '#2d2d2d',
                      flex: 1, paddingRight: '8px', lineHeight: 1.4,
                    }}>
                      {item.titulo}
                    </span>
                    <span style={{
                      color: aberto ? '#e2715a' : '#aaa',
                      flexShrink: 0, transition: 'color 0.2s',
                    }}>
                      {aberto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {aberto && (
                    <div style={{ padding: '0 12px 14px' }}>
                      <div style={{
                        position: 'relative', width: '100%', paddingTop: '56.25%',
                        borderRadius: '10px', overflow: 'hidden', background: '#000',
                      }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoId}?rel=0`}
                          title={item.titulo}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'absolute', top: 0, left: 0,
                            width: '100%', height: '100%', border: 'none',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Seção 2 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a5e, #3a3a9a)',
              borderRadius: '12px', padding: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={22} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.3 }}>
                Conheça outros materiais
              </h2>
              <p style={{ fontSize: '13px', color: '#3a3a9a', fontWeight: 600, margin: '4px 0 0' }}>
                Novidades que estamos produzindo para você
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1a1a5e 0%, #3a3a9a 100%)',
            borderRadius: '16px',
            padding: '28px 20px',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '20px', padding: '6px 14px',
              marginBottom: '16px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>
                EM BREVE
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: 0, lineHeight: 1.6 }}>
              Apostilas, roteiros pedagógicos e muito mais — estamos preparando tudo com cuidado para você e sua roda.
            </p>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
