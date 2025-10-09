import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart5.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const feesData = {
  labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  datasets: [
    {
      label: 'Collection (Income)',
      data: [1307, 0, 0, 0, 0, 0, 4187, 0, 0, 0, 0, 0, 8417, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4136, 0],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.1,
      fill: true,
    },
    {
      label: 'Expense',
      data: [11339, 0, 0, 0, 0, 4136, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11339],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.1,
      fill: true,
    },
  ],
};

const feesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Income & Expenses for October 2025',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value >= 1000 ? value / 1000 + 'k' : value;
        },
      },
    },
  },
};

const studentBirthdays = [
  { name: 'Sourabh', date: '10th Oct', image: 'no-image-placeholder' },
  { name: 'Mohit', date: '14th Oct', image: 'no-image-placeholder' },
  { name: 'Lakshita', date: '18th Oct', image: 'no-image-placeholder' },
  { name: 'Mukesh', date: '10th Oct', image: 'no-image-placeholder' },
];

const staffBirthdays = [
  { name: 'John Doe', date: '12th Oct', image: 'no-image-placeholder' },
  { name: 'Jane Smith', date: '16th Oct', image: 'no-image-placeholder' },
  { name: 'Mike Johnson', date: '20th Oct', image: 'no-image-placeholder' },
];

const staffAnniversaries = [
  { name: 'Alice Brown', date: '15th Oct', image: 'no-image-placeholder' },
  { name: 'Bob Wilson', date: '22nd Oct', image: 'no-image-placeholder' },
  { name: 'Carol Davis', date: '25th Oct', image: 'no-image-placeholder' },
];

const tabConfigs = {
  'student-birthdays': {
    title: 'Student Birthdays',
    icon: '🎂',
    data: studentBirthdays,
    badge: 'Upcoming',
    buttonText: 'Birthday Wish',
  },
  'staff-birthdays': {
    title: 'Staff Birthdays',
    icon: '🎂',
    data: staffBirthdays,
    badge: 'Upcoming',
    buttonText: 'Birthday Wish',
  },
  'staff-anniversaries': {
    title: 'Staff Anniversaries',
    icon: '🎉',
    data: staffAnniversaries,
    badge: 'Upcoming',
    buttonText: 'Anniversary Wish',
  },
};

const Chart5 = () => {
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState('student-birthdays');

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const currentConfig = tabConfigs[activeTab];
  const currentData = currentConfig.data;

  return (
    <div className="chart-container">
      <div className="chart-box">
        <Line data={feesData} options={feesOptions} />
      </div>
      <div className="events-section">
        <div className="event-box">
          <div className="tab-header">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 'student-birthdays' ? 'active' : ''}`}
                onClick={() => setActiveTab('student-birthdays')}
              >
                Student Birthdays
              </button>
              <button
                className={`tab-button ${activeTab === 'staff-birthdays' ? 'active' : ''}`}
                onClick={() => setActiveTab('staff-birthdays')}
              >
                Staff Birthdays
              </button>
              <button
                className={`tab-button ${activeTab === 'staff-anniversaries' ? 'active' : ''}`}
                onClick={() => setActiveTab('staff-anniversaries')}
              >
                Staff Anniversaries
              </button>
            </div>
          </div>
          <div className="event-header">
            <span className="event-icon">{currentConfig.icon}</span>
            <h3>{currentConfig.title}</h3>
            <span className="today-badge">{currentConfig.badge}</span>
          </div>
          <ul className="event-list">
            {currentData.map((item, index) => (
              <li
                key={index}
                className={`event-item ${animate ? 'slide-up-item' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }} // staggered delay
              >
                <img src={item.image} alt={item.name} className="event-image" />
                <div className="event-details">
                  <span className="event-name">{item.name}</span>
                  <span className="event-date">{item.date}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="wish-button">{currentConfig.buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Chart5;