import * as React from "react";
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { Link, useNavigate } from "react-router-dom";

export function Otp(props) {
    const navigate = useNavigate();

    const handleOtp = (e) => {
    e.preventDefault();
    navigate("/accountcreated");
   

    }
  return (
    <div className="bg-white bg-opacity-10 self-center flex w-[387px] max-w-full flex-col items-stretch mt-20 mb-16 px-14 py-12 rounded-xl max-md:my-10 max-md:px-5">
      <img
        loading="lazy"
        src={Rocket}
        className="aspect-square object-contain object-center w-[25px] overflow-hidden self-center max-w-full"
      />
      <div className="text-white text-2xl font-bold self-center whitespace-nowrap mt-8">
        Create Your Account
      </div>
      <div className="text-white text-opacity-50 text-center text-sm max-w-[250px] self-center mt-14 max-md:mt-10">
        Please verify your email ID to continue. <br />
        We have sent an OTP to this &123;&123;emailID&125;&125;
      </div>
      <input
        type="text"
        placeholder="Enter OTP"
        style={{ color: "white" }}
        className="bg-neutral-800 text-white text-opacity-50 text-base whitespace-nowrap border justify-center mt-7 pl-10 pr-16 py-5 rounded-[1000px] border-solid border-white items-start max-md:px-5"
      />

      <div className="justify-between bg-neutral-700 flex gap-3 mt-7 mb-5 px-20 py-4 rounded-[1000px] items-start max-md:px-5 hover:bg-neutral-900">
        <button className="text-white text-base grow whitespace-nowrap " onClick={handleOtp}>
          Continue
        </button>
        <img
          loading="lazy"
          src={Arrow}
          className="aspect-[1.21] object-contain object-center w-[17px] stroke-[2px] stroke-white overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </div>
    </div>
  );
}
