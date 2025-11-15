import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { SideBarControllType } from "../utils/types/Types";
import { IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import { useGetDataQuery } from "../service/endpoint";
import {
  LuCalendarDays,
  LuClipboardList,
  LuGraduationCap,
  LuLayoutDashboard,
  LuLineChart,
  LuMapPin,
  LuUsers2,
} from "react-icons/lu";

const navLinks = [
  { to: "/", label: "Overview", icon: LuLayoutDashboard },
  { to: "/exam-types", label: "Exam Types", icon: LuClipboardList },
  { to: "/exams", label: "Exams", icon: LuCalendarDays },
  { to: "/exam-logs", label: "Exam Logs", icon: LuLineChart },
  { to: "/exam-hall", label: "Hall Rooms", icon: LuMapPin },
  { to: "/teachers", label: "Teachers", icon: LuUsers2 },
  // { to: "/psc-exam", label: "PSC Exam", icon: LuGraduationCap },
];

const SideBar = ({
  sideBarTogle: _sideBarTogle,
  setsideBarTogle,
}: SideBarControllType) => {
  const [drowpDown, setDrowpDown] = useState(false);
  const [drowpDownId, setDrowpDownId] = useState("");
  const [subdrowpDown, setSubDrowpDown] = useState(false);
  const [subdrowpDownId, setSubDrowpDownId] = useState("");
  const location = useLocation();

  const { data } = useGetDataQuery({
    endpoint: "examsType",
    tags: ["examsType"],
  });

  const handleDropDown = (id: string) => {
    if (id === drowpDownId) {
      setDrowpDown(!drowpDown);
    } else {
      setDrowpDown(true);
      setDrowpDownId(id);
    }
  };

  const handleSubDropDown = (id: string) => {
    if (id === subdrowpDownId) {
      setSubDrowpDown(!subdrowpDown);
    } else {
      setSubDrowpDown(true);
      setSubDrowpDownId(id);
    }
  };

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
            Face Recognition
          </p>
          <h2 className="text-xl font-semibold text-white">Monitoring Hub</h2>
        </div>
        <button
          onClick={() => setsideBarTogle(false)}
          className="p-2 border rounded-full border-white/20 text-white/70 hover:text-white md:hidden"
          aria-label="Close sidebar"
        >
          <RxCross2 size={16} />
        </button>
      </div>

      <p className="mt-4 text-xs text-white/60">
        Real-time insights on attendance, invigilation, and seats.
      </p>

      <nav className="flex-1 pr-2 mt-6 space-y-2 overflow-y-auto sidebar-scroll">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-2xl px-4 py-2 text-sm transition ${
              isActiveLink(to)
                ? "bg-white/20 text-white shadow-lg shadow-white/10"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}

        {data?.data?.length ? (
          <div className="pt-4 text-xs tracking-wide uppercase text-white/50">
            Exam Collections
          </div>
        ) : null}

        {data?.data?.map((item: any) => (
          <div
            key={item.id}
            className="px-3 py-2 border rounded-2xl border-white/10 bg-white/5"
          >
            <button
              className="flex items-center justify-between w-full text-sm font-semibold text-left text-white/80"
              onClick={() => handleDropDown(`${item.id}`)}
            >
              <span>{item.name}</span>
              <IoChevronForward
                size={18}
                className={`${
                  drowpDown && drowpDownId === `${item.id}`
                    ? "rotate-90 text-white"
                    : "text-white/50"
                } transition-transform duration-300`}
              />
            </button>
            <div
              className={`transition-all duration-300 ${
                drowpDown && drowpDownId === `${item.id}`
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="mt-3 space-y-2">
                {item.exams.map((exam: any) => (
                  <div
                    key={exam.id}
                    className="px-3 py-2 border rounded-2xl border-white/5 bg-white/5"
                  >
                    <button
                      className="flex items-center justify-between w-full text-xs font-semibold tracking-wide text-left uppercase text-white/70"
                      onClick={() => handleSubDropDown(`${exam.id}`)}
                    >
                      <span>{exam.name}</span>
                      <IoChevronForward
                        size={16}
                        className={`${
                          subdrowpDown && subdrowpDownId === `${exam.id}`
                            ? "rotate-90 text-white"
                            : "text-white/50"
                        } transition-transform duration-300`}
                      />
                    </button>
                    <div
                      className={`mt-2 flex flex-col gap-2 overflow-hidden text-sm transition-all duration-300 ${
                        subdrowpDown && subdrowpDownId === `${exam.id}`
                          ? "max-h-48 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <Link
                        to={`students/${exam.id}/${exam.name
                          .toLowerCase()
                          .replaceAll(/\s/g, "")}`}
                        className="px-3 py-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
                        onClick={() => setsideBarTogle(false)}
                      >
                        Students
                      </Link>
                      <Link
                        to={`seat-plan/${exam.id}/${exam.name
                          .toLowerCase()
                          .replaceAll(/\s/g, "")}`}
                        className="px-3 py-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
                        onClick={() => setsideBarTogle(false)}
                      >
                        Seat Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-4 text-sm border rounded-2xl border-white/10 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 text-white/80">
        <p className="font-semibold text-white">Need quick reports?</p>
        <p className="mt-1 text-xs text-white/70">
          Export attendance, invigilator, and exam summaries with one click.
        </p>
        <Link
          to="/exam-logs"
          onClick={() => setsideBarTogle(false)}
          className="inline-flex items-center justify-center w-full px-3 py-2 mt-4 text-sm font-semibold transition rounded-xl bg-white/90 text-slate-800 hover:bg-white"
        >
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
