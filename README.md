# crypto-airdrop

## Start server with hot reload

home http://localhost:4000/api/v1

# User Endpoints

# Authentication

## Register

POST /authentication/register

```

{
    email,
    password,
    refEmail: optional
}
```

## Login

POST /authentication/login

```

{
    email,
    password
}
```

# Payments

## get user payments

GET /admin/get-user-payments/:status

```
    status = all | pending | completed | declined

```

# Admin Endpoints

# Authentication

## login

POST /admin/login

```
{
   email: superadmin@crypto.com,
   password: 123456
}
```
