import React from 'react';
import './SchoolHome.css';
import DashboardBox from '../../../components/school/Dashbooard/Dashboardbox/Dashboardbox';
import FeesPiechart from '../../../components/school/Dashbooard/feespiechart/Feeschart';
import LineChart from '../../../components/school/Dashbooard/feespiechart/Linechart';
import Chart2 from '../../../components/school/Dashbooard/Chart2/Chart2';
import Chart3 from '../../../components/school/Dashbooard/Chart3/Chart3';
import Chart4 from '../../../components/school/Dashbooard/Chart4/Chart4';
import Chart5 from '../../../components/school/Dashbooard/Chart5/Chart5';
import Header from '../../../components/school/Header/Header';
import Sidebar from '../../../components/school/Sidebar/Sidebar';
import Dashboad from '../../../components/school/Dashboad/Dashboad';
import { BrowserRouter , Routes, Route } from "react-router-dom";

const SchoolHome = () => {
  return (
    <>
   
    <main className="school-main-content">
      
       <Dashboad/>
    </main>
    
    </>
  );
};

export default SchoolHome;