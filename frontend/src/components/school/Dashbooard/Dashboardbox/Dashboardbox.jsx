// Dashboardbox.jsx
import React from 'react';
import './Dashboardbox.css';
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
  ];

  return (
    <div className="db-container1">
      {boxes.map((box, index) => (
        <div key={index} className="db-box1" style={{ '--box-gradient': box.gradient }}>
          <div className="db-left1">
            <div className="db-number1">{box.number}</div>
            <div className="db-label1">{box.label}</div>
          </div>
          <div className="db-right1">
            <div className="db-icon-circle1">
              <span className="db-icon1">{box.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBox;