import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-primary to-secondary p-[2px] rounded-lg shadow-xl">
          <div className="bg-card rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
              <p className="text-muted-foreground text-sm mt-1">GooseBumps Administration</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-foreground">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring outline-none"
                  />
                </div>
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors">
                Sign In
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">Default: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
