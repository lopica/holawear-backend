// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
const Layout = () => {
  return (
    <div className="flex bg-gray-200">
      <SideBarAdmin />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
