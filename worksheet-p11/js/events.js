// events.js: semua pendengar peristiwa. Hanya memanggil fungsi pengubah, tidak menulis state langsung.
import { el, periksa, periksaSemua, semuaSah, aturTombolKirim, bacaForm, bersihkanForm } from "./dom.js";
import { state, pilihKategori, tambahGame, tambahFavorit, aturGagalKirim } from "./state.js";

export function pasangPendengar() {
  // filter genre: satu pendengar di induk
  el.barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;
    pilihKategori(tombol.dataset.kategori);
  });

  // favorit: satu pendengar di wadah katalog
  el.katalog.addEventListener("click", (event) => {
    const tombol = event.target.closest(".favorit");
    if (!tombol) return;
    tambahFavorit(Number(tombol.dataset.id));
  });

  // form: validasi per kolom
  el.form.addEventListener("input", (event) => {
    const kolom = event.target.closest("input");
    if (!kolom) return;
    periksa(kolom);
    if (state.gagalKirim) aturTombolKirim(!semuaSah());
  });

  el.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.siap) return;

    if (!periksaSemua()) {
      aturGagalKirim(true);
      aturTombolKirim(true);
      return;
    }
    tambahGame(bacaForm());
    bersihkanForm();
    aturGagalKirim(false);
    aturTombolKirim(false);
  });
}