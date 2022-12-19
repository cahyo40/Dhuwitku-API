# Rest Api buat aplikasi Dhuwitku

**menggunakan node js, express js, mysql**

## Auth

penggunaan dasar

### Login

**penggunaannya :**

[base_url/login]("https://base_url/login")

**requestnya:**

- email
- password

**response**

```json
{
  "message": "Login Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhaHlvcmFjaGVyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaXlvaG9vIiwiaWF0IjoxNjcxNDYzMzA1LCJleHAiOjE2NzIwNjgxMDV9.7wJFKBlNP__9bwXu-JLYRXMj0hDFzXYN2gZNHNDf3U0"
}
```
