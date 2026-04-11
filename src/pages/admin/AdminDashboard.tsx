import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Eye, TrendingUp, Calendar, Trophy, Image as ImageIcon } from "lucide-react";

const stats = [
  { label: "Total Posts", value: "24", icon: FileText, change: "+3 this week" },
  { label: "Total Users", value: "156", icon: Users, change: "+12 this month" },
  { label: "Page Views", value: "2.4k", icon: Eye, change: "+18% vs last week" },
  { label: "Engagement", value: "68%", icon: TrendingUp, change: "+5% vs last month" },
];

const contentCards = [
  { title: "Events", icon: Calendar, desc: "Manage events, tournaments, and competitions.", count: "12 events", to: "/admin/events" },
  { title: "Player Stories", icon: Users, desc: "Manage player impact stories and testimonials.", count: "8 stories", to: "/admin/player-stories" },
  { title: "Team Stories", icon: Trophy, desc: "Manage team achievements and collective stories.", count: "5 stories", to: "/admin/team-stories" },
  { title: "Image Gallery", icon: ImageIcon, desc: "Manage image galleries and photo collections.", count: "Gallery", to: "/admin/images" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to GooseBumps admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Management */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Content Management</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentCards.map((card) => (
            <Card key={card.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <card.icon className="w-5 h-5 text-primary" />
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{card.count}</span>
                  <Button size="sm" asChild>
                    <Link to={card.to}>Manage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { text: "New post published: 'Getting Started Guide'", time: "2m ago" },
              { text: "User john_doe registered", time: "1h ago" },
              { text: "Post 'React Tips' received 5 new comments", time: "3h ago" },
              { text: "System backup completed", time: "1d ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-foreground">{activity.text}</span>
                <span className="ml-auto text-muted-foreground text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
