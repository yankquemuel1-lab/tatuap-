'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Send, Loader2, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const getChatKey = (userId: string) => `ape-chat-${userId}`

const MSG_INICIAL: Msg = {
  role: 'assistant',
  content: 'Oi! Eu sou o Apé 🐾 Posso te ajudar a navegar pelo app, escolher uma brincadeira, contar a história de alguma dança ou dar dicas para facilitar sua roda. O que você quer saber?',
}

const SUGESTOES = [
  'Qual brincadeira serve pra desinibir uma turma nova?',
  'Tenho crianças de 6 anos, o que você sugere?',
  'Me conta sobre o Jongo!',
  'Como usar o app com minha turma?',
]

export function ApeChat({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([MSG_INICIAL])
  const [userId, setUserId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Carrega userId e histórico do usuário correto
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      const uid = data.user.id
      setUserId(uid)
      try {
        const saved = localStorage.getItem(getChatKey(uid))
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) setMsgs(parsed)
        }
      } catch { /* ignore */ }
    })
  }, [])

  // Salva histórico no localStorage sempre que msgs muda (apenas se userId carregado)
  useEffect(() => {
    if (!userId) return
    try {
      localStorage.setItem(getChatKey(userId), JSON.stringify(msgs))
    } catch { /* ignore */ }
  }, [msgs, userId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  function limparConversa() {
    if (userId) {
      try { localStorage.removeItem(getChatKey(userId)) } catch { /* ignore */ }
    }
    setMsgs([MSG_INICIAL])
  }

  async function enviar(texto?: string) {
    const msg = (texto ?? input).trim()
    if (!msg || loading) return

    const novasMsgs: Msg[] = [...msgs, { role: 'user', content: msg }]
    setMsgs(novasMsgs)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: novasMsgs, userId }),
      })
      const data = await res.json()
      if (res.status === 429) {
        setMsgs(prev => [...prev, { role: 'assistant', content: data.error || 'Muitas mensagens em pouco tempo. Aguarda alguns minutinhos!' }])
      } else {
        setMsgs(prev => [...prev, { role: 'assistant', content: data.reply || 'Hmm, algo deu errado. Tenta de novo?' }])
      }
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Opa, tive um problema aqui na toca. Tenta de novo!' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column',
        background: '#f8f6f6',
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e2715a 0%, #f4a261 100%)',
        padding: '16px 16px 20px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0,
          }}>
            <Image src="/tatu-perfil.jpg" alt="Apé" width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 16, margin: 0, lineHeight: 1.2 }}>Apé</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0 }}>Guardião das brincadeiras ancestrais</p>
          </div>
          <button onClick={limparConversa} title="Limpar conversa" style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', marginRight: 4,
          }}>
            <Trash2 size={16} />
          </button>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
          }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Mensagens */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', maxWidth: '640px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

        {msgs.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
            gap: 8, marginBottom: 12, alignItems: 'flex-end',
          }}>
            {m.role === 'assistant' && (
              <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <Image src="/tatu-perfil.jpg" alt="Apé" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{
              maxWidth: '78%',
              background: m.role === 'user'
                ? 'linear-gradient(135deg, #e2715a, #f4a261)'
                : 'white',
              color: m.role === 'user' ? 'white' : '#2d2d2d',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '10px 14px',
              fontSize: 14,
              lineHeight: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <Image src="/tatu-perfil.jpg" alt="Apé" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              background: 'white', borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0, 1, 2].map(n => (
                <div key={n} style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#e2715a',
                  animation: `dot-bounce 1.2s ease-in-out ${n * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Sugestões — só na primeira mensagem */}
        {msgs.length === 1 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {SUGESTOES.map(s => (
              <button key={s} onClick={() => enviar(s)} style={{
                background: 'white', border: '1.5px solid rgba(226,113,90,0.25)',
                borderRadius: 12, padding: '9px 14px', textAlign: 'left',
                fontSize: 13, color: '#e2715a', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px 24px', background: 'white',
        borderTop: '1px solid rgba(0,0,0,0.07)', flexShrink: 0,
        maxWidth: '640px', width: '100%', margin: '0 auto', boxSizing: 'border-box',
      }}>
        <style>{`
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-6px); opacity: 1; }
          }
        `}</style>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
            placeholder="Pergunte ao Apé..."
            style={{
              flex: 1, borderRadius: 20, border: '1.5px solid rgba(226,113,90,0.25)',
              padding: '10px 16px', fontSize: 14, outline: 'none',
              background: '#f8f6f6', color: '#2d2d2d', fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => enviar()}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: 'none',
              background: input.trim() && !loading ? 'linear-gradient(135deg, #e2715a, #f4a261)' : 'rgba(0,0,0,0.08)',
              color: input.trim() && !loading ? 'white' : '#aaa',
              cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.2s',
            }}
          >
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}
