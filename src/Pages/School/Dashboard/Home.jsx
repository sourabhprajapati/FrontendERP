// Home.jsx
import React from 'react';
import './Home.css'; 
import DashboardBox from '../../../components/school/Dashbooard/Dashboardbox/Dashboardbox';
import FeesPiechart from '../../../components/school/Dashbooard/feespiechart/Feeschart';
import LineChart from '../../../components/school/Dashbooard/feespiechart/Linechart';
import Chart2 from '../../../components/school/Dashbooard/Chart2/Chart2';
import Chart3 from '../../../components/school/Dashbooard/Chart3/Chart3';
import Chart4 from '../../../components/school/Dashbooard/Chart4/Chart4';
import Chart5 from '../../../components/school/Dashbooard/Chart5/Chart5';

const Home = () => {
  return (
    <main className="main-content">
      <div className="content-wrapper">
        <DashboardBox />
        <div className="charts-section">
          <div className="chart-grid">
             <div className="chart-card chart-card-small">
              <FeesPiechart />
            </div>
            <div className="chart-card chart-card-large">
              <LineChart />
            </div>
            
           
          </div>
        </div>
        <Chart2/>
        <Chart3/>
        <Chart4/>
        <Chart5/>
        
      </div>
    </main>
  );
};

export default Home;