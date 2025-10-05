# 🚀 Simple Search Engine (TF-IDF + Cosine) — Linux Documentation IR

A step-by-step Information Retrieval system built with Nuxt 4, TypeScript, Prisma, and PostgreSQL. Supports both local PostgreSQL and DDEV-managed PostgreSQL for development.

---

## 🛠️ Features

- Upload and search Linux documentation (PDF/TXT)
- Custom TF-IDF + Cosine Similarity ranking
- Fuzzy search for typo tolerance 
- Modern Nuxt 4 frontend (Vue 3, TailwindCSS)
- Type-safe backend with Prisma ORM

---

## ⚡ Quick Start

### 1. Clone the Repository

```sh
git clone https://github.com/tudeorangbiasa/simple-search-engine.git
cd simple-search-engine
```

### 2. Install Dependencies

```sh
npm install
```

---

## 🗄️ Database Setup

You can use **local PostgreSQL** or **DDEV PostgreSQL**.

### Option A: Local PostgreSQL

1. **Start PostgreSQL** (ensure it's running on `localhost:5432`)
2. **Create a database** (e.g., `db`)
3. **Copy `.env.example` to `.env`** and set:

	```
	DATABASE_URL="postgresql://postgres:password@localhost:5432/db?schema=public"
	```

4. **Run Prisma migrations:**

	```sh
	npx prisma generate
	npx prisma migrate dev
	```

---

### Option B: DDEV PostgreSQL

1. **Install [DDEV](https://ddev.readthedocs.io/en/stable/)**
2. **Start DDEV:**

	```sh
	ddev start
	```

3. **Copy `.env.example` to `.env`** and set:

	```
	DATABASE_URL="postgresql://db:db@127.0.0.1:32771/db?schema=public" 
	```

	> If you use a custom port, check with `ddev describe` and update the port in `DATABASE_URL`.

4. **Run Prisma migrations (on your host, not inside DDEV):**

	```sh
	npx prisma generate
	npx prisma migrate dev
	```

---

## Docs (data development)

Example documents for testing are located in the `Docs` directory.

## 🏗️ Development

Start the Nuxt app locally:

```sh
npm run dev
```

- App: http://localhost:3000

---

## 📝 Useful Commands

- **Reset DB:**  
  `npx prisma migrate reset`

---


## 🐳 Troubleshooting

- If you get connection errors, check your `DATABASE_URL` and ensure the DB is running.
- For DDEV, use `ddev describe` to see DB connection info.
- For local DB, ensure user/password/database match your local setup.

