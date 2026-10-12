// ===== Data =====
const tahunIni = new Date().getFullYear();

const profil = {
  judul: "Koleksi Game Steam Saya",
  deskripsi: "Halaman ini berisi daftar game yang saya punya dan form untuk menambah game baru.",
  nama: "Muhammad Naufal Arliansyah",
  nim: "25523240",
  tahun: tahunIni,
};

const daftarGame = [
  { judul: "The Witcher 3: Wild Hunt", tahun: 2015, genre: "RPG", gambar: "img/the-witcher-3.webp" },
  { judul: "Portal 2", tahun: 2011, genre: "Puzzle", gambar: "img/portal-2.webp" },
  { judul: "Stardew Valley", tahun: 2016, genre: "Simulasi", gambar: "img/stardew-valley.webp" },
  { judul: "Hollow Knight", tahun: 2017, genre: "Metroidvania", gambar: "img/hollow-knight.webp" },
  { judul: "Hades", tahun: 2020, genre: "Roguelike", gambar: "img/hades.webp" },
];

const cekGameBaru = (game) => game.tahun >= 2016;

const buatBarisFooter = ({ nama, nim, tahun }) => `${nama} · ${nim} · ${tahun}`;

const formatGenre = (daftar) => daftar.join(" · ");

const buatRingkasan = (daftar) => {
  const jumlahBaru = daftar.filter(cekGameBaru).length;
  const favorit = daftar.find((game) => game.judul === "Hades")?.judul ?? "-";
  const genre = formatGenre(daftar.map((game) => game.genre));
  return `${daftar.length} game (${jumlahBaru} rilis 2016+) · favorit: ${favorit} · ${genre}`;
};

const jumlahGame = daftarGame.length;
const daftarGenre = daftarGame.map((game) => game.genre);
const jumlahGenre = new Set(daftarGenre).size;

console.log(`Halo! Saya ${profil.nama} (${profil.nim}), pemilik ${jumlahGame} game di koleksi Steam.`);
console.log(`Koleksi ini punya ${jumlahGame} game dari ${jumlahGenre} genre.`);
console.log("Tipe data nama:", typeof profil.nama);
console.log("Tipe data nim:", typeof profil.nim);
console.log("Tipe data daftarGenre:", typeof daftarGenre);
console.log("Tipe data jumlahGame:", typeof jumlahGame);
console.log(`Pengguna: ${buatBarisFooter(profil)}`);
console.log(`Genre Game: ${formatGenre(daftarGenre)}`);

console.log("--- Seluruh Daftar Game ---");
console.table(daftarGame);

console.log("--- Hasil Filter (Game Rilis 2016+) ---");
console.table(daftarGame.filter(cekGameBaru));

console.log("--- Hasil Find ('Hades') ---");
console.log(daftarGame.find((game) => game.judul === "Hades"));

console.log("--- Hasil Map (Daftar Judul) ---");
console.log(daftarGame.map((game) => game.judul));

console.log("--- Hasil Sort (Tahun Terlama, salinan) ---");
console.table([...daftarGame].sort((a, b) => a.tahun - b.tahun));
console.log("Urutan asli masih sama:", daftarGame[0].judul);

const salinanProfil = { ...profil, judul: "Judul percobaan" };
console.log("Salinan profil:", profil.judul, "|", salinanProfil.judul);

const isiTeks = (selector, teks) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen ${selector} tidak ditemukan di HTML`);
    return;
  }
  elemen.textContent = teks;
};

document.title = profil.judul;
isiTeks("#judul-halaman", profil.judul);
isiTeks("#deskripsi-halaman", profil.deskripsi);
isiTeks("#footer-teks", buatBarisFooter(profil));
export { daftarGame, buatRingkasan, tahunIni };