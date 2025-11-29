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
import * as XLSX from 'xlsx';
import './ChartComponent2.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent2 = () => {
  const allSchools = [
    { name: 'School A', usesERP: true },
    { name: 'School B', usesERP: false },
    { name: 'School C', usesERP: true },
    { name: 'School D', usesERP: true },
    { name: 'School E', usesERP: false },
  ];

  const [selectedSearch, setSelectedSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const chartRef = useRef(null);

  const filteredSchools = selectedSearch 
    ? allSchools.filter(school => 
        school.name.toLowerCase().includes(selectedSearch.toLowerCase())
      )
    : allSchools;

  const usingERP = filteredSchools.filter(school => school.usesERP).length;
  const notUsingERP = filteredSchools.length - usingERP;
  const totalFiltered = filteredSchools.length;

  const data = {
    labels: ['Using ERP', 'Not Using ERP'],
    datasets: [
      {
        label: 'Count',
        data: [usingERP, notUsingERP],
        backgroundColor: ['hsl(120, 70%, 50%)', 'hsl(0, 70%, 50%)'],
        borderColor: ['hsl(120, 70%, 30%)', 'hsl(0, 70%, 30%)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
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
        ticks: { stepSize: 1 },
        title: { display: true, text: 'Number of Schools' },
      },
      x: { title: { display: true, text: 'Status' } },
    },
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedSearch(inputValue.trim());
  };

  const handleDownload = () => {
    const reportData = [
      ['ERP Usage Report', '', `Search: ${selectedSearch || 'All Schools'}`],
      ['Generated:', new Date().toLocaleString()],
      ['', '', ''],
      ['Summary:', '', ''],
      ['Using ERP', usingERP, ''],
      ['Not Using ERP', notUsingERP, ''],
      ['Total Schools Shown', totalFiltered, ''],
      ['', '', ''],
      ['School List', 'Uses ERP?'],
      ...filteredSchools.map(school => [school.name, school.usesERP ? 'Yes' : 'No']),
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ERP Report');
    ws['!cols'] = [{ wch: 20 }, { wch: 15 }];

    const fileName = `ERP_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="cc2-container12">
      <form onSubmit={handleSubmit} className="cc2-search-form12">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search school name (e.g., School A)"
          className="cc2-school-input12"
        />
        <button type="submit" className="cc2-search-button12">
          Search
        </button>
      </form>

      {totalFiltered === 0 ? (
        <p className="cc2-no-data12">
          No schools found matching "{selectedSearch}". Try another name.
        </p>
      ) : (
        <div className="cc2-chart-wrapper12">
          <Bar ref={chartRef} options={options} data={data} />
          <p className="cc2-summary-text12">
            {usingERP} using ERP, {notUsingERP} not using out of {totalFiltered} filtered schools.
          </p>
          <button onClick={handleDownload} className="cc2-download-button12">
            Download Report (Excel)
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartComponent2;