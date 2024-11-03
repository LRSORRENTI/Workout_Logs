import WorkoutTracker from "@/components/workout-tracker";
import { Navbar } from "@/components/navbar";
export default function Home() {
  return (
    <main className="container mx-auto py-8">
        <Navbar/>
      <h1 className="sm:text-3xl lg:text-4xl font-bold text-center mb-8">Workout Tracker</h1>
      <WorkoutTracker />
    </main>
  );
}