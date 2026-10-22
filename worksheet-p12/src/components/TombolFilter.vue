<script setup>
import { computed } from 'vue'
import { state, pilihKategori, aturUlang } from '../state.js'
import { genreTetap } from '../data.js'

// genre bawaan tetap punya tombol, ditambah genre dari data
const daftarGenre = computed(() => [
  ...new Set([...genreTetap, ...state.daftarProyek.map((game) => game.genre)]),
])
</script>

<template>
  <div id="filter" role="group" aria-label="Filter genre" v-show="!state.memuat && !state.galat">
    <button
      type="button"
      :class="{ aktif: state.kategoriAktif === 'semua' }"
      :aria-pressed="state.kategoriAktif === 'semua'"
      @click="pilihKategori('semua')"
    >Semua</button>
    <button
      v-for="genre in daftarGenre"
      :key="genre"
      type="button"
      :class="{ aktif: state.kategoriAktif === genre }"
      :aria-pressed="state.kategoriAktif === genre"
      @click="pilihKategori(genre)"
    >{{ genre }}</button>
  </div>
  <button type="button" id="atur-ulang" @click="aturUlang">Atur ulang</button>
</template>