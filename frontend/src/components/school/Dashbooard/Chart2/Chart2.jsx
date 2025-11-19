// Chart2.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart2.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart2 = () => {
  const notifications = [
    { id: 1, message: 'New assignment posted for 2nd class students', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Class schedule updated for 4th class', time: '1 day ago', type: 'warning' },
    { id: 3, message: 'Exam results for 3rd class are now available', time: '3 days ago', type: 'success' },
    { id: 4, message: 'Welcome new students to 1st class', time: '1 week ago', type: 'info' },
    { id: 5, message: 'Fee payment reminder ', time: '2 weeks ago', type: 'warning' },
  ];
  const studentStreamData = {
    labels: ['class 1st', 'class 2nd', 'class 3rd', 'class 4th', 'class 5th', 'class 6th', 'class 7th', 'class 8th'],
    datasets: [
      {
        label: 'Number of Students',
        data: [8, 17, 12, 12, 5, 29, 8, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const studentStreamOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Student Strength ' },
    },
    scales: { y: { beginAtZero: true } },
  };
  return (
    <div className="mychart-container">
      <div className="mychart-notification-box">
        <h3>Notifications</h3>
        <ul className="mychart-notification-list">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`mychart-notification-item mychart-${note.type}`}
            >
              <div className="mychart-message">{note.message}</div>
              <div className="mychart-time">{note.time}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mychart-student-stream-chart">
        <h3>Student Strength by Class</h3>
        <div className="mychart-chart-wrapper">
          <Bar data={studentStreamData} options={studentStreamOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart2;
