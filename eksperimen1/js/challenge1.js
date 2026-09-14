function cekDiskonBelanja(subTotal) {
  if (subTotal >= 200000) {
    return 0.2;
  } else if (subTotal >= 100000) {
    return 0.1;
  }
  return 0;
}

function cekDiskonMember(status) {
  if (status == "member") {
    return 0.05;
  }
  return 0;
}

function totalBelanja(subTotal, status) {
  if (isNaN(subTotal)) {
    return "Subtotal harus berupa angka";
  }
  if(subTotal <= 0) {
    return "Subtotal tidak boleh negatif";
  }
  let diskon = cekDiskonBelanja(subTotal) + cekDiskonMember(status);
  if (diskon > 0.25) {
    diskon = 0.25;
    console.log("Diskon maksimal adalah 25%");
  }
  return "Total belanja anda adalah: Rp." + (subTotal - subTotal * diskon);
}
