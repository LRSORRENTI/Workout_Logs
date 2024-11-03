// components/workout-display.tsx

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import type { Workout } from "@/lib/db/schema";
import { useToast } from "../hooks/use-toast"; // Adjusted import path

interface WorkoutDisplayProps {
  workouts: Workout[];
  selectedDate: Date;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
}

export function WorkoutDisplay({
  workouts,
  selectedDate,
  setWorkouts,
}: WorkoutDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast(); // Destructure toast from useToast

  // Group workouts by type and exercise
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const key = workout.workoutType;
    if (!acc[key]) {
      acc[key] = {};
    }
    if (!acc[key][workout.exerciseName]) {
      acc[key][workout.exerciseName] = [];
    }
    acc[key][workout.exerciseName].push(workout);
    return acc;
  }, {} as Record<string, Record<string, Workout[]>>);

  // Delete workout handler
  const handleDelete = async (workoutId: number) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete workout");

      // Update the workouts state
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== workoutId)
      );

      toast({
        title: "Deleted",
        description: "Workout deleted successfully!",
        variant: "destructive", // Use 'destructive' variant for deletion
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
      toast({
        title: "Error",
        description: "Failed to delete workout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        variant="outline"
        className="w-[17.5rem] mx-auto flex"
      >
        <Eye className="mr-2 h-4 w-4" />
        {isVisible ? "Hide" : "View"} Workouts
      </Button>

      {isVisible && (
        <Card className="p-6 w-[17.5rem] flex mx-auto flex-col">
          <h2 className="text-xl font-bold mb-4">
            Workouts for {format(selectedDate, "MMMM d, yyyy")}
          </h2>

          {Object.keys(groupedWorkouts).length === 0 ? (
            <p className="text-muted-foreground">
              No workouts recorded for this date.
            </p>
          ) : (
            Object.entries(groupedWorkouts).map(([type, exercises]) => (
              <div key={type} className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{type}</h3>
                {Object.entries(exercises).map(([exerciseName, sets]) => (
                  <div key={exerciseName} className="ml-4 mb-4">
                    <h4 className="font-medium mb-2">{exerciseName}</h4>
                    <div className="ml-4 space-y-1">
                      {sets.map((set) => (
                        <div
                          key={set.id}
                          className="flex items-center justify-between"
                        >
                          {set.workoutType === "Cardio" ? (
                            <p className="text-sm">
                              Duration: {set.duration} minutes
                            </p>
                          ) : (
                            <p className="text-sm">
                              Set #{set.setNumber}: {set.weight}lbs × {set.reps}{" "}
                              reps
                            </p>
                          )}
                          <button
                            onClick={() => handleDelete(set.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete set"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </Card>
      )}
    </div>
  );
}
