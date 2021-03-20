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

# User payments

## claim that user has paid from user

POST /payment/user-claims-payment

```
{ id: user's id,
upgradeType: free | average | standard | retirement | enterprise,
coin: BTC | ETH | DODGE 
}
```
## Request withdrawal

POST /payment/make-withdrawal-request

```
{ amount: Number, cryptoAddress, coin, userId }
```

## Get withdrawal requests

GET /payment/get-withdrawal-requests/:userId
## Get Claimed payments

GET /payment/claimed-payments/:UserId
## Get Claimed payment

GET /payment/claimed-payment/:ClaimedPaymentId


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

# Admin Payments
all endpoints in this category are end points for admin to control the payments of users

## get user payments

GET /admin/payment/user-payments/:status

```
    status = all | pending | declined | approved

```

## get withdrawal requests

GET /admin/payment/withdrawal-requests/:status

```
    status = all | pending | declined | completed

```

## increase user's hashrate

PATCH /admin/payment/increase-hash-rate

```
    { newHashRate: Number, userId }

```

## reject hash rate increase request

PATCH /admin/payment/decline-hash-rate-increase

```
    {
        reason: "We could not verify the funds you sent.",
        hashRequestId
    }
```

## change withdrawal status of a request

PATCH /admin/payment/user-payments/:status/:id

```
    status = pending | declined | completed

```
## change is blocked status of a user

PATCH /admin/change-user-blocked-status/isBlocked=:isBlocked/:id

```
    isBlocked: true | false

```
## get user by id

GET /admin/user/:id

```
    id: user's id

```
## get user's

GET /admin/users
## get user's according to blocked status

GET /users-according-to-blocked-status/isBlocked=:isBlocked
```
    isBlocked: true | false
```

