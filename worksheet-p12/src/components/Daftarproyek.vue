<script setup>
import { computed } from 'vue'
import { state, tambahFavorit } from '../state.js'
import { saring } from '../data.js'

const tampil = computed(() => saring(state.daftarProyek, state.kategoriAktif))
</script>

<template>
  <p v-if="state.memuat" id="muat">Memuat data...</p>
  <p v-else-if="state.galat" id="galat-muat" class="galat" role="alert">{{ state.galat }}</p>
  <p v-else-if="tampil.length === 0" id="kosong">
    {{ state.daftarProyek.length === 0
      ? 'Belum ada game di koleksi. Tambah lewat form di bawah.'
      : 'Tidak ada game di genre ini. Coba pilih genre lain atau tambah game baru.' }}
  </p>

  <div class="katalog" id="katalog">
    <article
      v-for="(game, indeks) in tampil"
      :key="game.id"
      :class="indeks === 0 ? 'kartu papan' : 'kartu'"
    >
      <h3 class="kartu__judul">{{ game.judul }}</h3>
      <div class="kartu__isi">
        <figure v-if="game.gambar">
          <img :src="game.gambar" :alt="`Sampul game ${game.judul}`" width="320" height="180">
        </figure>
      </div>
      <div class="kartu__kaki">
        <span>{{ game.tahun }}</span>
        <span>{{ game.genre }}</span>
      </div>
      <button
        type="button"
        class="favorit"
        :aria-label="`Tandai favorit ${game.judul}`"
        :aria-pressed="state.favorit.includes(game.id)"
        @click="tambahFavorit(game.id)"
      >{{ state.favorit.includes(game.id) ? '★' : '☆' }}</button>
    </article>
  </div>
</template>