import React, { Suspense } from "react";
import {
  BookOpen,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Loading from "@/app/(home)/loading";
import Link from "next/link";

function PostFeed({ posts }: any) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {posts?.posts?.map((post: any) => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow-b-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {new Date(post.publish_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-6">
                      <Link href={`/posts/${post.slug}`}>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm">{post.likes_count === 0 ? 0 : post.likes_count}</span>
                    </button>

                      </Link>
                      <Link href={`/posts/${post.slug}`}>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">
                          {post.comments_count === 0 ? 0 : post.comments_count}
                        </span>
                    </button>
                      </Link>
                      <Link href={`/posts/${post.slug}`}>

                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors duration-200">
                        <Share2 className="h-5 w-5" />
                    </button>
                      </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <BookOpen className="h-4 w-4" />
                      {Math.ceil(post.content.split(" ").length / 200)} min read
                    </span>

                    <Link
                      href={`/posts/${post.slug}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span className="text-sm">Read more</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Suspense>
  );
}

export default PostFeed;
