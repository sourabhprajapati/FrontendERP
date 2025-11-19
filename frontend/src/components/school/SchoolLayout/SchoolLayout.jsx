import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../../school/Header/Header";
import Sidebar from "../../school/Sidebar/Sidebar";

const SchoolLayout = () => (
  <>
  <Header/>
  <Sidebar/>
   <Outlet />
  </>
);

export default SchoolLayout;
