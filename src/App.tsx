
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Explore from "@/components/views/Explore";
import ProjectDetail from "@/components/views/ProjectDetail";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/components/views/Dashboard";
import Investment from "@/components/views/Investment";
import Tasks from "@/components/views/Tasks";

// Create a new query client with retry configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="investment" element={<Investment />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="explore" element={<Explore />} />
            <Route path="explore/:id" element={<ProjectDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
