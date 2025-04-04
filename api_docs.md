# Laravel API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Feedback](#feedback)
- [Algorithms](#algorithms)
- [Lessons](#lessons)
- [Admin Routes](#admin-routes)

## Authentication

### Register
- **URL**: `/register`
- **Method**: `POST`
- **Auth Required**: No (Guest only)
- **Controller**: `AuthController@register`

#### Request Headers
```
Accept: application/json
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

#### Validation Rules
- `name`: Required, between 5-15 characters
- `email`: Required, valid email, must be unique in users table
- `password`: Required, must be confirmed, minimum 8 characters, must contain letters, mixed case, and numbers
- `password_confirmation`: Must match password

#### Success Response (200 OK)
```json
{
  "user": {
    "id": "integer",
    "name": "string",
    "email": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
  "token": "string"
}
```

#### Error Response (401 Unauthorized)
```json
{
  "errors": {
    "name": [
      "The name field is required.",
      "The name must be between 5 and 15 characters."
    ],
    "email": [
      "The email field is required.",
      "The email must be a valid email address.",
      "The email has already been taken."
    ],
    "password": [
      "The password field is required.",
      "The password confirmation does not match.",
      "The password must be at least 8 characters.",
      "The password must contain at least one uppercase and one lowercase letter.",
      "The password must contain at least one letter.",
      "The password must contain at least one number."
    ]
  }
}
```

### Login
- **URL**: `/login`
- **Method**: `POST`
- **Auth Required**: No (Guest only)
- **Controller**: `AuthController@login`

#### Request Headers
```
Accept: application/json
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- `email`: Required, valid email
- `password`: Required, string

#### Success Response (200 OK)
```json
{
  "user": {
    "id": "integer",
    "name": "string",
    "email": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
  "token": "string"
}
```

#### Error Response (401 Unauthorized) - Validation Failed
```json
{
  "errors": {
    "email": [
      "The email field is required.",
      "The email must be a valid email address."
    ],
    "password": [
      "The password field is required."
    ]
  }
}
```

#### Error Response (404 Not Found) - Invalid Credentials
```json
{
  "message": "User not found"
}
```

### Logout
- **URL**: `/logout`
- **Method**: `POST`
- **Auth Required**: Yes (Token required)
- **Controller**: `AuthController@logout`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Body
```
No body required
```

#### Success Response (202 Accepted)
```json
{
  "message": "User logged out!"
}
```

#### Error Response (401 Unauthorized) - Invalid/Expired Token
```json
{
  "message": "Invalid or expired Token"
}
```

## Feedback

### Create Feedback
- **URL**: `/feedback/create`
- **Method**: `POST`
- **Auth Required**: Yes (Token required)
- **Controller**: `feedbackController@create`

#### Request Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "message": "string"
}
```

#### Validation Rules
- `message`: Required, string

#### Success Response (200 OK)
```json
{
  "data": {
    "id": "integer",
    "user_id": "integer",
    "message": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "user": {
      "id": "integer",
      "name": "string",
      "email": "string"
    }
  }
}
```

#### Error Response - Validation Failed
```json
{
  "message": {
    "message": [
      "The message field is required."
    ]
  }
}
```

### Get All Feedbacks
- **URL**: `/feedbacks`
- **Method**: `GET`
- **Auth Required**: Yes (Token required)
- **Controller**: `feedbackController@index`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": "integer",
      "user_id": "integer",
      "message": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "user": {
        "id": "integer",
        "name": "string",
        "email": "string"
      }
    }
  ],
  "links": {
    "first": "url",
    "last": "url",
    "prev": "url or null",
    "next": "url or null"
  },
  "meta": {
    "current_page": "integer",
    "from": "integer",
    "last_page": "integer",
    "path": "string",
    "per_page": "integer",
    "to": "integer",
    "total": "integer"
  }
}
```

## Algorithms

### Get All Algorithms
- **URL**: `/algorithms`
- **Method**: `GET`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@index`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": "integer",
      "user_id": "integer",
      "description": "string",
      "blocks": "json",
      "approved": "boolean",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "user": {
        "id": "integer",
        "name": "string",
        "email": "string"
      }
    }
  ],
  "links": {
    "first": "url",
    "last": "url",
    "prev": "url or null",
    "next": "url or null"
  },
  "meta": {
    "current_page": "integer",
    "from": "integer",
    "last_page": "integer",
    "path": "string",
    "per_page": "integer",
    "to": "integer",
    "total": "integer"
  }
}
```

### Create Algorithm
- **URL**: `/algorithm/create`
- **Method**: `POST`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@store`

#### Request Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "descritpion": "string",
  "blocks": "json"
}
```

#### Validation Rules
- `descritpion`: Required, string
- `blocks`: Required

#### Success Response (201 Created)
```json
{
  "message": "Algorithm created!"
}
```

#### Error Response - Validation Failed
```json
{
  "errors": {
    "descritpion": [
      "The descritpion field is required."
    ],
    "blocks": [
      "The blocks field is required."
    ]
  }
}
```

### Submit Algorithm Changes (1)
- **URL**: `/change_algo/{id}`
- **Method**: `POST`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@submitChanges`
- **URL Parameters**: `id=[integer]` Algorithm ID

#### Request Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "description": "string",
  "blocks": "json"
}
```

#### Validation Rules
- `description`: Required, string
- `blocks`: Required

#### Success Response (200 OK)
```json
{
  "message": "Algorithm changes submitted for approval!"
}
```

#### Error Response (422 Unprocessable Entity) - Validation Failed
```json
{
  "errors": {
    "description": [
      "The description field is required."
    ],
    "blocks": [
      "The blocks field is required."
    ]
  }
}
```

#### Error Response (404 Not Found) - Algorithm Not Found
```json
{
  "message": "Algorithm not found."
}
```

### Submit Algorithm Changes (2)
- **URL**: `/algorithm/change/{id}`
- **Method**: `POST`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@submitChanges`
- **URL Parameters**: `id=[integer]` Algorithm ID

#### Request Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "description": "string",
  "blocks": "json"
}
```

#### Validation Rules
- `description`: Required, string
- `blocks`: Required

#### Success Response (200 OK)
```json
{
  "message": "Algorithm changes submitted for approval!"
}
```

#### Error Response (422 Unprocessable Entity) - Validation Failed
```json
{
  "errors": {
    "description": [
      "The description field is required."
    ],
    "blocks": [
      "The blocks field is required."
    ]
  }
}
```

#### Error Response (404 Not Found) - Algorithm Not Found
```json
{
  "message": "Algorithm not found."
}
```

### Get Algorithm by ID
- **URL**: `/algorithm/{id}`
- **Method**: `GET`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@show`
- **URL Parameters**: `id=[integer]` Algorithm ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Success Response (200 OK)
```json
{
  "data": {
    "id": "integer",
    "user_id": "integer",
    "description": "string",
    "blocks": "json",
    "approved": "boolean",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "user": {
      "id": "integer",
      "name": "string",
      "email": "string"
    }
  }
}
```

#### Error Response (404 Not Found) - Algorithm Not Found
```json
{
  "message": "algorithm not found!"
}
```

### Update Algorithm
- **URL**: `/algorithm/{id}`
- **Method**: `PATCH`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@update`
- **URL Parameters**: `id=[integer]` Algorithm ID

#### Request Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

#### Request Body
```json
{
  "descritpion": "string",
  "blocks": "json"
}
```

#### Validation Rules
- `descritpion`: Required, string
- `blocks`: Required

#### Success Response (200 OK)
```json
{
  "message": "Algorithm updated successfully!"
}
```

#### Error Response (422 Unprocessable Entity) - Validation Failed
```json
{
  "errors": {
    "descritpion": [
      "The descritpion field is required."
    ],
    "blocks": [
      "The blocks field is required."
    ]
  }
}
```

#### Error Response (404 Not Found) - Algorithm Not Found
```json
{
  "message": "Algorithm not found."
}
```

### Delete Algorithm
- **URL**: `/algorithm/{id}`
- **Method**: `DELETE`
- **Auth Required**: Yes (Token required)
- **Controller**: `AlgorithmController@destroy`
- **URL Parameters**: `id=[integer]` Algorithm ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Success Response (200 OK)
```json
{
  "message": "Algorithm deleted successfully!"
}
```

#### Error Response (404 Not Found) - Algorithm Not Found
```json
{
  "message": "Algorithm not found."
}
```

## Lessons

### Get All Lessons
- **URL**: `/lessons`
- **Method**: `GET`
- **Auth Required**: Yes (Token required)
- **Controller**: `LessonController@index`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": "integer",
      "title": "string",
      "lesson_picture": "string",
      "description": "string",
      "content": "string",
      "challenge_exercise": "string",
      "challenge_solution": "string",
      "difficulty": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "links": {
    "first": "url",
    "last": "url",
    "prev": "url or null",
    "next": "url or null"
  },
  "meta": {
    "current_page": "integer",
    "from": "integer",
    "last_page": "integer",
    "path": "string",
    "per_page": "integer",
    "to": "integer",
    "total": "integer"
  }
}
```

### Get Lesson by ID
- **URL**: `/lesson/{id}`
- **Method**: `GET`
- **Auth Required**: Yes (Token required)
- **Controller**: `LessonController@show`
- **URL Parameters**: `id=[integer]` Lesson ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Success Response (200 OK)
```json
{
  "data": {
    "id": "integer",
    "title": "string",
    "lesson_picture": "string",
    "description": "string",
    "content": "string",
    "challenge_exercise": "string",
    "challenge_solution": "string",
    "difficulty": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

#### Error Response (404 Not Found) - Lesson Not Found
```json
{
  "message": "Lesson not found!"
}
```

## Admin Routes
All routes below require both Token authentication and Admin privileges.

### Get All Algorithms (Admin)
- **URL**: `/admin/algorithms`
- **Method**: `GET`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `AdminController@get_algorithms`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
[
  {
    "data": [
      {
        "id": "integer",
        "user_id": "integer",
        "description": "string",
        "blocks": "json",
        "approved": "boolean",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "user": {
          "id": "integer",
          "name": "string",
          "email": "string"
        }
      }
    ],
    "links": {
      "first": "url",
      "last": "url",
      "prev": "url or null",
      "next": "url or null"
    },
    "meta": {
      "current_page": "integer",
      "from": "integer",
      "last_page": "integer",
      "path": "string",
      "per_page": "integer",
      "to": "integer",
      "total": "integer"
    }
  }
]
```

### Get All Transactions
- **URL**: `/admin/transactions`
- **Method**: `GET`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `AdminController@get_transaction`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": "integer",
      "user_id": "integer",
      "algorithm_id": "integer",
      "description": "string",
      "blocks": "json",
      "status": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "user": {
        "id": "integer",
        "name": "string",
        "email": "string"
      },
      "algorithm": {
        "id": "integer",
        "user_id": "integer",
        "description": "string",
        "blocks": "json",
        "approved": "boolean"
      }
    }
  ],
  "links": {
    "first": "url",
    "last": "url",
    "prev": "url or null",
    "next": "url or null"
  },
  "meta": {
    "current_page": "integer",
    "from": "integer",
    "last_page": "integer",
    "path": "string",
    "per_page": "integer",
    "to": "integer",
    "total": "integer"
  }
}
```

### Approve Transaction
- **URL**: `/admin/transaction/{id}`
- **Method**: `POST`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `AdminController@approve`
- **URL Parameters**: `id=[integer]` Transaction ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Success Response (200 OK)
```json
{
  "message": "changes was seccesful!"
}
```

#### Error Response (404 Not Found) - Transaction Not Found
```json
{
  "message": "Not found"
}
```

#### Error Response (500 Internal Server Error) - Transaction Error
```json
{
  "message": "error happend"
}
```

### Get All Feedbacks (Admin)
- **URL**: `/admin/feedbacks`
- **Method**: `GET`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `AdminController@get_feedbacks`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Request Parameters
```
page: integer (optional)
```

#### Success Response (200 OK)
```json
[
  {
    "data": [
      {
        "id": "integer",
        "user_id": "integer",
        "message": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "user": {
          "id": "integer",
          "name": "string",
          "email": "string"
        }
      }
    ],
    "links": {
      "first": "url",
      "last": "url",
      "prev": "url or null",
      "next": "url or null"
    },
    "meta": {
      "current_page": "integer",
      "from": "integer",
      "last_page": "integer",
      "path": "string",
      "per_page": "integer",
      "to": "integer",
      "total": "integer"
    }
  }
]
```

### Update Lesson
- **URL**: `/admin/lesson/{id}`
- **Method**: `PATCH`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `LessonController@update`
- **URL Parameters**: `id=[integer]` Lesson ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

#### Request Body
```
title: string (required)
lesson_picture: file (image - png, jpg, jpeg) (optional)
description: string (required)
content: string (required)
challenge_exercise: string (required)
challenge_solution: string (required)
difficulty: string (must be one of: beginner, intermediate, hard) (required)
```

#### Validation Rules
- `title`: Required, string
- `lesson_picture`: Optional, must be image file (png, jpg, jpeg)
- `description`: Required, string
- `content`: Required, string
- `challenge_exercise`: Required, string
- `challenge_solution`: Required, string
- `difficulty`: Required, must be one of: beginner, intermediate, hard

#### Success Response (200 OK)
```json
{
  "message": "Lesson updated successfully!",
  "lesson": {
    "data": {
      "id": "integer",
      "title": "string",
      "lesson_picture": "string",
      "description": "string",
      "content": "string",
      "challenge_exercise": "string",
      "challenge_solution": "string",
      "difficulty": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  }
}
```

#### Error Response (404 Not Found) - Lesson Not Found
```json
{
  "message": "Lesson not found"
}
```

#### Error Response (422 Unprocessable Entity) - Validation Failed
```json
{
  "title": [
    "The title field is required."
  ],
  "description": [
    "The description field is required."
  ],
  "content": [
    "The content field is required."
  ],
  "challenge_exercise": [
    "The challenge exercise field is required."
  ],
  "challenge_solution": [
    "The challenge solution field is required."
  ],
  "difficulty": [
    "The difficulty field is required.",
    "The selected difficulty is invalid."
  ],
  "lesson_picture": [
    "The lesson picture must be an image.",
    "The lesson picture must be a file of type: png, jpg, jpeg."
  ]
}
```

### Delete Lesson
- **URL**: `/admin/lesson/{id}`
- **Method**: `DELETE`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `LessonController@delete`
- **URL Parameters**: `id=[integer]` Lesson ID

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
```

#### Success Response (200 OK)
```json
{
  "message": "Lesson deleted successfully!"
}
```

#### Error Response (404 Not Found) - Lesson Not Found
```json
{
  "message": "Lesson not found"
}
```

### Create Lesson
- **URL**: `/admin/lesson/create`
- **Method**: `POST`
- **Auth Required**: Yes (Token + Admin required)
- **Controller**: `LessonController@create`

#### Request Headers
```
Accept: application/json
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

#### Request Body
```
title: string (required)
lesson_picture: file (image - png, jpg, jpeg) (required)
description: string (required)
content: string (required)
challenge_exercise: string (required)
challenge_solution: string (required)
difficulty: string (must be one of: beginner, intermediate, hard) (required)
```

#### Validation Rules
- `title`: Required, string
- `lesson_picture`: Required, must be image file (png, jpg, jpeg)
- `description`: Required, string
- `content`: Required, string
- `challenge_exercise`: Required, string
- `challenge_solution`: Required, string
- `difficulty`: Required, must be one of: beginner, intermediate, hard

#### Success Response (201 Created)
```json
{
  "message": "Lesson created successfully!",
  "lesson": {
    "data": {
      "id": "integer",
      "title": "string",
      "lesson_picture": "string",
      "description": "string",
      "content": "string",
      "challenge_exercise": "string",
      "challenge_solution": "string",
      "difficulty": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  }
}
```

#### Error Response (422 Unprocessable Entity) - Validation Failed
```json
{
  "title": [
    "The title field is required."
  ],
  "lesson_picture": [
    "The lesson picture field is required.",
    "The lesson picture must be an image.",
    "The lesson picture must be a file of type: png, jpg, jpeg."
  ],
  "description": [
    "The description field is required."
  ],
  "content": [
    "The content field is required."
  ],
  "challenge_exercise": [
    "The challenge exercise field is required."
  ],
  "challenge_solution": [
    "The challenge solution field is required."
  ],
  "difficulty": [
    "The difficulty field is required.",
    "The selected difficulty is invalid."
  ]
}
```