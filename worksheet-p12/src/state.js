import { reactive } from 'vue'

const KUNCI = 'pabw-p11'
const VERSI = 2

export const state = reactive({
  kategoriAktif: 'semua',
  daftarProyek: [],   
  favorit: [],
  memuat: true,       
  galat: '',          
  siap: false,        
  gagalKirim: false,  
})

export function simpan(nilai = state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: nilai.kategoriAktif,
    favorit: nilai.favorit,
  }
  localStorage.setItem(KUNCI, JSON.stringify(isi))
}

export function muat() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI)) 
  } catch {
    localStorage.removeItem(KUNCI)                 
    return null
  }
}

export function pulihkan(isi) {
  if (!isi || typeof isi !== 'object') return      // kunjungan pertama atau isi tidak dikenal
  if (typeof isi.kategoriAktif === 'string') state.kategoriAktif = isi.kategoriAktif
  if (Array.isArray(isi.favorit)) state.favorit = isi.favorit
}

export function aturUlang() {
  localStorage.removeItem(KUNCI)
  state.kategoriAktif = 'semua'
  state.favorit = []
}

// ===== Fungsi pengubah (tanpa render) =====
export function isiProyek(daftar) {
  // id dipakai tombol favorit; bila data tidak punya id angka, pakai nomor urut
  state.daftarProyek = daftar.map((game, i) => ({ ...game, id: Number(game.id) || i + 1 }))
  state.siap = true
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return
  state.favorit = [...state.favorit, id]
}

export function tambahGame(game) {
  const idBaru = Math.max(0, ...state.daftarProyek.map((g) => g.id)) + 1
  state.daftarProyek = [...state.daftarProyek, { ...game, id: idBaru, gambar: null }]
}

export function aturGagalKirim(nilai) {
  state.gagalKirim = nilai
}