// ChartComponent2.jsx
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
import './ChartComponent2.css'; // External CSS file

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent2 = () => {
  // Sample data: Schools with ERP usage flag
  // Replace with your actual data source (e.g., props or API)
  const allSchools = [
    { name: 'School A', usesERP: true },
    { name: 'School B', usesERP: false },
    { name: 'School C', usesERP: true },
    { name: 'School D', usesERP: true },
    { name: 'School E', usesERP: false },
  ];

  const [selectedSearch, setSelectedSearch] = useState(''); // State for search term
  const [inputValue, setInputValue] = useState(''); // State for input field
  const chartRef = useRef(null); // Ref for the chart instance

  // Filter schools based on search (case-insensitive partial match)
  const filteredSchools = selectedSearch 
    ? allSchools.filter(school => school.name.toLowerCase().includes(selectedSearch.toLowerCase()))
    : allSchools;

  // Counts for filtered list
  const usingERP = filteredSchools.filter(school => school.usesERP).length;
  const notUsingERP = filteredSchools.length - usingERP;
  const totalFiltered = filteredSchools.length;

  const data = {
    labels: ['Using ERP', 'Not Using ERP'],
    datasets: [
      {
        label: 'Count',
        data: [usingERP, notUsingERP],
        backgroundColor: [
          'hsl(120, 70%, 50%)', // Green for using
          'hsl(0, 70%, 50%)',   // Red for not using
        ],
        borderColor: [
          'hsl(120, 70%, 30%)',
          'hsl(0, 70%, 30%)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: selectedSearch 
          ? `ERP Usage (Search: "${selectedSearch}")` 
          : 'ERP Usage by Schools',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Integer steps for count
        },
        title: {
          display: true,
          text: 'Number of Schools',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Status',
        },
      },
    },
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // Auto-update on typing (partial match)
    setSelectedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For exact match on submit, trim and set
    setSelectedSearch(inputValue.trim());
  };

  const handleDownload = () => {
    // Prepare data for Excel: Summary row + School list
    const reportData = [
      ['ERP Usage Report', '', `Search Term: ${selectedSearch || 'All'}`],
      ['Date:', new Date().toLocaleDateString()],
      ['', '', ''],
      ['Summary:', '', ''],
      ['Schools Using ERP:', usingERP, ''],
      ['Schools Not Using ERP:', notUsingERP, ''],
      ['Total Filtered Schools:', totalFiltered, ''],
      ['', '', ''],
      ['School List:', '', ''],
      ['School Name', 'Uses ERP?'],
      ...filteredSchools.map(school => [school.name, school.usesERP ? 'Yes' : 'No']),
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ERP Report');

    // Auto-fit columns
    const colWidths = [
      { wch: 15 }, // School Name
      { wch: 12 }, // Uses ERP?
    ];
    ws['!cols'] = colWidths;

    const fileName = `ERP_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="chart-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search school name (e.g., School A)"
          className="school-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {totalFiltered === 0 ? (
        <p className="no-data">No schools found matching "{selectedSearch}". Try another name.</p>
      ) : (
        <div className="chart-wrapper">
          <Bar ref={chartRef} options={options} data={data} />
          <p className="summary-text">
            {usingERP} using ERP, {notUsingERP} not using out of {totalFiltered} filtered schools.
          </p>
          <button onClick={handleDownload} className="download-button">
            Download Report (Excel)
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartComponent2;