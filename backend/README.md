# Backend - CineMatch (Next.js API)

Backend ini dibangun menggunakan Next.js dan berfungsi sebagai REST API untuk aplikasi CineMatch, yaitu sistem pemesanan tiket bioskop berbasis web.

## Fungsi Utama
1. Menyediakan API autentikasi untuk registrasi dan login
2. Menyediakan data film dan jadwal tayang
3. Menangani proses pemesanan tiket
4. Menyediakan data kursi untuk menghindari double booking
5. Menangani proses pembayaran dan pembuatan e-ticket
6. Mengirim data ke frontend dalam format JSON

## Tech Stack
1. Next.js
2. Node.js
3. Prisma ORM
4. MySQL
5. Railway
6. Vercel

## Struktur Penting
1. `app/api` → Routing endpoint API
2. `app/api/auth` → Endpoint autentikasi (login & registrasi)
3. `app/api/films` → Endpoint data film dan jadwal
4. `app/api/bookings` → Endpoint pemesanan tiket
5. `app/api/seats` → Endpoint data kursi
6. `app/api/payment` → Endpoint pembayaran
7. `app/api/e-ticket` → Endpoint e-ticket
8. `prisma/schema.prisma` → Struktur database dan model
9. `lib/ → Utility` dan konfigurasi database / helper

## Gambaran API
API yang digunakan terdiri dari beberapa bagian utama:
1. API Autentikasi untuk login dan registrasi
2. API Film untuk menampilkan data film dan jadwal tayang
3. API Pemesanan sebagai inti sistem untuk booking tiket
4. API Kursi untuk menampilkan ketersediaan kursi dan mencegah double booking
5. API Pembayaran untuk menyelesaikan transaksi
6. API E-Ticket untuk menampilkan tiket digital setelah pembayaran berhasil

## Database
Data yang disimpan ke database meliputi:
1. Data user saat registrasi
2. Data pemesanan saat user melakukan booking tiket
Sedangkan API lain seperti:
1. data film
2. data jadwal
3. data kursi
Digunakan untuk mengambil dan menampilkan data, tanpa harus selalu menyimpan semuanya ke database.

## Koneksi Database
CineMatch menggunakan MySQL berbasis cloud melalui Railway. Database tersebut dihubungkan dengan backend Next.js menggunakan Prisma ORM melalui environment variable DATABASE_URL, sehingga data dapat diakses secara online saat aplikasi di-host di Vercel.

## Setup Project
1. Install dependency
```
npm install
```
2. Copy file environment
```
cp .env.example .env
```
3. Setup database di .env
```
DATABASE_URL="mysql://username:password@host:port/database"
```
4. Generate Prisma Client
```
npx prisma generate
```
5. Jalankan migration
```
npx prisma migrate dev
```
6. Jalankan server
```
npm run dev
```
## Base URL
```
http://localhost:3000/api
```
## Endpoint (Awal)
### Auth
```
POST /auth/register
```
Mendaftarkan user baru
```
POST /auth/login
```
Login user
### Film
```
GET /films
```
Mengambil data film
```
GET /films/:id/schedules
```
Mengambil jadwal tayang berdasarkan film
### Booking
```
POST /bookings
```
### Seats
```
GET /seats
```
### Payment
```
POST /payment
```
### E-Ticket
```
GET /e-ticket/:bookingId
```

## Catatan
1. Semua response menggunakan format JSON
2. Validasi request dilakukan pada setiap endpoint
3. Logic utama dipisahkan dari handler API agar kode lebih rapi dan mudah dikembangkan
4. Sistem kursi harus memastikan tidak terjadi double booking
5. Database diakses menggunakan Prisma ORM