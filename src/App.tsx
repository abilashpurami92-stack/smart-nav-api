import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index.tsx";
import AboutGame from "./pages/AboutGame.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminPosts from "./pages/admin/AdminPosts.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";
import AdminStories from "./pages/admin/AdminStories.tsx";
import AdminImages from "./pages/admin/AdminImages.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-game" element={<AboutGame />} />

            {/* Admin Portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="player-stories" element={<AdminStories type="player" />} />
              <Route path="team-stories" element={<AdminStories type="team" />} />
              <Route path="images" element={<AdminImages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
