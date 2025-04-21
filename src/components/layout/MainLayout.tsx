
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LayoutGrid, Wallet, ListTodo } from "lucide-react";
import Dashboard from "@/components/views/Dashboard";
import Investment from "@/components/views/Investment";
import Tasks from "@/components/views/Tasks";
import { checkAndResetTasks } from "@/utils/localStorage";

type Tab = "dashboard" | "investment" | "tasks";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Check and reset tasks on component mount (once per day)
  useEffect(() => {
    checkAndResetTasks();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "investment":
        return <Investment />;
      case "tasks":
        return <Tasks />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-16 px-4 pt-4">
        <div className="max-w-lg mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-lg z-10">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn(
            "nav-icon",
            activeTab === "dashboard" && "nav-icon-active"
          )}
          aria-label="Dashboard"
        >
          <LayoutGrid size={24} />
        </button>
        <button
          onClick={() => setActiveTab("investment")}
          className={cn(
            "nav-icon",
            activeTab === "investment" && "nav-icon-active"
          )}
          aria-label="Investment & Earnings"
        >
          <Wallet size={24} />
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={cn(
            "nav-icon",
            activeTab === "tasks" && "nav-icon-active"
          )}
          aria-label="Tasks"
        >
          <ListTodo size={24} />
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
