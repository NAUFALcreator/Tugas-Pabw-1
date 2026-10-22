// data.js: data tetap dan fungsi murni. Tidak menyentuh halaman, tidak tahu state.
export const tahunIni = new Date().getFullYear();
export const TAHUN_MIN = 1970;

export const profil = {
  judul: "Koleksi Game Steam Saya",
  deskripsi: "Halaman ini berisi daftar game yang saya punya dan form untuk menambah game baru.",
  nama: "Muhammad Naufal Arliansyah",
  nim: "25523240",
  tahun: tahunIni,
};

// genre bawaan tetap punya tombol, walau belum ada game-nya (untuk menguji pesan kosong)
export const genreTetap = ["Puzzle", "Simulasi", "Metroidvania", "RPG", "Roguelike", "Horor"];

export const cekGameBaru = (game) => game.tahun >= 2016;

export const buatBarisFooter = ({ nama, nim, tahun }) => `${nama} · ${nim} · ${tahun}`;

export const formatGenre = (daftar) => daftar.join(" · ");

export const buatRingkasan = (daftar) => {
  const jumlahBaru = daftar.filter(cekGameBaru).length;
  const favorit = daftar.find((game) => game.judul === "Hades")?.judul ?? "-";
  const genre = formatGenre(daftar.map((game) => game.genre));
  return `${daftar.length} game (${jumlahBaru} rilis 2016+) · favorit: ${favorit} · ${genre}`;
};


export const rapikanGenre = (teks) => {
  const bersih = teks.trim();
  return bersih.charAt(0).toUpperCase() + bersih.slice(1);
};

export function saring(daftar, kategori) {
  return kategori === "semua" ? daftar : daftar.filter((item) => item.genre === kategori);
}
export const aturan = {
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

export function rapikanItem(item) {
  const gambar = item.gambar ?? null;
  const sudahLengkap =
    !gambar || /^(https?:)?\/\//.test(gambar) || gambar.startsWith("/") || gambar.startsWith("img/");
  return { ...item, gambar: sudahLengkap ? gambar : `img/${gambar}` };
}