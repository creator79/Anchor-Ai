
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="items-stretch border shadow-sm self-center flex gap-4 mt-28 px-4 py-2 rounded-[1000px] border-solid border-zinc-800 max-md:mt-10 max-md:pr-5">
        <img
          loading="lazy"
          src={Rocket}
          className="aspect-square object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="text-white text-sm self-center grow whitespace-nowrap my-auto">
          For Indian Users Only
        </div>
      </div>
      <div className="text-white text-center text-5xl font-bold self-center max-w-[756px] mt-10 max-md:max-w-full max-md:text-4xl max-md:mt-10">
        Start posting anonymously where no one will judge.
      </div>
      <div className="text-white text-center text-xl self-center mt-9">
        Welcome to Stranger discussion forum
      </div>
      <div className="justify-between bg-neutral-700 self-center flex gap-5 mt-16 px-10 py-4 rounded-[1000px] items-start max-md:mt-10 max-md:px-5 hover:bg-neutral-900 ">
        <Link to="/signup">
          <button className="text-white text-base">Create Your Account</button>
        </Link>
        <img
          loading="lazy"
          src={Arrow}
          className="aspect-[1.21] object-contain object-center w-[17px] stroke-[2px] stroke-white overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </div>
      <div className="text-white text-center text-base underline self-center w-[575px] mt-4 mb-16 max-md:mb-10 cursor-pointer">
        Already have account?{" "}
        <span className="underline hover:text-blue-700" onClick={handleClick}>
          Login
        </span>
      </div>
    </>
  );
}
