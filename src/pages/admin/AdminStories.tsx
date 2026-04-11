import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Pencil, Search, X, Users, Trophy, Save } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Story {
  id: string;
  name: string;
  story: string;
  fullStory: string;
  image: string;
}

const playerSeed: Story[] = [
  { id: "1", name: "Ravi Kumar", story: "From beginner to national player in 2 years.", fullStory: "Ravi joined Goosebumps as a complete newcomer...", image: "" },
  { id: "2", name: "Priya Sharma", story: "Breaking barriers in women's ultimate frisbee.", fullStory: "Priya's journey started when she saw a flyer...", image: "" },
];

const teamSeed: Story[] = [
  { id: "1", name: "The Underdogs", story: "A team that proved everyone wrong.", fullStory: "Formed from scratch in 2022...", image: "" },
];

export default function AdminStories({ type }: { type: "player" | "team" }) {
  const [stories, setStories] = useState<Story[]>(type === "player" ? playerSeed : teamSeed);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", story: "", fullStory: "", image: "" });

  const Icon = type === "player" ? Users : Trophy;
  const label = type === "player" ? "Player Stories" : "Team Stories";

  const filtered = stories.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => {
    setEditStory(null);
    setForm({ name: "", story: "", fullStory: "", image: "" });
    setDialogOpen(true);
  };

  const openEdit = (s: Story) => {
    setEditStory(s);
    setForm({ name: s.name, story: s.story, fullStory: s.fullStory, image: s.image });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editStory) {
      setStories(prev => prev.map(s => s.id === editStory.id ? { ...s, ...form } : s));
    } else {
      setStories(prev => [{ id: Date.now().toString(), ...form }, ...prev]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setStories(prev => prev.filter(s => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Icon className="w-7 h-7" /> {label} Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage {type} impact stories and testimonials</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" /> Add Story</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search stories..." className="pl-9" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              {s.image && <img src={s.image} alt={s.name} className="w-full h-32 object-cover rounded-md mb-3" />}
              <h3 className="font-semibold text-foreground mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{s.story}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(s)}><Pencil className="h-3 w-3 mr-1" /> Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteId(s.id)}><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center py-8 text-muted-foreground">No stories found</p>}
      </div>

      {/* Edit/Create Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">{editStory ? "Edit Story" : "New Story"}</h2>
                <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)}><X className="h-4 w-4" /></Button>
              </div>
              <Input placeholder={type === "player" ? "Player Name" : "Team Name"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <textarea
                placeholder="Short story preview"
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
              <textarea
                placeholder="Full story"
                value={form.fullStory}
                onChange={(e) => setForm({ ...form, fullStory: e.target.value })}
                rows={6}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Story?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
