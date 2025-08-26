import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/content";
import { ChartCard } from "@/components/data/ChartCard";

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  return { title: post?.meta.title ?? "Post" };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <div className="space-y-8">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">{post.meta.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">{new Date(post.meta.date).toLocaleDateString()}</div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      {post.meta.dataset && post.meta.dataset.length > 0 && (
        <ChartCard title="Dataset" type={post.meta.chartType ?? "line"} data={post.meta.dataset} />
      )}
    </div>
  );
}

