const ALAMAT =
  'https://raw.githubusercontent.com/NAUFALcreator/Tugas-Pabw-1/refs/heads/main/worksheet-p10/data/proyek.json';

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    console.log('status', respons.status, 'ok', respons.ok);
    console.log('Content-Type:', respons.headers.get('content-type'));


    if (!respons.ok) throw new Error('status ' + respons.status);

    const data = await respons.json(); 
    if (!Array.isArray(data)) throw new Error('bentuk data bukan larik');

    console.log(data[0]?.judul); 
    const badan = JSON.stringify({ judul: 'Judul contoh', kategori: 'web' });
    console.log(typeof badan);

    return data;
  } catch (galat) {
    console.error('gagal memuat', galat.message);
    throw galat; 
  }
}