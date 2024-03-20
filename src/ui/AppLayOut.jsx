import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import React from "react";
import { useDarkMode } from "../customContexts/DarkModeContext";
import Footer from "./Footer";

function AppLayout() {
  const { darkMode } = useDarkMode();
  return (
    <div className="flex flex-col h-screen  ">
      <NavBar />
      <div
        className={`flex-grow overflow-y-auto ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }
        transC `}
        style={{ overflowX: "hidden" }}
      >
        <div className=" overflow-x-hidden   py-6 px-4 sm:px-6 lg:px-4 ">
          <Outlet />
        </div>
        <div className="ml-[-4rem]">
          {/* <Footer className=" absolute w-full  bottom-0  " /> */}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
