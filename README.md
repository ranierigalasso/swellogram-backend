# Auth backend server

## Routes

| Method | Path | Description |
|--------|------|-------------|
| `get`  | `/auth/me` | check if i'm logged |
| `post` | `/auth/login` | login |
| `post` | `/auth/signup` | signup |
| `post` | `/auth/logut` | logout |
| `get`  | `/auth/private` | private route for test |

## Login & Signup

this is the following `body` for the `login` and `signup` request;

```json
{
  "username": "demo",
  "password": "demo"
}
```
