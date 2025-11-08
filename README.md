# S1 — Blog-App (Node.js + Express + MySQL)

Ein einfaches Backend-Projekt zum Üben von **CRUD-Operationen** und grundlegender Authentifizierung mit **Node.js + Express + MySQL (mysql2)**.
Das Projekt enthält Module für **User** und **Blog**, eine saubere Ordnerstruktur (Controllers/Services) sowie eine fertige Datenbank-Initialisierung (Seed), damit der Dienst nicht leer startet.

## 🚀 Funktionen

- Benutzerregistrierung & Login
- Benutzer abrufen / Profil anzeigen
- Blog: Erstellen / Lesen / Aktualisieren / Löschen (CRUD)
- Saubere Architektur: Controller + Services + Module
- MySQL-Seed (Schema + Beispieldaten)

## 🧱 Tech-Stack

- Node.js
- Express
- MySQL (mysql2)
- dotenv

## ⚙️ Lokale Installation & Start

1. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

2. Datenbank einrichten

   - `.env` konfigurieren
   - Seed ausführen:
     ```bash
     npm run db:seed
     ```

3. Server starten
   ```bash
   npm run dev
   ```

## 🔌 API-Übersicht

### Users

- `POST /users/signup`
- `POST /users/login`
- `GET /users/:id`
- `GET /users/profile/:id`

### Blogs

- `GET /blog`
- `GET /blog/:id`
- `POST /blog`
- `PATCH /blog/:id`
- `DELETE /blog/:id`

## 🗄️ Datenbankstruktur

- Datenbank: `blog_app`
- Tabellen: `users`, `blogs` (FK → `users.id`)

## 🧪 Postman

Postman-Collection: `postman/blog_app.postman_collection.json`

## 🌿 GitHub-Organisation

Wichtige Dateien:

- `README.md`
- `src/DB/db_init.sql`
- `scripts/seed.mjs`
- `postman/*.json`

## 🛣️ Zukünftige Erweiterungen

- JWT-Auth & Rollen
- Validation (Joi/Zod)
- Pagination & Filter
- Docker-Setup
- Tests (Jest + Supertest)
