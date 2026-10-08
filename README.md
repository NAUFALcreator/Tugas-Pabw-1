# PABW — MUHAMMAD NAUFAL ARLIANSYAH — NIM 25523240

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.

## Pertemuan 3 — Halaman profil saya

- Judul halaman: Koleksi Game Steam Saya
- Deskripsi: halaman ini berisi daftar game yang saya punya dan form untuk menambah game baru
- Tautan navigasi: Beranda, Koleksi, Tambah Game
- Dua bagian utama: Daftar Game Saya, Tambah Game Baru
- Kolom tabel: judul, tahun terbit, genre
- Kolom form: judul, tahun terbit, genre
- Gambar: koleksi-game-1.webp

## Catatan penggunaan AI

saya memakai ai gemini sebagai referensi cara buat code tabel agar tampilan menarik dan bagus dan juga itu terletak di bagian </style> saja karna saya tidak tau cara membuat tabel nya karna tanpa </style> tampilan nya akan kurang menarik karna tidak ada tabel di daftar game yang punya abistu saya mencari tahu cara git push dan letak link github nya dan juga selain penggunaan ai saya ada diskusi sama teman cara masukan img dan cara intalasi live location agar dapat melihat lighthose atau analyze page load karena memerluka http dan https

## Pertemuan 4 — Design token halaman profil
 
- Berkas gaya yang akan dibuat: tokens.css, base.css,
  layout.css, komponen.css, tema.css
- Warna utama: #8B5CF6 (ungu), dipilih karena  memberikan kesan modern, futuristik, elegan, dan menonjolkan estetika dark mode 
 
### Token yang saya tetapkan
 
| Token | Nilai | Untuk apa |
|---|---|---|
| --color-primary | #8B5CF6 | tombol, tautan, penanda |
| --color-fg | #F3F4F6 | warna teks utama |
| --color-bg | #0B0914 | latar halaman |
| --radius-md | 0,5rem | sudut tombol dan kartu |
| --space-4 | 1rem | jarak standar antar elemen |
 
Kriteria selesai saya: mengubah --color-primary di satu baris
harus mengubah warna tombol, tautan, judul, dan garis fokus.

## Catatan penggunaan AI
saya memakai ai gemini untuk referensi dan penyelesaian masalah saya di tema dan komponen yang mana saya mencari tahu kenapa gagal kode nya saat saya run dan sering kali tidak muncul warna atau warna tersebut menutupi test itu saya jadi saya menggunakan ai tsb untuk memecahkan masalah yang terjadi pada kode saya karena saya banyak terjebak di tema dengan waktu yang lumayan lama jadinya saya mencari tahu masalah nya apa lagi di bagi ubah warna dari gelap dan terang di button ga bisa di pencet dan masalah tersebut terpecah kan jadinya saya tau akar masalah nya abistu saya juga menggunakan gemini untuk mencari letak nya lighthouse dan kontras text karena bingung letak dimana dan dapat solusi nya dan jadinya saya tahu cara memecahkan masalah saya dapat dari css 

## pertemuan ke 5 - layout modern  = flexbox dan grid

┌────────────────────────────────────────────┐
│ header  (auto)   logo · judul · menu       │
├──────────────┬─────────────────────────────┤
│ .sisi        │ .utama  (tempat judul game dll)                    │
│ 16rem        │ 1fr                         │
├──────────────┴─────────────────────────────┤
│ footer  (auto)                             │
└────────────────────────────────────────────┘

- Kerangka halaman: grid tiga baris (header, isi, footer) lewat satu wadah .page, dengan isi dua kolom (sidebar dan konten). Flex dipakai untuk isi komponen.

Kriteria selesai saya: kolom galeri berubah saat jendela diseret tanpa media query, jarak memakai gap tanpa float, dan tidak ada item yang meluber pada lebar 360 px dan 1 280 px.

# Catatan penggunaan ai 
saya memakai ai untuk membantu saya dalam contoh referensi buat readme soal nya di worksheet p5 tidak ada contoh readme seperti p3 dan p4 

Pertemuan 8 — Halaman Koleksi Game yang Digerakkan JavaScript
nama = MUHAMMAD NAUFAL ARLIANSYAH nim = 25523240

Sebelumnya halaman Koleksi Game Steam Saya hanya HTML dan CSS: judul, deskripsi, dan footer ditulis langsung di HTML. Di pertemuan ini saya membalik caranya. HTML tinggal kerangka kosong, sedangkan semua isinya disimpan sebagai data di js/app.js lalu dipasang ke halaman lewat DOM.

Gambar rangka saya
worksheet-p8/ ├── css/ │ ├── base.css │ ├── komponen.css │ ├── layout.css │ ├── responsif.css │ ├── tema.css │ └── token.css ├── img/ │ ├── hades.webp │ ├── hollow-knight.webp │ ├── koleksi-game-1.webp │ ├── portal-2.webp │ ├── stardew-valley.webp │ └── the-witcher-3.webp ├── js/ │ └── app.js ├── profil.html └── README.md

yang berubah sekarang
Disimpan di object profil, diisi ke #judul-halaman, #deskripsi-halaman, #footer-teks
Dibuat otomatis dari array daftarGame oleh buatKartu()
Form menambah game baru ke daftarGame tanpa pindah halaman
Dirapikan ke css/, img/, js/
yang dulu
Judul, deskripsi, dan footer ditulis di HTML
Kartu game ditulis satu per satu
Form hanya tampilan
semua berkas di satu folder dengan acak acakan
Hasil pemeriksaan Console
Tidak ada pesan merah. Yang tampil hanya keluaran console.log dan console.table dari app.js, misalnya Koleksi ini punya 5 game dari 5 genre. dan pilihan: baru -> 3 game. Ada satu peringatan kuning [Intervention] Images loaded lazily... yang berasal dari loading="lazy" pada gambar. Itu informasi dari browser, bukan galat, jadi saya ubah juga

Penggunaan ai
Saya memakai Claude sebagai teman belajar dan pemeriksa, bukan untuk menggantikan pekerjaan. Bantuannya mencakup:

menjelaskan konsep di atas (const/let, spread, Number(), pesan null, DOM);
membantu membaca isi Console dan membedakan galat dari peringatan;
memeriksa pekerjaan terhadap daftar F.1;
memandu commit dan push di GitHub Desktop, merapikan struktur folder, dan menyusun README ini.
Yang saya kerjakan sendiri menulis data profil dan daftarGame, membuat fungsi-fungsinya, menyambungkan form, serta menjalankan dan menguji halaman. Saya bertanggung jawab memahami kode ini dan sanggup menjelaskannya.
