// dashboardbox.jsx
import React from 'react';
import './dashboardbox.css';
import { FaUserGraduate } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { MdCoPresent } from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";
import { FaSms } from "react-icons/fa";



const DashboardBox = () => {
  const boxes = [
    { number: 1256, icon: <FaUserGraduate/>, label: 'Students', gradient: 'linear-gradient(135deg, #dd850aff, #fbc983ff)' },
    { number: 102, icon: <GiTeacher/>, label: 'Staff', gradient: 'linear-gradient(135deg, #8E34EF, #C58AF9)' },
    { number: 102, icon: <GiMoneyStack />, label: 'Fees', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' },
    { number: 102, icon: <MdCoPresent />, label: 'Student Presence', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' },
    { number: 102, icon: <RiPresentationFill  />, label: 'Staff Presence', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' },
    { number: 500, icon: <FaSms  />, label: 'SMS', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' },
    // { number: 500, icon: <FaMoneyBill />, label: 'Student Absent', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' },
    // { number: 500, icon: <FaMoneyBill />, label: 'Staff Absent', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' },
    //  { number: 500, icon: <FaMoneyBill />, label: 'SMS Sent Today', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' }
  ];

  return (
    <div className="dashboard-container">
      {boxes.map((box, index) => (
        <div key={index} className="dashboard-box" style={{ '--box-gradient': box.gradient }}>
          <div className="box-left">
            <div className="box-number">{box.number}</div>
            <div className="box-label">{box.label}</div>
          </div>
          <div className="box-right">
            <div className="box-icon-circle">
              <span className="box-icon">{box.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBox;