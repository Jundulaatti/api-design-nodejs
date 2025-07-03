# API Design Node.JS Tutorial

This project is a Node.js API built as a tutorial for learning how to design and implement RESTFUL APIs. It covers user registration, authentication, and product management CRUD operations. The stack includes TypeScript, Express, Prisma and Jest for testing.

## Features

- User registration: Create new user accounts
- User login: authenticate user and issue tokens
- Product management: Create, read, update, and delete products
- Testing: includes example tests with Jest

## API Endpoints

### User

- `POST /users/register` — Register a new user
- `POST /users/login` — Login and receive a token

### Products

- `GET /products` — Get all products
- `GET /products/:id` — Get product by ID
- `POST /products` — Create a new product (auth required)
- `PUT /products/:id` — Update a product (auth required)
- `DELETE /products/:id` — Delete a product (auth required)
