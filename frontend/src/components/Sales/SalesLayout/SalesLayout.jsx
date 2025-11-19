import React from "react";
import Header from "../Header/Header";

import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const SalesLayout = () => (
  <>
        <Header/>
        <Sidebar/>
        <Outlet/>
      
  </>
);

export default SalesLayout;
