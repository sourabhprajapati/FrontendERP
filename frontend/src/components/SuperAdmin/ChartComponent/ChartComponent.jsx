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
import * as XLSX from 'xlsx';
import './ChartComponent.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const sessions = ['Session 2023-24', 'Session 2024-25'];
  const allSchools = ['School A', 'School B', 'School C'];
  
  const schoolData = {
    'School A': [120, 150],
    'School B': [80, 110],
    'School C': [95, 130],
  };

  const [selectedSchool, setSelectedSchool] = useState('');
  const [inputValue, setInputValue] = useState('');
  const chartRef = useRef(null);

  const filteredSchools = selectedSchool 
    ? allSchools.filter(school => 
        school.toLowerCase().includes(selectedSchool.toLowerCase())
      )
    : allSchools;

  const data = {
    labels: sessions,
    datasets: filteredSchools.map((school, index) => ({
      label: school,
      data: schoolData[school],
      backgroundColor: `hsl(${index * 120}, 70%, 50%)`,
      borderColor: `hsl(${index * 120}, 70%, 30%)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: selectedSchool 
          ? `Session-Wise Details for "${selectedSchool}"` 
          : 'Session-Wise School Enrollment Details',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Students' },
      },
      x: {
        title: { display: true, text: 'Academic Sessions' },
      },
    },
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedSchool(value); // Live search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedSchool(inputValue.trim());
  };

  const handleDownload = () => {
    const reportData = [
      ['Session-Wise Enrollment Report', '', `Search: ${selectedSchool || 'All Schools'}`],
      ['Generated On:', new Date().toLocaleString()],
      ['', '', ''],
      ['Total Matching Schools:', filteredSchools.length, ''],
      ['', '', ''],
      ['School Name', '2023-24', '2024-25'],
      ...filteredSchools.map(school => [
        school,
        schoolData[school][0],
        schoolData[school][1]
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enrollment Report');
    ws['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];

    const fileName = `Enrollment_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="cc-container11">
      <form onSubmit={handleSubmit} className="cc-search-form11">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search school name (e.g., School A)"
          className="cc-school-input11"
        />
        <button type="submit" className="cc-search-button11">
          Search
        </button>
      </form>

      {filteredSchools.length === 0 ? (
        <p className="cc-no-data11">
          No schools found for "{selectedSchool}". Try another name.
        </p>
      ) : (
        <div className="cc-chart-wrapper11">
          <Bar ref={chartRef} options={options} data={data} />
          <button onClick={handleDownload} className="cc-download-button11">
            Download Report (Excel)
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;