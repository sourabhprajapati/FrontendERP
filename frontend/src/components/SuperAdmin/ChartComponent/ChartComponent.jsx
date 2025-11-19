// ChartComponent.jsx
import React, { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx'; // For Excel export; install via: npm install xlsx
import './ChartComponent.css'; // External CSS file

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  // Fixed sample data: Session-wise school details (e.g., number of students enrolled)
  // Replace with your actual data source (e.g., props or API)
  const sessions = ['Session 2023-24', 'Session 2024-25'];
  const allSchools = ['School A', 'School B', 'School C'];
  
  const schoolData = {
    'School A': [120, 150],
    'School B': [80, 110],
    'School C': [95, 130],
  };

  const [selectedSchool, setSelectedSchool] = useState(''); // State for selected school
  const [inputValue, setInputValue] = useState(''); // State for input field
  const chartRef = useRef(null); // Ref for the chart instance

  // Filter datasets based on selected school (case-insensitive partial match)
  const filteredSchools = selectedSchool 
    ? allSchools.filter(school => school.toLowerCase().includes(selectedSchool.toLowerCase()))
    : allSchools;

  const data = {
    labels: sessions,
    datasets: filteredSchools.map((school, index) => ({
      label: school,
      data: schoolData[school],
      backgroundColor: `hsl(${index * 120}, 70%, 50%)`, // Distinctive colors
      borderColor: `hsl(${index * 120}, 70%, 30%)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedSchool 
          ? `Session-Wise Details for ${selectedSchool}` 
          : 'Session-Wise School Enrollment Details',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sessions',
        },
      },
    },
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // Auto-update on typing (partial match); for exact match, add a button or onSubmit
    setSelectedSchool(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For exact match on submit, trim and set
    setSelectedSchool(inputValue.trim());
  };

  const handleDownload = () => {
    // Prepare data for Excel: Summary row + Session-wise data
    const reportData = [
      ['Session-Wise Enrollment Report', '', `Search Term: ${selectedSchool || 'All'}`],
      ['Date:', new Date().toLocaleDateString()],
      ['', '', ''],
      ['Summary:', '', ''],
      ['Total Schools:', filteredSchools.length, ''],
      ['', '', ''],
      ['Details:', '', ''],
      ['School Name', 'Session 2023-24', 'Session 2024-25'],
      ...filteredSchools.map(school => [
        school,
        schoolData[school][0], // 2023-24 data
        schoolData[school][1], // 2024-25 data
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enrollment Report');

    // Auto-fit columns
    const colWidths = [
      { wch: 15 }, // School Name
      { wch: 15 }, // Session 2023-24
      { wch: 15 }, // Session 2024-25
    ];
    ws['!cols'] = colWidths;

    const fileName = `Enrollment_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="chart-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type school name (e.g., School A)"
          className="school-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {filteredSchools.length === 0 ? (
        <p className="no-data">No schools found matching "{selectedSchool}". Try another name.</p>
      ) : (
        <div className="chart-wrapper">
          <Bar ref={chartRef} options={options} data={data} />
          <button onClick={handleDownload} className="download-button">
            Download Report (Excel)
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;