import type { Metadata } from "next";
import { BlogDetailClient } from "./BlogDetailClient";

const BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5001";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${BASE}/api/blogs/${slug}`, {
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
    return { title: "Blog Not Found" };
  }

  const title = blog.seo_title || blog.title;
  const description = blog.seo_description || blog.short_description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      images: blog.coverImage ? [{ url: blog.coverImage, alt: blog.coverImageAlt || blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
    alternates: {
      canonical: `https://navigatebusinesses.com/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <>
      {blog?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schemaMarkup }}
        />
      )}
      <BlogDetailClient slug={slug} initialBlog={blog} />
    </>
  );
}
