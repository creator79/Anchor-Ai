import * as React from "react";
import Add from "../assets/Add.svg";
export function DashBoard(props) {
  return (

  
      <div className="w-[920px] max-w-full mt-12 max-md:mt-10 ml-40">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[35%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch mt-8 max-md:mt-10">
              <div className="text-white text-xl font-bold whitespace-nowrap bg-white bg-opacity-30 justify-center pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5">
                All Post
              </div>
              <div className="text-white text-opacity-50 text-xl whitespace-nowrap bg-white bg-opacity-10 justify-center mt-4 pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5">
                Commented Post
              </div>
              <div className="text-white text-opacity-50 text-xl whitespace-nowrap bg-white bg-opacity-10 justify-center mt-4 pl-8 pr-16 py-5 rounded-xl items-start max-md:px-5">
                Replied Post
              </div>
              <div className="items-stretch border flex justify-between gap-2.5 mt-20 px-11 py-4 rounded-xl border-solid border-white border-opacity-50 max-md:mt-10 max-md:px-5">
                <img
                  loading="lazy"
                  src={Add}
                />
                <div className="text-white text-opacity-50 text-xl font-bold self-center grow whitespace-nowrap my-auto">
                  Create Post
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[65%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-stone-950 flex grow flex-col items-stretch w-full pl-5 pr-3 pt-5 pb-12 rounded-xl max-md:max-w-full max-md:mt-10">
              <div className="text-white text-xl font-bold max-md:max-w-full">
                All Post ( 10 )
              </div>
              <div className="bg-white bg-opacity-10 flex flex-col mt-8 pl-8 pr-20 py-7 rounded-xl items-start max-md:max-w-full max-md:px-5">
                <div className="text-white text-opacity-50 text-xl font-bold whitespace-nowrap">
                  This is Post Title
                </div>
                <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-6">
                  12 Comment 10 Reply
                </div>
              </div>
              <div className="bg-white bg-opacity-10 flex flex-col mt-3.5 pl-8 pr-20 py-7 rounded-xl items-start max-md:max-w-full max-md:px-5">
                <div className="text-white text-opacity-50 text-xl font-bold whitespace-nowrap">
                  This is Post 2 Title
                </div>
                <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-6">
                  1 Comment 5 Reply
                </div>
              </div>
              <div className="bg-white bg-opacity-10 flex flex-col mt-3.5 pl-8 pr-20 py-7 rounded-xl items-start max-md:max-w-full max-md:px-5">
                <div className="text-white text-opacity-50 text-xl font-bold whitespace-nowrap">
                  This is Post 3 Title
                </div>
                <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-6">
                  2 Comment 30 Reply
                </div>
              </div>
              <div className="bg-white bg-opacity-10 flex flex-col mt-3.5 mb-4 pl-8 pr-20 py-7 rounded-xl items-start max-md:max-w-full max-md:px-5">
                <div className="text-white text-opacity-50 text-xl font-bold whitespace-nowrap">
                  This is Post 4 Title
                </div>
                <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-6">
                  1 Comment 10 Reply
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}


