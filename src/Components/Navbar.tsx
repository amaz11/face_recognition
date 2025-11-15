import { useEffect, useRef, useState } from "react";
import { BsPerson, BsBell } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { SideBarControllType } from "../utils/types/Types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sideBarTogle, setsideBarTogle }: SideBarControllType) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-lg px-4 md:px-10 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setsideBarTogle(!sideBarTogle)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition md:hidden"
            aria-label="Toggle sidebar"
          >
            {sideBarTogle ? (
              <RiBarChartHorizontalFill size={18} />
            ) : (
              <FaBars size={18} />
            )}
          </button>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Control Center
            </p>
            <h1 className="text-lg font-semibold text-slate-900">
              Face Recognition Suite
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 focus-within:border-slate-400 focus-within:bg-white transition">
            <FiSearch size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search exams, students, teachers..."
              className="bg-transparent outline-none text-sm text-slate-700 w-64"
            />
          </div>
          <button
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            onClick={() => navigate("/exam-logs")}
          >
            New Exam Log
          </button>
          <button className="relative rounded-full border border-slate-200 p-2 text-slate-600 hover:text-slate-900">
            <BsBell size={16} />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-1 text-left shadow-sm hover:border-slate-300"
            >
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                <BsPerson size={20} />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Admin
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  Control Room
                </p>
              </div>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                <button
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/");
                  }}
                >
                  <LuUser2 size={16} />
                  Profile
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-500 hover:bg-rose-50"
                  onClick={handleLogout}
                >
                  <LuLogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
