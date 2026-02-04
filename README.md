# Hiring Platform

Platform rekrutmen berbasis web yang memungkinkan admin untuk mengelola lowongan pekerjaan dan kandidat, serta memungkinkan pengguna untuk melihat dan melamar pekerjaan.

## 📋 Deskripsi

Hiring Platform adalah aplikasi web modern yang dibangun dengan React dan Vite, dirancang untuk menyederhanakan proses rekrutmen. Platform ini menyediakan dua role utama:

- **Admin**: Dapat membuat, mengelola, dan melihat lowongan pekerjaan serta kandidat yang melamar
- **User**: Dapat melihat daftar lowongan pekerjaan, melihat detail pekerjaan, dan melamar posisi

## ✨ Fitur Utama

### Untuk Admin

- 📝 Membuat lowongan pekerjaan baru
- 🔍 Mencari dan memfilter lowongan pekerjaan
- 📊 Melihat daftar kandidat yang melamar
- ✅ Mengelola status aplikasi kandidat

### Untuk User

- 🔎 Melihat daftar lowongan pekerjaan yang tersedia
- 📄 Melihat detail lengkap lowongan pekerjaan
- 📝 Mengisi dan mengirim resume/CV
- 💼 Melamar posisi yang diminati

## 🛠️ Teknologi yang Digunakan

- **React 19** - Library UI
- **Vite** - Build tool dan dev server
- **React Router DOM** - Routing aplikasi
- **Axios** - HTTP client untuk API calls
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Lucide React** - Icon library
- **React Select** - Advanced select components
- **React Datepicker** - Date picker component
- **React Table Library** - Table components

## 📁 Struktur Proyek

```
hiring-platform/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── admin/      # Komponen untuk admin (Navbar, JobLists, Modal, dll)
│   │   ├── user/       # Komponen untuk user (JobItem, JobDetail, Resume, dll)
│   │   └── login/      # Komponen login
│   ├── pages/          # Halaman utama aplikasi
│   │   ├── AdminPage.jsx    # Halaman dashboard admin
│   │   ├── ManagePage.jsx   # Halaman manage kandidat
│   │   └── UserPage.jsx     # Halaman user
│   ├── App.jsx         # Root component dengan routing
│   ├── main.jsx        # Entry point aplikasi
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalasi dan Menjalankan Proyek

### Prerequisites

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Backend API server (default: http://localhost:4000)

### Langkah-langkah Instalasi

1. Clone repository

```bash
git clone https://github.com/Rdhii/hiring-platform-v1.git
cd hiring-platform-v1/hiring-platform
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

4. Buka browser dan akses aplikasi di `http://localhost:5173`

### Perintah Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production secara lokal
- `npm run lint` - Menjalankan ESLint untuk checking code quality

## 🔗 Routing

Aplikasi ini memiliki beberapa route:

| Path                         | Deskripsi                                |
| ---------------------------- | ---------------------------------------- |
| `/`                          | Halaman login                            |
| `/user`                      | Dashboard user untuk melihat lowongan    |
| `/admin`                     | Dashboard admin untuk mengelola lowongan |
| `/admin/jobs/:id/candidates` | Halaman manage kandidat per lowongan     |
| `/resume`                    | Halaman form resume/CV                   |

## 🔌 API Integration

Aplikasi ini berkomunikasi dengan backend API. Pastikan backend API sudah berjalan sebelum menggunakan aplikasi.

### API Endpoints yang Digunakan

- `GET /api/jobs/` - Mendapatkan daftar semua lowongan
- `GET /api/jobs/:id` - Mendapatkan detail lowongan spesifik
- `POST /api/jobs/` - Membuat lowongan baru (admin)
- `GET /api/jobs/:id/candidates` - Mendapatkan daftar kandidat per lowongan

## 🎨 Styling

Proyek ini menggunakan **Tailwind CSS** untuk styling dengan konfigurasi custom. Semua komponen di-styling menggunakan utility classes dari Tailwind untuk konsistensi dan maintainability.

## 📝 License

Proyek ini bersifat private.

## 👤 Author

**Rdhii**

---

⭐ Jika proyek ini bermanfaat, jangan lupa berikan star di repository!!!
