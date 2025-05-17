import { BsPerson } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { SideBarControllType } from "../utils/types/Types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sideBarTogle, setsideBarTogle }: SideBarControllType) => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center bg-[#051725] shadow-sm px-4 py-3 border-b">
      <span>
        {sideBarTogle ? (
          <RiBarChartHorizontalFill
            size={18}
            onClick={() => setsideBarTogle(!sideBarTogle)}
            className='text-white'
          />
        ) : (
          <FaBars size={18} onClick={() => setsideBarTogle(!sideBarTogle)}
            className='text-white'

          />
        )}
      </span>
      <div className="flex items-center gap-3">
        <div className="group relative"></div>

        <div className="group relative">
          <div className="bg-gray-100 p-2 rounded-full">
            <BsPerson size={24} />
          </div>
          <div className="-top-96 group-hover:top-[42px] right-1 absolute flex flex-col bg-white shadow rounded-md w-32">
            <span className="hover:bg-slate-200 px-6 py-2 border-b cursor-pointer">
              Profile
            </span>
            <span className="hover:bg-slate-200 px-6 py-2 cursor-pointer" onClick={() => { localStorage.clear(); navigate("/login") }}>
              Log-out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
