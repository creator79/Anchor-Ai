
import  Arrow from "../assets/Arrow.svg";
import  Account from "../assets/Account.svg";
import {  useNavigate } from "react-router-dom";

export function AccountCreated () {
    const navigate = useNavigate();

    const handleNavigate = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate("/dashboard");

    }
  return (

    <div className="flex items-center justify-center h-screen">
      <div className="bg-white bg-opacity-10 flex w-[387px] max-w-full flex-col items-stretch mt-20 mb-16 px-14 py-12 rounded-xl max-md:my-10 max-md:px-5">
        <img
          loading="lazy"
         src={Account}
          className="aspect-square object-contain object-center w-10 overflow-hidden self-center max-w-full mt-5"
        />
        <div className="text-white text-center text-2xl font-bold mt-8">
          Account Created <br />
          Successfully
        </div>
        <div className="bg-neutral-700 flex justify-between gap-5 mt-12 mb-16 pl-9 pr-11 py-4 rounded-[1000px] items-start max-md:my-10 max-md:px-5 hover:bg-neutral-900">
     
            
          <button className="text-white text-base" onClick={handleNavigate}>Create Your First Post</button>
         
          <img
            loading="lazy"
            src={Arrow}
            className="aspect-[1.21] object-contain object-center w-[17px] stroke-[2px] stroke-white overflow-hidden self-stretch shrink-0 max-w-full"
          />
        </div>
      </div>
    </div>
    
  );
}


