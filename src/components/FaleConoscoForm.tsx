'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

const TIPOS = [
  { value: 'sugestao', label: '💡 Sugestão' },
  { value: 'elogio', label: '🌟 Elogio' },
  { value: 'critica', label: '🔍 Crítica' },
  { value: 'duvida', label: '❓ Dúvida' },
]

interface Props {
  onSuccess?: () => void
  compact?: boolean
}

export function FaleConoscoForm({ onSuccess, compact }: Props) {
  const [tipo, setTipo] = useState('sugestao')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar() {
    if (!mensagem.trim()) {
      setErro('Escreva sua mensagem antes de enviar.')
      return
    }
    setEnviando(true)
    setErro('')

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('feedbacks').insert({
      tipo,
      mensagem: mensagem.trim(),
      usuario_id: user?.id ?? null,
      usuario_email: user?.email ?? null,
      usuario_nome: user?.user_metadata?.nome ?? null,
    })

    if (error) {
      setErro('Não consegui enviar agora. Tente novamente em instantes.')
      setEnviando(false)
      return
    }

    setEnviado(true)
    setEnviando(false)
    onSuccess?.()
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg mx-auto"
          style={{ borderColor: 'var(--primary)' }}>
          <Image src="/tatu-risada.jpg" alt="Apé" width={96} height={96} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-2xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>Recebido! 🌿</p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            O Apé vai levar sua mensagem para a roda.<br />
            <strong style={{ color: 'var(--primary)' }}>Obrigado por fazer parte disso!</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Tipo */}
      <div>
        <p className="text-sm font-bold mb-2.5" style={{ color: 'var(--text)' }}>Qual o assunto?</p>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map(t => (
            <button
              key={t.value}
              onClick={() => setTipo(t.value)}
              className="px-3.5 py-2 rounded-full text-sm font-bold transition-all"
              style={{
                background: tipo === t.value ? 'var(--primary)' : 'var(--primary-bg)',
                color: tipo === t.value ? 'white' : 'var(--primary)',
                border: `1.5px solid ${tipo === t.value ? 'var(--primary)' : 'rgba(226,113,90,0.2)'}`,
                fontFamily: 'inherit',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <p className="text-sm font-bold mb-2.5" style={{ color: 'var(--text)' }}>Sua mensagem</p>
        <textarea
          value={mensagem}
          onChange={e => { setMensagem(e.target.value); setErro('') }}
          placeholder="Conta pra gente o que você pensa, sente ou quer ver no Tatuapé..."
          rows={compact ? 3 : 5}
          className="w-full px-4 py-3 rounded-xl text-sm leading-relaxed outline-none resize-none"
          style={{
            background: 'var(--bg)',
            border: '1.5px solid rgba(226,113,90,0.2)',
            color: 'var(--text)',
            fontFamily: 'inherit',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(226,113,90,0.2)')}
        />
        {erro && <p className="text-xs mt-1.5 font-medium" style={{ color: '#c0392b' }}>{erro}</p>}
      </div>

      {/* Botão */}
      <button
        onClick={enviar}
        disabled={enviando || !mensagem.trim()}
        className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
        style={{
          background: 'var(--primary)',
          color: 'white',
          fontFamily: 'inherit',
          opacity: (enviando || !mensagem.trim()) ? 0.6 : 1,
        }}
      >
        {enviando ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar mensagem 🌿'
        )}
      </button>
    </div>
  )
}
