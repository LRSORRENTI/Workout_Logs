// components/navbar.tsx

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="flex items-center px-6 py-4 container mx-auto max-w-[59rem]">
      <div className="flex items-center space-x-1">
        <ModeToggle />
      </div>
    </nav>
  );
}
