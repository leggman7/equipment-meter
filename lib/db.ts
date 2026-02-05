import { neon } from "@neondatabase/serverless";

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function initializeDb() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS equipment (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      hours NUMERIC NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      equipment_id INTEGER NOT NULL REFERENCES equipment(id),
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}
