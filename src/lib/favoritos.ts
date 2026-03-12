const getKey = (userId: string) => `tatuape-favoritos-${userId}`

export function getFavoritos(userId: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(getKey(userId)) ?? '[]')
  } catch {
    return []
  }
}

export function toggleFavorito(id: string, userId: string): boolean {
  const favs = getFavoritos(userId)
  const idx = favs.indexOf(id)
  if (idx >= 0) {
    favs.splice(idx, 1)
  } else {
    favs.push(id)
  }
  localStorage.setItem(getKey(userId), JSON.stringify(favs))
  return idx < 0 // true = adicionado, false = removido
}

export function isFavorito(id: string, userId: string): boolean {
  return getFavoritos(userId).includes(id)
}

export function limparFavoritos(userId: string): void {
  try { localStorage.removeItem(getKey(userId)) } catch { /* ignore */ }
}
