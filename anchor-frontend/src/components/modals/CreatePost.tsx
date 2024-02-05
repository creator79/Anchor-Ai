import  { useState } from "react";

const CreatePost = () => {
    
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");




const handlePostSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Assuming you have a valid user ID stored in localStorage
    const storedID = localStorage.getItem("userId");
    // Check if title and desc are not empty
    if (!title || !desc || !storedID) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Make an HTTP POST request to the API endpoint
      const response = await fetch(`${import.meta.env.VITE_PORT_NAME}/post/create-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          userId : storedID,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        alert("Post created successfully");
        // Clear the input fields after successful post
        setTitle("");
        setDesc("");
        
        
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again later.");
    }
  };

  return (
    <div className="ml-[5rem] bg-stone-950 flex grow flex-col flex-wrap items-stretch w-full pl-5 pr-3 pt-5 pb-12 rounded-xl max-md:max-w-full max-md:mt-10">
      <div className="text-white text-xl font-bold self-stretch max-md:max-w-full">
        Create post
      </div>
      <div className="bg-white bg-opacity-10 self-stretch justify-center ml-4 mt-8 pl-6 pr-16 py-6 rounded-xl items-start max-md:max-w-full max-md:px-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-white text-opacity-50 text-xl w-full bg-transparent outline-none border-none"
          placeholder="Post Title..."
          style={{ color: "white" }}
        />
      </div>
      <div className="bg-white bg-opacity-10 self-stretch ml-4 mt-6 pl-6 pr-16 pt-5 pb-24 rounded-xl items-start max-md:max-w-full max-md:pb-10 max-md:px-5">
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="text-white text-opacity-50 text-xl w-full bg-transparent outline-none border-none resize-none"
          placeholder="Describe your post..."
          style={{ color: "white" }}
        />
      </div>
      <button
        className="text-white text-opacity-50 text-xl whitespace-nowrap justify-center items-center bg-white bg-opacity-10 self-center w-[290px] max-w-full mt-6 mb-28 px-16 py-5 rounded-xl max-md:mb-10 max-md:px-5 hover:bg-slate-900"
        onClick={handlePostSubmit}
      >
        Post Submit
      </button>
    </div>
  );
};

export default CreatePost;
