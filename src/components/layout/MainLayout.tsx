
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutGrid, Wallet, ListTodo, Compass } from "lucide-react";
import logo from "@/assets/logo.jpg";

const TABS = [
  { key: "dashboard", icon: LayoutGrid, route: "/" },
  { key: "investment", icon: Wallet, route: "/investment" },
  { key: "tasks", icon: ListTodo, route: "/tasks" },
  { key: "explore", icon: Compass, route: "/explore" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === "/" ? "dashboard" : location.pathname.replace("/", "");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <main className="flex-1 overflow-y-auto pb-16 px-4 pt-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="DropDeck" className="h-10 w-10 rounded-lg object-cover" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DropDeck</h1>
                <p className="text-sm text-gray-500">Track & earn rewards</p>
              </div>
            </div>
          </div>
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
