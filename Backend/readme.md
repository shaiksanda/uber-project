# Backend API Documentation

## `/users/register` EndPoint

### Description
This endpoint registers a new user. It validates the provided data, hashes the password, creates a user record in the database, and returns a JSON Web Token (JWT) along with the user details.

### URL
**POST** `/users/register`

### Request Body
- **fullname** (object): Contains the user's name.
  - **firstName** (string, required): Must be at least 3 characters long.
  - **lastName** (string, optional): If provided, must be at least 3 characters long.
- **email** (string, required): Must be a valid email address and at least 5 characters long.
- **password** (string, required): Must be at least 6 characters long.

#### Example Request
```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** 201 Created
- **Content:** Returns a JWT token and the created user object.

```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // Other user fields (excluding password)
  }
}
```

#### Error Response
- **Status Code:** 400 Bad Request
- **Content:** Returns an array of validation error objects if the input data fails the validation checks.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## `/users/login` EndPoint

### Description
This endpoint authenticates an existing user by verifying the credentials. It checks if the provided email exists and compares the submitted password with the stored hashed password. If authenticated, it returns a JWT token and the user details.

### URL
**POST** `/users/login`

### Request Body
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** 200 OK
- **Content:** Returns a JWT token along with the authenticated user details.

```json
{
  "token": "JWT_TOKEN_HERE",
  "existingUser": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // Other user fields (excluding password)
  }
}
```

#### Error Responses
- **Status Code:** 400 Bad Request  
  Returns an array of validation error objects if the input data fails the validation checks.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **Status Code:** 401 Unauthorized  
  Returns a message if the email does not exist or the password does not match.

```json
{
  "message": "Invalid Email Or Wrong Password"
}
```

---

## `/users/profile` EndPoint

### Description
This endpoint retrieves the profile of the currently authenticated user. The request must include a valid JWT token in the authorization header.

### URL
**GET** `/users/profile`

### Headers
- **Authorization:** `Bearer JWT_TOKEN_HERE` (required)

### Responses

#### Success Response
- **Status Code:** 200 OK
- **Content:** Returns the user object.

```json
{
  "_id": "USER_ID",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
  // Other user fields (excluding password)
}
```

#### Error Response
- **Status Code:** 401 Unauthorized  
  Returns a message if the token is missing, invalid, or expired.

```json
{
  "message": "Unauthorized"
}
```

---

## `/users/logout` EndPoint

### Description
This endpoint logs out the currently authenticated user by blacklisting the JWT token. The token provided in the authorization header will be stored in a blacklist, invalidating future requests using the same token.

### URL
**GET** `/users/logout`

### Headers
- **Authorization:** `Bearer JWT_TOKEN_HERE` (required)

### Responses

#### Success Response
- **Status Code:** 200 OK
- **Content:** Returns a confirmation message.

```json
{
  "message": "Logged Out Successful!"
}
```


#### Error Response
- **Status Code:** 401 Unauthorized  
  Returns a message if the token is missing or invalid.

```json
{
  "message": "Unauthorized"
}
```

---
## Notes
- Input is validated using express-validator.
- Passwords are hashed using bcrypt before storing.
- JWT tokens are signed with a secret from environment variables.


# Captain Routes Documentation

## `/captain/register` EndPoint

### Description
This endpoint registers a new captain. It validates the incoming data, hashes the password, creates a captain record in the database along with vehicle details, and returns a JSON Web Token (JWT) along with the captain details.

### URL
**POST** `/captain/register`

### Request Body
- **fullname** (object): Contains the captain's name.
  - **firstName** (string, required): Must be at least 3 characters long.
  - **lastName** (string, optional): If provided, must be at least 3 characters long.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.
- **vehicle** (object): Contains the vehicle information.
  - **color** (string, required): Must be at least 3 characters long.
  - **plate** (string, required): Must be at least 3 characters long.
  - **capacity** (string, required): Should be provided (e.g., "1", "4", etc.).
  - **vehicleType** (string, required): Must be one of the following values: `"car"`, `"auto"`, or `"motorcycle"`.

#### Example Request
```json
{
  "fullname": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": "4",
    "vehicleType": "car"
  }
}
```

### Responses

#### Success Response
- **Status Code:** 201 Created
- **Content:** Returns a JWT token and the created captain object.

```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "fullname": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": "4",
      "vehicleType": "car"
    }
    // Other captain fields (excluding password)
  }
}
```

#### Error Response
- **Status Code:** 400 Bad Request
- **Content:** Returns an array of validation error objects if the input data fails the validation checks or if the captain already exists.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "message": "Captain Already Exists"
}
```

## `/captain/login` EndPoint

### Description
This endpoint authenticates an existing captain by verifying the credentials. It checks if the provided email exists and compares the submitted password with the stored hashed password. If authenticated, it returns a JWT token along with the captain details.

### URL
**POST** `/captain/login`

### Request Body
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- ** Code:** 200 OK
- **Content:** Returns a JWT token along with the authenticated captain details.

```json

{
  "token": "JWT_TOKEN_HERE",
  "existingCaptain": {
    "fullname": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": "4",
      "vehicleType": "car"
    }
    // Other captain fields (excluding password)
  }
}
```

#### Error Responses
- **Status Code:** 400 Bad Request  
  Returns an array of validation error objects if the input data fails the validation checks.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
- **Status Code:** 401 Unauthorized  
  Returns a message if the email does not exist or the password does not match.

```
json
{
  "message": "Invalid Email Or Wrong Password"
}
```
---

## `/captain/profile` EndPoint

### Description
This endpoint retrieves the profile of the currently authenticated captain. The request must include a valid JWT token in the authorization header.

### URL
**GET** `/captain/profile`

### Headers
- **Authorization:** `Bearer JWT_TOKEN_HERE` (required)

### Responses

#### Success Response
- **Status Code:** 200 OK
- **Content:** Returns the captain object.

```json

{
  "_id": "CAPTAIN_ID",
  "fullname": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": "4",
    "vehicleType": "car"
  }
  // Other captain fields (excluding password)
}
```

#### Error Response
- **Status Code:** 401 Unauthorized  
  Returns a message if the token is missing, invalid, or expired.

```json
{
  "message": "Unauthorized"
}
```

---

## `/captain/logout` EndPoint

### Description
This endpoint logs out the currently authenticated captain by blacklisting the JWT token. The token provided in the authorization header will be stored in a blacklist, invalidating future requests using the same token.

### URL
**GET** `/captain/logout`

### Headers
- **Authorization:** `Bearer JWT_TOKEN_HERE` (required)

### Responses

#### Success Response
- **Status Code:** 200 OK
- **Content:** Returns a confirmation message.

```json

{
  "message": "Logged Out Successful!"
}
```

#### Error Response
- **Status Code:** 401 Unauthorized  
  Returns a message if the token is missing or invalid.

```json
{
  "message": "Unauthorized"
}
```

---

## Notes
- Input is validated using express-validator.
- Passwords are hashed using bcrypt before storing.
- JWT tokens are generated using a secret from environment variables.