# API

## POST /login
### Request
```json
{
    "username": "franek123"
}
```

### Response
#### 200 OK
User data with ID.
```json
{
    "id": 1,
    "username": "franek123",
    // other user data if necessary
}
```
#### 404 NOT FOUND
If there is no user with this username.

## POST /users/:id/routes
Route data required to create new one (only with start data).
### Request
```json
{
    "startLocation": {
        "latitude": 12.34,
        "longitude": 32.10,
    },
    "transportationMode": "BUS",
    "startDate": "2011-10-05T14:48:00.000Z",
}
```

### Response
#### 201 CREATED
Route data.
```json
{
    // route data
}
```

#### 400 BAD REQUEST
If route data is incorrect.

#### 404 NOT FOUND
If there is no user with this id.

## PUT /users/:id/routes/:id
End route
### Request
```json
{
    "endLocation": {
        "latitude": 12.34,
        "longitude": 32.10,
    },
}
```

### Response
#### 200 OK
Route data.
```json
{
    // route data
}
```

#### 400 BAD REQUEST
If route data is incorrect.

#### 404 NOT FOUND
If there is no user with this id or no route with this id.

## GET /users/:id/active-route
### Request

### Response
#### 200 OK
Get data of the route that is active.
```json
{
    // route data
}
```

#### 400 BAD REQUEST
If there is no user with this ID.

#### 404 NOT FOUND
If there is no active route

## GET /users/:id/leaderboard
### Query params (GET)
```
time="today" | "week" | "month"
```
### Request

### Response
#### 200 OK
Leaderboard - user data, position in the leaderboard and aggregated route data.
Everything needs to be calculated based on user's friends list and current day
If user doesn't have any friends, just send their data.
(?) If some users have no routes at all for the time period requested, place them at the end of the list (it may be sorted by name asc, whatever).
```json
{
    "leaderboard": [
        {
            "position": 1,
            "id": 1,
            "username": "franek123",
            "distance": 5.2, // kilometers?
            "co2": 123, // kilograms?
            "co2PerKilometer": 23.65,
        },
        {
            "position": 2,
            "id": 17,
            "username": "epic",
            "distance": 4.2, //  kilometers?
            "co2": 123, // kilograms?
            "co2PerKilometer": 29.28,
        },

    ]
}
```

#### 400 BAD REQUEST
If there is no user with this ID.
