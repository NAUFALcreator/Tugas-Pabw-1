import { daftarGame, buatKartu } from "./app.js";

const katalog     = document.querySelector("#katalog");
const barisFilter = document.querySelector("#filter");
const kosong      = document.querySelector("#kosong");

console.log({ katalog, barisFilter, kosong });

function render(daftar) {
  katalog.textContent = "";

  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((game) => fragmen.append(buatKartu(game)));
  katalog.append(fragmen);
}

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;                

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarGame.filter(
    (game) => kategori === "semua" || game.genre === kategori
  );

  tandaiTombolAktif(tombol);
  render(terpilih);
});


render(daftarGame);