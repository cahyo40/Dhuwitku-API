# Rest Api buat aplikasi Dhuwitku

**menggunakan node js, express js, mysql**

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

**response**

```json
{
  "message": "Login Successfully",
  "token": "Token"
}
```
