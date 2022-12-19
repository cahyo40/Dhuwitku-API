# Rest Api buat aplikasi Dhuwitku

**menggunakan node js, express js, mysql, Jwt dengan enkripsi dari bcrypt**

- [Auth](https://github.com/cahyo40/Dhuwitku-API#auth)
  - [Login](https://github.com/cahyo40/Dhuwitku-API#login)
  - [Register](https://github.com/cahyo40/Dhuwitku-API#register)
- [Kategori](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Fetch](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Create](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Delete](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Update](https://github.com/cahyo40/Dhuwitku-API#kategori)
  - [Filter](https://github.com/cahyo40/Dhuwitku-API#kategori)
- [Keuangan](https://github.com/cahyo40/Dhuwitku-API#kategori)
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

### Login

**penggunaannya :**

[base_url/login](https://base_url/login)

method: **_POST_**

**request**
| name|type|
|-----|----|
|email|string|
|password|string|

_contoh request untuk login_

```json
{
  "email": "mail@mail.com",
  "password": "password"
}
```

**response**

untuk response akan menghasilkan data berupa token dari JWT.

berikut contoh response dari login

```json
{
  "message": "Login Successfully",
  "token": "Token"
}
```

### Register

**penggunaannya :**

[base_url/register](https://base_url/register)

method: **_POST_**

**request**
| name | type |
| -------- | ------ |
| email | string |
| name | string |
| username | string |
| password | string |

_contoh request untuk register_

```json
{
  "email": "mail@mail.com",
  "name": "dhuwitku",
  "username": "dhuwitkuu",
  "password": "password"
}
```

**response**

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

## Kategori

penggunaan dasar

| fungsi | method | url    |
| ------ | ------ | ------ |
| fetch  | GET    | `/`    |
| create | POST   | `/`    |
| update | PATCH  | `/:id` |
| delete | DELETE | `/:id` |

## Kategori

penggunaan dasar
