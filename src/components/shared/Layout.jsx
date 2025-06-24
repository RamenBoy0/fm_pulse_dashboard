import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-row bg-white h-screen w-screen overflow-x-auto">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">{<Outlet />}</div>
      </div>
    </div>
  );
}
