import React, { useState, useEffect } from "react";
import Send from "../../assets/send2.png";

interface Post {
  _id: string;
  title: string;
  desc: string;
  comments?: Comment[];
  replies?: Reply[];
}

interface Comment {
  _id: string;
  username: string;
  text: string;
  replies?: Reply[];
}

interface Reply {
  _id: string;
  username: string;
  text: string;
}

interface PostDetailsProps {
  AllData: Post[];
  postId: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ AllData, postId }) => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);

  useEffect(() => {
    // Find the post with the given postId from AllData
    const post = AllData.find((post) => post._id === postId);

    // Set the post data in the state
    setPostData(post || null);
  }, [AllData, postId]);

  if (!postData) {
    // If post data is not available, you can return a loading state or handle it accordingly
    return <div>Loading...</div>;
  }

  const { title, desc, comments = [] } = postData;

  const totalReplyCount = comments.reduce(
    (totalReplies, comment) =>
      totalReplies + (comment.replies ? comment.replies.length : 0),
    0
  );

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleComment = async (): Promise<void> => {
    try {
      const storedID: string | null = localStorage.getItem("userId");
      if (!storedID) {
        throw new Error("User ID not found in session storage");
      }

      const response = await fetch(`${import.meta.env.VITE_PORT_NAME}/post/add-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: storedID,
          text: commentText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // Reset comment text
      setCommentText("");

      // Fetch updated post data after adding comment
      const updatedPostResponse = await fetch(
        `${import.meta.env.VITE_PORT_NAME}/post/getpost/${postId}`
      );
      if (!updatedPostResponse.ok) {
        throw new Error("Failed to fetch updated post data");
      }
      const updatedPost: Post = await updatedPostResponse.json();

      // Map comments data to the expected format
      const commentsData: Comment[] = (updatedPost.comments ?? []).map(
        (comment: any) => ({
          _id: comment._id,
          text: comment.text,
          username: comment.user.username,
        })
      );

      // Update the state with the new post data including comments
      setPostData({
        ...updatedPost,
        comments: commentsData,
      });

      alert("Comment Added");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleReply = async (commentId: string): Promise<void> => {
    try {
      const storedID: string | null = localStorage.getItem("userId");
      if (!storedID) {
        throw new Error("User ID not found in session storage");
      }

      const response = await fetch(`http://localhost:8000/post/add-reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: storedID,
          text: commentText,
          commentId: commentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add reply");
      }

      // Reset comment text
      setCommentText("");

      // Fetch updated post data after adding reply
      const updatedPostResponse = await fetch(
        `${import.meta.env.VITE_PORT_NAME}/post/getReply/${commentId}`
      );
      if (!updatedPostResponse.ok) {
        throw new Error("Failed to fetch updated post data");
      }
      const updatedPost: Post = await updatedPostResponse.json();

    //   {
    //     "replies": [
    //         {
    //             "_id": "65b160ede9357ab952385940",
    //             "text": " This is Mansi  Comment 🌈",
    //             "user": {
    //                 "_id": "65b15a4bbb4c2713615d2dcd",
    //                 "username": "Ankush"
    //             }
    //         },
    //         {
    //             "_id": "65b163c819f75ae27aedab6e",
    //             "text": " One More Reply for this comment ⚓",
    //             "user": {
    //                 "_id": "65b15a4bbb4c2713615d2dcd",
    //                 "username": "Ankush"
    //             }
    //         },
    //         {
    //             "_id": "65b163dd19f75ae27aedab75",
    //             "text": " One More Reply for this comment ✨",
    //             "user": {
    //                 "_id": "65b15a4bbb4c2713615d2dcd",
    //                 "username": "Ankush"
    //             }
    //         },
    //         {
    //             "_id": "65b23636bae4ace4c3b26f44",
    //             "text": "",
    //             "user": {
    //                 "_id": "65b2130c7c6a561a36ba321a",
    //                 "username": "Mitali"
    //             }
    //         }
    //     ]
    // }
      // Map replies data to the expected format
      const repliesData: Reply[] = (updatedPost.replies ?? []).map((reply: any) => ({
        _id: reply._id,
        text: reply.text,
        username: reply.user.username,
      }));

      // Update the state with the new post data including replies
      setPostData({
        ...postData,
        comments: postData.comments?.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: repliesData,
            };
          }
          return comment;
        }),
      });

      // Reset replyCommentId 
      setReplyCommentId(null);
      alert("Reply Added");
    } catch (error: any) {
      setError(error.message);
    }
  };

 

  return (
    <div className="justify-end items-stretch bg-stone-950 flex max-w-[554px] flex-col pl-5 pr-3 pt-5 rounded-xl">
      <header className="text-white text-xl font-bold max-md:max-w-full">{`All Post (${AllData.length})`}</header>
      <div className="bg-white bg-opacity-10 flex flex-col mt-8 pt-7 pb-12 px-8 rounded-xl max-md:max-w-full max-md:px-5">
        <header className="text-white text-opacity-50 text-xl flex flex-row font-bold self-stretch max-md:max-w-full">
          {title}
        </header>
        <div className="text-white text-opacity-50 text-base self-stretch mt-5 max-md:max-w-full">
          {desc}
        </div>
        <div className="text-white text-opacity-50 text-base italic self-stretch mt-6 max-md:max-w-full">
          {`${comments.length} Comment${
            comments.length !== 1 ? "s" : ""
          } ${totalReplyCount} Reply${totalReplyCount !== 1 ? "" : ""}`}
        </div>
        <div className="flex flex-row gap-6">
          <div
            className="text-white text-opacity-50 text-base font-bold self-stretch mt-4 max-md:max-w-full cursor-pointer hover:text-white"
            onClick={toggleCommentInput}
          >
            Comments
          </div>
        </div>

        {/* Input box for comments */}
        {showCommentInput && (
          <div className="mt-4 max-md:max-w-full flex flex-row ">
            <input
              type="text"
              placeholder="Type your comment"
              className="outline-none bg-[#252322] rounded w-full text-white px-2 py-2 mr-2 "
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <img
              src={Send}
              alt=""
              className="w-6 h-6 mt-2 cursor-pointer"
              onClick={handleComment}
            />
          </div>
        )}

        {/* Error handling */}
        {error && <div className="text-red-500 mt-2">{error}</div>}

    


        {/* Display comments */}
        {comments.map((comment) => (
          <div key={comment._id} className="ml-2 mt-4">
            <div className="ml-4">
              <div className="text-base text-white  text-opacity-50">{`${comment.username} : ${comment.text}`}</div>
              {/* Display reply button */}
              <button
                className="ml-4 mt-2 text-white text-sm underline"
                onClick={() => setReplyCommentId(comment._id === replyCommentId ? null : comment._id)}
              >
                Reply
              </button>
              {/* Show reply input box if replyCommentId matches current comment id */}
              {replyCommentId === comment._id && (
                <div className="mt-2 ml-8 flex flex-row">
                  <input
                    type="text"
                    placeholder="Type your reply"
                    className="outline-none bg-[#252322] rounded w-full text-white px-2 py-2 mr-2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <img
                    src={Send}
                    alt=""
                    className="w-6 h-6 mt-2 cursor-pointer"
                    onClick={() => handleReply(comment._id)}
                  />
                </div>
              )}
              {/* Display replies nested under comments */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="ml-4">
                      <div className="text-base text-white  text-opacity-50">{`${reply.username} : ${reply.text}`}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;