import { revalidatePath } from "next/cache";
import CommentForm from "./CommentForm.client";
import { Heart } from "lucide-react";
import Likes from "./Likes";

async function addComment(post: any, comment: string) {
  "use server";
  try {
    const response = await fetch(
      `${process.env.REACT_API_URL}/api/comments/${post._id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post._id,
          user_id: "678a2ca3ed3ccf67279b445b",
          comment_text: comment,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to add comment");
    revalidatePath(`/post/${post.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

async function likePost(formData: FormData) {
  "use server";
  const postId = formData.get("postId");
  const slug = formData.get("slug");
  try {
    const response = await fetch(`${process.env.REACT_API_URL}/api/posts/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        user_id: "678a2ca3ed3ccf67279b445b",
      }),
    });

    if (!response.ok) throw new Error("Failed to like post");
    revalidatePath(`/post/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error liking post:", error);
    return { success: false, error: "Failed to like post" };
  }
}

export default async function BlogPostInteractions({ post }: any) {
  const commentsResponse = await fetch(`${process.env.REACT_API_URL}/api/comments/${post._id}/comments`);
  const { comments } = await commentsResponse.json();
  console.log(comments)

  const likesResponse = await fetch(`${process.env.REACT_API_URL}/api/posts/${post._id}/likes`);
  const { likes } = await likesResponse.json();


  const isLiked = likes.some((likes:any) => likes.user_id._id === '678a2ca3ed3ccf67279b445b');



  return (
    <div className="mt-8 space-y-6">
      {/* Likes Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center gap-2 text-gray-500 hover:text-primary">
            <form action={likePost}>
              <input type="hidden" name="postId" value={post._id} />
              <input type="hidden" name='slug' value={post.slug}  />
              <button type="submit" className="flex items-center gap-2">
              <Heart
          className={`h-5 w-5 ${isLiked ? "text-red-500" : "text-gray-500"}`}
        />              </button>
            </form>
            <Likes likes={likes || []} />
          </div>
        </div>

        {/* Share Button */}
        <form>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            Share
          </button>
        </form>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comments</h3>
        <div className="space-y-4">
          {comments?.length === 0 && (
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-gray-700">No comments yet</p>
            </div>
          )}
          <div className="max-h-72 overflow-y-auto">


          {comments?.length > 0 &&
            comments?.map((comment: any) => (
              <div key={comment._id} className="p-4 rounded-lg mb-2 bg-gray-50">
                <div>
                  <span className="font-semibold text-black">{comment.user_id.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-400">{comment.comment_text}</span>
                </div>
              </div>
            ))}
        </div>
          </div>

        {/* Comment Form - Client Component */}
        <CommentForm post={post} addComment={addComment} />
      </div>
    </div>
  );
}