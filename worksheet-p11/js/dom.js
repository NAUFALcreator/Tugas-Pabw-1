// js/dom.js - lapisan tampilan: seluruh sentuhan ke halaman ada di sini.
// Hanya mengimpor data.js (fungsi murni), TIDAK mengimpor state.js.
import { aturan, TAHUN_MIN, tahunIni, genreTetap, saring, buatRingkasan,
         buatBarisFooter, rapikanGenre } from "./data.js";

// ===== Pemilih (satu objek, diekspor untuk events.js) =====
export const el = {
  katalog:         document.querySelector("#katalog"),
  barisFilter:     document.querySelector("#filter"),
  kosong:          document.querySelector("#kosong"),
  pesanMuat:       document.querySelector("#muat"),
  pesanGalat:      document.querySelector("#galat-muat"),
  ringkasan:       document.querySelector("#ringkasan-koleksi"),
  form:            document.querySelector("#form-game"),
  tombolKirim:     document.querySelector("#form-game button[type='submit']"),
  tombolAturUlang: document.querySelector("#atur-ulang"),
};

for (const [nama, elemen] of Object.entries(el)) {
  if (!elemen) console.error(`Elemen "${nama}" tidak ditemukan (null). Cek id di profil.html`);
}
if (Object.values(el).some((elemen) => !elemen)) throw new Error("Ada pemilih yang null");

const kolomForm = Array.from(el.form.querySelectorAll("input"));

el.form.elements["tahun-terbit"].min = TAHUN_MIN;
el.form.elements["tahun-terbit"].max = tahunIni;

// ===== Isi teks halaman (judul, deskripsi, footer) =====
const isiTeks = (selector, teks) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen ${selector} tidak ditemukan di HTML`);
    return;
  }
  elemen.textContent = teks;
};

export function isiProfil(profil) {
  document.title = profil.judul;
  isiTeks("#judul-halaman", profil.judul);
  isiTeks("#deskripsi-halaman", profil.deskripsi);
  isiTeks("#footer-teks", buatBarisFooter(profil));
}

export function aturMemuat(sedang) {
  el.pesanMuat.hidden = !sedang;
  if (sedang) {
    el.kosong.hidden = true;
    el.pesanGalat.hidden = true;
    el.barisFilter.hidden = true;
    el.katalog.textContent = "";
  }
}

export function tampilkanGalat(pesan) {
  el.katalog.textContent = "";
  el.kosong.hidden = true;
  el.barisFilter.hidden = true;
  el.pesanGalat.textContent = pesan;
  el.pesanGalat.hidden = false;
}

function buatKartu(game, indeks, favorit) {
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

  const sukai = favorit.includes(game.id);
  const tombolFavorit = document.createElement("button");
  tombolFavorit.type = "button";
  tombolFavorit.className = "favorit";
  tombolFavorit.dataset.id = game.id;
  tombolFavorit.setAttribute("aria-label", `Tandai favorit ${game.judul}`);
  tombolFavorit.setAttribute("aria-pressed", String(sukai));
  tombolFavorit.textContent = sukai ? "★" : "☆";

  kartu.append(judul, isi, kaki, tombolFavorit);
  return kartu;
}

// ===== Filter =====
function buatTombolFilter(daftar) {
  const genreUnik = [...new Set([...genreTetap, ...daftar.map((game) => game.genre)])];
  el.barisFilter.textContent = "";
  ["semua", ...genreUnik].forEach((nilai) => {
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.dataset.kategori = nilai;
    tombol.textContent = nilai === "semua" ? "Semua" : nilai;
    el.barisFilter.append(tombol);
  });
}

function tandaiTombolAktif(kategori) {
  el.barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategori;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

export function render(state) {
  el.pesanGalat.hidden = true;
  el.barisFilter.hidden = false;
  el.ringkasan.textContent = buatRingkasan(state.daftarProyek);
  buatTombolFilter(state.daftarProyek);
  tandaiTombolAktif(state.kategoriAktif);

  el.katalog.textContent = "";
  const tampil = saring(state.daftarProyek, state.kategoriAktif);

  if (tampil.length === 0) {
    el.kosong.textContent = state.daftarProyek.length === 0
      ? "Belum ada game di koleksi. Tambah lewat form di bawah."
      : "Tidak ada game di genre ini. Coba pilih genre lain atau tambah game baru.";
    el.kosong.hidden = false;
    return;
  }
  el.kosong.hidden = true;

  const fragmen = document.createDocumentFragment();
  tampil.forEach((game, indeks) => fragmen.append(buatKartu(game, indeks, state.favorit)));
  el.katalog.append(fragmen);
}

// ===== Form =====
kolomForm.forEach((kolom) => {
  const pesan = document.createElement("small");
  pesan.id = `galat-${kolom.id}`;
  pesan.className = "galat";
  pesan.hidden = true;
  kolom.setAttribute("aria-describedby", pesan.id);
  kolom.after(pesan);
});

export function periksa(kolom) {
  const galat = aturan[kolom.id](kolom.value);
  const pesan = document.querySelector(`#galat-${kolom.id}`);
  pesan.textContent = galat;
  pesan.hidden = galat === "";
  if (galat) kolom.setAttribute("aria-invalid", "true");
  else kolom.removeAttribute("aria-invalid");
  return galat === "";
}

// memeriksa semua kolom dan menampilkan pesan; fokus ke kolom salah pertama
export function periksaSemua() {
  const hasil = kolomForm.map((kolom) => periksa(kolom));
  if (hasil.includes(false)) {
    kolomForm[hasil.indexOf(false)].focus();
    return false;
  }
  return true;
}

// hanya memeriksa, tanpa menampilkan pesan
export function semuaSah() {
  return kolomForm.every((kolom) => aturan[kolom.id](kolom.value) === "");
}

export function aturTombolKirim(nonaktif) {
  el.tombolKirim.disabled = nonaktif;
}

export function bacaForm() {
  return {
    judul: el.form.elements["judul"].value.trim(),
    tahun: Number(el.form.elements["tahun-terbit"].value),
    genre: rapikanGenre(el.form.elements["genre"].value),
  };
}

export function bersihkanForm() {
  el.form.reset();
  kolomForm.forEach((kolom) => {
    kolom.removeAttribute("aria-invalid");
    document.querySelector(`#galat-${kolom.id}`).hidden = true;
  });
}