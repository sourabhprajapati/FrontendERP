import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./StudentLayout.css";

const StudentLayout = () => (
  <>
    <Sidebar />
    <div className="student-main-content">
      <Outlet />
    </div>
  </>
);

export default StudentLayout;
