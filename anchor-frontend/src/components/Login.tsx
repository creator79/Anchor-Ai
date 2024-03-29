// App.js
// disable eslint for this file
/* eslint-disable */
// disable typescript for this file
//@ts-nocheck
import React, { FormEvent, useState, useEffect } from "react";
import Rocket from "../assets/Rocket.svg";
import Arrow from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log("User:", user); // Log the updated user state
  }, [user]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PORT_NAME}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          // console.log(data.message);
          localStorage.setItem("token", "true");
          localStorage.setItem("username", data.message.username);
          alert("Login Successful");
          // setUser(data.message.username);
          navigate("/dashboard");
        } else {
          console.error(data.message); // Display error message
          setLoading(false);
          localStorage.setItem("token", "false");
        }
      } else {
        console.error("Error:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      setLoading(false);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: "white" }}
          className="  text-opacity-50 text-base whitespace-nowrap border self-stretch justify-center mt-14 pl-10 pr-16 py-5 rounded-[1000px] border-solid border-white items-start max-md:mt-10 max-md:px-5 text-white bg-neutral-800"
        />
      </div>

      <div className="justify-between bg-neutral-700 self-stretch flex gap-3 mt-7 mb-5 px-20 py-4 rounded-[1000px] items-start max-md:px-5 hover:bg-neutral-900">
        <button
          className="text-white text-base grow whitespace-nowrap"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <img
          loading="lazy"
          src={Arrow}
          className="aspect-[1.21] object-contain object-center w-[17px] stroke-[2px] stroke-white overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </div>
     
    </div>
  );
};

export default Login;
