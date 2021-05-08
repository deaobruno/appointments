# Appointment Registration
Appointment registration Rest API

## Install Requirements:
* docker 19 or latest
* docker-compose 1.27 or latest

#### Commands:

##### Run application:
```shell script
$ docker-compose up \\ Runs docker-compose with application image and its requirements
```

## How to use

### /appointment

#### GET
##### Summary

Get all appointments

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 500 | Internal server error |  |

### Models

#### Appointment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | date | Full appointment date (ISO8601 pattern) _Example:_ `2021-05-07` | Yes |
| start | string | Appointment starting time (ISO8601 pattern) _Example:_ `12:00` | Yes |
| end | string | Appointment ending time (ISO8601 pattern) _Example:_ `13:00` | Yes |
| user_id | string | User who registered the appointment _Example:_ `6090e362e0db8a1dcc78a2de` | Yes |

### Example:
* `[GET] http://0.0.0.0:8000/appointment`
```json
[
  {
    "_id": "6095d3396760e43d4c9e5843",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  },
  {
    "_id": "6095d57fc33d36100c9ff1d8",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  }
]
```

### /appointment/{id}

#### GET
##### Summary

Get appointment by {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the appointment ID | Yes | number |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### Appointment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | date | Full appointment date (ISO8601 pattern) _Example:_ `2021-05-07` | Yes |
| start | string | Appointment starting time (ISO8601 pattern) _Example:_ `12:00` | Yes |
| end | string | Appointment ending time (ISO8601 pattern) _Example:_ `13:00` | Yes |
| user_id | string | User who registered the appointment | Yes |

### Example:
* `[GET] http://0.0.0.0:8000/appointment/6095d57fc33d36100c9ff1d8`
```json
{
  "_id": "6095d57fc33d36100c9ff1d8",
  "start": "15:00",
  "end": "16:00",
  "date": "2021-05-07T00:00:00.000Z",
  "user_id": "6090e362e0db8a1dcc78a2de"
}
```

### /appointment

#### POST
##### Summary

Create an appointment

##### Payload

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | body | Full appointment date (ISO8601 pattern) | Yes | date |
| start | body | Appointment starting time (ISO8601 pattern) | Yes | string |
| end | body | Appointment ending time (ISO8601 pattern) | Yes | string |
| user_id | body | User who registered the appointment | Yes | string |

### Example:
```json
{
  "success": "Appointment created successfully.",
  "data": {
    "_id": "6095e47d4327af1fc469e54d",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  }
}
```

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 400 | Bad request |  |
| 409 | Conflict |  |
| 500 | Internal server error |  |

### Models

#### Appointment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | date | Full appointment date (ISO8601 pattern) _Example:_ `2021-05-07` | Yes |
| start | string | Appointment starting time (ISO8601 pattern) _Example:_ `12:00` | Yes |
| end | string | Appointment ending time (ISO8601 pattern) _Example:_ `13:00` | Yes |
| user_id | string | User who registered the appointment _Example:_ `6090e362e0db8a1dcc78a2de` | Yes |

### Example:
* `[POST] http://0.0.0.0:8000/appointment`
```json
{
  "_id": "6095d57fc33d36100c9ff1d8",
  "start": "15:00",
  "end": "16:00",
  "date": "2021-05-07T00:00:00.000Z",
  "user_id": "6090e362e0db8a1dcc78a2de"
}
```

### /appointment/{id}

#### PUT
##### Summary

Update an appointment passing it's {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the appointment ID | Yes | number |

##### Payload

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | body | Full appointment date (ISO8601 pattern) | Yes | date |
| start | body | Appointment starting time (ISO8601 pattern) | Yes | string |
| end | body | Appointment ending time (ISO8601 pattern) | Yes | string |
| user_id | body | User who registered the appointment | Yes | string |

### Example:
```json
{
  "id": "",
  "start": "15:00",
  "end": "16:00",
  "date": "2021-05-07T00:00:00.000Z",
  "user_id": "6090e362e0db8a1dcc78a2de"
}
```

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### Appointment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | date | Full appointment date (ISO8601 pattern) _Example:_ `2021-05-07` | No |
| start | string | Appointment starting time (ISO8601 pattern) _Example:_ `12:00` | No |
| end | string | Appointment ending time (ISO8601 pattern) _Example:_ `13:00` | No |
| user_id | string | User who registered the appointment _Example:_ `6090e362e0db8a1dcc78a2de` | No |

### Example:
* `[PUT] http://0.0.0.0:8000/appointment/6095d57fc33d36100c9ff1d8`
```json
{
  "success": "Appointment updated successfully.",
  "data": {
    "_id": "6095e47d4327af1fc469e54d",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  }
}
```

### /appointment/{id}

#### DELETE
##### Summary

Delete an appointment passing it's {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the appointment ID | Yes | number |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Example:
* `[DELETE] http://0.0.0.0:8000/appointment/6095d57fc33d36100c9ff1d8`
```json
{
  "success": "Appointment deleted successfully."
}
```

### /appointment/user/{id}

#### GET
##### Summary

Get appointments by user {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the user ID | Yes | number |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Complete analysis | [Appointment](#appointment) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### Appointment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | Appointment ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| date | date | Full appointment date (ISO8601 pattern) _Example:_ `2021-05-07` | Yes |
| start | string | Appointment starting time (ISO8601 pattern) _Example:_ `12:00` | Yes |
| end | string | Appointment ending time (ISO8601 pattern) _Example:_ `13:00` | Yes |
| user_id | string | User who registered the appointment | Yes |

### Example:
* `[GET] http://0.0.0.0:8000/appointment/6095d57fc33d36100c9ff1d8`
```json
[
  {
    "_id": "6095d3396760e43d4c9e5843",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  },
  {
    "_id": "6095d57fc33d36100c9ff1d8",
    "start": "15:00",
    "end": "16:00",
    "date": "2021-05-07T00:00:00.000Z",
    "user_id": "6090e362e0db8a1dcc78a2de"
  }
]
```

### /user

#### GET
##### Summary

Get all user

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 500 | Internal server error |  |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | User ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| name | string | User name _Example:_ `John Doe` | Yes |

### Example:
* `[GET] http://0.0.0.0:8000/user`
```json
[
  {
    "_id": "6095d3396760e43d4c9e5843",
    "name": "John Doe"
  },
  {
    "_id": "6095d57fc33d36100c9ff1d8",
    "name": "Joanna Doe"
  }
]
```

### /user/{id}

#### GET
##### Summary

Get user by {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the user ID | Yes | number |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | User ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| name | string | User name _Example:_ `John Doe` | Yes |

### Example:
* `[GET] http://0.0.0.0:8000/user/6095d57fc33d36100c9ff1d8`
```json
{
  "_id": "6095d57fc33d36100c9ff1d8",
  "name": "Joanna Doe"
}
```

### /user

#### POST
##### Summary

Create an user

##### Payload

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ----   |
| name | body       | User name   | Yes      | string |

### Example:
```json
{
  "success": "User created successfully.",
  "data": {
    "_id": "6095e47d4327af1fc469e54d",
    "name": "Joanna Doe"
  }
}
```

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 400 | Bad request |  |
| 409 | Conflict |  |
| 500 | Internal server error |  |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | User ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| name | string | User name _Example:_ `John Doe` | Yes |

### Example:
* `[POST] http://0.0.0.0:8000/user`
```json
{
  "_id": "6095d57fc33d36100c9ff1d8",
  "name": "Joanna Doe"
}
```

### /user/{id}

#### PUT
##### Summary

Update an user passing it's {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the user ID | Yes | number |

##### Payload

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | string | User name _Example:_ `John Doe` | Yes |

### Example:
```json
{
  "id": "",
  "name": "Joanna Doe"
}
```

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | number | User ID _Example:_ `6095d57fc33d36100c9ff1d8` | Yes |
| name | string | User name _Example:_ `John Doe` | No |

### Example:
* `[PUT] http://0.0.0.0:8000/user/6095d57fc33d36100c9ff1d8`
```json
{
  "success": "User updated successfully.",
  "data": {
    "_id": "6095e47d4327af1fc469e54d",
    "name": "Joanna Doe"
  }
}
```

### /user/{id}

#### DELETE
##### Summary

Delete an user passing it's {id}

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | params | Pass the user ID | Yes | number |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 400 | Bad request |  |
| 500 | Internal server error |  |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | date | Full user date (ISO8601 pattern) _Example:_ `2021-05-07` | Yes |
| name | string | User name _Example:_ `John Doe` | Yes |

### Example:
* `[DELETE] http://0.0.0.0:8000/user/6095d57fc33d36100c9ff1d8`
```json
{
  "success": "User deleted successfully."
}
```
## Project Organization
### Third Part Packages
* [github.com/expressjs/body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
* [github.com/expressjs/express](https://github.com/expressjs/express) - Web framework for Node.js
* [github.com/express-validator/express-validator](https://github.com/express-validator/express-validator) - An express.js middleware for validator.js
* [github.com/Automattic/mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling for Node.js
* [github.com/eslint/eslint](https://github.com/eslint/eslint) - Find and fix problems in your JavaScript code
* [github.com/remy/nodemon](https://github.com/remy/nodemon) - Monitor for changes in Node.js applications and automatically restart the server

### Directory Structure
```
   ├── app
   │   ├── controllers
   │   │   ├── appointment.js
   │   │   └── user.js
   │   └── middlewares
   │   │   ├── appointmentValidator.js
   │   │   └── userValidator.js
   │   └── models
   │       ├── appointment.js
   │       └── user.js
   ├── database
   │   └── db.js
   ├── routes
   │   ├── appointment.js
   │   ├── index.js
   │   └── user.js
   ├── .eslintrc.json
   ├── app.js
   ├── docker-compose.yml
   ├── Dockerfile
   ├── package-lock.json
   ├── package.json
   ├── README.md
   └── server.js
```
## About Me

1. [My Github](https://github.com/deaobruno)
