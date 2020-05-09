
# JWT Authentication Example

JWT - BCTRPY Node.js

## Request / Response

Register a user successfully

```bash
curl --location --request POST 'http://localhost:3000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "eroltutumlu",
    "email": "eroltutumlu@gmail.com",
    "password": "erol"
}'
```

Generate a JWT token if user/pass matched

```bash
curl --location --request GET 'http://localhost:3000/user/authenticate?username=eroltutumlu&password=erol'
}'
```
Get profil Secure API

```bash
curl --location --request GET 'http://localhost:3000/user/profil' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjZkYzZjOTlmYzFlMzY1NGI1NzQ2NiIsImVtYWlsIjoiZXJvbHR1dHVtbHVAZ21haWwuY29tIiwiaWF0IjoxNTg5MDQ0NjkwLCJleHAiOjE1ODkwNDQ3NTB9.fYSCDLjTuVhJJCQQBM3T8f2JomzQmM3KV5IUi5N8mrQ'
```

