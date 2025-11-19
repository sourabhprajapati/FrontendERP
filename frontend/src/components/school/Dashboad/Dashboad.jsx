import React from 'react'
import "./Dashboad.css"
import DashboardBox from '../Dashbooard/Dashboardbox/Dashboardbox'
import FeesPiechart from '../Dashbooard/feespiechart/Feeschart'
import LineChart from '../Dashbooard/feespiechart/Linechart'
import Chart2 from '../Dashbooard/Chart2/Chart2'
import Chart3 from '../Dashbooard/Chart3/Chart3'
import Chart4 from '../Dashbooard/Chart4/Chart4'
import Chart5 from '../Dashbooard/Chart5/Chart5'
const Dashboad = () => {
  return (
    <div className="school-content-wrapper">
        
        <DashboardBox />
        
        <div className="school-charts-section">
          <div className="school-chart-grid">
             <div className="school-chart-card school-chart-card-small">
              <FeesPiechart />
            </div>
            <div className="school-chart-card school-chart-card-large">
              <LineChart />
            </div>
            
           
          </div>
        </div>
        <Chart2/>
        <Chart3/>
        <Chart4/>
        <Chart5/>
        
      </div>
  )
}

export default Dashboad
