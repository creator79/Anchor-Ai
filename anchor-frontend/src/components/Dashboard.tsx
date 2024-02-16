import { useState } from "react";
import Add from "../assets/Add.svg";
import CreatePost from "./modals/CreatePost";
import AllPost from "./modals/AllPost";

export default function DashBoard() {
  const [selectedModal, setSelectedModal] = useState<string>("allPost"); // Set "allPost" as default

  const handleAllPost = (e) => {
    e.preventDefault();
    setSelectedModal("allPost");
  };

  const handleCommentedPost = (e) => {
    e.preventDefault();
    setSelectedModal("commentedPost");
  };

  const handleRepliedPost = (e) => {
    e.preventDefault();
    setSelectedModal("repliedPost");
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    setSelectedModal("createPost");
  };

  return (
    <div className="w-full max-w-full mt-12 max-md:mt-10 flex justify-center">
      <div className="flex flex-col items-center max-w-[920px] max-md:w-full max-md:ml-0">
        <button
          className={`text-white text-xl font-bold ${
            selectedModal === "allPost"
              ? "bg-slate-900"
              : "bg-white bg-opacity-30 hover:bg-slate-900"
          } justify-center w-full max-w-[300px] px-8 py-5 rounded-xl mb-4 md:mb-6 md:mr-6 md:w-auto`}
          onClick={handleAllPost}
        >
          All Post
        </button>
        <button
          className="text-white text-xl font-bold bg-white bg-opacity-30 hover:bg-slate-900 justify-center w-full max-w-[300px] px-8 py-5 rounded-xl mb-4 md:mb-6 md:mr-6 md:w-auto"
          onClick={handleCommentedPost}
        >
          Commented Post
        </button>
        <button
          className="text-white text-xl font-bold bg-white bg-opacity-30 hover:bg-slate-900 justify-center w-full max-w-[300px] px-8 py-5 rounded-xl mb-4 md:mb-6 md:mr-6 md:w-auto"
          onClick={handleRepliedPost}
        >
          Replied Post
        </button>
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center text-white text-xl font-bold bg-white bg-opacity-30 hover:bg-slate-900 justify-center px-8 py-5 rounded-xl md:px-10"
            onClick={handleCreatePost}
          >
            <img loading="lazy" src={Add} className="mr-2" alt="Add" />
            Create Post
          </button>
        </div>
      </div>
      {selectedModal === "allPost" && <AllPost />}
      {selectedModal === "createPost" && <CreatePost />}
    </div>
  );
}
