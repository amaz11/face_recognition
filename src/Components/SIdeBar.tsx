import { Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineTeam } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { SideBarControllType } from "../utils/types/Types";

const SideBar = ({ sideBarTogle, setsideBarTogle }: SideBarControllType) => {
  return (
    <div className="relative p-4">
      <div className="block top-0 right-2 absolute md:hidden">
        <RxCross2 size={18} onClick={() => setsideBarTogle(!sideBarTogle)} />
      </div>
      <div className="font-bold text-[clamp(10px,5.6vw,24px)] text-center">
        Face Recognition
      </div>
      <div className="pt-5">
        <ul className="flex flex-col gap-4">
          <li>
            <Link className="flex items-center gap-3" to="/">
              <AiOutlineDashboard size={22} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/psc-exam">
              <AiOutlineTeam size={22} />
              PSC Exam
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
