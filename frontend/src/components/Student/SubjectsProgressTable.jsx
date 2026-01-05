import "./SubjectsProgressTable.css";
import { FiBookOpen } from "react-icons/fi";
import { useEffect } from "react";

const subjectsTable = [
  {
    subject: "Hindi",
    icon: <FiBookOpen />,
    startDate: "20 Nov, 2025",
    totalChapters: 13,
    progress: 0,
    completed: "0/13 (0%)",
    duration: "10h 58m 02s"
  },
  {
    subject: "English",
    icon: <FiBookOpen />,
    startDate: "Not Started",
    totalChapters: 16,
    progress: 0,
    completed: "0/16 (0%)",
    duration: "05h 30m 00s"
  },
  {
    subject: "Mathematics",
    icon: <FiBookOpen />,
    startDate: "Not Started",
    totalChapters: 13,
    progress: 0,
    completed: "0/13 (0%)",
    duration: "05h 30m 00s"
  },
  {
    subject: "Hindi Grammar",
    icon: <FiBookOpen />,
    startDate: "25 Apr, 2025",
    totalChapters: 26,
    progress: 2.08,
    completed: "0/26 (2.08%)",
    duration: "08h 02m 06s"
  },
  // ...more rows
];

export default function SubjectsProgressTable({ hasScrollbar }) {
  return (
    <div className={`erp-table-card ${hasScrollbar ? 'with-scrollbar' : ''}`}>
      <table className="erp-subjects-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Start Date</th>
            <th>Total Chapters</th>
            <th>Progress</th>
            <th>Lesson Completed</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {subjectsTable.map((row, i) => (
            <tr key={i}>
              <td className="subject-cell">
                <span className="subject-icon">{row.icon}</span>
                <span className="subject-text">{row.subject}</span>
              </td>
              <td>{row.startDate}</td>
              <td>{row.totalChapters}</td>
              <td>
                <div className="modern-progressbar-bg">
                  <div
                    className="modern-progressbar-fill"
                    style={{
                      width: `${row.progress}%`,
                      background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
                    }}
                  />
                </div>
                <span className="modern-progress-value">{row.progress}%</span>
              </td>
              <td>{row.completed}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
