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

// Define the structure of the column info returned by PRAGMA
interface ColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: any;
  pk: number;
}

// Fetch column information from the 'workouts' table
const columnInfo: any = sqlite
  .prepare("PRAGMA table_info(workouts);")
  .all();

// Check if 'duration' column exists
const durationColumnExists = columnInfo.some(
  (column: any) => column.name === "duration"
);

if (!durationColumnExists) {
  // Add the 'duration' column to the 'workouts' table
  db.run(sql`ALTER TABLE workouts ADD COLUMN duration INTEGER;`);
}
