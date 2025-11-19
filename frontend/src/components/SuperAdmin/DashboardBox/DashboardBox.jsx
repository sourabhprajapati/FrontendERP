// DashboardBox.jsx
import React from 'react';
import './dashboardbox.css';
import { FaSchool } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { RiPresentationFill } from "react-icons/ri";
import { FaSms } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { MdEmojiPeople } from "react-icons/md";
import { IoMdAppstore } from "react-icons/io";
import * as XLSX from 'xlsx'; // For Excel export; install via: npm install xlsx

const DashboardBox = () => {
  const rows = [
    {
      heading: 'Schools',
      boxes: [
        { number: 1256, icon: <FaSchool />, label: 'Total School', gradient: 'linear-gradient(135deg, #dd850aff, #fbc983ff)' },
        { number: 102, icon: <FaSchool />, label: 'Total School Active', gradient: 'linear-gradient(135deg, #dd850aff, #fbc983ff)' },
        { number: 102, icon: <FaSchool />, label: 'Total School InActive', gradient: 'linear-gradient(135deg, #dd850aff, #fbc983ff)' }
      ]
    },
    {
      heading: 'Promoted Schools',
      boxes: [
        { number: 102, icon: <GoGraph />, label: 'Total Promoted School', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' },
        { number: 102, icon: <GoGraph />, label: 'Total Promoted Active School', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' },
        { number: 500, icon: <GoGraph />, label: 'Total Promoted InActive School', gradient: 'linear-gradient(135deg, #00C7BE, #5EE8D4)' }
      ]
    },
    {
      heading: 'Students',
      boxes: [
        { number: 500, icon: <PiStudentFill />, label: 'Total Student', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' },
        { number: 500, icon: <PiStudentFill />, label: 'Total Student Active', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' },
        { number: 500, icon: <PiStudentFill />, label: 'Total Student InActive', gradient: 'linear-gradient(135deg, #34C759, #7ED957)' }
      ]
    },
    {
      heading: 'Staff',
      boxes: [
        { number: 500, icon: <MdEmojiPeople />, label: 'Total Staff', gradient: 'linear-gradient(135deg, #8E34EF, #C58AF9)' },
        { number: 500, icon: <MdEmojiPeople />, label: 'Total Staff Active', gradient: 'linear-gradient(135deg, #8E34EF, #C58AF9)' },
        { number: 500, icon: <MdEmojiPeople />, label: 'Total Staff InActive', gradient: 'linear-gradient(135deg, #8E34EF, #C58AF9)' }
      ]
    },
    {
      heading: 'App Downloads',
      boxes: [
        { number: 500, icon: <IoMdAppstore />, label: 'Total App Download', gradient: 'linear-gradient(135deg, #007AFF, #5AC8FA)' },
        { number: 500, icon: <IoMdAppstore />, label: 'Total Student Active', gradient: 'linear-gradient(135deg, #007AFF, #5AC8FA)' },
        { number: 500, icon: <IoMdAppstore />, label: 'Total Student InActive', gradient: 'linear-gradient(135deg, #007AFF, #5AC8FA)' }
      ]
    }
  ];

  const handleDownload = () => {
    // Prepare data for Excel: One sheet with all sections
    const reportData = [
      ['Dashboard Report', '', `Generated: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`],
      ['', '', ''],
    ];

    rows.forEach((row, rowIndex) => {
      reportData.push([row.heading, '', '']);
      reportData.push(['Label', 'Number', '']);
      row.boxes.forEach(box => {
        reportData.push([box.label, box.number, '']);
      });
      if (rowIndex < rows.length - 1) reportData.push(['', '', '']); // Spacer between sections
    });

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dashboard Report');

    // Auto-fit columns
    const colWidths = [
      { wch: 30 }, // Label
      { wch: 15 }, // Number
      { wch: 10 }, // Empty
    ];
    ws['!cols'] = colWidths;

    const fileName = `Dashboard_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleDownload} className="download-button">
        Download Report (Excel)
      </button>
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="dashboard-row">
          <h2 className="row-heading">{row.heading}</h2>
          <div className="row-boxes">
            {row.boxes.map((box, boxIndex) => (
              <div key={boxIndex} className="dashboard-box" style={{ '--box-gradient': box.gradient }}>
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
        </div>
      ))}
    </div>
  );
};

export default DashboardBox;