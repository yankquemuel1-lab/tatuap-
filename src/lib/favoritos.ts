const KEY = 'tatuape-favoritos'

export function getFavoritos(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function toggleFavorito(id: string): boolean {
  const favs = getFavoritos()
  const idx = favs.indexOf(id)
  if (idx >= 0) {
    favs.splice(idx, 1)
  } else {
    favs.push(id)
  }
  localStorage.setItem(KEY, JSON.stringify(favs))
  return idx < 0 // true = adicionado, false = removido
}

export function isFavorito(id: string): boolean {
  return getFavoritos().includes(id)
}
