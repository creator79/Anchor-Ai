import  {useState} from "react";
import Add from "../assets/Add.svg";
import CreatePost from "./modals/CreatePost";
import AllPost from "./modals/AllPost";

export default function DashBoard() {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  const handleAllPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // reload page 
    setSelectedModal("allPost");
   
  };

  const handleCommentedPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement logic for Commented Post modal if needed
  };

  const handleRepliedPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement logic for Replied Post modal if needed
  };

  const handleCreatePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSelectedModal("createPost");
  };


  return (
    <div className="w-[920px] max-w-full mt-12 max-md:mt-10 ml-40">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[35%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch mt-8 max-md:mt-10">
            <button
              className="text-white text-xl font-bold whitespace-nowrap bg-white bg-opacity-30 justify-center pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5 hover:bg-slate-900"
              onClick={handleAllPost}
            >
              All Post
            </button>
            <div className="text-white text-opacity-50 text-xl whitespace-nowrap bg-white bg-opacity-10 justify-center mt-4 pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5  hover:bg-slate-900 cursor-pointer"
              onClick={handleCommentedPost}
            >
              Commented Post
            </div>
            <div className="text-white text-opacity-50 text-xl whitespace-nowrap bg-white bg-opacity-10 justify-center mt-4 pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5  hover:bg-slate-900 cursor-pointer"
            onClick={handleRepliedPost}
            >
              Replied Post
            </div>
            <div className="items-stretch border flex justify-between gap-2.5 mt-20 px-11 py-4 rounded-xl border-solid border-white border-opacity-50 max-md:mt-10 max-md:px-5  hover:bg-slate-900 cursor-pointer">
              <img loading="lazy" src={Add} />
              <div className="text-white text-opacity-50 text-xl font-bold self-center grow whitespace-nowrap my-auto"
              onClick={handleCreatePost}
              >
                Create Post
              </div>
            </div>
          </div>
        </div>
        {selectedModal === "allPost" && <AllPost />}
        {selectedModal === "createPost" && <CreatePost />}
      </div>
    </div>
  );
}
