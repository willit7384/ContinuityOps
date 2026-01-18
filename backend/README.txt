# ContinuityOps – Backend

Backend service for **ContinuityOps**, a student admissions and enrollment platform focused on secure identity management, role-based access, and operational continuity.

This service is built with **Node.js, TypeScript, Express, Prisma, and MySQL**, using modern **ES Modules** and a clean domain-driven structure.

---

## 🚀 Tech Stack

* **Runtime:** Node.js (ESM)
* **Language:** TypeScript
* **Framework:** Express
* **Database:** MySQL (local for now)
* **ORM:** Prisma
* **Dev Server:** `tsx`
* **Auth (in progress):** Password-based (bcrypt planned), JWT planned

---

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   └── authController.ts
│   ├── routes/
│   │   └── auth.ts
│   ├── index.ts
│
├── .env            # NOT committed
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

---

## 🧠 Domain Model (Current)

### User

* Core identity record
* Role-based access (STUDENT, COUNSELOR, ADMIN)

### Roles

* `STUDENT`
* `COUNSELOR`
* `ADMIN`

### Status (Students)

* `PENDING`
* `ACTIVE`
* `REJECTED`

All domain entities use `User.id` as the primary identifier.

---

## 🗄 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id         String   @id @default(uuid())
  email      String   @unique
  password   String
  firstName  String
  lastName   String
  role       Role     @default(STUDENT)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum Role {
  STUDENT
  COUNSELOR
  ADMIN
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory:

```
DATABASE_URL="mysql://user:password@localhost:3306/continuityops"
```

> ⚠️ `.env` is gitignored and should never be committed.

---

## 🛠 Development Setup

### Install dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

### Start Dev Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 📡 API (Current)

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

> Auth logic is currently scaffolded and will be expanded with hashing, validation, and JWT.

---

## 🔐 Security Notes (Planned)

* Password hashing with bcrypt
* JWT-based session auth
* Role-based route protection
* Input validation (Zod or Joi)
* Prisma-level query safety

---

## 🧭 Roadmap

* [ ] Complete auth (hashing + JWT)
* [ ] Role-based middleware
* [ ] Student enrollment workflow
* [ ] Counselor/admin dashboards
* [ ] Audit logging
* [ ] Docker + shadow DB (later)

---

## 🧪 Status

🟢 Backend boots successfully
🟡 Auth in progress
🔵 Database local MySQL

---

## 📜 License

MIT (subject to change)
