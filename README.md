appjam-16th API
===============

> demo: http://norr.uy.to:6010/api/~

# Index

- sign
    - `POST /sign`
    - `GET /sign`
- user
    - `POST /users`
    - `GET /users/{id}`
- post
    - `POST /posts`
    - `GET /posts`
    - `GET /posts/mine`
    - `GET /posts/{post_id}`
- comment
    - `POST /comments/{post_id}`
    - `GET /comments/{post_id}`
- like
    - `POST /likes/{post_id}`
    - `DELETE /likes/{post_id}`
- thumbnail

# Sign

## `POST /sign`

### request

```http
Request Body
    username: string
    password: string
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
	"user": {
		"farewellFor": 50,
		"_id": "5b7803f7dc444c39643250e4",
		"username": "test1",
		"createdAt": "2018-08-18T11:33:12.042Z",
		"updatedAt": "2018-08-18T11:33:12.042Z",
		"dday": 50,
		"rank": "과장"
	}
}
```

## `GET /sign`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"user": {
		"farewellFor": 50,
		"_id": "5b7803f7dc444c39643250e4",
		"username": "test1",
		"createdAt": "2018-08-18T11:33:12.042Z",
		"updatedAt": "2018-08-18T11:33:12.042Z",
		"dday": 50,
		"rank": "과장"
	}
}
```

# User
 
## `POST /users`

### request

```http
Request Body (Multipart form)
    username: string
    password: string
    farewellFor: number
    thumbnail: file(image)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"user": {
		"farewellFor": 50,
		"_id": "5b7803f7dc444c39643250e4",
		"username": "test1",
		"createdAt": "2018-08-18T11:33:12.042Z",
		"updatedAt": "2018-08-18T11:33:12.042Z",
		"dday": 50,
		"rank": "과장"
	}
}
```

## `GET /users/{user_id}`

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"user": {
		"farewellFor": 50,
		"_id": "5b7803f7dc444c39643250e4",
		"username": "test1",
		"createdAt": "2018-08-18T11:33:12.042Z",
		"updatedAt": "2018-08-18T11:33:12.042Z",
		"dday": 50,
		"rank": "과장"
	}
}
```

# Post

## `POST /posts`

### request

```http
Request Headers
    Authorization: string(token)
Request Body
    title: string
    content: string
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"post": {
		"likes": [],        // 좋아요한 user_id 배열
		"comments": [],     // 댓글 comment_id 배열
		"_id": "5b7808270d4de239b28a5d86",
		"title": "제목1",
		"content": "내용내용내용",
		"user": {
			"farewellFor": 50,
			"_id": "5b7803f7dc444c39643250e4",
			"username": "test1",
			"createdAt": "2018-08-18T11:33:12.042Z",
			"updatedAt": "2018-08-18T11:33:12.042Z",
			"dday": 50,
			"rank": "과장"
		},
		"createdAt": "2018-08-18T11:51:03.622Z",
		"updatedAt": "2018-08-18T11:51:03.622Z"
	}
}
```

## `GET /posts`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"posts": [
		{
			"likes": [],        // 좋아요한 user_id 배열
	        "comments": [],     // 댓글 comment_id 배열
			"_id": "5b7808270d4de239b28a5d86",
			"title": "제목1",
			"content": "내용내용내용",
			"user": {
				"farewellFor": 50,
				"_id": "5b7803f7dc444c39643250e4",
				"username": "test1",
				"createdAt": "2018-08-18T11:33:12.042Z",
				"updatedAt": "2018-08-18T11:33:12.042Z",
				"dday": 50,
				"rank": "과장"
			},
			"createdAt": "2018-08-18T11:51:03.622Z",
			"updatedAt": "2018-08-18T11:51:03.622Z"
		}
	]
}
```

## `GET /posts/mine`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"posts": [
		{
			"likes": [],        // 좋아요한 user_id 배열
		    "comments": [],     // 댓글 comment_id 배열
			"_id": "5b7808270d4de239b28a5d86",
			"title": "제목1",
			"content": "내용내용내용내용",
			"user": {
				"farewellFor": 50,
				"_id": "5b7803f7dc444c39643250e4",
				"username": "test1",
				"createdAt": "2018-08-18T11:33:12.042Z",
				"updatedAt": "2018-08-18T11:33:12.042Z",
				"dday": 50,
				"rank": "과장"
			},
			"createdAt": "2018-08-18T11:51:03.622Z",
			"updatedAt": "2018-08-18T11:51:03.622Z"
		}
	]
}
```

## `GET /posts/{post_id}`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"post": {
		"likes": [],        // 좋아요한 user_id 배열
		"comments": [],     // 댓글 comment_id 배열
		"_id": "5b7808270d4de239b28a5d86",
		"title": "제목1",
		"content": "내용내용내용내용",
		"user": {
			"farewellFor": 50,
			"_id": "5b7803f7dc444c39643250e4",
			"username": "test1",
			"createdAt": "2018-08-18T11:33:12.042Z",
			"updatedAt": "2018-08-18T11:33:12.042Z",
			"dday": 50,
			"rank": "과장"
		},
		"createdAt": "2018-08-18T11:51:03.622Z",
		"updatedAt": "2018-08-18T11:51:03.622Z"
	}
}
```

# Comment

## `POST /comments/{post_id}`

### request

```http
Request Headers
    Authorization: string(token)
Request Body
    content: string
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"comment": {
		"_id": "5b7808ef0d4de239b28a5d87",
		"content": "내용내용내용내용내용",
		"post": "5b7808270d4de239b28a5d86",
		"user": {
			"farewellFor": 50,
			"_id": "5b7803f7dc444c39643250e4",
			"username": "test1",
			"createdAt": "2018-08-18T11:33:12.042Z",
			"updatedAt": "2018-08-18T11:33:12.042Z",
			"dday": 50,
			"rank": "과장"
		},
		"createdAt": "2018-08-18T11:54:23.036Z",
		"updatedAt": "2018-08-18T11:54:23.036Z"
	}
}
```

## `GET /comments/{post_id}`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS",
	"comments": [
		{
			"_id": "5b7808ef0d4de239b28a5d87",
			"content": "내용내용내용내용내용",
			"post": "5b7808270d4de239b28a5d86",
			"user": {
				"farewellFor": 50,
				"_id": "5b7803f7dc444c39643250e4",
				"username": "test1",
				"createdAt": "2018-08-18T11:33:12.042Z",
				"updatedAt": "2018-08-18T11:33:12.042Z",
				"dday": 50,
				"rank": "과장"
			},
			"createdAt": "2018-08-18T11:54:23.036Z",
			"updatedAt": "2018-08-18T11:54:23.036Z"
		}
	]
}
```

# Like

## `POST /likes/{post_id}`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS"
}
```

## `DELETE /likes/{post_id}`

### request

```http
Request Headers
    Authorization: string(token)
```

### response

```json
{
	"success": true,
	"message": "SUCCESS"
}
```

# Thumbnail path

```
http://<hostname>/uploads/<user_id>/thumbnail.jpg
```