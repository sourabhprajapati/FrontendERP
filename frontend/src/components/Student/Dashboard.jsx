import React from "react";
import {
  FiBookOpen,
  FiBell,
  FiCalendar,
  FiBarChart2,
  FiCheckCircle,
  FiDollarSign,
  FiClock,
  FiActivity
} from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  // Mock Data - Preserved from original but structured for new UI
  const student = {
    name: "Aman Sharma",
    className: "10",
    section: "A",
    rollNumber: "23",
  };

  const stats = [
    {
      id: 1,
      title: "Attendance",
      value: "89%",
      desc: "142/160 Days Present",
      icon: <FiCheckCircle />,
      type: "attendance"
    },
    {
      id: 2,
      title: "Homework",
      value: "2",
      desc: "Pending Assignments",
      icon: <FiBookOpen />,
      type: "homework"
    },
    {
      id: 3,
      title: "Fee Status",
      value: "Paid",
      desc: "Next Due: 15 Dec",
      icon: <FiDollarSign />,
      type: "fees"
    },
    {
      id: 4,
      title: "Avg. Grade",
      value: "A",
      desc: "Last Assessment: 92%",
      icon: <FiActivity />,
      type: "performance"
    },
  ];

  const timeTableToday = [
    { period: "09:00 AM", subject: "Mathematics", teacher: "Mr. R. Gupta", status: "Completed" },
    { period: "10:00 AM", subject: "English Lit", teacher: "Ms. Sarah J.", status: "Ongoing" },
    { period: "11:00 AM", subject: "Physics", teacher: "Mr. H. Verma", status: "Upcoming" },
    { period: "12:00 PM", subject: "Computer Sc.", teacher: "Lab Assistant", status: "Upcoming" },
  ];

  const homeworkKeywords = [
    { id: 1, title: "Algebra Worksheet", subject: "Maths", dueDate: "21 Nov 2025", status: "Pending" },
    { id: 2, title: "Grammar Exercises", subject: "English", dueDate: "22 Nov 2025", status: "Submitted" },
    { id: 3, title: "Chemical Reactions", subject: "Science", dueDate: "23 Nov 2025", status: "Pending" },
  ];

  const notices = [
    { id: 1, date: "15 Nov", title: "Last Working Day For III Semester", link: "#" },
    { id: 2, date: "15 Nov", title: "Re-constitution of Innovation Council", link: "#" },
    { id: 3, date: "05 Nov", title: "Schedule for II Mid-Term Exams", link: "#" },
    { id: 4, date: "05 Nov", title: "Half Yearly Exam Schedule", link: "#" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-welcome">
          <h1>Hello, {student.name}! 👋</h1>
          <p>Class {student.className}-{student.section} • Roll No. {student.rollNumber}</p>
        </div>
        <div className="header-actions">
          <div className="date-badge">
            <FiCalendar />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
          <button className="notification-btn" aria-label="Notifications">
            <FiBell />
            <span className="notification-badge"></span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-card ${stat.type}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <small style={{ opacity: 0.7, fontSize: '0.75rem' }}>{stat.desc}</small>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Left Column */}
        <div className="left-panel">
          {/* Timetable Widget */}
          <div className="dashboard-section" style={{ marginBottom: '2rem' }}>
            <div className="section-title">
              <span><FiClock style={{ marginRight: '8px' }} /> Today's Schedule</span>
              <a href="/St_classtimetable" className="view-all-btn">View Full</a>
            </div>
            <div className="timetable-list">
              {timeTableToday.map((slot, index) => (
                <div key={index} className="timetable-item">
                  <div className="time-slot">{slot.period}</div>
                  <div className="subject-info">
                    <span className="subject-name">{slot.subject}</span>
                    <span className="teacher-name">{slot.teacher}</span>
                  </div>
                  <span className={`class-status-badge ${slot.status === 'Ongoing' ? 'active' : ''}`}>
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Homework */}
          <div className="dashboard-section">
            <div className="section-title">
              <span><FiBookOpen style={{ marginRight: '8px' }} /> Recent Homework</span>
              <a href="/homework" className="view-all-btn">View All</a>
            </div>
            <div className="homework-preview-list">
              {homeworkKeywords.map((hw) => (
                <div key={hw.id} className="homework-item">
                  <div className="hw-icon">
                    <FiBookOpen />
                  </div>
                  <div className="hw-details">
                    <span className="hw-title">{hw.title}</span>
                    <span className="hw-sub">{hw.subject} • Due {hw.dueDate}</span>
                  </div>
                  <span className={`hw-status ${hw.status.toLowerCase()}`}>
                    {hw.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-panel">
          {/* Performance / Promotion */}
          <div className="dashboard-section">
            <div className="section-title">
              <span><FiBarChart2 style={{ marginRight: '8px' }} /> Performance</span>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '8px solid #f0f0f0',
                borderTop: '8px solid var(--secondary-color)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--secondary-color)'
              }}>
                A Grade
              </div>
              <p style={{ color: 'var(--text-muted)' }}>You are doing great! Keep it up.</p>
            </div>
          </div>

          {/* Notices */}
          <div className="dashboard-section">
            <div className="section-title">
              <span><FiBell style={{ marginRight: '8px' }} /> Notice Board</span>
            </div>
            <ul className="notice-list">
              {notices.map((notice) => (
                <li key={notice.id} className="notice-item">
                  <span className="notice-date">{notice.date}</span>
                  <span className="notice-text">{notice.title}</span>
                  <a href={notice.link} className="notice-link">View Details &rarr;</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
