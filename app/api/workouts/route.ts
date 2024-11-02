export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { workouts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(workouts)
      .where(eq(workouts.date, date))
      .all();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workouts" },
      { status: 500 }
    );
  }
}
// /app/api/workouts/route.ts

// /app/api/workouts/route.ts
 
// /app/api/workouts/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      date,
      workoutType,
      exerciseName,
      weight,
      setNumber,
      reps,
      duration,
    } = body;

    // Validate required fields
    if (!date || !workoutType || !exerciseName) {
      return NextResponse.json(
        {
          success: false,
          error: "Date, workout type, and exercise name are required",
        },
        { status: 400 }
      );
    }

    // Additional validation based on workout type
    if (workoutType === "Cardio") {
      if (!duration) {
        return NextResponse.json(
          { success: false, error: "Duration is required for cardio workouts" },
          { status: 400 }
        );
      }
    } else {
      if (
        weight === null ||
        weight === undefined ||
        setNumber === null ||
        setNumber === undefined ||
        reps === null ||
        reps === undefined
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Weight, set number, and reps are required for this workout type",
          },
          { status: 400 }
        );
      }
    }

    // Insert into database and return the inserted workout
    const insertedWorkout = await db
      .insert(workouts)
      .values({
        date,
        workoutType,
        exerciseName,
        weight: weight ?? null,
        setNumber: setNumber ?? null,
        reps: reps ?? null,
        duration: duration ?? null,
      })
      .returning()
      .get();

    return NextResponse.json({ success: true, data: insertedWorkout });
  } catch (error) {
    console.error("Error saving workout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save workout" },
      { status: 500 }
    );
  }
}
