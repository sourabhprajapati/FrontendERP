import { useState } from "react";
import { FiPieChart, FiCalendar, FiAlertOctagon, FiArrowDownCircle, FiDownload, FiEdit } from "react-icons/fi";
import "./Attendance.css";

// Dummy data for summary
const attendanceSummary = {
  present: 142,
  absent: 8,
  leaves: 3,
  holidays: 5,
  total: 158,
  percentage: 90,
  streak: 6,
};

// Dummy data for calendar (For each date: status)
const calendarData = [
  // { date: '2025-11-01', status: 'present' }, ...
];

// Dummy data for recent attendance rows
const recentRecords = [
  { date: "19 Nov 2025", status: "Present", in: "08:35", out: "14:30", remark: "" },
  { date: "18 Nov 2025", status: "Absent", in: "--", out: "--", remark: "Sick" },
  { date: "17 Nov 2025", status: "Present", in: "08:33", out: "14:27", remark: "" },
  { date: "16 Nov 2025", status: "Leave", in: "--", out: "--", remark: "Medical Leave" },
  { date: "15 Nov 2025", status: "Present", in: "08:30", out: "14:25", remark: "" },
  // ...more
];

// --- Main Component ---
export default function Attendance() {
  // Filter/... for history, month, etc can be here
  const { present, absent, leaves, holidays, total, percentage, streak } = attendanceSummary;

  return (
    <div className="attendance-main">
      <div className="attendance-header-row">
        <span className="attendance-title"><FiPieChart /> Student Attendance</span>
        <button className="attnd-download-btn"><FiDownload /> Download Report</button>
      </div>

      {/* Analytics + Stat Cards */}
      <div className="attnd-analytics-row">
        <div className="attnd-donut-card">
          {/* Simple Donut, animated */}
          <svg width="105" height="105" className="attnd-donut-svg">
            <circle
              cx="52.5" cy="52.5" r="44"
              stroke="#e6ebfc"
              strokeWidth="11"
              fill="none"
            />
            <circle
              cx="52.5" cy="52.5" r="44"
              stroke="#27e3a7"
              strokeWidth="11"
              fill="none"
              strokeDasharray={276}
              strokeDashoffset={276 - (percentage / 100) * 276}
              strokeLinecap="round"
              className="attnd-donut-progress"
            />
          </svg>
          <div className="attnd-donut-percent">
            {percentage}%
            <div className="attnd-donut-label">Present</div>
          </div>
        </div>
        <div className="attnd-stat-cards">
          <div className="attnd-stat-card green">
            <span>Present</span>
            <b>{present}</b>
          </div>
          <div className="attnd-stat-card red">
            <span>Absent</span>
            <b>{absent}</b>
          </div>
          <div className="attnd-stat-card orange">
            <span>Leaves</span>
            <b>{leaves}</b>
          </div>
          <div className="attnd-stat-card blue">
            <span>Holidays</span>
            <b>{holidays}</b>
          </div>
          <div className="attnd-stat-card indigo">
            <span>Current Streak</span>
            <b>{streak} days</b>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="attnd-calendar-section">
        <div className="attnd-cal-header">
          <FiCalendar />
          <span>Attendance Calendar (November 2025)</span>
          <button className="attnd-cal-nav"><FiArrowDownCircle /> View All Months</button>
        </div>
        {/* -- Modern Attendance Calendar Grid (static demo) -- */}
        <div className="attnd-calendar-grid">
          {/* Map a 6x7 grid for demo | status can be: present/absent/leave/holiday */}
          {Array.from({ length: 30 }).map((_, i) => {
            const status = (i % 7 === 0) ? "absent" : (i % 6 === 0) ? "leave"
              : (i % 5 === 0) ? "holiday" : "present";
            return (
              <div key={i} className={`attnd-cal-date ${status}`}>
                <span>{i + 1}</span>
                <span className="attnd-cal-dot"></span>
                <span className="attnd-cal-status">{status[0].toUpperCase() + status.slice(1)}</span>
              </div>
            )
          })}
        </div>
        <div className="attnd-cal-legend">
          <span className="present-dot"></span> Present
          <span className="absent-dot"></span> Absent
          <span className="leave-dot"></span> Leave
          <span className="holiday-dot"></span> Holiday
        </div>
      </div>

      {/* Warning Banner */}
      {percentage < 75 && (
        <div className="attnd-warning-banner">
          <FiAlertOctagon />
          Your attendance is below 75%. Please attend more to be eligible!
        </div>
      )}

      {/* Recent Attendance Table */}
      <div className="attnd-history-section">
        <div className="attnd-table-head-row">
          <span>Recent Attendance</span>
          <button className="attnd-edit-btn"><FiEdit /> <a id="LeaveButton" href="http://localhost:5173/leaves">Apply for leave</a></button>
        </div>
        <table className="attnd-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {recentRecords.map((rec, i) => (
              <tr key={i}>
                <td>{rec.date}</td>
                <td><span className={`attnd-status-chip ${rec.status.toLowerCase()}`}>{rec.status}</span></td>
                <td>{rec.in}</td>
                <td>{rec.out}</td>
                <td>{rec.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
