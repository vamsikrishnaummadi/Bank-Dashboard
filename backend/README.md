# MyFinanceHub API Documentation

This project provides a set of APIs for a bank dashboard application. Below are the available endpoints along with their descriptions and expected request/response formats.

## Table of Contents

- [Signup API](#signup-api)
- [Signin API](#signin-api)
- [Get All Users API](#get-all-users-api)
- [Get User By Account Number](#get-user-by-account-number)
- [Update User API](#update-user-api)
- [Delete User API](#delete-user-api)
- [Create Transaction API](#create-transaction)

## Authorization

### Signup

```http
POST /api/auth/signup
```

Request Body :

```javascript
{
  "userType": "customer",
  "fullName": "john doe",
  "userName": "johndoe123",
  "email": "johndoe@example.com",
  "password": "secure password",
  "dateOfBirth": "1990-01-01",
  "profileImage": "https://example.com/profile-image.jpg",
  "presentAddress": "123 Main St, City",
  "permanentAddress": "456 Oak Ave, Town",
  "city": "City",
  "postalCode": 12345,
  "country": "Country",
  "currency": "USD",
  "timeZone": "UTC",
}
```

Success Response :

```javascript
{
    "success" : true,
    "statusCode" : 200,
    "message" : "Successfully Created Account"
}
```

Failed Response :

```javascript
{
	"success": false,
	"statusCode": 400,
	"message": "You have already an account, please login!"
}
```

### Signin

```http
POST /api/auth/signin
```

Request Body :

```javascript
{
  "usernameOrEmail": "johndoe123",
  "password": "secure password",
}
```

Success Response :

```javascript
{
	"_id": "667981aebfb39133e95bba62",
	"userType": "customer",
	"balance": 0,
	"accountNumber": 764867188663,
	"fullName": "john doe",
	"userName": "johndoe123",
	"email": "johndoe@example.com",
	"dateOfBirth": "1990-01-01T00:00:00.000Z",
	"profileImage": "https://example.com/profile-image.jpg",
	"presentAddress": "123 Main St, City",
	"permanentAddress": "456 Oak Ave, Town",
	"city": "City",
	"postalCode": 12345,
	"country": "Country",
	"currency": "USD",
	"timeZone": "UTC",
	"enabletwoFactorAuthentication": true,
	"enableRecomendations": true,
	"enableNotifications": true,
	"enableDigitalCurrency": false,
	"recentPasswordChangedTime": "2024-06-24T14:24:46.679Z",
	"favourites": "",
	"__v": 0
}
```

Failed Response :

```javascript
{
	"success": false,
	"statusCode": 400,
	"message": "User not found! or Invalid Password"
}
```

## USER API

#### GET USERS

```http
GET /api/users?page=1&limit=25
```

Description: Retrieves a list of all users. By default it retrive 25 users. if you want more uses increase limit.

EX: /api/users?page=1&limit=50

Success Response :

```javascript
{
	"success": true,
	"total": 2,
	"page": 1,
	"limit": 25,
	"data": [
		{
			"_id": "6677ce4568d68fc0bc60aa93",
			"userType": "customer",
			"balance": 0,
			"accountNumber": 568134727900,
			"fullName": "John Doe",
			"userName": "johndoe123",
			"email": "johndoe@example.com",
			"dateOfBirth": "1990-01-01T00:00:00.000Z",
			"profileImage": "https://example.com/profile-image.jpg",
			"presentAddress": "123 Main St, City",
			"permanentAddress": "456 Oak Ave, Town",
			"city": "City",
			"postalCode": 12345,
			"country": "Country",
			"currency": "USD",
			"timeZone": "UTC",
			"enabletwoFactorAuthentication": true,
			"enableRecomendations": true,
			"enableNotifications": true,
			"enableDigitalCurrency": false,
			"recentPasswordChangedTime": "2024-06-23T07:27:01.963Z",
			"favourites": "",
			"__v": 0
		},
		{
			"_id": "667981aebfb39133e95bba62",
			"userType": "customer",
			"balance": 0,
			"accountNumber": 764867188663,
			"fullName": "vamsi",
			"userName": "vamsiu",
			"email": "vamsi@example.com",
			"dateOfBirth": "1990-01-01T00:00:00.000Z",
			"profileImage": "https://example.com/profile-image.jpg",
			"presentAddress": "123 Main St, City",
			"permanentAddress": "456 Oak Ave, Town",
			"city": "City",
			"postalCode": 12345,
			"country": "Country",
			"currency": "USD",
			"timeZone": "UTC",
			"enabletwoFactorAuthentication": true,
			"enableRecomendations": true,
			"enableNotifications": true,
			"enableDigitalCurrency": false,
			"recentPasswordChangedTime": "2024-06-24T14:24:46.679Z",
			"favourites": "",
			"__v": 0
		}
	]
}
```

#### GET USER BY ACCOUNT NUMBER

```http
GET /api/users/568134727900
```

Success Response :

```javascript
{
	"success": true,
	"data":
		{
			"_id": "6677ce4568d68fc0bc60aa93",
			"userType": "customer",
			"balance": 0,
			"accountNumber": 568134727900,
			"fullName": "John Doe",
			"userName": "johndoe123",
			"email": "johndoe@example.com",
			"dateOfBirth": "1990-01-01T00:00:00.000Z",
			"profileImage": "https://example.com/profile-image.jpg",
			"presentAddress": "123 Main St, City",
			"permanentAddress": "456 Oak Ave, Town",
			"city": "City",
			"postalCode": 12345,
			"country": "Country",
			"currency": "USD",
			"timeZone": "UTC",
			"enabletwoFactorAuthentication": true,
			"enableRecomendations": true,
			"enableNotifications": true,
			"enableDigitalCurrency": false,
			"recentPasswordChangedTime": "2024-06-23T07:27:01.963Z",
			"favourites": "",
			"__v": 0
		}
}
```

#### UPDATE USER BY ACCOUNT NUMBER

```http
PUT /api/users/568134727900
```

Description : Only Updated fields required.

Request Body :

```javascript
{
  "fullName" : "john doe avas"
}
```

Success Response :

```javascript
{
	"success": true,
	"data":
		{
			"_id": "6677ce4568d68fc0bc60aa93",
			"userType": "customer",
			"balance": 0,
			"accountNumber": 568134727900,
			"fullName": "John Doe avas",
			"userName": "johndoe123",
			"email": "johndoe@example.com",
			"dateOfBirth": "1990-01-01T00:00:00.000Z",
			"profileImage": "https://example.com/profile-image.jpg",
			"presentAddress": "123 Main St, City",
			"permanentAddress": "456 Oak Ave, Town",
			"city": "City",
			"postalCode": 12345,
			"country": "Country",
			"currency": "USD",
			"timeZone": "UTC",
			"enabletwoFactorAuthentication": true,
			"enableRecomendations": true,
			"enableNotifications": true,
			"enableDigitalCurrency": false,
			"recentPasswordChangedTime": "2024-06-23T07:27:01.963Z",
			"favourites": "",
			"__v": 0
		}
}
```

#### DELETE USER BY ACCOUNT NUMBER

```http
DELETE /api/users/568134727900
```

Success Response :

```javascript
{
	"success": true,
	"data": {
		"message": "your request to delete account was processed."
	}
}
```

## TRANSACTION API

#### CREATE TRANSACTION

```http
POST /api/transactions/create
```

Request Body:

```javascript
{
	"amount": 200,
	"cardId": "123456",
	"createdAt": "2024-03-01",
	"description": "this is a test transaction",
	"invoice": "this is a test invoice",
	"type": "income",
	"accountNumber": 764867188663
}
```

Success Response:

```javascript
{
	"success": true,
	"message": "Successfully Created Transaction"
}
```

Failure Response:

```javascript
{	"success": false
	"message": "Failed to Create Transaction"
}
```

#### GET TRANSACTIONS

```http
POST /api/transactions/batch?page=1&limit=25
```

Request Body:

```javascript
{
	"accountNumber": "Number",  // optional
	"fromDate": "Date",			// optional
	"toDate": "Date"			// optional
}
```

Success Response:

```javascript
{
	"success": true,
	"count": 5,
	"page": 1,
	"limit": 25,
	"data": [
		{
			"_id": "667d0b7c0c9d4878771172de",
			"amount": 200,
			"balanceAfter": 200,
			"cardId": "123456",
			"createdAt": "2024-03-01T00:00:00.000Z",
			"description": "this is a test transaction",
			"invoice": "this is a test invoice",
			"type": "income",
			"accountNumber": 764867188663,
			"__v": 0
		},
		{
			"_id": "667d0bcd3589cb4d4b5bf486",
			"amount": 200,
			"balanceAfter": 400,
			"cardId": "123456",
			"createdAt": "2024-03-01T00:00:00.000Z",
			"description": "this is a test transaction",
			"invoice": "this is a test invoice",
			"type": "income",
			"accountNumber": 764867188663,
			"__v": 0
		},
	]
}
```

#### GET TRANSACTION BY ID

```http
GET /api/transactions/667d0cbee7a871fe4fd31b81
```

Success Response:

```javascript
{
	"success": true,
	"data": {
		"_id": "667d0cbee7a871fe4fd31b81",
		"amount": 200,
		"balanceAfter": 600,
		"cardId": "123456",
		"createdAt": "2024-03-01T00:00:00.000Z",
		"description": "this is a test transaction",
		"invoice": "this is a test invoice",
		"type": "income",
		"accountNumber": 764867188663,
		"__v": 0
	}
}
```
