// ============================================================
// Layanan GitHub REST API  ->  https://docs.github.com/en/rest
//
// - Base URL : https://api.github.com  (publik, TANPA daftar / token untuk data publik)
// - Endpoint : GET /users/{username}   (profil publik: avatar, bio, jumlah repo, dst.)
// - Batas    : 60 request/jam per IP (tanpa token) -> hasil disimpan di sessionStorage
//              selama 15 menit supaya refresh halaman tidak menghabiskan kuota.
// - Jangan menaruh token pribadi di kode frontend (terlihat di browser).
// ============================================================

const BASE_URL = 'https://api.github.com'
const CACHE_TTL_MS = 15 * 60 * 1000

// kind: 'network' | 'not-found' | 'rate-limit' | 'http'
export class GithubApiError extends Error {
  constructor(message, kind, status = null) {
    super(message)
    this.name = 'GithubApiError'
    this.kind = kind
    this.status = status
  }
}

/* ---------- cache (sessionStorage, aman bila storage diblokir) ---------- */
function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { savedAt, data } = JSON.parse(raw)
    return Date.now() - savedAt <= CACHE_TTL_MS ? data : null
  } catch {
    return null
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // storage penuh / diblokir -> abaikan, aplikasi tetap jalan tanpa cache
  }
}

/* ---------- ubah response error menjadi pesan yang jelas ---------- */
function toApiError(response) {
  const { status, headers } = response

  if (status === 404) {
    return new GithubApiError('Username GitHub tidak ditemukan.', 'not-found', status)
  }

  const rateLimited = (status === 403 || status === 429) && headers.get('x-ratelimit-remaining') === '0'
  if (rateLimited) {
    const resetAt = Number(headers.get('x-ratelimit-reset')) * 1000
    const time = resetAt
      ? new Date(resetAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      : null
    return new GithubApiError(
      time
        ? `Batas request GitHub habis. Coba lagi sekitar pukul ${time}.`
        : 'Batas request GitHub habis. Coba lagi beberapa saat lagi.',
      'rate-limit',
      status,
    )
  }

  return new GithubApiError(`GitHub mengembalikan error (${status}).`, 'http', status)
}

/* ---------- request dasar ---------- */
async function request(path, { force = false, signal } = {}) {
  const cacheKey = `github-api:${path}`

  if (!force) {
    const cached = readCache(cacheKey)
    if (cached) return cached
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new GithubApiError('Tidak bisa terhubung ke GitHub. Periksa koneksi internet.', 'network')
  }

  if (!response.ok) throw toApiError(response)

  const data = await response.json()
  writeCache(cacheKey, data)
  return data
}

/* ---------- fungsi yang dipakai aplikasi ---------- */

// GET /users/{username}
export function fetchGithubUser(username, options) {
  return request(`/users/${encodeURIComponent(username)}`, options)
}

// Avatar GitHub default berukuran kecil; minta 600px supaya tajam di foto kartu yang besar
function largeAvatar(url) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('s', '600')
    return parsed.toString()
  } catch {
    return url
  }
}

// Ambil hanya field yang dibutuhkan UI (nama field GitHub -> nama field kita)
export function mapGithubUser(raw) {
  return {
    username: raw.login,
    // nama lengkap di profil GitHub; kosong bila belum diisi (store memakai nama lokal)
    name: raw.name ? raw.name.trim() : '',
    bio: raw.bio ? raw.bio.trim() : '',
    avatarUrl: largeAvatar(raw.avatar_url),
    profileUrl: raw.html_url,
  }
}
