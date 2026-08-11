# Event Booking — Backend API

Production-ready REST API for an event booking platform, built with **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** (hosted on Neon).

## Tech Stack

- Express.js
- TypeScript
- PostgreSQL (Neon)
- Prisma ORM
- JWT Authentication
- bcrypt
- dotenv, CORS

## Project Structure

```
event-booking/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   └── index.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── category/
│   │   ├── event/
│   │   ├── review/
│   │   └── booking/
│   ├── middlewares/
│   ├── lib/
│   └── utils/
├── .env.example
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
npm install
cp .env.example .env      # then fill in DATABASE_URL and JWT secrets
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Server runs at `http://localhost:5000`.

Useful commands:
```bash
npx prisma studio          # visual database browser
npm run build && npm start # production build/run
```

## Database Design

Models: `User`, `Category`, `Event`, `Review`, `Booking`
Enums: `Role` (USER/ADMIN), `BookingStatus` (PENDING/CONFIRMED/CANCELLED)

Every model has: primary key (`uuid`), `createdAt`/`updatedAt` timestamps, `isDeleted` soft-delete flag, and a `@@map()` table name. Relations: `User` ↔ `Review`, `User` ↔ `Booking`, `Category` ↔ `Event`, `Event` ↔ `Review`, `Event` ↔ `Booking`.

## Response Format

Every endpoint returns this shape:
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {}
}
```

## API Documentation

Base URL: `http://localhost:5000/api/v1`

### Auth (`/auth`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/auth/register` | Public | `{ name, email, password, role? }` | Create a new user (role defaults to USER), returns user + accessToken |
| POST | `/auth/login` | Public | `{ email, password }` | Log in, returns user + accessToken |

### Users (`/users`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users` | Admin | Get all users |
| GET | `/users/:id` | Logged in | Get single user |
| PATCH | `/users/:id` | Logged in | Update user |
| DELETE | `/users/:id` | Admin | Soft-delete user |

### Categories (`/categories`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/categories` | Public | — | Get all categories |
| GET | `/categories/:id` | Public | — | Get category by id |
| POST | `/categories` | Admin | `{ name }` | Create category |
| PATCH | `/categories/:id` | Admin | `{ name? }` | Update category |
| DELETE | `/categories/:id` | Admin | — | Soft-delete category |

### Events (`/events`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/events` | Public | — | Get all events (with category) |
| GET | `/events/:id` | Public | — | Get event by id (with category + reviews) |
| POST | `/events` | Admin | `{ title, description?, location, price?, startsAt, seats?, categoryId }` | Create event |
| PATCH | `/events/:id` | Admin | any of the above fields | Update event |
| DELETE | `/events/:id` | Admin | — | Soft-delete event |

### Reviews (`/reviews`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/reviews` | Public | — | Get all reviews |
| GET | `/reviews/:id` | Public | — | Get review by id |
| POST | `/reviews` | Logged in | `{ rating, comment?, eventId }` | Create review |
| PATCH | `/reviews/:id` | Logged in | `{ rating?, comment? }` | Update review |
| DELETE | `/reviews/:id` | Logged in | — | Soft-delete review |

### Bookings (`/bookings`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/bookings` | Admin | — | Get all bookings |
| GET | `/bookings/:id` | Logged in | — | Get booking by id |
| POST | `/bookings` | Logged in | `{ eventId, seats? }` | Create booking |
| PATCH | `/bookings/:id` | Logged in | `{ status?, seats? }` | Update booking |
| DELETE | `/bookings/:id` | Logged in | — | Soft-delete booking |

**Status codes used:** `200` OK, `201` Created, `401` Unauthorized, `403` Forbidden, `404` Not found, `409` Conflict, `500` Server error.

## Making Authenticated Requests

After registering/logging in, include the returned token on protected routes:
```
Authorization: Bearer <accessToken>
```

## Deployment Checklist

- [x] Push code to GitHub
- [ ] Deploy backend (Render / Railway / Vercel)
- [ ] Set `DATABASE_URL` and JWT secret env vars in the deployment platform
- [ ] Run `npx prisma migrate deploy` against the production database
- [ ] Confirm CORS allows your frontend's deployed origin
- [ ] Submit: Live API URL + GitHub repo link + this API documentation
