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


# Admin Payments

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

## get user payments

GET /payment/user-payments/:status

```
    status = all | pending | declined | approved

```

## get withdrawal requests

GET /payment/withdrawal-requests/:status

```
    status = all | pending | declined | completed

```

## increase user's hashrate

POST /payment/increase-hash-rate

```
    { newHashRate: Number, userId }

```

## reject hash rate increase request

POST /payment/decline-hash-rate-increase

```
    {
        reason: "We could not verify the funds you sent.",
        userId,
        hashRequestId
    }
```

## change withdrawal status of a request

POST /payment/get-user-payments/:status/:id

```
    status = pending | declined | completed

```
