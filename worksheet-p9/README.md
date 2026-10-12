## Pertemuan 9— Halaman Koleksi Game yang Digerakkan JavaScript
nama = MUHAMMAD NAUFAL ARLIANSYAH
nim = 25523240

Sebelumnya halaman Koleksi Game Steam Saya hanya HTML dan CSS: judul, deskripsi, dan footer ditulis langsung di HTML. Di pertemuan ini saya membalik caranya. HTML tinggal kerangka kosong, sedangkan semua isinya disimpan sebagai data di `js/app.js` lalu dipasang ke halaman lewat DOM oleh `js/dom.js`.

## Gambar rangka saya
```
worksheet-p9/
├── css/
│   ├── base.css
│   ├── komponen.css
│   ├── layout.css
│   ├── responsif.css
│   ├── tema.css
│   └── token.css
├── img/
│   ├── hades.webp
│   ├── hollow-knight.webp
│   ├── koleksi-game-1.webp
│   ├── portal-2.webp
│   ├── stardew-valley.webp
│   └── the-witcher-3.webp
├── js/
│   ├── app.js
│   └── dom.js
├── profil.html
└── README.md
```

## Pembagian tugas skrip
- `js/app.js`: data (`profil`, `daftarGame`), fungsi murni (`cekGameBaru`, `buatBarisFooter`, `formatGenre`, `buatRingkasan`), latihan Console, pengisian judul/deskripsi/footer, dan `export`.
- `js/dom.js`: mengimpor data dari `app.js`, lalu mengurus render kartu, filter genre, dan validasi form.
- `profil.html` hanya memuat `js/dom.js`; `app.js` ikut dimuat lewat `import`.

## Yang berubah sekarang
- Tombol filter genre dibuat dari data dan satu pendengar di induk (`event delegation`) melayani semuanya.

## Hasil pemeriksaan Console
Tidak ada pesan merah. Yang tampil hanya keluaran `console.log` dan `console.table` dari `app.js` dan `dom.js`, misalnya `Koleksi ini punya 5 game dari 5 genre.` dan `dom.js jalan, jumlah game: 5`.

Sebelumnya sempat muncul galat `The requested module './app.js' does not provide an export named 'buatRingkasan'`. Penyebabnya `app.js` belum punya `export`. Sudah diperbaiki dengan `export { daftarGame, buatRingkasan, tahunIni };`.

## Penggunaan AI
Saya memakai GEMINI sebagai teman belajar dan pemeriksa. Bantuannya mencakup:

- menjelaskan konsep (const/let, spread, `Number()`, pesan `null`, event delegation);
- membantu membaca isi Console dan membedakan galat dari peringatan;
- memeriksa pekerjaan terhadap daftar periksa F.1;
- **menulis ulang dan merapikan `js/app.js` dan `js/dom.js`** setelah saya menunjukkan kode awal saya: menambah `export`/`import`, memisahkan tugas kedua berkas, menghapus handler `submit` dan `buatKartu` yang ganda;
- memandu commit dan push di GitHub Desktop dan menyusun README ini.

Yang saya kerjakan sendiri: struktur halaman dan CSS awal, data `profil` dan `daftarGame`, versi pertama fungsi-fungsi di `app.js` dan `dom.js`, serta menjalankan, menguji, dan menjawab pertanyaan tentang halaman ini. Saya bertanggung jawab memahami kode ini dan sanggup menjelaskannya.