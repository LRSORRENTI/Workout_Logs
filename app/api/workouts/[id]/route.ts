// /app/api/workouts/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { workouts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const workoutId = Number(params.id);

    await db
      .delete(workouts)
      .where(eq(workouts.id, workoutId))
      .run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete workout" },
      { status: 500 }
    );
  }
}
