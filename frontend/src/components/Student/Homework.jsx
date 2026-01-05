import { useState, useEffect } from "react";
import { FiBookOpen, FiCheckCircle, FiClock, FiTrendingUp, FiAlertOctagon, FiAward, FiUploadCloud, FiHelpCircle, FiArrowUpCircle } from "react-icons/fi";
import "./Homework.css";

const leaderboard = [
  { name: "Priya", completed: 12 },
  { name: "Aman (You)", completed: 9 },
  { name: "Aditya", completed: 8 }
];
const streakMsg = "🔥 Streak: 6 days! Keep it up!";

export default function Homework() {
  const [homeworkList, setHomeworkList] = useState([
    { id: 1, title: 'Algebra Problems', subject: 'Math', status: 'Completed', due: '2023-09-30', progress: 100, score: 95 },
    { id: 2, title: 'History Essay', subject: 'History', status: 'In Progress', due: '2023-10-05', progress: 50 },
    { id: 3, title: 'Science Experiment', subject: 'Science', status: 'Pending', due: '2023-10-10', progress: 0 },
    { id: 4, title: 'English Reading', subject: 'English', status: 'Overdue', due: '2023-09-25', progress: 20 },
    { id: 5, title: 'Art Project', subject: 'Art', status: 'Completed', due: '2023-09-28', progress: 100, score: 88 }
  ]);
  const [homeworkSummary, setHomeworkSummary] = useState({ total: 5, completed: 2, overdue: 1, inProgress: 1, avgScore: 91, streak: 6 });
  const [subjectProgress, setSubjectProgress] = useState([
    { subject: 'Math', pct: 100, pending: 0, overdue: 0 },
    { subject: 'History', pct: 50, pending: 0, overdue: 0 },
    { subject: 'Science', pct: 0, pending: 1, overdue: 0 },
    { subject: 'English', pct: 20, pending: 0, overdue: 1 },
    { subject: 'Art', pct: 100, pending: 0, overdue: 0 }
  ]);
  const [nextDue, setNextDue] = useState({ title: 'History Essay', due: '2023-10-05' });
  const [uploadAssignment, setUploadAssignment] = useState(null);

  const percent = Math.round((homeworkSummary.completed / homeworkSummary.total) * 100);

  return (
    
    <div className="hw-ultimate-main">
      
      
      {/* ==== METRICS/ANALYTICS ==== */}
      <div className="hw-dashboard-row">
        <div className="hw-main-metrics">
       
          <div className="hw-metric-card grad-green"><FiCheckCircle /> Completed <b>{homeworkSummary.completed}/{homeworkSummary.total}</b></div>
          <div className="hw-metric-card grad-orange"><FiClock /> In-progress <b>{homeworkSummary.inProgress}</b></div>
          <div className="hw-metric-card grad-red"><FiAlertOctagon /> Overdue <b>{homeworkSummary.overdue}</b></div>
          <div className="hw-metric-card grad-indigo"><FiTrendingUp /> Avg. Score <b>{homeworkSummary.avgScore}%</b></div>
        </div>
        <div className="hw-completion-widget">
          <svg width="118" height="118">
            <circle cx="59" cy="59" r="50" stroke="#e8ebf3" strokeWidth="13" fill="none" />
            <circle
              cx="59" cy="59" r="50"
              stroke="#24aee7"
              strokeWidth="13"
              fill="none"
              strokeDasharray={314}
              strokeDashoffset={314 - (percent / 100) * 314}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 2px 8px #24aee966)", transition: "stroke-dashoffset 0.7s cubic-bezier(.7,0,.2,1)" }}
            />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="2rem" fontWeight="bold" fill="#1362d1">{percent}%</text>
          </svg>
          <span className="hw-completion-label">Overall Completion</span>
        </div>
      </div>

      <div className="hw-streak-banner">{streakMsg} <FiArrowUpCircle /></div>

      {/* ==== SUBJECT PROGRESS CARDS ==== */}
      <div className="hw-subject-progress-row">
        {subjectProgress.map((s, i) =>
          <div className="hw-progress-card" key={s.subject}>
            <b>{s.subject}</b>
            <div className="hw-subj-progressouter"><div className="hw-subj-progressbar" style={{ width: `${s.pct}%` }}></div></div>
            <div className="hw-prog-sublabel">
              {s.pct}% complete
              {s.pending ? <span className="hw-pend"> {s.pending} pending</span> : null}
              {s.overdue ? <span className="hw-overdue"> {s.overdue} overdue</span> : null}
            </div>
          </div>
        )}
      </div>

      {/* ==== 2-column Layout: Homework + Sidebar ==== */}
      <div className="hw-flex-row">
        {/* ===== Left Column: Homework Table + Next Due ===== */}
        <div className="hw-leftcol">
          <div className="hw-next-due-card">
            <span>
              <FiBookOpen /> <b>Next Homework:</b> {(nextDue && nextDue.title) || "All done!"}
            </span>
            {nextDue && (
              <>
                <span className="hw-due-date">{nextDue.due}</span>
                <a className="hw-view-btn" href="#">View</a>
                <a className="hw-submit-btn" href="#" onClick={() => setUploadAssignment(nextDue)}>Submit</a>
              </>
            )}
            {!nextDue && (<span className="hw-all-clear">No pending/overdue!</span>)}
          </div>

          {/* ===== Active Homework Table ===== */}
          <div className="hw-widget-card">
            <div className="hw-table-headrow">
              <b>Active Assignments</b>
              <button className="hw-help-btn"><FiHelpCircle /> Help</button>
            </div>
            <table className="hw-table-pro">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Due</th>
                  <th>Progress</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {homeworkList.map(hw => (
                  <tr key={hw.id}>
                    <td>
                      <span className="hw-title">{hw.title}</span>
                      {hw.file && (<a className="hw-file-chip" href="#">{hw.file}</a>)}
                    </td>
                    <td>{hw.subject}</td>
                    <td>
                      <span className={`hw-status-badge ${hw.status.replace(" ", "").toLowerCase()}`}>{hw.status}</span>
                    </td>
                    <td>{hw.due}</td>
                    <td>
                      <div className="hw-tbl-progressbar">
                        <div className="hw-tbl-progressfill" style={{ width: `${hw.progress}%` }}></div>
                      </div>
                      <span className="hw-tbl-progtxt">{hw.progress}%</span>
                    </td>
                    <td>
                      <a className="hw-assign-action-btn accent" href="#" onClick={() => setUploadAssignment(hw)}>Submit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Right Column: Widgets ===== */}
        <div className="hw-rightcol">
          {/* Leaderboard Widget */}
          <div className="hw-leaderboard-card">
            <b><FiAward /> Leaderboard</b>
            <ul>{leaderboard.map((entry, i) =>
                <li key={i} className={entry.name.includes("You") ? "you" : ""}>{entry.name} – <span>{entry.completed} done</span></li>
            )}</ul>
          </div>
          {/* Mini Calendar */}
          <div className="hw-mini-cal-card">
            <b>Calendar</b>
            <div className="hw-mini-calendar">
              {Array.from({ length: 21 }).map((_, i) => {
                let st = i%8 === 0 ? "overdue" : i%3===0 ? "done" : "";
                return <div className={`hw-minical-day ${st}`} key={i}>{i+1}</div>
              })}
            </div>
            <div className="hw-minical-legend">
              <span className="minical-dot done"></span> Done
              <span className="minical-dot overdue"></span> Overdue
            </div>
          </div>
        </div>
      </div>

      {/* === Modal: Per-Assignment File Upload ==== */}
      {uploadAssignment && (
        <div className="hw-upload-modal">
          <div className="hw-upload-overlay" onClick={() => setUploadAssignment(null)} />
          <div className="hw-upload-inner">
            <h3>
              Upload for: {uploadAssignment.title}
              <span> ({uploadAssignment.subject})</span>
            </h3>
            <div className="hw-upload-bar active">
              <FiUploadCloud />
              <span>Drag & drop or <a href="#">Browse</a></span>
            </div>
            <button className="hw-action-btn" onClick={() => setUploadAssignment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
