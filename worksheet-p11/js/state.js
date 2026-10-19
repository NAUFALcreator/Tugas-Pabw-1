// state.js:
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: [],
  siap: false,
  gagalKirim: false,
};

// ===== Penyimpanan (Lembar D) =====
// Yang disimpan hanya pilihan pengguna; data proyek selalu diambil ulang dari API.
export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit,
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

// Lembar E: muat() 
export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);   // bentuk lama: buang
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);     // isi rusak: buang
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi) return;                     // kunjungan pertama: nilai bawaan tetap
  state.kategoriAktif = isi.kategoriAktif;
  state.favorit = isi.favorit;
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar.map((game, i) => ({ ...game, id: Number(game.id) || i + 1 }));
  state.siap = true;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];
  simpan(state);
  render(state);
}

export function tambahGame(game) {
  const idBaru = Math.max(0, ...state.daftarProyek.map((g) => g.id)) + 1;
  state.daftarProyek = [...state.daftarProyek, { ...game, id: idBaru, gambar: null }];
  render(state);
}

export function aturGagalKirim(nilai) {
  state.gagalKirim = nilai;
}