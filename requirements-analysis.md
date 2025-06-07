# Analisis Kebutuhan Toko Online Restoran

## Halaman Utama
1. **Header**
   - Logo restoran
   - Menu navigasi (Home, Menu, Tentang Kami, Kontak)
   - Ikon keranjang belanja dengan jumlah item

2. **Daftar Makanan**
   - Tampilan grid/list makanan
   - Setiap item makanan memiliki:
     - Gambar makanan
     - Nama makanan
     - Harga
     - Deskripsi singkat
     - Tombol "Tambah ke Keranjang"
     - Tombol "Lihat Detail"

3. **Popup Detail Makanan**
   - Gambar makanan yang lebih besar
   - Nama makanan
   - Deskripsi lengkap
   - Harga
   - Opsi jumlah
   - Tombol "Tambah ke Keranjang"
   - Tombol "Tutup"

4. **Keranjang Belanja**
   - Tampilan mini di header (ikon dengan jumlah item)
   - Tampilan dropdown/sidebar saat diklik:
     - Daftar item yang dipilih
     - Jumlah masing-masing item
     - Subtotal per item
     - Total harga
     - Tombol "Checkout"
     - Tombol "Lanjut Belanja"

5. **Footer**
   - Informasi kontak restoran
   - Jam operasional
   - Link media sosial
   - Copyright

## Halaman Checkout
1. **Ringkasan Pesanan**
   - Daftar item yang dipesan
   - Jumlah masing-masing item (dengan opsi update)
   - Harga per item
   - Subtotal per item
   - Total harga keseluruhan

2. **Pemilihan Waktu Pesanan**
   - Pilihan hari (dropdown atau date picker)
   - Pilihan jam (dropdown atau time picker)

3. **Informasi Pelanggan**
   - Nama
   - Alamat
   - Nomor telepon
   - Email
   - Catatan tambahan

4. **Metode Pembayaran**
   - Opsi pembayaran (untuk simulasi saja)

5. **Tombol Submit**
   - Tombol untuk menyelesaikan pesanan
   - Setelah submit, keranjang belanja menjadi kosong

## Fungsionalitas JavaScript
1. **Manajemen Keranjang Belanja**
   - Menambahkan item ke keranjang
   - Mengupdate jumlah item
   - Menghapus item dari keranjang
   - Menghitung total harga
   - Menyimpan data keranjang di localStorage

2. **Popup Detail Makanan**
   - Menampilkan popup saat tombol "Lihat Detail" diklik
   - Menutup popup saat tombol "Tutup" diklik

3. **Halaman Checkout**
   - Mengupdate jumlah item dan total harga
   - Validasi form
   - Menangani submit pesanan
   - Mengosongkan keranjang setelah submit

## Data yang Diperlukan
1. **Data Makanan**
   - ID
   - Nama
   - Gambar
   - Deskripsi singkat
   - Deskripsi lengkap
   - Harga
   - Kategori (opsional)

2. **Data Keranjang**
   - ID makanan
   - Jumlah
   - Harga per item
   - Subtotal

3. **Data Pesanan**
   - Data keranjang
   - Informasi pelanggan
   - Waktu pesanan (hari dan jam)
   - Total harga

