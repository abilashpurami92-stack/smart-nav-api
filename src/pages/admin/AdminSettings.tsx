import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, KeyRound, Shield } from "lucide-react";

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "password", label: "Password", icon: KeyRound },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminSettings() {
  const { adminUsername, changePassword } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    if (newPassword !== confirmPassword) { setMessage({ text: "Passwords don't match", type: "error" }); return; }
    if (newPassword.length < 6) { setMessage({ text: "Password must be at least 6 characters", type: "error" }); return; }
    if (changePassword(oldPassword, newPassword)) {
      setMessage({ text: "Password changed successfully", type: "success" });
      setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    } else {
      setMessage({ text: "Current password is incorrect", type: "error" });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin account</p>
      </div>

      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "account" && (
        <Card>
          <CardHeader><CardTitle>Account Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground">{adminUsername || "Admin"}</p>
                <p className="text-sm text-muted-foreground">Administrator</p>
              </div>
            </div>
            <div><label className="text-sm font-medium text-foreground">Username</label><Input value={adminUsername || "admin"} disabled /></div>
            <div><label className="text-sm font-medium text-foreground">Role</label><Input value="Administrator" disabled /></div>
          </CardContent>
        </Card>
      )}

      {activeTab === "password" && (
        <Card>
          <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div><label className="text-sm font-medium text-foreground">Current Password</label><Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground">New Password</label><Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground">Confirm New Password</label><Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
              {message.text && <p className={`text-sm ${message.type === "error" ? "text-destructive" : "text-green-500"}`}>{message.text}</p>}
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "security" && (
        <Card>
          <CardHeader><CardTitle>Session Security</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2"><span className="text-sm text-foreground">Session Duration</span><span className="text-sm text-muted-foreground">1 hour</span></div>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-foreground">Auto-logout</span><span className="text-sm text-muted-foreground">After 1 hour of inactivity</span></div>
            <p className="text-xs text-muted-foreground mt-4">Your admin session persists until you sign out or 1 hour expires.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
