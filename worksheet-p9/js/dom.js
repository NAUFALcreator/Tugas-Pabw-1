import { daftarGame, buatRingkasan, tahunIni } from "./app.js";

const TAHUN_MIN = 1970;
const katalog     = document.querySelector("#katalog");
const barisFilter = document.querySelector("#filter");
const kosong      = document.querySelector("#kosong");
const ringkasan   = document.querySelector("#ringkasan-koleksi");
const form        = document.querySelector("#form-game");
const tombolKirim = document.querySelector("#form-game button[type='submit']");
const kolomForm   = Array.from(document.querySelectorAll("#form-game input"));

const daftarElemen = { katalog, barisFilter, kosong, ringkasan, form, tombolKirim };
for (const [nama, el] of Object.entries(daftarElemen)) {
  if (!el) console.error(`Elemen "${nama}" tidak ditemukan (null). Cek id di profil.html`);
}
if (Object.values(daftarElemen).some((el) => !el)) throw new Error("Ada pemilih yang null");

// batas tahun mengikuti tahun sekarang
form.elements["tahun-terbit"].min = TAHUN_MIN;
form.elements["tahun-terbit"].max = tahunIni;

let kategoriAktif = "semua";

// ===== Kartu =====
function buatKartu(game, indeks) {
  const kartu = document.createElement("article");
  kartu.className = indeks === 0 ? "kartu papan" : "kartu";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = game.judul;

  const isi = document.createElement("div");
  isi.className = "kartu__isi";
  if (game.gambar) {
    const gambar = document.createElement("img");
    gambar.src = game.gambar;
    gambar.alt = `Sampul game ${game.judul}`;
    gambar.width = 320;
    gambar.height = 180;
    const figur = document.createElement("figure");
    figur.append(gambar);
    isi.append(figur);
  }

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";
  const tahun = document.createElement("span");
  tahun.textContent = game.tahun;
  const genre = document.createElement("span");
  genre.textContent = game.genre;
  kaki.append(tahun, genre);

  kartu.append(judul, isi, kaki);
  return kartu;
}

function render(daftar) {
  katalog.textContent = "";

  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((game, indeks) => fragmen.append(buatKartu(game, indeks)));
  katalog.append(fragmen);
}

// ===== Filter (tombol dibuat dari data) =====
function buatTombolFilter() {
  const genreUnik = [...new Set(daftarGame.map((game) => game.genre))];
  const kategori = ["semua", ...genreUnik];

  barisFilter.textContent = "";
  kategori.forEach((nilai) => {
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.dataset.kategori = nilai;
    tombol.textContent = nilai === "semua" ? "Semua" : nilai;
    barisFilter.append(tombol);
  });
}

function tampil() {
  const terpilih = daftarGame.filter(
    (game) => kategoriAktif === "semua" || game.genre === kategoriAktif
  );
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
  render(terpilih);
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  kategoriAktif = tombol.dataset.kategori;
  tampil();
});

const aturan = {
  "judul": (nilai) =>
    nilai.trim() === "" ? "Judul belum diisi. Tulis nama game, misalnya Hades." : "",
  "tahun-terbit": (nilai) => {
    if (nilai.trim() === "") return "Tahun belum diisi. Tulis empat angka, misalnya 2020.";
    const angka = Number(nilai);
    if (!Number.isInteger(angka) || angka < TAHUN_MIN || angka > tahunIni) {
      return `Tahun harus bilangan bulat antara ${TAHUN_MIN} dan ${tahunIni}.`;
    }
    return "";
  },
  "genre": (nilai) =>
    nilai.trim() === "" ? "Genre belum diisi. Tulis satu genre, misalnya Roguelike." : "",
};

kolomForm.forEach((kolom) => {
  const pesan = document.createElement("small");
  pesan.id = `galat-${kolom.id}`;
  pesan.className = "galat";
  pesan.hidden = true;
  kolom.setAttribute("aria-describedby", pesan.id);
  kolom.after(pesan);
});

function periksa(kolom) {
  const galat = aturan[kolom.id](kolom.value);
  const pesan = document.querySelector(`#galat-${kolom.id}`);
  pesan.textContent = galat;
  pesan.hidden = galat === "";
  if (galat) kolom.setAttribute("aria-invalid", "true");
  else kolom.removeAttribute("aria-invalid");
  return galat === "";
}

function semuaSah() {
  return kolomForm.every((kolom) => aturan[kolom.id](kolom.value) === "");
}

const rapikanGenre = (teks) => {
  const bersih = teks.trim();
  return bersih.charAt(0).toUpperCase() + bersih.slice(1);
};

let sudahGagalKirim = false;

form.addEventListener("input", (event) => {
  const kolom = event.target.closest("input");
  if (!kolom) return;
  periksa(kolom);
  if (sudahGagalKirim) tombolKirim.disabled = !semuaSah();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const hasil = kolomForm.map((kolom) => periksa(kolom));
  if (hasil.includes(false)) {
    sudahGagalKirim = true;
    tombolKirim.disabled = true;
    kolomForm[hasil.indexOf(false)].focus();
    return;
  }

  daftarGame.push({
    judul: form.elements["judul"].value.trim(),
    tahun: Number(form.elements["tahun-terbit"].value),
    genre: rapikanGenre(form.elements["genre"].value),
    gambar: null,
  });

  form.reset();
  sudahGagalKirim = false;
  tombolKirim.disabled = false;
  kolomForm.forEach((kolom) => {
    kolom.removeAttribute("aria-invalid");
    document.querySelector(`#galat-${kolom.id}`).hidden = true;
  });

  ringkasan.textContent = buatRingkasan(daftarGame);
  buatTombolFilter();
  tampil();
});

ringkasan.textContent = buatRingkasan(daftarGame);
buatTombolFilter();
tampil();
console.log("dom.js jalan, jumlah game:", daftarGame.length);