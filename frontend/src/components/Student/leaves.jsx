import { useState } from "react";
import { FiCalendar, FiUserCheck, FiUploadCloud, FiHelpCircle, FiMail, FiXCircle, FiChevronRight } from "react-icons/fi";
import "./ApplyLeave.css";

// Dummy data
const leaveBalances = [
  { type: "Casual Leave", left: 8, used: 2, color: "#1fc98e" },
  { type: "Medical Leave", left: 3, used: 1, color: "#36a7e6" },
  { type: "Special Leave", left: 1, used: 1, color: "#fbbb24" }
];
const holidays = [4, 10, 17]; // demo dates this month
const prevRequests = [
  { date: "Nov 1-2, 2025", type: "Casual", status: "Approved", days: 2, remarks: "Personal work" },
  { date: "Nov 8, 2025", type: "Medical", status: "Rejected", days: 1, remarks: "No doc slip" },
  { date: "Nov 15, 2025", type: "Casual", status: "Pending", days: 1, remarks: "Travel" },
];

export default function ApplyLeave() {
  const [type, setType] = useState("Casual Leave");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [attach, setAttach] = useState(null);
  const [preview, setPreview] = useState(false);

  // Utility
  const getDayCount = () =>
    (from && to) ?
      Math.max(1, (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24) + 1 -
        holidays.filter(d => inRange(d, from, to)).length) : 0;
  function inRange(d, f, t) {
    const day = d; // for demo, d is date num
    return day >= Number(f.split("-")[2]) && day <= Number(t.split("-")[2]);
  }

  return (
    <div className="applyleave-main">
      {/* ==== BALANCE CARDS + UTILIZATION ==== */}
      <div className="al-balance-row">
        {leaveBalances.map((l, i) => (
          <div className="al-balance-card" style={{ borderColor: l.color }} key={l.type}>
            <b style={{ color: l.color }}>{l.type}</b>
            <div className="al-balance-pill">
              <span style={{ color: l.color }}>{l.left}</span> left / <span>{l.left + l.used}</span>
            </div>
            <div className="al-balance-bar" style={{ background: l.color + "22" }}>
              <div className="al-balance-barfill" style={{ width: `${(l.used * 100) / (l.left + l.used)}%`, background: l.color }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* ==== CALENDAR HEATMAP ==== */}
      <div className="al-widget-row">
        <div className="al-calendar-card">
          <b><FiCalendar /> Calendar View</b>
          <div className="al-calendar-grid">
            {Array.from({ length: 30 }).map((_, i) => {
              let stat = holidays.includes(i + 1) ? "holiday" : prevRequests.some(pr => pr.date.includes(`${i + 1}`)) ? "leave" : "";
              return (
                <div key={i} className={`al-cal-day ${stat}`}>{i + 1}</div>
              );
            })}
          </div>
          <div className="al-calendar-legend">
            <span className="aldot leave"></span> Leave
            <span className="aldot holiday"></span> Holiday
          </div>
        </div>

        {/* ==== APPLY FORM ==== */}
        <div className="al-form-card">
          <b>Apply for Leave</b>
          <div className="al-leave-type-row">
            {leaveBalances.map(l => (
              <button key={l.type} className={type === l.type ? "active" : ""} style={{ borderColor: l.color, color: l.color }}
                onClick={() => setType(l.type)}>{l.type}</button>
            ))}
          </div>
          <label>Date from: <input type="date" value={from} onChange={e => setFrom(e.target.value)} /></label>
          <label>Date to: <input type="date" value={to} onChange={e => setTo(e.target.value)} /></label>
          <label>Reason:
            <input type="text" value={reason} onChange={e => setReason(e.target.value)}
              placeholder="(e.g. Medical, Family Emergency, Function...)" />
          </label>
          <label className="al-upload-attach">
            Attachment:
            <input type="file" style={{ display: "none" }} onChange={e => setAttach(e.target.files[0])} />
            <span className="al-attach-chip">{attach ? attach.name : <><FiUploadCloud />Browse</>}</span>
          </label>
          <div className="al-preview-ui">
            <button type="button" className="al-btn accent" onClick={() => setPreview(true)}><FiChevronRight />Preview</button>
            <span className="al-help-link"><FiHelpCircle /> Need help?</span>
          </div>
        </div>
      </div>

      {/* ==== PREVIEW/CONFIRM CARD ==== */}
      {preview && (
        <div className="al-preview-modal">
          <div className="al-preview-bg" onClick={() => setPreview(false)} />
          <div className="al-preview-card">
            <h4>Review Your Leave Application</h4>
            <p><b>Type:</b> {type}</p>
            <p><b>From:</b> {from} <b>To:</b> {to} <b>Days:</b> {getDayCount()}</p>
            <p><b>Reason:</b> {reason || <i>(none)</i>}</p>
            <p><b>Attachment:</b> {attach ? attach.name : <i>None</i>}</p>
            <hr />
            <button className="al-btn accent">Submit Request</button>
            <button className="al-btn ghost" onClick={() => setPreview(false)}><FiXCircle />Cancel</button>
          </div>
        </div>
      )}

      {/* ==== HISTORY PANEL ==== */}
      <div className="al-history-card">
        <b>Recent Leave Requests</b>
        <table className="al-history-table">
          <thead>
            <tr>
              <th>Date(s)</th>
              <th>Type</th>
              <th>Days</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {prevRequests.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.type}</td>
                <td>{r.days}</td>
                <td>
                  <span className={`al-statuspill ${r.status.toLowerCase()}`}>{r.status}</span>
                </td>
                <td>{r.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="al-help-footer">
          <FiMail /> Write to support@college.com if rejected/urgent
        </span>
      </div>
    </div>
  );
}
