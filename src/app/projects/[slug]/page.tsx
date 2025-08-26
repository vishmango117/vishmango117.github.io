import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const proj = await getProjectBySlug(params.slug);
  return { title: proj?.meta.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const proj = await getProjectBySlug(params.slug);
  if (!proj) return notFound();
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">{proj.meta.title}</h1>
      <div className="text-sm text-gray-500 mb-6">{new Date(proj.meta.date).toLocaleDateString()}</div>
      <div dangerouslySetInnerHTML={{ __html: proj.contentHtml }} />
    </article>
  );
}

