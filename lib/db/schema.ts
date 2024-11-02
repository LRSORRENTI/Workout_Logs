// /lib/db/schema.ts

import { InferModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const workouts = sqliteTable("workouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  workoutType: text("workout_type").notNull(),
  exerciseName: text("exercise_name").notNull(),
  weight: integer("weight"),        // Nullable by default
  setNumber: integer("set_number"), // Nullable by default
  reps: integer("reps"),            // Nullable by default
  duration: integer("duration"),    // New field for cardio duration
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Workout = InferModel<typeof workouts>;
export type NewWorkout = InferModel<typeof workouts, "insert">;
