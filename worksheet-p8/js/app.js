// ===== Lembar B: data halaman sebagai variabel =====
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

const daftarGenre = daftarGame.map((game) => game.genre);
const cekGameBaru = (game) => game.tahun >= 2016;
let pilihanAktif = "semua";

const kalimat = `Koleksi ini punya ${daftarGame.length} game dari ${daftarGenre.length} genre.`;
const pengembang = daftarGame[0].pengembang?.nama ?? "belum diisi";

console.log(kalimat);
console.log("pengembang:", pengembang);
console.log(typeof profil.judul, typeof profil.tahun);

const buatBarisFooter = ({ nama, nim, tahun }) => {
  return `${nama} · ${nim} · ${tahun}`;
};

const formatGenre = (daftar) => daftar.join(" · ");

const buatKartu = ({ judul, tahun, genre, gambar }, indeks) => `
  <article class="kartu${indeks === 0 ? " papan" : ""}">
    <h3 class="kartu__judul">${judul}</h3>
    <div class="kartu__isi">
      ${gambar !== null ? `<figure><img src="${gambar}" alt="Sampul game ${judul}" width="320" height="180" loading="lazy"></figure>` : ""}
    </div>
    <div class="kartu__kaki"><span>${tahun}</span><span>${genre}</span></div>
  </article>`;

console.log(buatBarisFooter(profil));
console.log(formatGenre(daftarGenre));

console.table(daftarGenre);
console.table(daftarGame);

const gameBaru = daftarGame.filter(cekGameBaru);
console.table(gameBaru);

const hades = daftarGame.find((game) => game.judul === "Hades");
console.log(hades);

const daftarJudul = daftarGame.map((game) => game.judul);
console.log(daftarJudul, daftarJudul.length === daftarGame.length);

const gameUrut = [...daftarGame].sort((a, b) => a.tahun - b.tahun);
console.table(gameUrut);
console.log("urutan asli masih sama:", daftarGame[0].judul);

const salinanProfil = {...profil };
salinanProfil.judul = "Judul percobaan";
console.log(profil.judul, "|", salinanProfil.judul);

pilihanAktif = "baru";
console.log("pilihan:", pilihanAktif, "->", daftarGame.filter(cekGameBaru).length, "game");
pilihanAktif = "semua";

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

const tampilkanRingkasan = (daftar) => {
  isiTeks(
    "#ringkasan-koleksi",
    `${daftar.length} game · ${formatGenre(daftar.map((game) => game.genre))}`
  );
};

const tampilkanKatalog = () => {
  const katalog = ambilElemen("#katalog");
  if (katalog === null) return;
  const tampil = pilihanAktif === "baru" ? daftarGame.filter(cekGameBaru) : daftarGame;
  katalog.innerHTML = tampil.map(buatKartu).join("");
  tampilkanRingkasan(daftarGame);
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
      judul: formGame.elements["judul"].value.trim(),
      tahun: Number(formGame.elements["tahun-terbit"].value),
      genre: formGame.elements["genre"].value.trim(),
      gambar: null,
    });
    tampilkanKatalog();
    formGame.reset();
  });
}