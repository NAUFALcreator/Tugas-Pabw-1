## Pertemuan 8 — Halaman Koleksi Game yang Digerakkan JavaScript
nama = MUHAMMAD NAUFAL ARLIANSYAH 
nim = 25523240

Sebelumnya halaman Koleksi Game Steam Saya hanya HTML dan CSS: judul, deskripsi, dan footer ditulis langsung di HTML. Di pertemuan ini saya membalik caranya. HTML tinggal kerangka kosong, sedangkan semua isinya disimpan sebagai data di js/app.js lalu dipasang ke halaman lewat DOM.

## Gambar rangka saya
worksheet-p8/
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
│   └── app.js
├── profil.html
└── README.md   

## yang berubah sekarang 
 - Disimpan di object profil, diisi ke #judul-halaman, #deskripsi-halaman, #footer-teks
 - Dibuat otomatis dari array daftarGame oleh buatKartu()
 - Form menambah game baru ke daftarGame tanpa pindah halaman
 - Dirapikan ke css/, img/, js/ 
 ## yang dulu
 - Judul, deskripsi, dan footer ditulis di HTML
 - Kartu game ditulis satu per satu
 - Form hanya tampilan
 - semua berkas di satu folder dengan acak acakan 

## Hasil pemeriksaan Console
Tidak ada pesan merah. Yang tampil hanya keluaran console.log dan console.table dari app.js, misalnya Koleksi ini punya 5 game dari 5 genre. dan pilihan: baru -> 3 game. Ada satu peringatan kuning [Intervention] Images loaded lazily... yang berasal dari loading="lazy" pada gambar. Itu informasi dari browser, bukan galat, jadi saya ubah juga

## Penggunaan ai
Saya memakai Claude sebagai teman belajar dan pemeriksa, bukan untuk menggantikan pekerjaan. Bantuannya mencakup:

- menjelaskan konsep di atas (const/let, spread, Number(), pesan null, DOM);
- membantu membaca isi Console dan membedakan galat dari peringatan;
- memeriksa pekerjaan terhadap daftar F.1;
- memandu commit dan push di GitHub Desktop, merapikan struktur folder, dan menyusun README ini.

Yang saya kerjakan sendiri menulis data profil dan daftarGame, membuat fungsi-fungsinya, menyambungkan form, serta menjalankan dan menguji halaman. Saya bertanggung jawab memahami kode ini dan sanggup menjelaskannya.
