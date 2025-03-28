import { GuideContent } from "../components/GuideContent";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";

export default function GuidePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900 ${theme}`}>
      <Navbar />

      <main className="flex-1 overflow-auto p-6">
        <GuideContent />
      </main>
    </div>
  );
}
