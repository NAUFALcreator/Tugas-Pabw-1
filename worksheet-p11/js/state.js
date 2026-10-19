import { render } from "./dom.js";

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: [],
  siap: false,        
  gagalKirim: false,  
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar.map((game, i) => ({ ...game, id: Number(game.id) || i + 1 }));
  state.siap = true;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];    
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