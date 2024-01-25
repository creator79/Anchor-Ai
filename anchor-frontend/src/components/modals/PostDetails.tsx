import React, { useState, useEffect } from "react";
import Send from "../../assets/send2.png";

interface Post {
  _id: string;
  title: string;
  desc: string;
  comments?: Comment[];
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
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleComment = async () => {
    try {
      const storedID = sessionStorage.getItem("userId");
      const response = await fetch("http://localhost:8000/post/add-comment", {
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
  
      // Reset comment text and close input
      setCommentText("");
      toggleCommentInput();
      
      // Fetch updated post data after adding comment
      const updatedPostResponse = await fetch(`http://localhost:8000/post/getpost/${postId}`);
      if (!updatedPostResponse.ok) {
        throw new Error("Failed to fetch updated post data");
      }
      const updatedPost = await updatedPostResponse.json();
      
      // Map comments data to the expected format
      const commentsData = updatedPost.comments.map(comment => ({
        _id: comment._id,
        text: comment.text,
        username: comment.user.username
      }));
  
      // Update the state with the new post data including comments
      setPostData({
        ...updatedPost,
        comments: commentsData
      });
  
      alert("Comment Added");
    } catch (error) {
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
          <div
            className="text-white text-opacity-50 text-base font-bold self-stretch mt-4 max-md:max-w-full cursor-pointer hover:text-white"
            onClick={toggleReplyInput}
          >
            Reply
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
          <div
            key={comment._id}
            className="self-stretch flex items-stretch justify-between gap-2.5 mt-6 max-md:max-w-full max-md:flex-wrap"
          >
            <div className="text-white text-opacity-50 text-base whitespace-nowrap">{`${comment.username} :`}</div>
            <div className="text-white text-opacity-50 text-base grow shrink basis-auto">
              {comment.text}
            </div>
          </div>
        ))}

        {/* Input box for replies */}
        {showReplyInput && (
          <div className="mt-4 max-md:max-w-full flex flex-row ">
            <input type="text" placeholder=" Add Your Reply"  className="outline-none bg-[#252322] rounded w-full text-white px-2 py-2 mr-2 "/>
            <img src={Send} alt="" className="w-6 h-6 mt-2 cursor-pointer" />
          </div>
        )}

        {/* Example replies structure */}
        {comments.map((comment) =>
          comment.replies && comment.replies.length > 0 ? (
            <div
              key={comment._id}
              className="self-stretch flex-col  ml-5 flex items-stretch justify-between gap-2.5 mt-3 max-md:max-w-full max-md:flex-wrap"
            >
              {comment.replies.map((reply) => (
                <div
                  key={reply._id}
                  className="self-stretch flex gap-5 items-end flex-row"
                >
                  <div className="text-white ml-20 text-opacity-50 text-base whitespace-nowrap">{`${reply.username} :`}</div>
                  <div className="text-white text-opacity-50 text-base self-stretch grow whitespace-nowrap">{`${reply.text}`}</div>
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PostDetails;
