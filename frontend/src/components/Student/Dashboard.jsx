import { FiBookOpen, FiBell, FiCalendar, FiBarChart2 } from "react-icons/fi";
import ProductPromotion from "./ProductPromotion";
import "./Dashboard.css";

const Dashboard = () => {
  const student = {
    name: "Aman Sharma",
    className: "10",
    section: "A",
    rollNumber: "23",
  };

  const homework = [
    { id: 1, title: "Algebra Worksheet", subject: "Maths", dueDate: "21 Nov 2025", status: "Pending" },
    { id: 2, title: "Grammar Exercises", subject: "English", dueDate: "22 Nov 2025", status: "Submitted" },
    { id: 3, title: "Chemical Reactions Notes", subject: "Science", dueDate: "23 Nov 2025", status: "Pending" },
  ];

  const attendanceSummary = {
    present: 142,
    total: 160,
    percentage: 89,
  };

  const notifications = [
    { id: 1, message: "New homework added in Science", time: "2h ago" },
    { id: 2, message: "Parent-teacher meeting on Friday", time: "5h ago" },
    { id: 3, message: "Library book due tomorrow", time: "1d ago" },
  ];

  const events = [
    { id: 1, title: "Maths Test", date: "21 Nov 2025" },
    { id: 2, title: "Sports Day", date: "25 Nov 2025" },
  ];

  return (
    <div className="modern-erp-dashboard">
      <header className="modernheader">
        <div className="profile-welcome-container">
          <img
            src="/images/profilephoto.jpg"
            alt="Profile"
            className="profile-photo"
          />
          <div>
            <small className="modern-welcome">Welcome back,</small>
            <h1>{student.name}</h1>
            <span className="modern-subtitle">
              Class {student.className} • Section {student.section} • Roll {student.rollNumber}
            </span>
          </div>
        </div>
        <aside className="modern-stats">
          <div className="modern-card attendance">
            <FiBarChart2 className="modern-icon" />
            <div className="stats-text">
              <span>Attendance</span>
              <h2>{attendanceSummary.percentage}%</h2>
            </div>
            <div className="progress-bar" style={{ width: `${attendanceSummary.percentage}%` }} />
          </div>
          <div className="modern-card homework">
            <FiBookOpen className="modern-icon" />
            <div className="stats-text">
              <span>Pending Homework</span>
              <h2>{homework.filter(h => h.status === "Pending").length}</h2>
            </div>
          </div>
        </aside>
      </header>

      <main className="modern-main">
        <section className="glass-card homework-section">
          <div className="section-header">
            <FiBookOpen />
            <h3>Homework</h3>
            <button className="button">View All</button>
          </div>
          <ul className="list-items">
            {homework.map(hw => (
              <li key={hw.id} className="list-item">
                <div>
                  <p className="item-title">{hw.title}</p>
                  <p className="item-subtitle">{hw.subject} • Due {hw.dueDate}</p>
                </div>
                <span className={`status-badge ${hw.status.toLowerCase()}`}>{hw.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card notifications-section" style={{ gridColumn: "span 2" }}>
          <div className="section-header">
            <FiBell />
            <h3>Notifications</h3>
          </div>
          <table className="notification-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Notice</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15-11-2025</td>
                <td>Notice: Last Working Day For III Semester -reg</td>
                <td>
                  <a href="#" className="notif-link" target="_blank" rel="noopener">View/Download</a>
                </td>
              </tr>
              <tr>
                <td>15-11-2025</td>
                <td>Office Order – for Re-constitution of Institution’s Innovation Council (IIC) Cell</td>
                <td>
                  <a href="#" className="notif-link" target="_blank" rel="noopener">View/Download</a>
                </td>
              </tr>
              <tr>
                <td>05-11-2025</td>
                <td>Schedule for II Mid-Term of I Semester of III, V and VII Semester 2025-26</td>
                <td>
                  <a href="#" className="notif-link" target="_blank" rel="noopener">View/Download</a>
                </td>
              </tr>
              <tr>
                <td>05-11-2025</td>
                <td>Schedule for half Yearly of of VII Semester 2025-26</td>
                <td>
                  <a href="#" className="notif-link" target="_blank" rel="noopener">View/Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="glass-card events-section">
          <div className="section-header">
            <FiCalendar />
            <h3>Event Calendar</h3>
          </div>
          <span className="calendar-month">November 2025</span>
          <ul className="list-items events-list">
            {events.map(event => (
              <li key={event.id} className="list-item event">
                <p className="event-title">{event.title}</p>
                <small className="event-date">{event.date}</small>
                <span className="event-dot"></span>
              </li>
            ))}
          </ul>
        </section>

        <div className="attendance-promotion-wrapper">
          <section className="glass-card attendance-section">
            <div className="section-header">
              <FiBarChart2 />
              <h3>Attendance Summary</h3>
            </div>
            <div className="attendance-meter">
              <svg viewBox="0 0 100 100" className="circle-svg">
                <circle cx="50" cy="50" r="45" className="bg-circle" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="progress-circle"
                  strokeDasharray="282.6"
                  strokeDashoffset={282.6 - (attendanceSummary.percentage / 100) * 282.6}
                />
              </svg>
              <div className="attendance-text">
                <strong>{attendanceSummary.percentage}%</strong>
                <div>
                  Present days: <span>{attendanceSummary.present}</span>
                </div>
                <div>
                  Total days: <span>{attendanceSummary.total}</span>
                </div>
              </div>
            </div>
          </section>
          <ProductPromotion />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
