import  { useState, ChangeEvent, FormEvent } from "react";
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sendingOtp] = useState<boolean>(false); // State to track OTP sending

  const handleOtp = async (e: FormEvent) => {
    e.preventDefault();

    const email = sessionStorage.getItem("email");

    try {
      if (!otp) {
        setError("Please enter the OTP");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_PORT_NAME}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP verification successful");
        setError(null);
        navigate("/accountcreated");
      } else {
        setError(data.error || "Invalid OTP");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setSuccessMessage(null);
    }
  };


  return (
    <div className="bg-white bg-opacity-10 self-center flex w-[387px] max-w-full flex-col items-stretch mt-20 mb-16 px-14 py-12 rounded-xl max-md:my-10 max-md:px-5">
      <img
        loading="lazy"
        src={Rocket}
        className="aspect-square object-contain object-center w-[25px] overflow-hidden self-center max-w-full"
        alt="Rocket Icon"
      />
      <div className="text-white text-2xl font-bold self-center whitespace-nowrap mt-8">
        Create Your Account
      </div>
      <div className="text-white text-opacity-50 text-center text-sm max-w-[250px] self-center mt-14 max-md:mt-10">
        Please verify your email ID to continue. <br />
        We have sent an OTP to this email address: <br />
        <span className="text-white text-opacity-50 text-base font-bold">
          {sessionStorage.getItem("email")}
        </span>
      </div>
      <input
        type="text"
        placeholder="Enter OTP"
        style={{ color: "white", borderColor: error ? "red" : "" }}
        className="bg-neutral-800 text-white text-opacity-50 text-base whitespace-nowrap border justify-center mt-7 pl-10 pr-16 py-5 rounded-[1000px] border-solid items-start max-md:px-5"
        value={otp}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
        disabled={sendingOtp} // Disable input while sending OTP
      />
      {error && <div className="text-red-500 text-sm mt-2 mb-2">{error}</div>}
      {successMessage && <div className="text-green-500 text-sm mt-2 mb-2">{successMessage}</div>}
      <div className="justify-between bg-neutral-700 flex gap-3 mt-7 mb-5 px-20 py-4 rounded-[1000px] items-start max-md:px-5 hover:bg-neutral-900">
        <button className="text-white text-base grow whitespace-nowrap" onClick={handleOtp}>
          Continue
        </button>
      
        <img
          loading="lazy"
          src={Arrow}
          className="aspect-[1.21] object-contain object-center w-[17px] stroke-[2px] stroke-white overflow-hidden self-stretch shrink-0 max-w-full"
          alt="Arrow Icon"
        />
      </div>
    </div>
  );
}
