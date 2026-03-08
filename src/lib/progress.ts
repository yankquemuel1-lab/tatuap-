'use client'

export interface DinamicaProgress {
  leituraCompleta: boolean
  quizCompleto: boolean
  quizPontuacao: number
  conquistas: string[]
  dataCompletado?: string
}

export interface UserProgress {
  sementes: number
  streak: number
  ultimoAcesso: string
  dinamicas: Record<string, DinamicaProgress>
  conquistasBadges: string[]
}

const STORAGE_KEY = 'rodaviva_progress'

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    return JSON.parse(raw) as UserProgress
  } catch {
    return defaultProgress()
  }
}

function defaultProgress(): UserProgress {
  return {
    sementes: 0,
    streak: 0,
    ultimoAcesso: '',
    dinamicas: {},
    conquistasBadges: [],
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function getDinamicaProgress(id: string): DinamicaProgress {
  const p = getProgress()
  return p.dinamicas[id] ?? { leituraCompleta: false, quizCompleto: false, quizPontuacao: 0, conquistas: [] }
}

export function marcarLeituraCompleta(id: string): void {
  const p = getProgress()
  if (!p.dinamicas[id]) {
    p.dinamicas[id] = { leituraCompleta: false, quizCompleto: false, quizPontuacao: 0, conquistas: [] }
  }
  if (!p.dinamicas[id].leituraCompleta) {
    p.dinamicas[id].leituraCompleta = true
    p.sementes += 5
  }
  atualizarStreak(p)
  saveProgress(p)
}

export function marcarQuizCompleto(id: string, pontuacao: number): void {
  const p = getProgress()
  if (!p.dinamicas[id]) {
    p.dinamicas[id] = { leituraCompleta: false, quizCompleto: false, quizPontuacao: 0, conquistas: [] }
  }
  const era = p.dinamicas[id].quizCompleto
  p.dinamicas[id].quizCompleto = true
  p.dinamicas[id].quizPontuacao = Math.max(p.dinamicas[id].quizPontuacao, pontuacao)
  if (!era) {
    p.dinamicas[id].dataCompletado = new Date().toISOString()
    p.sementes += pontuacao * 10
    verificarConquistas(p)
  }
  atualizarStreak(p)
  saveProgress(p)
}

function atualizarStreak(p: UserProgress): void {
  const hoje = new Date().toDateString()
  if (p.ultimoAcesso !== hoje) {
    const ontem = new Date(Date.now() - 86400000).toDateString()
    p.streak = p.ultimoAcesso === ontem ? p.streak + 1 : 1
    p.ultimoAcesso = hoje
  }
}

function verificarConquistas(p: UserProgress): void {
  const completos = Object.values(p.dinamicas).filter(d => d.quizCompleto).length

  const novos: Record<number, string> = {
    1: 'primeira-roda',
    5: 'cinco-rodas',
    10: 'guardiao',
    20: 'mestre',
    33: 'roda-completa',
  }

  for (const [qtd, badge] of Object.entries(novos)) {
    if (completos >= Number(qtd) && !p.conquistasBadges.includes(badge)) {
      p.conquistasBadges.push(badge)
    }
  }
}

export function isDinamicaBloqueada(_id: string, _numero: number): boolean {
  return false
}

export function getTotalCompletos(): number {
  const p = getProgress()
  return Object.values(p.dinamicas).filter(d => d.quizCompleto).length
}
