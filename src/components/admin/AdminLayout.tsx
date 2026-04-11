import { useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Trophy,
  Image as ImageIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/player-stories", label: "Player Stories", icon: Users },
  { to: "/admin/team-stories", label: "Team Stories", icon: Trophy },
  { to: "/admin/images", label: "Image Gallery", icon: ImageIcon },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const { isAuthenticated, adminUsername, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/admin/login") {
      navigate("/admin/login", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar-background flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-display text-sm font-bold tracking-tight text-sidebar-foreground block">GOOSEBUMPS</span>
              <span className="text-[10px] text-muted-foreground tracking-widest">ADMIN PORTAL</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">{adminUsername || "Admin"}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => { logout(); navigate("/admin/login"); }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
