import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDarkMode } from "../customContexts/DarkModeContext";

function AppLayout() {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} transition-colors duration-300`}>
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
