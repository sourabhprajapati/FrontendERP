// chart2.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart2.css'; // Import the separate CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart2 = () => {
  // Sample notifications data
  const notifications = [
    { id: 1, message: 'New assignment posted for 2nd class students', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Class schedule updated for 4th class', time: '1 day ago', type: 'warning' },
    { id: 3, message: 'Exam results for 3rd class are now available', time: '3 days ago', type: 'success' },
    { id: 4, message: 'Welcome new students to 1st class', time: '1 week ago', type: 'info' },
    { id: 5, message: 'Fee payment reminder ', time: '2 weeks ago', type: 'warning' },
  ];

  // Data for Student Strength Chart (Bar chart for student streams with updated labels and colors)
  const studentStreamData = {
    labels: ['class 1st', 'class 2nd', 'class 3rd', 'class 4th', 'class 5th', 'class 6th', 'class 7th', 'class 8th'],
    datasets: [
      {
        label: 'Number of Students',
        data: [8, 17, 12, 12, 5, 29, 8, 3], // Extended data to match 8 labels
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',    // 1st
          'rgba(54, 162, 235, 0.6)',    // 2nd
          'rgba(255, 205, 86, 0.6)',    // 3rd
          'rgba(75, 192, 192, 0.6)',    // 4th
          'rgba(153, 102, 255, 0.6)',   // 5th
          'rgba(255, 159, 64, 0.6)',    // 6th
          'rgba(201, 203, 207, 0.6)',   // 7th - New color (grayish for variety)
          'rgba(255, 99, 132, 0.8)',    // 8th - New vibrant color
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',     // New border
          'rgba(255, 99, 132, 1)',      // New border
        ],
        borderWidth: 1,
      },
    ],
  };

  const studentStreamOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container without fixed aspect ratio
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Strength ',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="notification-box">
        <h3>Notifications</h3>
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li key={notif.id} className={`notification-item ${notif.type}`}>
              <div className="message">{notif.message}</div>
              <div className="time">{notif.time}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="student-stream-chart">
        <h3>Total Student Classwise Strength</h3>
        <div className="chart-wrapper">
          <Bar data={studentStreamData} options={studentStreamOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart2;