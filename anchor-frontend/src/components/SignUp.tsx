import React, { useState } from "react";
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PORT_NAME}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle non-successful responses here
        const errorMessage = await response.json();
        setError(errorMessage.error || "Failed to create user");
        return;
      }

      // If the request was successful, log the response and navigate to the next page
      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.error) {
        setError(responseData.error);
        return;
      }
      setError(null);

      sessionStorage.setItem("email", formData.email);
      sessionStorage.setItem("username", formData.username);
      sessionStorage.setItem("userId", responseData._id);
      navigate("/otp");
    } catch (error) {
      // Handle errors here
      console.error("Error:", error as Error);
    }
  };

  // console.log(formData.email)
  return (
    <div className="bg-white bg-opacity-10 self-center flex w-[387px] max-w-full flex-col items-center mt-20 mb-16 pl-16 pr-12 py-12 rounded-xl max-md:my-10 max-md:px-5">
      <img
        loading="lazy"
        src={Rocket}
        className="aspect-square object-contain object-center w-[25px] overflow-hidden max-w-full"
      />
      <div className="text-white text-2xl font-bold whitespace-nowrap mt-8">
        Create Your Account
      </div>
      <div className="flex flex-col ">
        <input
          type="text"
          name="username"
          placeholder="Enter Your Name"
          value={formData.username}
          onChange={handleChange}
          style={{ color: "white" }}
          className="text-white text-opacity-50 text-base whitespace-nowrap border self-stretch justify-center mt-14 pl-10 pr-16 py-5 rounded-[1000px] border-solid border-white items-start max-md:mt-10 max-md:px-5 bg-neutral-800"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email ID"
          value={formData.email}
          onChange={handleChange}
          style={{ color: "white" }}
          className="text-white text-opacity-50 text-base whitespace-nowrap border self-stretch justify-center mt-3.5 pl-10 pr-16 py-5 rounded-[1000px] border-solid border-white items-start max-md:px-5 bg-neutral-800"
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2 mb-2">{error}</div>}
      <div className="justify-between bg-neutral-700 self-stretch flex gap-3 mt-7 mb-5 px-20 py-4 rounded-[1000px] items-start max-md:px-5 hover:bg-neutral-900">
        <button
          className="text-white text-base grow whitespace-nowrap"
          onClick={handleClick}
        >
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
