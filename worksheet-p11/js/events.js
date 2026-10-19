import { el, periksa, periksaSemua, semuaSah, aturTombolKirim, bacaForm, bersihkanForm } from "./dom.js";
import { state, pilihKategori, tambahGame, tambahFavorit, aturGagalKirim, aturUlang } from "./state.js";

export function pasangPendengar() {
  el.barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;
    pilihKategori(tombol.dataset.kategori);
  });

  el.katalog.addEventListener("click", (event) => {
    const tombol = event.target.closest(".favorit");
    if (!tombol) return;
    tambahFavorit(Number(tombol.dataset.id));
  });

  el.tombolAturUlang.addEventListener("click", aturUlang);

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