// js/dom.js - lapisan tampilan: seluruh sentuhan ke halaman ada di sini.
// Kontrak ekspor (dipakai P11): render, tampilkanGalat, aturMemuat (+ isiData untuk app.js).
const TAHUN_MIN = 1970;
const tahunIni = new Date().getFullYear();

const katalog     = document.querySelector("#katalog");
const barisFilter = document.querySelector("#filter");
const kosong      = document.querySelector("#kosong");
const pesanMuat   = document.querySelector("#muat");
const pesanGalat  = document.querySelector("#galat-muat");
const ringkasan   = document.querySelector("#ringkasan-koleksi");
const form        = document.querySelector("#form-game");
const tombolKirim = document.querySelector("#form-game button[type='submit']");
const kolomForm   = Array.from(document.querySelectorAll("#form-game input"));

const daftarElemen = { katalog, barisFilter, kosong, pesanMuat, pesanGalat, ringkasan, form, tombolKirim };
for (const [nama, el] of Object.entries(daftarElemen)) {
  if (!el) console.error(`Elemen "${nama}" tidak ditemukan (null). Cek id di profil.html`);
}
if (Object.values(daftarElemen).some((el) => !el)) throw new Error("Ada pemilih yang null");

form.elements["tahun-terbit"].min = TAHUN_MIN;
form.elements["tahun-terbit"].max = tahunIni;

// ===== Keadaan data =====
let semuaGame = [];
let kategoriAktif = "semua";
let dataSiap = false;
let buatTeksRingkasan = () => "";

// ===== Keadaan antarmuka: memuat, gagal, kosong, berhasil =====
export function aturMemuat(sedang) {
  pesanMuat.hidden = !sedang;
  if (sedang) {
    kosong.hidden = true;
    pesanGalat.hidden = true;
    barisFilter.hidden = true;
    katalog.textContent = "";
  }
}

export function tampilkanGalat(pesan) {
  katalog.textContent = "";
  kosong.hidden = true;
  barisFilter.hidden = true;
  pesanGalat.textContent = pesan;
  pesanGalat.hidden = false;
}

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

export function render(daftar) {
  katalog.textContent = "";            // 1. kosongkan lebih dulu
  pesanGalat.hidden = true;

  if (daftar.length === 0) {           // 2. keadaan kosong
    kosong.textContent = "Belum ada game di koleksi. Tambah lewat form di bawah.";
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((game, indeks) => fragmen.append(buatKartu(game, indeks)));  // 3. isi ulang
  katalog.append(fragmen);
}

function buatTombolFilter() {
  const genreUnik = [...new Set(semuaGame.map((game) => game.genre))];
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
  const terpilih = semuaGame.filter(
    (game) => kategoriAktif === "semua" || game.genre === kategoriAktif
  );
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
  render(terpilih);
}

// Dipanggil app.js setelah data dari api.js berhasil diambil
export function isiData(data, fnRingkasan) {
  semuaGame = data;
  buatTeksRingkasan = fnRingkasan;
  kategoriAktif = "semua";
  dataSiap = true;
  barisFilter.hidden = false;
  ringkasan.textContent = buatTeksRingkasan(semuaGame);
  buatTombolFilter();
  tampil();
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  kategoriAktif = tombol.dataset.kategori;
  tampil();
});

// ===== Validasi form (tidak berubah dari P9) =====
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
  if (!dataSiap) return; // data belum/ gagal dimuat, jangan tambah ke daftar kosong

  const hasil = kolomForm.map((kolom) => periksa(kolom));
  if (hasil.includes(false)) {
    sudahGagalKirim = true;
    tombolKirim.disabled = true;
    kolomForm[hasil.indexOf(false)].focus();
    return;
  }

  const idBaru = semuaGame.reduce((maks, game) => Math.max(maks, game.id ?? 0), 0) + 1;
  semuaGame.push({
    id: idBaru,
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

  ringkasan.textContent = buatTeksRingkasan(semuaGame);
  buatTombolFilter();
  tampil();
});