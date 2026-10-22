<script setup>
const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <header id="beranda">
    <input type="checkbox" id="tema" class="pengalih-tema">
    <label for="tema" class="tombol-tema">Tema gelap</label>

    <h1 id="judul-halaman">{{ props.profil.judul }}</h1>
    <p id="deskripsi-halaman">{{ props.profil.deskripsi }}</p>
    <nav aria-label="Navigasi utama">
      <ul class="navbar">
        <li><a href="#beranda">Beranda</a></li>
        <li><a href="#bagian-1">Koleksi</a></li>
        <li><a href="#bagian-2">Tambah Game</a></li>
      </ul>
    </nav>
  </header>
</template>