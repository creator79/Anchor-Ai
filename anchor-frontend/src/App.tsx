import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-black flex flex-col pl-11 pr-20 pt-5 pb-12 max-md:px-5 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
