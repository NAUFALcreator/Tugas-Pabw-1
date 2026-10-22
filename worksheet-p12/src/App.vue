<script setup>
import { computed, onMounted, watch } from 'vue'
import { profil, rapikanItem, buatBarisFooter, buatRingkasan } from './data.js'
import { state, simpan, muat, pulihkan, isiProyek } from './state.js'
import { ambilProyek } from './api.js'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const barisFooter = buatBarisFooter(profil)
const ringkasan = computed(() =>
  state.daftarProyek.length ? buatRingkasan(state.daftarProyek) : ''
)
onMounted(async () => {
  document.title = profil.judul
  pulihkan(muat())                          
  try {
    isiProyek((await ambilProyek()).map(rapikanItem))
  } catch (galat) {
    console.error(galat)
    state.galat = 'Data gagal dimuat. Periksa koneksi, lalu muat ulang.'
  } finally {
    state.memuat = false
  }
})

watch(state, (nilai) => simpan(nilai), { deep: true })
</script>

<template>
  <div class="page">
    <KepalaProfil :profil="profil" />

    <main>
      <div class="isi">
        <aside class="sisi">
          <nav aria-label="Menu samping">
            <ul class="menu-samping">
              <li><a href="#bagian-1">Daftar Game</a></li>
            </ul>
          </nav>
        </aside>

        <div class="utama">
          <section id="bagian-1">
            <h2>Daftar Game Saya</h2>
            <figure>
              <img src="/img/koleksi-game-1.webp"
                   alt="Tangkapan layar perpustakaan Steam saya yang menampilkan sampul game dalam bentuk kotak-kotak"
                   width="640" height="360">
              <figcaption>Perpustakaan Steam saya</figcaption>
            </figure>
            <p id="ringkasan-koleksi">{{ ringkasan }}</p>
            <TombolFilter />
            <DaftarProyek />
          </section>

          <section id="bagian-2">
            <h2>Tambah Game Baru</h2>
            <FormKontak />
          </section>
        </div>
      </div>
    </main>

    <footer>
      <p id="footer-teks">{{ barisFooter }}</p>
    </footer>
  </div>
</template>