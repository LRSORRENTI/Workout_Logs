// components/workout-form.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Dumbbell } from "lucide-react";
import { WorkoutTypeSelect } from "./workout-type-select";
import type { Workout } from "@/lib/db/schema";

interface WorkoutFormProps {
  selectedDate: Date;
  onWorkoutAdded: (newWorkout: Workout) => void;
}

export function WorkoutForm({
  selectedDate,
  onWorkoutAdded,
}: WorkoutFormProps) {
  const [workoutType, setWorkoutType] = useState<string>("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [setNumber, setSetNumber] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !workoutType || !exerciseName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (workoutType === "Cardio") {
      if (!duration) {
        toast({
          title: "Error",
          description: "Please enter the duration for cardio workouts",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (weight === "" || setNumber === "" || reps === "") {
        toast({
          title: "Error",
          description: "Please fill in weight, set number, and reps",
          variant: "destructive",
        });
        return;
      }
    }

    const formData = {
      date: format(selectedDate, "yyyy-MM-dd"),
      workoutType,
      exerciseName,
      weight: weight === "" ? null : parseInt(weight),
      setNumber: setNumber === "" ? null : parseInt(setNumber),
      reps: reps === "" ? null : parseInt(reps),
      duration: duration === "" ? null : parseInt(duration),
    };

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save workout");

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Workout saved successfully!",
        });
      
        // Reset form
        setWorkoutType("");
        setExerciseName("");
        setWeight("");
        setSetNumber("");
        setReps("");
        setDuration("");
      
        // Add the new workout to the list in the parent component
        onWorkoutAdded(result.data);
      } else {
        throw new Error(result.error || "Failed to save workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      toast({
        title: "Error",
        description: "Failed to save workout",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workout-type">Workout Type</Label>
        <WorkoutTypeSelect value={workoutType} onValueChange={setWorkoutType} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exercise">Exercise Name</Label>
        <Input
          id="exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="e.g., Running"
        />
      </div>

      {workoutType === "Cardio" ? (
        // Render Duration Input for Cardio
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            placeholder="e.g., 30"
          />
        </div>
      ) : (
        // Render Weight, Sets, and Reps Inputs for Other Workouts
        <>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              placeholder="e.g., 70"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="setNumber">Set #</Label>
              <Input
                id="setNumber"
                type="number"
                value={setNumber}
                onChange={(e) => setSetNumber(e.target.value)}
                min="1"
                placeholder="e.g., 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reps">Reps</Label>
              <Input
                id="reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                min="1"
                placeholder="e.g., 12"
              />
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        <Dumbbell className="mr-2 h-4 w-4" />
        Save Workout
      </Button>
    </form>
  );
}
