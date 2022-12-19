# Rest Api buat aplikasi Dhuwitku

**menggunakan node js, express js, mysql, Jwt dengan enkripsi dari bcrypt**

- [Auth](https://github.com/cahyo40/Dhuwitku-API#auth)
  - [Login](https://github.com/cahyo40/Dhuwitku-API#login)
  - [Register](https://github.com/cahyo40/Dhuwitku-API#register)
- [Kategori](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Fetch](https://github.com/cahyo40/Dhuwitku-API#fetch-kategori)
  - [Create](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Delete](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Update](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Filter](https://github.com/cahyo40/Dhuwitku-API#kategori)
- [Keuangan](https://github.com/cahyo40/Dhuwitku-API#keuangan)
  - [Fetch](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Fetch_by_Kategori](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Fetch_by_Tanggal](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Create](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Update](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Delete](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Total_Income_Outcome](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Total_Income_Outcome_Today](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Total_Income_Outcome_AWeek](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Total_Income_Outcome_By_Tanggal](https://github.com/cahyo40/Dhuwitku-API#kategori)

## Auth

penggunaan dasar

| fungsi   | method | url         | request                      |
| -------- | ------ | ----------- | ---------------------------- |
| login    | POST   | `/login`    | email,password               |
| register | POST   | `/register` | email,name,username,password |

### Login

<details>

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

| fungsi            | method | url                    | request                                                             |
| ----------------- | ------ | ---------------------- | ------------------------------------------------------------------- |
| fetch             | GET    | `/keuangan/`           | ~                                                                   |
| fetch by kategori | POST   | `/keuangan/filter`     | kategori_id                                                         |
| fetch by tanggal  | POST   | `/keuangan/range`      | start_date,end_date                                                 |
| create            | POST   | `/keuangan/`           | judul,deskripsi,uang,pengeluaran,kategori_id,email_user             |
| update            | PATCH  | `/keuangan/:id`        | id_keuangan,judul,deskripsi,uang,pengeluaran,kategori_id,email_user |
| delete            | DELETE | `/keuangan/:id`        | id_keuangan                                                         |
| total             | GET    | `/keuangan/total`      | ~                                                                   |
| total hari ini    | GET    | `/keuangan/totalToday` | ~                                                                   |
| total minggu ini  | GET    | `/keuangan/totalWeek`  | ~                                                                   |
| total by tanggal  | GET    | `/keuangan/totalByTgl` | tanggal                                                             |
