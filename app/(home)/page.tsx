import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import PostFeed from "@/components/PostFeed";

export const metadata: Metadata = {
  title: "Blog Home Page",
  description:
    "Welcome to the blog home page where you can find all the latest posts and articles on various topics and categories",
};

async function getCategories() {
  const response = await fetch(`${process.env.REACT_API_URL}/api/categories`, {
    cache: "force-cache", // Enable caching
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data.categories;
}
async function getPosts(category: string, page: number, limit: number) {
  try {
    const query: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (category) {
      query.category = category;
    }

    const response = await fetch(
      `${process.env.REACT_API_URL}/api/posts?${new URLSearchParams(query)}`,
      { cache: "no-store" }
    );


    return await response.json();
  } catch (error: unknown) {
    // Check if the error is an instance of Error
 
  }
}

function CategoryFilter({
  categories,
  activeCategory,
}: {
  categories: any[];
  activeCategory: string;
}) {
  return (
    <div className="mb-8 bg-gray-100/75 rounded-xl p-8">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className={`inline-flex ${
            !activeCategory
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          } hover:bg-primary/90 px-3 py-1 rounded-full text-sm transition-colors`}
        >
          All
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/?category=${cat.slug}`}
            className={`inline-flex ${
              activeCategory === cat.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            } hover:bg-primary/90 px-3 py-1 rounded-full text-sm transition-colors`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string;
    page?: string;
    limit?: string;
  };
}) {
  const category = searchParams.category || "";
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  // Fetch data in parallel
  const [posts, categories] = await Promise.all([
    getPosts(category, page, limit),
    getCategories(),
  ]);

  return (
    <div>
  <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
  <div className="flex gap-5">
    {/* Main Content */}
    <div className="flex-1">
      <CategoryFilter categories={categories} activeCategory={category} />
      
      {/* Active Filters Display */}
      {category && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">
            Active filters:
          </span>
          <div className="gap-2">
            Category: {category}
            <Link href="/" className="hover:text-destructive ml-2">
              ×
            </Link>
          </div>
        </div>
      )}
      
      <PostFeed posts={posts} />
      
      {posts.posts.length <= 0 && (
        <div className="text-center w-full h-[40vh] flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">No posts found</p>
          <Image
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg"
            width={300}
            height={300}
            alt="no posts found"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>

    {/* Sidebar */}
    <div className="hidden md:block w-64">
      <div className="sticky top-8">
        <div className="rounded-md p-8 bg-slate-100/30">
          <h3 className="text-lg font-semibold mb-4">Latest Posts</h3>
          
          <div className="space-y-4">
            {posts?.posts?.map((post: any) => (
              <article key={post.id} className="group cursor-pointer">
                <Image
                  src={post.featured_image || "/api/placeholder/400/300"}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
                  {post.title}
                </h4>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
