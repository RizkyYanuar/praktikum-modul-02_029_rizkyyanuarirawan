'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');


function validasiPeserta(calon) {
  const hasil = { valid: true, errorNama: '', errorProdi: '' };
  const namaTrimmed = calon.nama.trim();


  if (namaTrimmed.length < 3) {
    hasil.valid = false;
    hasil.errorNama = 'Nama harus minimal 3 karakter.';
  }

  if (!calon.prodi) {
    hasil.valid = false;
    hasil.errorProdi = 'Program studi wajib dipilih.';
  }

  return hasil;
}


function buatKartuPeserta(item) {
  const article = document.createElement('article');
  article.classList.add('kartu');

  const h2 = document.createElement('h2');
  h2.textContent = item.nama;

  const p = document.createElement('p');
  p.textContent = item.prodi;

  article.appendChild(h2);
  article.appendChild(p);

  return article;
}

function renderPeserta(data) {
  daftar.replaceChildren();

  if (data.length === 0) {
    const pesanKosong = document.createElement('p');
    pesanKosong.textContent = 'Tidak ada peserta';
    daftar.appendChild(pesanKosong);
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const kartu = buatKartuPeserta(item);
    fragment.appendChild(kartu);
  });

  daftar.appendChild(fragment);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calonPeserta = {
    nama: namaInput.value,
    prodi: prodiInput.value
  };

  const validasi = validasiPeserta(calonPeserta);

  if (!validasi.valid) {
    if (validasi.errorNama) {
      namaInput.setAttribute('aria-invalid', 'true');
      errorNama.textContent = validasi.errorNama;
    } else {
      namaInput.setAttribute('aria-invalid', 'false');
      errorNama.textContent = '';
    }

    if (validasi.errorProdi) {
      prodiInput.setAttribute('aria-invalid', 'true');
      errorProdi.textContent = validasi.errorProdi;
    } else {
      prodiInput.setAttribute('aria-invalid', 'false');
      errorProdi.textContent = '';
    }
    return;
  }

  namaInput.setAttribute('aria-invalid', 'false');
  errorNama.textContent = '';
  prodiInput.setAttribute('aria-invalid', 'false');
  errorProdi.textContent = '';

  const pesertaBaru = {
    id: Date.now(),
    nama: calonPeserta.nama.trim(),
    prodi: calonPeserta.prodi
  };

  peserta.push(pesertaBaru);
  form.reset();
  
  filterInput.dispatchEvent(new Event('change'));
});

filterInput.addEventListener('change', () => {
  const nilaiFilter = filterInput.value;

  if (nilaiFilter === 'semua' || nilaiFilter === '') {
    renderPeserta(peserta);
  } else {
    const hasilFilter = peserta.filter(p => p.prodi === nilaiFilter);
    renderPeserta(hasilFilter);
  }
});

renderPeserta(peserta);
