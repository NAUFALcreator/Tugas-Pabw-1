// js/app.js - perakit: memanggil api.js (data) dan dom.js (tampilan). Tidak memanggil API sendiri.
import { ambilProyek } from "./api.js";
import { isiData, tampilkanGalat, aturMemuat } from "./dom.js";

// ===== Data =====
const tahunIni = new Date().getFullYear();

const profil = {
  judul: "Koleksi Game Steam Saya",
  deskripsi: "Halaman ini berisi daftar game yang saya punya dan form untuk menambah game baru.",
  nama: "Muhammad Naufal Arliansyah",
  nim: "25523240",
  tahun: tahunIni,
};

// daftarGame sekarang datang dari data/proyek.json lewat ambilProyek()

const cekGameBaru = (game) => game.tahun >= 2016;

const buatBarisFooter = ({ nama, nim, tahun }) => `${nama} · ${nim} · ${tahun}`;

const formatGenre = (daftar) => daftar.join(" · ");

const buatRingkasan = (daftar) => {
  const jumlahBaru = daftar.filter(cekGameBaru).length;
  const favorit = daftar.find((game) => game.judul === "Hades")?.judul ?? "-";
  const genre = formatGenre(daftar.map((game) => game.genre));
  return `${daftar.length} game (${jumlahBaru} rilis 2016+) · favorit: ${favorit} · ${genre}`;
};

// Log P8 dipindah ke fungsi, karena data baru ada setelah diambil dari jaringan
function laporKonsol(daftarGame) {
  const jumlahGame = daftarGame.length;
  const daftarGenre = daftarGame.map((game) => game.genre);
  const jumlahGenre = new Set(daftarGenre).size;

  console.log(`Halo! Saya ${profil.nama} (${profil.nim}), pemilik ${jumlahGame} game di koleksi Steam.`);
  console.log(`Koleksi ini punya ${jumlahGame} game dari ${jumlahGenre} genre.`);
  console.log("Tipe data daftarGame:", typeof daftarGame, "| larik?", Array.isArray(daftarGame));
  console.log("Peta data -> id:", typeof daftarGame[0]?.id, "| judul:", typeof daftarGame[0]?.judul,
    "| tahun:", typeof daftarGame[0]?.tahun, "| genre:", typeof daftarGame[0]?.genre,
    "| gambar:", typeof daftarGame[0]?.gambar);
  console.log(`Genre Game: ${formatGenre(daftarGenre)}`);

  console.log("--- Seluruh Daftar Game ---");
  console.table(daftarGame);
  console.log("--- Hasil Filter (Game Rilis 2016+) ---");
  console.table(daftarGame.filter(cekGameBaru));
  console.log("--- Hasil Find ('Hades') ---");
  console.log(daftarGame.find((game) => game.judul === "Hades"));

  // arah sebaliknya: nilai -> teks
  const teks = JSON.stringify(daftarGame[0]);
  console.log("stringify:", typeof teks, teks);
}

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

async function muat() {
  aturMemuat(true);
  try {
    const daftarGame = await ambilProyek(); 
    isiData(daftarGame, buatRingkasan);    
    laporKonsol(daftarGame);
  } catch (galat) {
    tampilkanGalat("Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    console.error(galat.message); 
    aturMemuat(false);
  }
}

muat();