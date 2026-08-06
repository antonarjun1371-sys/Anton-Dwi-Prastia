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
  - **Framework preset**: `Vite` (atau `None`)
  - **Build command**: `npx vite build` (atau `npm run build`)
  - **Build output directory**: `dist`

---

### ⚡ CARA MEMPERBAIKI ERROR "Latest Build Failed" DI CLOUDFLARE PAGES:

Jika Anda mengalami error **`Latest build failed`**, penyebab umumnya adalah **versi Node.js bawaan Cloudflare Pages yang terlalu lama** (Vite 6 butuh Node 20+).

**Solusi Perbaikan (Ikuti Langkah Ini):**

1. Di Dashboard Cloudflare Pages project Anda, masuk ke tab **Settings** -> **Environment variables**.
2. Klik **Add variable** (pada section *Production* & *Preview*):
   - **Variable name**: `NODE_VERSION`
   - **Value**: `20`
3. Klik **Save**.
4. Masuk ke tab **Deployments** -> Klik **Retry deployment** (atau **Manage deployment** -> **Retry**).

---

### 3. Selesai!
Aplikasi akan sukses ter-build dan Anda mendapatkan URL publik gratis seperti `https://undangan-anton-sri.pages.dev` yang siap disebarkan ke para tamu undangan.
