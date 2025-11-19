import React from "react";
import Sidebar from "../Header/Sidebar/Sidebar"; // Adjust the import path if needed
import Header from "../Header/Header";   // Adjust the import path if needed
import { Outlet } from "react-router-dom"; // For rendering nested routes
import "./SuperAdminLayout.css"

const SuperAdminLayout = () => (
  <>
   
       <Header/>
       <Sidebar/>
       <Outlet />
   
  </>
);

export default SuperAdminLayout;
