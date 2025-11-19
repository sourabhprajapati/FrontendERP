// Home.jsx
import React from 'react';
import './Home.css'; 
import FeesPiechart from '../../../components/school/Dashbooard/feespiechart/Feeschart';
import LineChart from '../../../components/school/Dashbooard/feespiechart/Linechart';
import Chart2 from '../../../components/school/Dashbooard/Chart2/Chart2';
import Chart3 from '../../../components/school/Dashbooard/Chart3/Chart3';
import Chart4 from '../../../components/school/Dashbooard/Chart4/Chart4';
import Chart5 from '../../../components/school/Dashbooard/Chart5/Chart5';
import DashboardBox from '../DashboardBox/DashboardBox';
import ChartComponent from '../ChartComponent/ChartComponent';
import ChartComponent2 from '../ChartComponent2/ChartComponent2';
import Header from '../Header/Header';
import Sidebar from '../Header/Sidebar/Sidebar';

const Home = () => {
  return (
    
    <main className="main-content">
     
     
        <DashboardBox/>
        <ChartComponent/>
        <ChartComponent2/>
        
        
      
    </main>
  );
};

export default Home;