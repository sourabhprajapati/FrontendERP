// Chart3.jsx
import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart3.css'; // Import the separate CSS file

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Chart3 = () => {
  // Data for Student Doughnut Chart
  const studentData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [100, 80], // Sample data: 100 Male, 80 Female
        backgroundColor: ['#36A2EB', '#FF6384'], // Blue for Male, Pink for Female
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const studentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Students (Male and Female)',
      },
    },
  };

  // Data for Staff Doughnut Chart
  const staffData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [5, 15], // Sample data: 20 Male, 15 Female
        backgroundColor: ['#36A2EB', '#FF6384'], // Same colors
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const staffOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Staff (Male and Female)',
      },
    },
  };

  // Data for Attendance Bar Chart (Present and Absent for Classes 1-8)
  const attendanceData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'],
    datasets: [
      {
        label: 'Present',
        data: [25, 30, 28, 27, 29, 26, 24, 31], // Sample Present data
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: [3, 2, 4, 5, 1, 6, 8, 0], // Sample Absent data
        backgroundColor: 'rgba(139, 69, 19, 0.6)', // Brown
        borderColor: 'rgba(139, 69, 19, 1)',
        borderWidth: 1,
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Class Wise Attendance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35, // Adjust max based on data range
      },
    },
  };

  return (
    <div className="upd-chart-container">
      <div className="upd-attendance-chart-wrapper">
        <Bar data={attendanceData} options={attendanceOptions} />
      </div>
      <div className="upd-pie-charts">
        <div className="upd-pie-chart-wrapper">
          <Doughnut data={studentData} options={studentOptions} />
        </div>
        <div className="upd-pie-chart-wrapper">
          <Doughnut data={staffData} options={staffOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart3;
