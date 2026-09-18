'use strict'; 
  
const form = document.querySelector('#form-total'); 
const hargaInput = document.querySelector('#harga'); 
const jumlahInput = document.querySelector('#jumlah'); 
const hasil = document.querySelector('#hasil'); 
const pesan = document.querySelector('#pesan'); 
const test = [1, 2];
  
function hitungTotal(harga, jumlah) { 
  return harga * jumlah; 
} 
  
function tampilkanPesan(teks) { 
  pesan.textContent = teks; 
} 
  
function prosesForm(event) { 
  console.count('prosesForm'); 
  event.preventDefault(); 
  
  const harga = Number(hargaInput.value); 
  const jumlah = Number(jumlahInput.value); 
  
  if (harga <= 0 || jumlah <= 0) { 
    tampilkanPesan('Harga dan jumlah harus positif.'); 
    return; 
  } 
  
  const total = hitungTotal(harga, jumlah); 
  hasil.textContent = total.toLocaleString('id-ID'); 
  tampilkanPesan('Perhitungan berhasil.'); 
  console.log (test[3])
} 
  
form.addEventListener('submit', prosesForm); 
// form.addEventListener('submit', (event) => {
//  prosesForm(event);
// });