// /lib/db/index.ts

import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sql } from "drizzle-orm";

const sqlite = new Database("workout-tracker.db");
export const db = drizzle(sqlite);

// Create the table if it doesn't exist
db.run(sql`
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    workout_type TEXT NOT NULL,
    exercise_name TEXT NOT NULL,
    weight INTEGER,
    set_number INTEGER,
    reps INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Check if 'duration' column exists
const columnInfo = sqlite
  .prepare("PRAGMA table_info(workouts);")
  .all();

const durationColumnExists = columnInfo.some(
  (column) => column.name === "duration"
);

if (!durationColumnExists) {
  db.run(sql`ALTER TABLE workouts ADD COLUMN duration INTEGER;`);
}
