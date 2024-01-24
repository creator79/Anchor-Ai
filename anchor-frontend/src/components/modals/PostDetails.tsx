import React, { useState, useEffect } from 'react';

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

  return (
    <div className="justify-end items-stretch bg-stone-950 flex max-w-[554px] flex-col pl-5 pr-3 pt-5 rounded-xl">
      <header className="text-white text-xl font-bold max-md:max-w-full">{`All Post (${AllData.length})`}</header>
      <div className="bg-white bg-opacity-10 flex flex-col mt-8 pt-7 pb-12 px-8 rounded-xl max-md:max-w-full max-md:px-5">
        <header className="text-white text-opacity-50 text-xl flex flex-row font-bold self-stretch max-md:max-w-full">{title}</header>
        <div className="text-white text-opacity-50 text-base self-stretch mt-5 max-md:max-w-full">{desc}</div>
        <div className="text-white text-opacity-50 text-base italic self-stretch mt-6 max-md:max-w-full">
          {`${comments.length} Comment${comments.length !== 1 ? 's' : ''} ${totalReplyCount} Reply${totalReplyCount !== 1 ? '' : ''}`}
        </div>
        <div className="text-white text-opacity-50 text-base font-bold self-stretch mt-4 max-md:max-w-full">Comments</div>

        {comments.map((comment) => (
          <div key={comment._id} className="self-stretch flex items-stretch justify-between gap-2.5 mt-6 max-md:max-w-full max-md:flex-wrap">
            <div className="text-white text-opacity-50 text-base whitespace-nowrap">{`${comment.username} :`}</div>
            <div className="text-white text-opacity-50 text-base grow shrink basis-auto">{comment.text}</div>
          </div>
        ))}

        {/* Example replies structure */}
        {comments.map((comment) =>
          comment.replies && comment.replies.length > 0 ? (
            <div key={comment._id} className="self-stretch flex-col  ml-5 flex items-stretch justify-between gap-2.5 mt-3 max-md:max-w-full max-md:flex-wrap">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="self-stretch flex gap-5 items-end flex-row">
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
