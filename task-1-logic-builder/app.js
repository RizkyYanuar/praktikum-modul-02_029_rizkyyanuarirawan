'use strict';

function validasiNilai(nilai) {
  return typeof nilai === 'number' && Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

function tentukanKategori(nilai) {
  if (!validasiNilai(nilai)) return null;
  
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 60) return 'C';
  return 'D';
}

function tentukanStatus(nilai) {
  if (!validasiNilai(nilai)) return 'Data tidak valid'; 
  
  return nilai >= 60 ? 'Lulus' : 'Tidak lulus';
}

function buatRingkasan(nama, nilai) {
  return {
    nama: nama,
    nilai: nilai,
    kategori: tentukanKategori(nilai),
    status: tentukanStatus(nilai)
  };
}

console.log("=== Uji validasiNilai ===");
console.log("-1   :", validasiNilai(-1));   
console.log("0    :", validasiNilai(0));      
console.log("100  :", validasiNilai(100));    
console.log("101  :", validasiNilai(101));    
console.log("NaN  :", validasiNilai(NaN));    
console.log("'80' :", validasiNilai('80'));   
console.log("======================================\n");

const kasusUji = [
  { nama: 'Alya', nilai: 0 },
  { nama: 'Bima', nilai: 59 },
  { nama: 'Citra', nilai: 60 },
  { nama: 'Danu', nilai: 69 },
  { nama: 'Eka', nilai: 70 },
  { nama: 'Fani', nilai: 85 },
  { nama: 'Gilang', nilai: 101 },
  {nama: 'Rizky', nilai: "80"},
  { nama: 'Hendra', nilai: 84 }, 
  { nama: 'Riyan', nilai: 84.5 } 
];

const hasilUji = kasusUji.map(({ nama, nilai }) =>
  buatRingkasan(nama, nilai)
);

console.log("=== Hasil Tabel Ringkasan ===");
console.table(hasilUji);
