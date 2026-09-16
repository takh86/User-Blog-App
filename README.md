# User Blog API

A small backend project for practicing **REST API design, CRUD operations, modular structure and MySQL integration** with Node.js and Express.

The project separates user and blog responsibilities into modules and includes a database seed plus a Postman collection for manual API testing.

## Tech stack

![Node.js](https://img.shields.io/badge/Node.js-21262D?style=for-the-badge&logo=node.js&logoColor=5FA04E)
![Express](https://img.shields.io/badge/Express-21262D?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-21262D?style=for-the-badge&logo=mysql&logoColor=4479A1)
![JavaScript](https://img.shields.io/badge/JavaScript-21262D?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## What the project demonstrates

- User registration and login flow
- User retrieval and profile endpoints
- Blog CRUD operations
- Separation into `User` and `Blog` modules
- Controller / service-oriented organization
- MySQL database initialization and seed data
- Manual API testing through Postman

## API overview

### Users

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/users/signup` | Register a user |
| `POST` | `/users/login` | Login flow |
| `GET` | `/users/:id` | Get a user |
| `GET` | `/users/profile/:id` | Get a user profile |

### Blogs

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/blog` | List blog entries |
| `GET` | `/blog/:id` | Get one blog entry |
| `POST` | `/blog` | Create a blog entry |
| `PATCH` | `/blog/:id` | Update a blog entry |
| `DELETE` | `/blog/:id` | Delete a blog entry |

## Project structure

```text
.
├── index.js
├── scripts/
│   └── seed.mjs
├── src/
│   ├── DB/
│   ├── Modules/
│   │   ├── User/
│   │   └── Blog/
│   └── app.controller.js
├── blog_app.postman_collection.json
└── project_requirements.dio
```

The structure keeps the database layer and domain modules separate instead of putting all logic into a single server file.

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the database

Create the required local environment configuration for your MySQL connection, then seed the database:

```bash
npm run db:seed
```

### 3. Start the API

```bash
npm run dev
```

The development script uses Node's watch mode.

## API testing

A Postman collection is included at:

```text
blog_app.postman_collection.json
```

It can be imported into Postman to exercise the available endpoints.

## Current limitations

This repository represents an earlier backend learning project. It intentionally does **not** present unfinished features as complete.

Areas I would improve in a production-oriented version:

- JWT-based authentication and authorization
- Request validation
- Password hashing and stronger auth security
- Automated unit and integration tests
- Pagination and filtering
- Dockerized local environment
- Structured error responses and logging
- CI pipeline

## What I learned

This project helped me move from isolated JavaScript exercises toward a structured backend application: designing REST endpoints, separating responsibilities, connecting application code to a relational database and testing API behavior manually.

---

**Portfolio context:** This is a learning-stage backend project. My newer work is moving toward TypeScript, NestJS, PostgreSQL, automated testing and production-oriented engineering.
