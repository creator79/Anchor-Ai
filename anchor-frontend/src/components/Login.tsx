import React, { FormEvent, useState } from "react";
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Fixing type issue
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT_NAME}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          console.log(data.message);
          sessionStorage.setItem("token", "true");
          // Navigate to dashboard if email is found
          // window.location.reload();
          navigate("/dashboard");
        } else {
          console.error(data.message); // Display error message
          sessionStorage.setItem("token", "false");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 self-center flex w-[387px] max-w-full flex-col items-center mt-20 mb-16 pl-16 pr-12 py-12 rounded-xl max-md:my-10 max-md:px-5">
      <img
        loading="lazy"
        src={Rocket}
        className="aspect-square object-contain object-center w-[25px] overflow-hidden max-w-full"
      />
      <div className="text-white text-2xl font-bold whitespace-nowrap mt-8">
        Login Into Account
      </div>
      <div className="flex flex-col ">
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email} // Fixing where email is set from UI
          onChange={(e) => setEmail(e.target.value)} // Fixing types and eslint issues
          style={{ color: "white" }}
          className="  text-opacity-50 text-base whitespace-nowrap border self-stretch justify-center mt-14 pl-10 pr-16 py-5 rounded-[1000px] border-solid border-white items-start max-md:mt-10 max-md:px-5 text-white bg-neutral-800"
        />
      </div>

      <div className="justify-between bg-neutral-700 self-stretch flex gap-3 mt-7 mb-5 px-20 py-4 rounded-[1000px] items-start max-md:px-5 hover:bg-neutral-900">
        <button className="text-white text-base grow whitespace-nowrap" onClick={handleLogin}>
          Login
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

export default Login;
