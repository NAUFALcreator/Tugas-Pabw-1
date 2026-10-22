<script setup>
import { reactive, computed, ref } from 'vue'
import { aturan, TAHUN_MIN, tahunIni, rapikanGenre } from '../data.js'
import { state, tambahGame, aturGagalKirim } from '../state.js'

const isi = reactive({ judul: '', 'tahun-terbit': '', genre: '' })
const galat = reactive({ judul: '', 'tahun-terbit': '', genre: '' })

const refJudul = ref(null)
const refTahun = ref(null)
const refGenre = ref(null)
const kolomRef = { judul: refJudul, 'tahun-terbit': refTahun, genre: refGenre }
const daftarKunci = Object.keys(isi)
function periksa(kunci) {
  galat[kunci] = aturan[kunci](String(isi[kunci]))
  return galat[kunci] === ''
}

// hanya memeriksa, tanpa menampilkan pesan
const semuaSah = computed(() =>
  daftarKunci.every((kunci) => aturan[kunci](String(isi[kunci])) === '')
)

const nonaktif = computed(() => state.gagalKirim && !semuaSah.value)

function kirim() {
  if (!state.siap) return

  const hasil = daftarKunci.map(periksa)
  if (hasil.includes(false)) {
    aturGagalKirim(true)
    kolomRef[daftarKunci[hasil.indexOf(false)]].value?.focus()  
    return
  }

  tambahGame({
    judul: isi.judul.trim(),
    tahun: Number(isi['tahun-terbit']),
    genre: rapikanGenre(isi.genre),
  })
  daftarKunci.forEach((kunci) => {
    isi[kunci] = ''
    galat[kunci] = ''
  })
  aturGagalKirim(false)
}
</script>

<template>
  <form class="form-kolom" id="form-game" novalidate @submit.prevent="kirim">
    <p>
      <label for="judul">Judul</label>
      <input
        ref="refJudul" type="text" id="judul" name="judul" required
        v-model="isi.judul" @input="periksa('judul')"
        :aria-invalid="galat.judul ? 'true' : null" aria-describedby="galat-judul"
      >
      <small id="galat-judul" class="galat" v-show="galat.judul">{{ galat.judul }}</small>
    </p>
    <p>
      <label for="tahun-terbit">Tahun terbit</label>
      <input
        ref="refTahun" type="number" id="tahun-terbit" name="tahun-terbit" required
        :min="TAHUN_MIN" :max="tahunIni"
        v-model="isi['tahun-terbit']" @input="periksa('tahun-terbit')"
        :aria-invalid="galat['tahun-terbit'] ? 'true' : null" aria-describedby="galat-tahun-terbit"
      >
      <small id="galat-tahun-terbit" class="galat" v-show="galat['tahun-terbit']">{{ galat['tahun-terbit'] }}</small>
    </p>
    <p>
      <label for="genre">Genre</label>
      <input
        ref="refGenre" type="text" id="genre" name="genre" required
        v-model="isi.genre" @input="periksa('genre')"
        :aria-invalid="galat.genre ? 'true' : null" aria-describedby="galat-genre"
      >
      <small id="galat-genre" class="galat" v-show="galat.genre">{{ galat.genre }}</small>
    </p>
    <button type="submit" :disabled="nonaktif">Simpan</button>
  </form>
</template>