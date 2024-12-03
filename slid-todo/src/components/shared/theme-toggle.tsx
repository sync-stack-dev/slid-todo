import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-8 h-8 p-0"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
