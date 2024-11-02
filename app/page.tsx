import WorkoutTracker from "@/components/workout-tracker";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Workout Tracker</h1>
      <WorkoutTracker />
    </main>
  );
}