import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Blog",
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link href={`/blog/${post.slug}`} className="underline">
                    {post.meta.title}
                  </Link>
                </CardTitle>
                <CardDescription>{new Date(post.meta.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              {post.meta.summary && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.meta.summary}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

