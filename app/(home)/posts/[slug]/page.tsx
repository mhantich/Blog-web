import { notFound } from "next/navigation"; // To handle 404
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import BlogPostInteractions from "@/components/BlogPostInteractions";

export default async function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch the detailed post
  let post;
  let error = null;

  try {
    const response = await fetch(`${process.env.REACT_API_URL}/api/posts/${slug}`, {
      cache: "no-store", // Ensure the latest data
    });

    if (!response.ok) {
      throw new Error("Post not found");
    }

    post = await response.json();
  } catch (err: any) {
    error = err.message;
  }

  // If the post is not found, show a 404 page
  if (!post || error) {
    return notFound();
  }

  return (
    <div className="max-w-4xl bg-white/70 mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-muted-foreground mb-4">{post.description}</p>
      <Image
        src={post.featured_image}
        alt={post.title}
        width={800}
        height={600}
        className="w-full h-64 object-cover  rounded-lg mb-6"
      />
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block bg-primary text-white text-xs font-medium py-1 px-2 rounded-full mr-2">
          {post.category_id}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 text-muted-foreground text-sm mb-6">
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
          {" "}
          <Eye /> <span className="text-primary"> {post.views}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Published on {post.created_at} by {post.author}
        </p>
      </div>

      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>


      <BlogPostInteractions post={post} />
    </div>
  );
}
