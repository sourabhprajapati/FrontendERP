// Chart4.jsx
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart4.css'; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for attendance (horizontal bar chart)
const attendanceData = {
  labels: ['Present', 'Absent', 'On Leave'],
  datasets: [
    {
      label: 'Staff Count',
      data: [50, 10, 5], // Replace with actual data
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)', // Green for present
        'rgba(255, 99, 132, 0.8)', // Red for absent
        'rgba(255, 206, 86, 0.8)', // Yellow for on leave
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const attendanceOptions = {
  indexAxis: 'y', // Makes it horizontal
  responsive: true,
  maintainAspectRatio: false, // Allows filling the container height
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Staff Attendance',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

// Sample data for staff roles (pie chart)
const rolesData = {
  labels: ['Total Teacher', 'Front Office teacher', 'Class Teacher',  'Computer','Hostel Staff'],
  datasets: [
    {
      label: 'Staff Roles',
      data: [30, 5, 15, 8, 7], // Replace with actual data
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const rolesOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allows filling the container height
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Staff Roles Distribution',
    },
  },
};

const Chart4 = () => {
  return (
    <div className="chart-container">
      <div className="chart-box">
        <Bar data={attendanceData} options={attendanceOptions} />
      </div>
      <div className="chart-box">
        <Pie data={rolesData} options={rolesOptions} />
      </div>
    </div>
  );
};

export default Chart4;