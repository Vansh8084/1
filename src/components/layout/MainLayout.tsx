
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutGrid, Wallet, ListTodo, ArrowLeft, Plus } from "lucide-react";

const TABS = [
  { key: "dashboard", icon: LayoutGrid, route: "/" },
  { key: "investment", icon: Wallet, route: "/investment" },
  { key: "tasks", icon: ListTodo, route: "/tasks" },
  { key: "explore", icon: Plus, route: "/explore" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Determines which tab is active based on the path.
  const activeTab =
    location.pathname === "/"
      ? "dashboard"
      : location.pathname.replace("/", "");

  // Main area
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <main className="flex-1 overflow-y-auto pb-16 px-4 pt-4">
        <div className="max-w-lg mx-auto">
          {/* This is where the route content is rendered */}
          <Outlet />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-lg z-10">
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
