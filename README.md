# Trello-like Task Management API

This project is a RESTful API built with [NestJS](https://nestjs.com/) that mimics basic Trello functionality, allowing users to manage columns, cards, and comments. It includes user authentication using JWT tokens, and relational data management using TypeORM with MySQL.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Guards](#guards)
- [Validation](#validation)
- [License](#license)

## Features

- **User Authentication**: Secure login with email and password, using JWT for session management.
- **CRUD Operations**:
  - Manage Users
  - Manage Columns within a Board
  - Manage Cards within Columns
  - Manage Comments on Cards
- **Ownership Protection**: Users can only modify or delete their own resources (columns, cards, comments).
- **Validation**: All incoming data is validated for correctness.
- **Swagger Documentation**: Interactive API documentation.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/trello-like-api.git
    cd trello-like-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
DB_DIALECT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_db_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=trello_clone
JWT_SECRET_KEY=your_jwt_secret_key
```

## Database

This project uses MySQL as the database. Ensure you have MySQL installed and running on your system. Create the database specified in the .env file.

```sql
CREATE DATABASE trello_clone
```

TypeORM will automatically synchronize the database schema based on your entities.

## Running the Application

1. **Start the application:**:

```bash
yarn start
```

The API will be available at http://localhost:3000.

## API Documentation

Swagger is used for documenting the API. After starting the application, you can access the documentation at:

```bash
http://localhost:3000/api
```

## Guards

Guards are used to protect resources by ensuring only the owners of the resources can modify or delete them. The following guards are implemented:
  - **JwtAuthGuard**: Ensures the user is authenticated.
  - **OwnershipGuard**: Ensures the user owns the resource they are trying to modify.

## Validation

Data validation is performed using class-validator and class-transformer. DTOs are used to define the structure and validation rules for incoming requests.
