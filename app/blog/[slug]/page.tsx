import type { Metadata } from "next";
import { BlogDetailClient } from "./BlogDetailClient";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found | Navigate Business" };
  }

  return {
    title: `${blog.title} | Navigate Business`,
    description: blog.short_description || "Read our blog post",
    openGraph: {
      title: blog.title,
      description: blog.short_description,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
