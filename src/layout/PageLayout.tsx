import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SIdeBar";

const PageLayout = () => {
  const [sideBarTogle, setsideBarTogle] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setsideBarTogle(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside
        className={`fixed md:sticky md:top-0 md:flex-shrink-0 text-white w-[260px] md:w-[280px] h-screen md:h-screen z-30 transition-transform duration-500 bg-gradient-to-b from-[#051725] via-[#041220] to-[#050d17] shadow-xl border-r border-white/10 ${sideBarTogle ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <SideBar
          sideBarTogle={sideBarTogle}
          setsideBarTogle={setsideBarTogle}
        />
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar sideBarTogle={sideBarTogle} setsideBarTogle={setsideBarTogle} />
        <main className="flex-1 px-4 md:px-10 py-6 text-slate-700 bg-slate-50/90">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      {sideBarTogle && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setsideBarTogle(false)}
        />
      )}
    </div>
  );
};

export default PageLayout;
