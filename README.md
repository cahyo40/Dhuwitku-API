# Rest Api buat aplikasi Dhuwitku

**menggunakan node js, express js, mysql, Jwt dengan enkripsi dari bcrypt**

## Auth

penggunaan dasar

### Login

**penggunaannya :**

[base_url/login]("https://base_url/login")

**request**
| name|type|
|-----|----|
|email|string|
|password|string|

_contoh_

```json
{
  "email": "email",
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
