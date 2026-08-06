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

## 🌐 Panduan Deploy ke Cloudflare Pages (Bebas Error "Build Failed")

### 1. Upload Kode ke GitHub
- Buat repository baru di [GitHub](https://github.com/new) (contoh: `undangan-anton-sri`).
- Push semua file project ke GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit - Undangan Anton & Sri"
  git branch -M main
  git remote add origin https://github.com/USERNAME/undangan-anton-sri.git
  git push -u origin main
  ```

---

### 2. Pengaturan Deploy di Cloudflare Pages
- Buka Dashboard [Cloudflare](https://dash.cloudflare.com/).
- Masuk ke menu **Workers & Pages** -> Klik **Create application** -> Tab **Pages** -> **Connect to Git**.
- Pilih repository `undangan-anton-sri`.
- **Atur Build Settings berikut (SANGAT PENTING)**:
  - **Framework preset**: `Vite`
  - **Build command**: `npm run build:client` *(Gunakan ini agar Cloudflare hanya mem-build aset frontend static)*
  - **Build output directory**: `dist`

---

### ⚡ CARA MEMPERBAIKI ERROR WRANGLER "Failed: error occurred while running deploy command":

Error ini terjadi di Cloudflare Pages karena 2 hal:
1. **Build Command menjalankan script backend server Node.js** (`npm run build` menjalankan `esbuild server.ts` yang menghasilkan file server CJS, sehingga Wrangler bingung saat mengupload aset static).
2. **Versi Node.js di Cloudflare masih versi lama** (Vite 6 membutuhkan Node 20+).

**Solusi Langkah demi Langkah (100% Berhasil):**

1. **Ubah Build Command**:
   - Di Dashboard Cloudflare Pages Anda, buka **Settings** -> **Build & deployments**.
   - Klik **Edit configuration**.
   - Ubah **Build command** menjadi: `npm run build:client` (atau `npx vite build`).
   - Ubah **Build output directory** menjadi: `dist`.
   - Klik **Save**.

2. **Tambahkan Environment Variable Node 20**:
   - Di menu **Settings** -> **Environment variables**.
   - Klik **Add variable** (pilih *Production* dan *Preview*):
     - **Variable name**: `NODE_VERSION`
     - **Value**: `20`
   - Klik **Save**.

3. **Re-deploy / Retry Deployment**:
   - Masuk ke tab **Deployments**.
   - Klik **All deployments** -> Pada deployment yang gagal, klik **Manage deployment** -> **Retry deployment**.
   - Proses build akan hijau (Success) dalam hitungan detik!

---

### 3. Selesai!
Aplikasi akan sukses ter-build dan Anda mendapatkan URL publik gratis seperti `https://undangan-anton-sri.pages.dev` yang siap disebarkan ke para tamu undangan.
