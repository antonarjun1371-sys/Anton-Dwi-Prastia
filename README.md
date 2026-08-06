# Undangan Digital Pernikahan Premium | Anton & Sri

Aplikasi Undangan Digital Pernikahan modern, elegan, dan responsif built with React, Vite, Tailwind CSS, dan Motion.

## 🚀 Fitur Utama
- **Desain Premium & Responsive**: Tampilan elegan khas pernikahan Jawa/Modern.
- **Buka Sampul Interaktif**: Sampul undangan dengan musik latar (*Background Music*).
- **Hitung Mundur (*Countdown Timer*)**: Menuju hari H pernikahan (10 September 2026).
- **Cerita Cinta (*Love Story*)**: Timeline perjalanan cinta pasangan.
- **Lokasi & Peta**: Integrasi Google Maps & Kalender Google untuk Akad dan Resepsi.
- **Amplop Digital & Kado**: Fitur salin nomor rekening BCA & Mandiri serta kirim kado.
- **Buku Tamu & Ucapan**: Fitur kirim ucapan doa dan konfirmasi kehadiran (RSVP).
- **Generator Link Tamu Khusus**: Buat link undangan personal untuk nama tamu tertentu.
- **Panel Edit Manual (Foto & Font)**: Ubah foto dan font kaligrafi secara instan.

---

## 💻 Cara Menjalankan di Lokal (Development)

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/USERNAME/REPO_NAME.git
   cd REPO_NAME
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server lokal**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser Anda.

---

## 🌐 Panduan Hosting Gratis di Cloudflare Pages

1. **Upload Kode ke GitHub**:
   - Buat repository baru di [GitHub](https://github.com/new) (contoh: `undangan-anton-sri`).
   - Push kode project ke GitHub repository tersebut:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Undangan Anton & Sri"
     git branch -M main
     git remote add origin https://github.com/USERNAME/undangan-anton-sri.git
     git push -u origin main
     ```

2. **Deploy di Cloudflare Pages**:
   - Buka Dashboard [Cloudflare](https://dash.cloudflare.com/).
   - Masuk ke menu **Workers & Pages** -> Klik tombol **Create application** -> Pilih tab **Pages**.
   - Pilih **Connect to Git** dan hubungkan dengan akun GitHub Anda.
   - Pilih repository `undangan-anton-sri`.
   - Atur **Build Settings**:
     - **Framework preset**: `Vite`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node.js Version**: `18` atau `20` (opsional)
   - Klik **Save and Deploy**.

3. **Selesai!**
   Cloudflare akan secara otomatis memproses *build* dan memberikan domain gratis seperti `undangan-anton-sri.pages.dev` yang siap disebarkan ke para tamu undangan.
