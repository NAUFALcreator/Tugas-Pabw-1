// ===== Data =====
const profil = {
  judul: "Koleksi Game Steam Saya",
  deskripsi: "Halaman ini berisi daftar game yang saya punya dan form untuk menambah game baru.",
  nama: "Muhammad Naufal Arliansyah",
  nim: "25523240",
  tahun: 2026,
};

const daftarGame = [
  { judul: "The Witcher 3: Wild Hunt", tahun: 2015, genre: "RPG", gambar: "img/the-witcher-3.webp" },
  { judul: "Portal 2", tahun: 2011, genre: "Puzzle", gambar: "img/portal-2.webp" },
  { judul: "Stardew Valley", tahun: 2016, genre: "Simulasi", gambar: "img/stardew-valley.webp" },
  { judul: "Hollow Knight", tahun: 2017, genre: "Metroidvania", gambar: "img/hollow-knight.webp" },
  { judul: "Hades", tahun: 2020, genre: "Roguelike", gambar: "img/hades.webp" },
];

const gameKosong = { judul: "", tahun: 0, genre: "", gambar: null };

// ===== Fungsi murni =====
const cekGameBaru = (game) => game.tahun >= 2016;

const buatBarisFooter = ({ nama, nim, tahun }) => `${nama} · ${nim} · ${tahun}`;

const formatGenre = (daftar) => daftar.join(" · ");

const amankanTeks = (teks) =>
  String(teks).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const buatKartu = (game, indeks) => {
  const { judul, tahun, genre, gambar } = game;
  const pengembang = game.pengembang?.nama ?? "pengembang belum diisi";
  const gambarHtml = gambar !== null
    ? `<figure><img src="${gambar}" alt="Sampul game ${amankanTeks(judul)}" width="320" height="180" loading="lazy"></figure>`
    : "";

  return `
  <article class="kartu${indeks === 0 ? " papan" : ""}">
    <h3 class="kartu__judul">${amankanTeks(judul)}</h3>
    <div class="kartu__isi">
      ${gambarHtml}
      <small>${amankanTeks(pengembang)}</small>
    </div>
    <div class="kartu__kaki"><span>${tahun}</span><span>${amankanTeks(genre)}</span></div>
  </article>`;
};

const buatRingkasan = (daftar) => {
  const jumlahBaru = daftar.filter(cekGameBaru).length;
  const favorit = daftar.find((game) => game.judul === "Hades")?.judul ?? "-";
  const genre = formatGenre(daftar.map((game) => game.genre));
  return `${daftar.length} game (${jumlahBaru} rilis 2016+) · favorit: ${favorit} · ${genre}`;
};

// ===== DOM =====
const ambilElemen = (selector) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen ${selector} tidak ditemukan di HTML`);
  }
  return elemen;
};

const isiTeks = (selector, teks) => {
  const elemen = ambilElemen(selector);
  if (elemen !== null) elemen.textContent = teks;
};

const tampilkanKatalog = () => {
  const katalog = ambilElemen("#katalog");
  if (katalog === null) return;
  katalog.innerHTML = daftarGame.map(buatKartu).join("");
  isiTeks("#ringkasan-koleksi", buatRingkasan(daftarGame));
};

document.title = profil.judul;
isiTeks("#judul-halaman", profil.judul);
isiTeks("#deskripsi-halaman", profil.deskripsi);
isiTeks("#footer-teks", buatBarisFooter(profil));
tampilkanKatalog();

const formGame = ambilElemen("#form-game");
if (formGame !== null) {
  formGame.addEventListener("submit", (event) => {
    event.preventDefault();
    daftarGame.push({
      ...gameKosong,
      judul: formGame.elements["judul"].value.trim(),
      tahun: Number(formGame.elements["tahun-terbit"].value),
      genre: formGame.elements["genre"].value.trim(),
    });
    tampilkanKatalog();
    formGame.reset();
  });
}