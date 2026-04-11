import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft";
  createdAt: string;
}

const initialPosts: Post[] = [
  { id: "1", title: "Getting Started with GooseBumps", content: "Welcome to our platform...", status: "published", createdAt: "2026-04-10" },
  { id: "2", title: "Advanced Features Guide", content: "Learn about advanced features...", status: "published", createdAt: "2026-04-09" },
  { id: "3", title: "Upcoming Updates", content: "We're working on exciting new features...", status: "draft", createdAt: "2026-04-08" },
];

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", status: "draft" as Post["status"] });

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => {
    setEditPost(null);
    setForm({ title: "", content: "", status: "draft" });
    setDialogOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditPost(post);
    setForm({ title: post.title, content: post.content, status: post.status });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editPost) {
      setPosts((prev) => prev.map((p) => (p.id === editPost.id ? { ...p, ...form } : p)));
    } else {
      setPosts((prev) => [{ id: Date.now().toString(), ...form, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog posts</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" /> New Post</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteId(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="p-8 text-center text-muted-foreground">No posts found</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editPost ? "Edit Post" : "New Post"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Post content..."
                  rows={5}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Post["status"] })}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
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
