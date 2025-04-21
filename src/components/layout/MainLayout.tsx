
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutGrid, Wallet, ListTodo, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const TABS = [
  { key: "dashboard", icon: LayoutGrid, route: "/" },
  { key: "investment", icon: Wallet, route: "/investment" },
  { key: "tasks", icon: ListTodo, route: "/tasks" },
  { key: "explore", icon: Plus, route: "/explore" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine active tab based on path
  const activeTab = location.pathname === "/" ? "dashboard" : location.pathname.replace("/", "");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <main className="flex-1 overflow-y-auto pb-16 px-4 pt-4">
        <div className="max-w-lg mx-auto">
          {/* Theme toggle button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <Outlet />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center shadow-lg z-10 transition-colors duration-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={cn(
                "nav-icon",
                activeTab === tab.key && "nav-icon-active"
              )}
              aria-label={tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainLayout;
