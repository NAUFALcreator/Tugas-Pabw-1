import { ambilProyek } from "./api.js";
import { profil, rapikanItem } from "./data.js";
import { state, isiProyek, pulihkan, muat } from "./state.js";
import { isiProfil, tampilkanGalat, aturMemuat } from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  isiProfil(profil);
  pulihkan(muat());          // pulihkan pilihan terakhir sebelum render pertama
  pasangPendengar();
  aturMemuat(true);
  try {
    const data = await ambilProyek();
    isiProyek(data.map(rapikanItem));
    const jumlahGenre = new Set(state.daftarProyek.map((game) => game.genre)).size;
    console.log(`Koleksi ini punya ${state.daftarProyek.length} game dari ${jumlahGenre} genre.`);
  } catch (galat) {
    console.error(galat);
    tampilkanGalat("Data gagal dimuat. Periksa koneksi, lalu muat ulang.");
  } finally {
    aturMemuat(false);
  }
}

mulai();