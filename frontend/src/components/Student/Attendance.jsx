import React, { useState, useEffect } from "react";
import {
  PieChart,
  Calendar,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  TrendingUp,
  Award,
  CalendarDays
} from "lucide-react";
import { toast } from "react-toastify";
import "./Attendance.css";

const Attendance = () => {
  const [attendanceSummary, setAttendanceSummary] = useState({
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    total: 0,
    percentage: 0,
    streak: 0,
  });
  const [calendarData, setCalendarData] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [admissionNo] = useState(localStorage.getItem('studentAdmissionNo') || '2322212010');
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    if (!admissionNo) return;

    const fetchAttendanceData = async () => {
      try {
        const summaryRes = await fetch(`${baseURL}/api/attendance/details/${admissionNo}`);
        if (!summaryRes.ok) throw new Error('Failed to fetch summary');
        const summary = await summaryRes.json();
        setAttendanceSummary(summary);

        const recentRes = await fetch(`${baseURL}/api/attendance/recent/${admissionNo}`);
        if (!recentRes.ok) throw new Error('Failed to fetch recent records');
        const recent = await recentRes.json();
        setRecentRecords(recent);

        const calendarRes = await fetch(`${baseURL}/api/attendance/calendar/${admissionNo}?year=${calendarYear}&month=${calendarMonth + 1}`);
        if (!calendarRes.ok) throw new Error('Failed to fetch calendar');
        const calendar = await calendarRes.json();
        setCalendarData(calendar);

      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load attendance data");
        toast.error("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [admissionNo, calendarYear, calendarMonth]);

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(`${baseURL}/api/attendance/download/${admissionNo}`);
      if (!response.ok) throw new Error('Failed to download report');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_${admissionNo}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download report");
    }
  };

  const changeMonth = (offset) => {
    let newMonth = calendarMonth + offset;
    let newYear = calendarYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCalendarYear(newYear);
    setCalendarMonth(newMonth);
  };

  if (loading && attendanceSummary.total === 0) {
    return (
      <div className="att-loader">
        <RefreshCw className="att-spinner" />
        <p>Loading your attendance details...</p>
      </div>
    );
  }

  const { present, absent, leaves, holidays, percentage, streak } = attendanceSummary;

  const generateCalendarGrid = () => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const grid = [];

    for (let i = 0; i < firstDay; i++) grid.push({ empty: true });

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const data = calendarData.find(item => item.date === dateStr);
      grid.push({ day: d, status: data ? data.status.toLowerCase() : 'pending' });
    }

    return grid;
  };

  return (
    <div className="att-container st-animate-fade-in">
      {/* Page Header */}
      <header className="att-header">
        <div className="att-header-left">
          <div className="att-icon-box">
            <CalendarDays size={24} />
          </div>
          <div>
            <h1>Attendance Dashboard</h1>
            <p>Track your academic presence and consistency</p>
          </div>
        </div>
        <div className="att-header-actions">
          <button className="att-btn-outline" onClick={() => window.location.reload()}>
            <RefreshCw size={18} /> Refresh
          </button>
          <button className="att-btn-primary" onClick={handleDownloadReport}>
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      {/* Main Insights Dashboard */}
      <div className="att-insights-row">
        {/* Donut Chart Card */}
        <div className="att-donut-card shadow">
          <div className="att-donut-visual">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#3182ce"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * percentage) / 100}
                strokeLinecap="round"
                className="att-donut-fill"
              />
            </svg>
            <div className="att-donut-text">
              <span className="att-percent">{percentage}%</span>
              <span className="att-label">Attendance</span>
            </div>
          </div>
          <div className="att-donut-info">
            <p>You have attended <strong>{percentage}%</strong> of classes this session. Keep it up!</p>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="att-stats-grid">
          <div className="att-stat-item green">
            <TrendingUp className="stat-icon" />
            <div className="stat-data">
              <span className="label">Present</span>
              <span className="value">{present}</span>
            </div>
          </div>
          <div className="att-stat-item red">
            <AlertCircle className="stat-icon" />
            <div className="stat-data">
              <span className="label">Absent</span>
              <span className="value">{absent}</span>
            </div>
          </div>
          <div className="att-stat-item orange">
            <FileText className="stat-icon" />
            <div className="stat-data">
              <span className="label">Leaves</span>
              <span className="value">{leaves}</span>
            </div>
          </div>
          <div className="att-stat-item blue">
            <Calendar className="stat-icon" />
            <div className="stat-data">
              <span className="label">Holidays</span>
              <span className="value">{holidays}</span>
            </div>
          </div>
          <div className="att-stat-item indigo">
            <Award className="stat-icon" />
            <div className="stat-data">
              <span className="label">Total Streak</span>
              <span className="value">{streak} Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="att-main-grid">
        {/* Interactive Calendar */}
        <div className="att-calendar-card shadow st-tab-stabilizer">
          <div className="att-calendar-header">
            <h3>Attendance Calendar</h3>
            <div className="att-cal-nav">
              <button onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
              <span>{new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="att-calendar-body">
            <div className="att-day-names">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="att-day-grid">
              {generateCalendarGrid().map((cell, i) => (
                <div
                  key={i}
                  className={`att-day-cell ${cell.empty ? 'empty' : ''} ${cell.status || ''}`}
                >
                  {!cell.empty && (
                    <>
                      <span className="day-number">{cell.day}</span>
                      <span className="status-indicator"></span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="att-calendar-legend">
            <div className="legend-item"><span className="dot present"></span> Present</div>
            <div className="legend-item"><span className="dot absent"></span> Absent</div>
            <div className="legend-item"><span className="dot leave"></span> Leave</div>
            <div className="legend-item"><span className="dot holiday"></span> Holiday</div>
            <div className="legend-item"><span className="dot pending"></span> No Record</div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="att-table-card shadow">
          <div className="att-table-header">
            <h3>Recent Presence Log</h3>
            <a href="/leaves" className="btn-link">Apply for Leave</a>
          </div>
          <div className="att-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Timing</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {recentRecords.slice(0, 5).map((rec, i) => (
                  <tr key={i} className="st-animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="cell-date">
                      <Calendar size={14} /> {rec.date}
                    </td>
                    <td>
                      <span className={`att-chip ${rec.status.toLowerCase()}`}>{rec.status}</span>
                    </td>
                    <td className="cell-time">
                      <Clock size={14} /> {rec.in || '—'} - {rec.out || '—'}
                    </td>
                    <td className="cell-remark">{rec.remark || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {percentage < 75 && (
        <div className="att-alert-banner">
          <AlertCircle size={20} />
          <span>Your attendance is <strong>{percentage}%</strong>. A minimum of 75% is required for exam eligibility.</span>
        </div>
      )}
    </div>
  );
};

export default Attendance;
