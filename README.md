
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
Redis cache example

```bash
curl --location --request GET 'http://localhost:3000/user/ipInfo?ipAddress=52.178.167.109'
```

