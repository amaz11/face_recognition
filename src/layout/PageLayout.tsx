import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SIdeBar";

const PageLayout = () => {
  const [sideBarTogle, setsideBarTogle] = useState(false);
  return (
    <div>
      <div
        className={`fixed text-white border-r top-0 left-0 w-[250px] h-full z-10 transition-all duration-700  bg-[#051725] ${sideBarTogle ? "ml-[-250px] " : ""
          }`}
      >
        <SideBar
          sideBarTogle={sideBarTogle}
          setsideBarTogle={setsideBarTogle}
        />
      </div>
      <div
        className={`${sideBarTogle ? "ml-[0px]" : "ml-[0px] md:ml-[250px]"
          } transition-all duration-700`}
      >
        <Navbar sideBarTogle={sideBarTogle} setsideBarTogle={setsideBarTogle} />
        <div className="px-4 pt-4 h-[100%] text-slate-700">
          <Outlet />
        </div>
        {sideBarTogle ? null : (
          <div
            className="block top-0 left-0 fixed md:hidden bg-black opacity-40 w-full h-full"
            onClick={() => setsideBarTogle(!sideBarTogle)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
