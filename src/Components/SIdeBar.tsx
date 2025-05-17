import { Link } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineTeam } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { SideBarControllType } from "../utils/types/Types";
import { IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import { useGetDataQuery } from "../service/endpoint";
const SideBar = ({ sideBarTogle, setsideBarTogle }: SideBarControllType) => {
  const [drowpDown, setDrowpDown] = useState(false);
  const [drowpDownId, setDrowpDownId] = useState("");
  const [subdrowpDown, setSubDrowpDown] = useState(false);
  const [subdrowpDownId, setSubDrowpDownId] = useState("");

  const { data, isLoading, isFetching, isError: _isError, error: _error, } = useGetDataQuery({ endpoint: "examsType", tags: ['examsType'] })

  const handleDropDown = (id: string) => {
    if (id === drowpDownId || drowpDownId.length === 0) {
      setDrowpDown(!drowpDown);
      setDrowpDownId(id);
    }
    if (id !== drowpDownId) {
      setDrowpDownId(id);
      setDrowpDown(true);
    }
  };

  const handleSubDropDown = (id: string) => {
    if (id === subdrowpDownId || subdrowpDownId.length === 0) {
      setSubDrowpDown(!subdrowpDown);
      setSubDrowpDownId(id);
    }
    if (id !== subdrowpDownId) {
      setSubDrowpDownId(id);
      setSubDrowpDown(true);
    }
  };

  return (
    <div className="relative p-4">
      <div className="md:hidden block top-0 right-2 absolute">
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
            <Link className="flex items-center gap-3" to="/exam-types">
              <AiOutlineTeam size={22} />
              Exam-types
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/exams">
              <AiOutlineTeam size={22} />
              Exams
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/exam-logs">
              <AiOutlineTeam size={22} />
              Exam-Logs
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/exam-hall">
              <AiOutlineTeam size={22} />
              Hall Room
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/teachers">
              <AiOutlineTeam size={22} />
              Teachers
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" to="/psc-exam">
              <AiOutlineTeam size={22} />
              PSC Exam
            </Link>
          </li>
          {
            data?.data.map((item: any, index: number) => <li key={index} >
              <div className={`flex items-center justify-between cursor-pointer pb-3`} onClick={() => handleDropDown(`${item.id}`)} >
                <span>{item.name}</span>
                <IoChevronForward
                  size={22}
                  className={`${drowpDown && drowpDownId === `${item.id}`
                    ? "rotate-90"
                    : ""
                    } transition-all duration-300`}
                />
              </div>
              <div
                className={`${drowpDown && drowpDownId === `${item.id}`
                  ? "h-auto pl-4 pb-2 pt-4"
                  : "h-0 overflow-hidden p-0"
                  } transition-all duration-500  bg-slate-700 rounded`}
              >
                {
                  item.exams.map((exam: any) =>
                    <div key={exam.id} >
                      <div className={`flex items-center justify-between cursor-pointer pb-3 pr-2`} onClick={() => handleSubDropDown(`${exam.id}`)}>
                        <span>{exam.name}</span>
                        <IoChevronForward
                          size={22}
                          className={`${subdrowpDown && subdrowpDownId === `${exam.id}`
                            ? "rotate-90"
                            : ""
                            } transition-all duration-300 `}
                        />
                      </div>
                      <div className={`${subdrowpDown && subdrowpDownId === `${exam.id}`
                        ? "h-auto pl-4 pb-2 pt-1"
                        : "h-0 overflow-hidden p-0"
                        } transition-all duration-500  bg-slate-700 rounded flex flex-col gap-2`}>
                        <Link to={`students/${exam.id}/${exam.name.toLowerCase().replaceAll(/\s/g, '')}`}><span>Student</span></Link>
                        <Link to={`seat-plan/${exam.id}/${exam.name.toLowerCase().replaceAll(/\s/g, '')}`}><span>Seat Plan</span></Link>
                      </div>
                    </div>)
                }

              </div>

            </li>)
          }

        </ul>
      </div>
    </div>
  );
};

export default SideBar;
