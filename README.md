# Billeasy Book Review Backend

A backend server for managing users, books, and reviews, built with Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM. This project provides RESTful APIs for user authentication, book management, and review handling, with robust validation and JWT-based authentication.

---

## Features
- User registration, login, and management
- Book CRUD operations
- Review creation, update, and deletion
- JWT authentication and authorization
- Input validation with Zod
- PostgreSQL database with Drizzle ORM migrations
- Dockerized setup for easy development
- API error handling and CORS support

---

## Directory Structure
```
├── db/                  # Database migration scripts and utilities
│   ├── be_migrations/   # Drizzle migration files
│   └── migrate.ts       # Migration runner script
├── src/                 # Application source code
│   ├── config/          # Configuration files (constants, env)
│   ├── controllers/     # Route controllers
│   ├── helpers/         # Utility functions
│   ├── middlewares/     # Express middlewares (auth, error, validation)
│   ├── models/          # Database models/schema
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── validators/      # Zod validation schemas
│   └── index.ts         # App entry point
├── drizzle.config.json  # Drizzle ORM config
├── docker-compose.yml   # Docker Compose setup
├── package.json         # NPM scripts and dependencies
└── ...
```

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)
- Docker & Docker Compose (for containerized setup)

---

## Environment Variables
Create a `.env` file in the root directory with the following variables (defaults shown):
```
SERVER_PORT=10000
DATABASE_URL=postgresql://user:password@localhost:5432/billeasy
JWT_SECRET=your_jwt_secret
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd billeasy-book-review
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
#### a. Using Docker (Recommended)
Start PostgreSQL and pgAdmin using Docker Compose:
```bash
docker-compose up -d
```
- PostgreSQL runs on `localhost:5432` (user: `user`, password: `password`, db: `billeasy`)
- pgAdmin runs on `localhost:8080` (login: `admin@example.com` / `admin`)

#### b. Local PostgreSQL (Alternative)
Ensure PostgreSQL is running and matches the credentials in your `.env` or `drizzle.config.json`.

### 4. Run Database Migrations
Generate and apply migrations:
```bash
npm run db:generate   # Generate migration files from models
npm run db:migrate    # Apply migrations to the database
```

---

## Running the Project

### Development Mode
```bash
npm run dev
```
Server runs on [http://localhost:10000](http://localhost:10000) by default.


---

## API Endpoints

### Public Routes
- `POST /login` — User login
- `POST /signup` — User registration
- `POST /clients/signup` — Client registration

### User Routes (JWT required)
- `GET /users/` — List all users
- `POST /users/` — Create a new user
- `PUT /users/:userId` — Update user
- `DELETE /users/:userId` — Delete user

### Book Routes (JWT required)
- `GET /books/` — List books (with pagination, filter by author/title)
- `GET /books/:bookId` — Get book details with paginated reviews
- `POST /books/` — Add a new book
- `PUT /books/:bookId` — Update book
- `DELETE /books/:bookId` — Delete book

### Review Routes (JWT required)
- `POST /reviews/users/:userId/books/:bookId` — Create review for a book
- `PUT /reviews/users/:userId/books/:bookId/:reviewId` — Update review
- `DELETE /reviews/users/:userId/books/:bookId/:reviewId` — Delete review

---

## Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[ISC](LICENSE)

---

## Contact
Maintained by [tanishq]. 