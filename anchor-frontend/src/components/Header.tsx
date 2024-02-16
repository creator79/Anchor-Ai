import { useState, useEffect } from "react";
import Logo from "../assets/image.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && name === "") {
      setName(storedUsername);
    }
  }, [name, location]); // Re-render Header when location changes

  const handleLogout = () => {
    // Clear session storage and reset name
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setName("");
    navigate("/");
  };

  return (
    <>
      <div className="flex w-full max-w-[1195px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex items-stretch justify-between gap-5 cursor-pointer">
          <img
            loading="lazy"
            src={Logo}
            className="aspect-[1.05] object-contain object-center w-[42px] overflow-hidden shrink-0 max-w-full"
          />
          <div
            className="text-white text-xl font-bold my-auto"
            onClick={() => navigate("/")}
          >
            ANONYMOUS
          </div>
        </div>
        <div className="flex items-stretch justify-end gap-4">
          {name ? (
            <div className="text-white ml-[12rem] text-xl font-bold my-auto">
              {name}
            </div>
          ) : (
            <div className="text-white ml-[12rem] text-xl font-bold my-auto">
              Welcome, {!name ? "User" : name}
            </div>
          )}
          <button
            className="text-white ml-5  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#252322] dark:hover:bg-[#0F172A] dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
