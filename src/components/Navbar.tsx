
import React from "react";
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  onNewTask: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewTask }) => {
  const isMobile = useIsMobile();

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            TaskFlow
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onNewTask}
            size={isMobile ? "icon" : "default"}
            className="h-9"
          >
            <Plus className="h-4 w-4 mr-0 md:mr-2" />
            {!isMobile && <span>New Task</span>}
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
