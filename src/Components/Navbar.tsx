import { BsPerson } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { SideBarControllType } from "../utils/types/Types";

const Navbar = ({ sideBarTogle, setsideBarTogle }: SideBarControllType) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 shadow-sm">
      <span>
        {sideBarTogle ? (
          <RiBarChartHorizontalFill
            size={18}
            onClick={() => setsideBarTogle(!sideBarTogle)}
          />
        ) : (
          <FaBars size={18} onClick={() => setsideBarTogle(!sideBarTogle)} />
        )}
      </span>
      <div className="flex items-center gap-3">
        <div className="group relative"></div>

        <div className="group relative">
          <div className="p-2 bg-gray-100 rounded-full">
            <BsPerson size={24} />
          </div>
          <div className="flex flex-col absolute bg-white rounded-md shadow  -top-96 right-1 group-hover:top-[42px] w-32">
            <span className="px-6 py-2 border-b hover:bg-slate-200 cursor-pointer">
              Profile
            </span>
            <span className="px-6 py-2 cursor-pointer hover:bg-slate-200 ">
              Log-out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
