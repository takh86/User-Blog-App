/**
 * Seed runner
 * Usage:
 *   1) npm i mysql2 dotenv
 *   2) Add to package.json -> "db:seed": "node ./scripts/seed.mjs"
 *   3) Create .env (see .env.example), then: npm run db:seed
 */
import 'dotenv/config';
import fs from 'fs/promises';
import mysql from 'mysql2/promise';
import path from 'path';

async function main() {
  const {
    DB_HOST = '127.0.0.1',
    DB_PORT = '3306',
    DB_USER = 'root',
    DB_PASS = 'root',
    SEED_SQL_PATH = 'src/DB/db_init.sql',
  } = process.env;

  const sqlFile = path.resolve(process.cwd(), SEED_SQL_PATH);
  const sql = await fs.readFile(sqlFile, 'utf8');

  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASS,
    multipleStatements: true,
  });

  console.log('✅ Connected to MySQL, applying seed from:', sqlFile);
  await conn.query(sql);
  await conn.end();
  console.log('✅ Seed finished successfully.');
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
