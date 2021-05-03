# COCO BAMBU API

## Create .env file

    NODE_ENV=
    PORT=
    SECRET=

## Install

    npm install

## Run the app

    npm run start

## Run the tests

    npm run test

# ENDPOINTS

## Login

### Request

`POST /auth/login`

    curl --location --request POST 'http://localhost:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "user": "wagner",
        "pwd": "12345"
    }'

### Response

    {
        "auth": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NTg5ODEwLCJleHAiOjE2MTk1OTAxMTB9.MpgdWUIINuFH7VQCkcejxZfmfn4rklGjyPvm-mT-lT4"
    }

## Logout

### Request

`POST /auth/logout`

    curl --location --request POST 'http://localhost:3000/auth/logout'

### Response

    {
        "auth": false,
        "token": null
    }

## Get user position

### Request

`GET /userPosition`

    curl --location --request GET 'http://localhost:3000/userPosition' \
    --header 'Content-Type: application/json' \
    --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NTg5ODEwLCJleHAiOjE2MTk1OTAxMTB9.MpgdWUIINuFH7VQCkcejxZfmfn4rklGjyPvm-mT-lT4'

### Response

    {
        "checkingAccountAmount": 234,
        "positions": [
            {
                "symbol": "PETR4",
                "amount": 2,
                "currentPrice": 28.44
            },
            {
                "symbol": "SANB11",
                "amount": 3,
                "currentPrice": 40.77
            }
        ],
        "consolidated": 413.19
    }