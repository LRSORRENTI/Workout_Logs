"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const workoutTypes = [
  "Back/Biceps",
  "Cardio",
  "Chest/Tri/Shoulders",
  "Legs",
  "Abs",
] as const;

interface WorkoutTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function WorkoutTypeSelect({ value, onValueChange }: WorkoutTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select workout type" />
      </SelectTrigger>
      <SelectContent>
        {workoutTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}