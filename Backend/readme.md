# Backend API Documentation

## Description
This endpoint registers a new user. It validates the provided data, hashes the password, creates a user record in the database, and returns a JSON Web Token (JWT) along with the user details.

## URL
**POST** `/users/register`

## Request Body
- **fullname** (object): Contains the user's name.
  - **firstName** (string, required): Must be at least 3 characters long.
  - **lastName** (string, optional): If provided, must be at least 3 characters long.
- **email** (string, required): Must be a valid email address and at least 5 characters long.
- **password** (string, required): Must be at least 6 characters long.

### Example Request
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

## Responses

### Success Response
- **Status Code:** 201 Created
- **Content:** Returns a JWT token and the created user object.

#### Example Success Response
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    // Other user fields (excluding password)
  }
}
```

### Error Response
- **Status Code:** 400 Bad Request
- **Content:** Returns an array of validation error objects if the input data fails the validation checks.

#### Example Error Response
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
## Notes
- Input is validated using express-validator.
- The password is hashed using bcrypt before storing.
- The JWT is signed with a secret from environment variables and expires in 1 day. 
