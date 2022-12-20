# Rest Api buat aplikasi Dhuwitku

**Menggunakan node js, express js, mysql, Jwt dengan enkripsi dari bcrypt**

- [Auth](https://github.com/cahyo40/Dhuwitku-API#auth)
  - [Login](https://github.com/cahyo40/Dhuwitku-API#login)
  - [Register](https://github.com/cahyo40/Dhuwitku-API#register)
- [Kategori](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Fetch](https://github.com/cahyo40/Dhuwitku-API#fetch-kategori)
  - [Create](https://github.com/cahyo40/Dhuwitku-API#create-kategori)
  - [Delete](https://github.com/cahyo40/Dhuwitku-API#delete-kategori)
  - [Update](https://github.com/cahyo40/Dhuwitku-API#update-kategori)
  - [Filter](https://github.com/cahyo40/Dhuwitku-API#filter-kategori)
- [Keuangan](https://github.com/cahyo40/Dhuwitku-API#keuangan)
  - [Fetch](https://github.com/cahyo40/Dhuwitku-API#fetch-keuangan)
  - [Fetch_by_Kategori](https://github.com/cahyo40/Dhuwitku-API#fetch-by-kategori)
  - [Fetch_by_Tanggal](https://github.com/cahyo40/Dhuwitku-API#fetch-by-tanggal)
  - [Create](https://github.com/cahyo40/Dhuwitku-API#create-keuangan)
  - [Update](https://github.com/cahyo40/Dhuwitku-API#update-keuangan)
  - [Delete](https://github.com/cahyo40/Dhuwitku-API#delete-keuangan)
  - [Total_Income_Outcome](https://github.com/cahyo40/Dhuwitku-API#total-pemasukan-dan-pengeluaran-hari-ini--minggu-ini)
  - [Total_Income_Outcome_Today](https://github.com/cahyo40/Dhuwitku-API#total-pemasukan-dan-pengeluaran-hari-ini--minggu-ini)
  - [Total_Income_Outcome_AWeek](https://github.com/cahyo40/Dhuwitku-API#total-pemasukan-dan-pengeluaran-hari-ini--minggu-ini)
  - [Total_Income_Outcome_By_Tanggal](https://github.com/cahyo40/Dhuwitku-API#total-pemasukan-dan-pengeluaran-by-tanggal)

## Auth

penggunaan dasar

| fungsi   | method | url         | request                      |
| -------- | ------ | ----------- | ---------------------------- |
| login    | POST   | `/login`    | email,password               |
| register | POST   | `/register` | email,name,username,password |

### Login

<details>

<summary>Contoh request dan response</summary>

_contoh request_

```json
{
  "email": "mail@mail.com",
  "password": "password"
}
```

_response_

```json
{
  "message": "Login Successfully",
  "token": "Token"
}
```

</details>

### Register

<details>

<summary>Contoh request response</summary>

_contoh request_

```json
{
  "email": "mail@mail.com",
  "name": "dhuwitku",
  "username": "dhuwitkuu",
  "password": "password"
}
```

_response_

```json
{
  "message": "Created user successfully",
  "data": {
    "email": "mail@mail.com",
    "name": "name",
    "username": "username",
    "password": "password hasil enkripsi",
    "createdAt": "2022-12-19T15:32:17.000Z",
    "updatedAt": "2022-12-19T15:32:17.000Z"
  }
}
```

</details>

## Kategori

penggunaan dasar

| fungsi          | method | url                | request               |
| --------------- | ------ | ------------------ | --------------------- |
| fetch           | GET    | `/kategori/`       | ~                     |
| create          | POST   | `/kategori/`       | nama_kategori,tipe    |
| update          | PATCH  | `/kategori/:id`    | id,nama_kategori,tipe |
| delete          | DELETE | `/kategori/:id`    | id                    |
| filter kategori | POST   | `/kategori/filter` | tipe                  |

### Fetch Kategori

<details>

<summary>Contoh response</summary>

_response_

```json
{
  "message": "Semua Kategori",
  "item_count": 1,
  "kategori": [
    {
      "id_kategori": "id_kategori",
      "nama_kategori": "makan",
      "tipe": "pengeluaran",
      "createdAt": "2022-12-19T14:57:32.000Z",
      "updatedAt": "2022-12-19T14:57:32.000Z"
    }
  ]
}
```

</details>

### Create Kategori

<details>

<summary>Contoh request dan response</summary>

_contoh request_

```json
{
  "nama_kategori": "makan",
  "tipe": "pengeluaran"
}
```

_response_

```json
{
  "message": "Kategori sukses ditambahkan"
}
```

</details>

### Update Kategori

<details>

<summary>Contoh request  dan response</summary>

_request_

```json
{
  "nama_kategori": "makan",
  "tipe": "pengeluaran"
}
```

_response_

```json
{
  "message": "Kategori sukses diperbarui"
}
```

</details>

### Delete Kategori

<details>

<summary>Contoh response</summary>

_response_

```json
{
  "message": "Kategori sukses dihapus"
}
```

</details>

### Filter Kategori

<details>

<summary>Contoh request response</summary>

_request_

```json
{
  "tipe": "pemasukan"
}
```

_response_

```json
{
  "message": "Semua Kategori",
  "item_count": 1,
  "kategori": [
    {
      "id_kategori": "id_kategori",
      "nama_kategori": "makan",
      "tipe": "pengeluaran",
      "createdAt": "2022-12-19T14:57:32.000Z",
      "updatedAt": "2022-12-19T14:57:32.000Z"
    }
  ]
}
```

</details>

## Keuangan

penggunaan dasar

**Headers Authorization: Bearer Token**

| fungsi            | method | url                    | request                                                    |
| ----------------- | ------ | ---------------------- | ---------------------------------------------------------- |
| fetch             | GET    | `/keuangan/`           | ~                                                          |
| fetch by kategori | POST   | `/keuangan/filter`     | kategori_id                                                |
| fetch by tanggal  | POST   | `/keuangan/range`      | start_date,end_date                                        |
| create            | POST   | `/keuangan/`           | judul,deskripsi,uang,pengeluaran,kategori_id,email_user    |
| update            | PATCH  | `/keuangan/:id`        | id,judul,deskripsi,uang,pengeluaran,kategori_id,email_user |
| delete            | DELETE | `/keuangan/:id`        | id                                                         |
| total             | GET    | `/keuangan/total`      | ~                                                          |
| total hari ini    | GET    | `/keuangan/totalToday` | ~                                                          |
| total minggu ini  | GET    | `/keuangan/totalWeek`  | ~                                                          |
| total by tanggal  | GET    | `/keuangan/totalByTgl` | tanggal                                                    |

### Fetch Keuangan

<details>

<summary>Contoh response </summary>

_response_

```json
{
  "message": "Semua data keuangan",
  "item_count": 1,
  "email": "email@mail.com",
  "keuangan": [
    {
      "id": "id",
      "judul": "Mie Ayam kuah soto",
      "deskripsi": "enak",
      "uang": 15000,
      "pengeluaran": 1,
      "kategori_id": "kategori_id",
      "tanggal": "2022-12-19",
      "email_user": "email@mail.com",
      "createdAt": "2022-12-19T13:57:55.000Z",
      "updatedAt": "2022-12-19T13:57:55.000Z"
    }
  ]
}
```

</details>

### Fetch by Kategori

<details>

<summary>Contoh request dan response </summary>

_request_

```json
{
  "kategori_id": "id"
}
```

_response_

```json
{
  "message": "Semua data keuangan",
  "item_count": 1,
  "email": "email@mail.com",
  "keuangan": [
    {
      "id": "id",
      "judul": "Mie Ayam kuah soto",
      "deskripsi": "enak",
      "uang": 15000,
      "pengeluaran": 1,
      "kategori_id": "kategori_id",
      "tanggal": "2022-12-19",
      "email_user": "email@mail.com",
      "createdAt": "2022-12-19T13:57:55.000Z",
      "updatedAt": "2022-12-19T13:57:55.000Z"
    }
  ]
}
```

</details>

### Fetch by Tanggal

<details>

<summary>Contoh request dan response </summary>

_request_

```json
{
  "start_date": "2022-12-10",
  "end_date": "2022-12-25"
}
```

_response_

```json
{
  "message": "Semua data keuangan",
  "item_count": 1,
  "email": "email@mail.com",
  "keuangan": [
    {
      "id": "id",
      "judul": "Mie Ayam kuah soto",
      "deskripsi": "enak",
      "uang": 15000,
      "pengeluaran": 1,
      "kategori_id": "kategori_id",
      "tanggal": "2022-12-19",
      "email_user": "email@mail.com",
      "createdAt": "2022-12-19T13:57:55.000Z",
      "updatedAt": "2022-12-19T13:57:55.000Z"
    }
  ]
}
```

</details>

### Create Keuangan

<details>

<summary>Contoh request dan response </summary>

_request_

```json
{
  "judul": "Mie Ayam kuah soto",
  "deskripsi": "mie ayam",
  "uang": 15000,
  "pengeluaran": 0,
  "kategori_id": "kategori_id",
  "email_user": "mail@mail.com"
}
```

`NOTE: pengeluaran berisi 0 atau 1, 0 untuk pemasukan dan 1 untuk pengeluaran`

_response_

```json
{
  "message": "Keuangan sukses ditambahkan"
}
```

</details>

### Update Keuangan

<details>

<summary>Contoh request dan response </summary>

_request_

```json
{
  "judul": "Mie Ayam kuah soto",
  "deskripsi": "mie ayam",
  "uang": 15000,
  "pengeluaran": 0,
  "kategori_id": "kategori_id",
  "email_user": "mail@mail.com"
}
```

`NOTE: pengeluaran berisi 0 atau 1, 0 untuk pemasukan dan 1 untuk pengeluaran`

_response_

```json
{
  "message": "Keuangan sukses diperbarui"
}
```

</details>

### Delete Keuangan

<details>

<summary>Contoh response </summary>

_response_

```json
{
  "message": "Keuangan sukses di hapus"
}
```

</details>

### Total Pemasukan dan Pengeluaran, Hari ini & Minggu ini

<details>

<summary>Contoh response </summary>

_response_

```json
{
  "total": {
    "pemasukan": 30000,
    "pengeluaran": 23000
  }
}
```

</details>

### Total Pemasukan dan Pengeluaran by Tanggal

<details>

<summary>Contoh request dan response </summary>

_request_

```json
{
  "tanggal": "2022-12-19"
}
```

_response_

```json
{
  "tanggal": "2022-12-19",
  "total": {
    "pemasukan": 8000,
    "pengeluaran": 25000
  }
}
```

</details>
