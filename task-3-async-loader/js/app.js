"use strict";

const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar-materi");
const tombolMuat = document.querySelector("#muat");
const tombolCobaLagi = document.querySelector("#coba-lagi");

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== "error";
}

async function ambilMateri() {
  const response = await fetch("data/materi.json");
  
  if (!response.ok) {
    throw new Error(`Gagal memuat data (HTTP ${response.status}: ${response.statusText})`);
  }
  
  return await response.json();
}

function renderMateri(data) {
  daftar.replaceChildren();

  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const kartu = document.createElement("article");
    kartu.classList.add("kartu-materi");

    const judul = document.createElement("h3");
    judul.textContent = item.judul;

    const durasi = document.createElement("p");
    durasi.textContent = `Durasi: ${item.durasi} menit`;

    kartu.appendChild(judul);
    kartu.appendChild(durasi);
    fragment.appendChild(kartu);
  });

  daftar.appendChild(fragment);
}

async function muatData() {
  aturState("loading", "Memuat data...");
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    const data = await ambilMateri();

    if (data.length === 0) {
      aturState("empty", "Tidak ada materi tersedia.");
    } else {
      renderMateri(data);
      aturState("success", "Materi berhasil dimuat.");
    }
  } catch (error) {
    console.error("Detail Error:", error);
    
    let pesanUser = "Terjadi kesalahan saat memuat data.";
    if (error instanceof SyntaxError) {
      pesanUser = "Format data rusak (JSON Invalid).";
    } else if (error.message.includes("404")) {
      pesanUser = "File data tidak ditemukan (Error 404).";
    } else if (error.message.includes("Failed to fetch")) {
      pesanUser = "Koneksi ke server terputus atau server mati.";
    }
    
    aturState("error", pesanUser);
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener("click", muatData);
tombolCobaLagi.addEventListener("click", muatData);
