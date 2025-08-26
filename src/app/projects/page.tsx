import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Projects",
};

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet. Check back soon!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((proj) => (
            <Card key={proj.slug}>
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link href={`/projects/${proj.slug}`} className="underline">
                    {proj.meta.title}
                  </Link>
                </CardTitle>
                <CardDescription>{new Date(proj.meta.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              {proj.meta.summary && (
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{proj.meta.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {(proj.meta.tags ?? []).slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

