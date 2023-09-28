import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SIdeBar";

const PageLayout = () => {
  const [sideBarTogle, setsideBarTogle] = useState(false);
  return (
    <div>
      <div
        className={`fixed bg-white border-r top-0 left-0 w-[250px] h-full z-10 transition-all duration-700 ${
          sideBarTogle ? "ml-[-250px] " : ""
        }`}
      >
        <SideBar
          sideBarTogle={sideBarTogle}
          setsideBarTogle={setsideBarTogle}
        />
      </div>
      <div
        className={`${
          sideBarTogle ? "ml-[0px]" : "ml-[0px] md:ml-[250px]"
        } transition-all duration-700`}
      >
        <Navbar sideBarTogle={sideBarTogle} setsideBarTogle={setsideBarTogle} />
        <div className="px-4 pt-4">
          <Outlet />
        </div>
        {sideBarTogle ? null : (
          <div
            className="bg-black opacity-40 fixed w-full h-full top-0 left-0 block md:hidden "
            onClick={() => setsideBarTogle(!sideBarTogle)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
