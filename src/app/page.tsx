import Link from "next/link";
import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const [posts, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects(),
  ]);
  const latestPosts = posts.slice(0, 3);
  const latestProjects = projects.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-[#0b1220] via-[#0a0f1a] to-[#071019] p-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Data Projects Portfolio</h1>
          <p className="max-w-prose text-muted-foreground">
            I design and build end-to-end data products — from pipelines and models to interactive visualizations.
          </p>
          <div className="flex gap-3 pt-2">
            <Link href="/projects"><Button>View Projects</Button></Link>
            <Link href="/blog"><Button variant="secondary">Read the Blog</Button></Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Posts</CardTitle>
            <CardDescription>Notes on engineering and data.</CardDescription>
          </CardHeader>
          <CardContent>
            {latestPosts.length === 0 ? (
              <p className="text-muted-foreground">No posts yet.</p>
            ) : (
              <ul className="space-y-3">
                {latestPosts.map((p) => (
                  <li key={p.slug} className="flex items-center justify-between gap-4">
                    <Link className="underline" href={`/blog/${p.slug}`}>
                      {p.meta.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">{new Date(p.meta.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-4">
              <Link href="/blog" className="text-sm underline">Go to Blog →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Selected work in analytics and ML.</CardDescription>
          </CardHeader>
          <CardContent>
            {latestProjects.length === 0 ? (
              <p className="text-muted-foreground">No projects yet.</p>
            ) : (
              <ul className="space-y-3">
                {latestProjects.map((pr) => (
                  <li key={pr.slug} className="flex items-center justify-between gap-4">
                    <Link className="underline" href={`/projects/${pr.slug}`}>
                      {pr.meta.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">{new Date(pr.meta.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-4">
              <Link href="/projects" className="text-sm underline">Go to Projects →</Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap gap-2">
        <Badge>React</Badge>
        <Badge variant="secondary">TypeScript</Badge>
        <Badge>Data Viz</Badge>
        <Badge variant="secondary">ETL</Badge>
        <Badge>Analytics</Badge>
      </section>
    </div>
  );
}
