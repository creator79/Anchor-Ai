import React, { useState, useEffect } from "react";
import PostDetails from "./PostDetails";

interface Comment {
  replies: any;
  _id: string;
  // Add other properties of the Comment type
}

interface Post {
  _id: string;
  title: string;
  comments?: Comment[];
  reples?: Comment[];
  // Add other properties of the Post type
}

const AllPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllPosts, setShowAllPosts] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT_NAME}/post/getAllPosts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setShowAllPosts(false);
  };

  const handleBackToAllPosts = () => {
    setSelectedPostId(null);
    setShowAllPosts(true);
  };

  return (
    <div className="flex flex-col items-stretch w-[65%] ml-5 max-md:w-full max-md:ml-0 flex-wrap ">
      {showAllPosts && (
        <div
          className={`bg-stone-950 flex grow flex-col items-stretch w-full pl-5 pr-3 pt-5 pb-12 rounded-xl max-md:max-w-full max-md:mt-10  ${
            selectedPostId ? "hidden" : ""
          }`}
        >
          <div className="text-white text-xl font-bold max-md:max-w-full flex flex-wrap shrink-1">
            All Post ({loading ? "Loading..." : posts.length})
          </div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white cursor-pointer bg-opacity-10 flex flex-col mt-3.5 mb-4 pl-8 pr-20 py-7 rounded-xl items-start max-md:max-w-full max-md:px-5"
              onClick={() => handlePostClick(post._id)}
            >
              <div className="text-white text-opacity-50 text-xl font-bold whitespace-nowrap">
                {post?.title}
              </div>
              <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-6">
                {post.comments ? post.comments.length : 0} Comment
                {post.comments && post.comments.length !== 1 ? "s" : ""}{" "}
                {post.comments
                  ? post.comments.reduce(
                      (totalReplies, comment) =>
                        totalReplies +
                        (comment.replies ? comment.replies.length : 0),
                      0
                    )
                  : 0}{" "}
                Reply
                {post.comments && post.comments.length !== 1 ? "s" : ""}
              </div>
            </div>
          ))}
        </div>
      )}
      {!showAllPosts && selectedPostId && (
        <PostDetails postId={selectedPostId} AllData={posts} />
      )}
      {!showAllPosts && (
        <button
          onClick={handleBackToAllPosts}
          className="text-white mt-10  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#252322] dark:hover:bg-[#0F172A] dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Back to All Posts
        </button>
      )}
    </div>
  );
};

export default AllPost;
