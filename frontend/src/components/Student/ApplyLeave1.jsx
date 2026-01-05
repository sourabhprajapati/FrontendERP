import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiUserCheck,
  FiUploadCloud,
  FiHelpCircle,
  FiMail,
  FiXCircle,
  FiChevronRight,
} from "react-icons/fi";
import "./ApplyLeave1.css";

// Dummy data for leave balances (can be fetched from API later)
const leaveBalances = [
  { type: "Annual Leave", left: 8, used: 2, color: "#1fc98e" },
  { type: "Medical Leave", left: 3, used: 1, color: "#36a7e6" },
  { type: "Special Leave", left: 1, used: 1, color: "#fbbb24" },
];
const holidays = [4, 10, 17];

export default function ApplyLeaveRedesign() {
  const [type, setType] = useState("Annual Leave");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [attach, setAttach] = useState(null);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [prevRequests, setPrevRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const studentId = JSON.parse(localStorage.getItem("student"))?._id;
 // TODO: Get from auth context or localStorage

  useEffect(() => {
    fetchPrevRequests();
  }, []);

  const fetchPrevRequests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves?studentId=${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setPrevRequests(data.map(leave => ({
          date: `${new Date(leave.fromDate).toLocaleDateString()}${leave.fromDate !== leave.toDate ? '-' + new Date(leave.toDate).toLocaleDateString() : ''}`,
          type: leave.type,
          status: leave.status,
          days: leave.days,
          remarks: leave.remarks || '',
        })));
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  // Validation handlers same as before

  const validateField = (field, value) => {
    let error = "";
    const today = new Date().toISOString().split("T")[0];
    switch (field) {
      case "from":
        if (!value) error = "Date From is required.";
        else if (value < today) error = "You cannot apply for leave for a past date.";
        break;
      case "to":
        if (!value) error = "Date To is required.";
        else if (from && value < from) error = "End Date cannot be before the Start Date.";
        break;
      case "reason":
        if (!value.trim()) error = "Reason is required.";
        else if (value.length > 500) error = "Reason cannot exceed 500 characters.";
        break;
      case "attach":
        if (type === "Medical Leave" && !value) error = "Attachment is required for Medical Leave.";
        else if (value) {
          const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];
          if (!allowedTypes.includes(value.type)) error = "Only PDF, JPG, and DOCX files are allowed.";
          else if (value.size > 5 * 1024 * 1024) error = "File size must not exceed 5 MB.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    newErrors.from = validateField("from", from);
    newErrors.to = validateField("to", to);
    newErrors.reason = validateField("reason", reason);
    newErrors.attach = validateField("attach", attach);
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  // Day count excluding holidays
  const getDayCount = () =>
    from && to
      ? Math.max(
          1,
          (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24) + 1 - holidays.filter((d) => inRange(d, from, to)).length
        )
      : 0;

  function inRange(d, f, t) {
    const day = d;
    return day >= Number(f.split("-")[2]) && day <= Number(t.split("-")[2]);
  }

  const handleTypeChange = (newType) => {
    setType(newType);
    setErrors((prev) => ({ ...prev, attach: validateField("attach", attach) }));
  };

  const handleFromChange = (value) => {
    setFrom(value);
    setErrors((prev) => ({ ...prev, from: validateField("from", value), to: validateField("to", to) }));
  };

  const handleToChange = (value) => {
    setTo(value);
    setErrors((prev) => ({ ...prev, to: validateField("to", value) }));
  };

  const handleReasonChange = (value) => {
    setReason(value);
    setErrors((prev) => ({ ...prev, reason: validateField("reason", value) }));
  };

  const handleAttachChange = (file) => {
    setAttach(file);
    setErrors((prev) => ({ ...prev, attach: validateField("attach", file) }));
  };

  const handlePreview = () => {
    if (validateAll()) {
      setPreview(true);
    }
  };

  const handleSubmit = async () => {
    if (validateAll()) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('studentId', studentId);
        formData.append('type', type);
        formData.append('fromDate', from);
        formData.append('toDate', to);
        formData.append('reason', reason);
        if (attach) {
          formData.append('attachment', attach);
        }

        const response = await fetch('http://localhost:5000/api/leaves', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setSubmitted(true);
          setSuccessMessage("Your application has been submitted successfully");
          setPreview(false);
          // Refresh the recent requests list
          fetchPrevRequests();
          // Reset form
          setType("Annual Leave");
          setFrom("");
          setTo("");
          setReason("");
          setAttach(null);
          setErrors({});
        } else {
          const errorData = await response.json();
          setSuccessMessage(`Error: ${errorData.error || 'Failed to submit leave request'}`);
          setSubmitted(true); // Show error in success modal for simplicity
        }
      } catch (error) {
        console.error('Error submitting leave:', error);
        setSuccessMessage("Error: Failed to submit leave request. Please try again.");
        setSubmitted(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackToDashboard = () => {
    window.history.back();
  };

  return (
    <div className="applyleave-redesign-main">
      <div className="al-balance-row">
        {leaveBalances.map((l) => (
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

      <div className="al-apply-card">
        <div className="al-apply-header">
          <h2>Apply for Leave</h2>
          <span className="al-apply-subtitle">Submit a new leave request quickly and easily</span>
        </div>

        <div className="al-type-chips">
          {leaveBalances.map((l) => (
            <button
              key={l.type}
              type="button"
              className={`al-type-chip ${type === l.type ? "active" : ""}`}
              onClick={() => handleTypeChange(l.type)}
              style={{ borderColor: l.color, color: type === l.type ? l.color : "#4b5c8b", backgroundColor: type === l.type ? l.color + "22" : "transparent" }}
            >
              <span className="al-type-dot" style={{ background: l.color }} />
              {l.type}
            </button>
          ))}
        </div>

        <div className="al-form-grid">
          <div className="al-field">
            <label>From date</label>
            <div className={`al-input-wrapper ${errors.from ? "has-error" : ""}`}>
              <FiCalendar className="al-input-icon" />
              <input type="date" value={from} onChange={(e) => handleFromChange(e.target.value)} />
            </div>
            {errors.from && <p className="al-error">{errors.from}</p>}
          </div>

          <div className="al-field">
            <label>To date</label>
            <div className={`al-input-wrapper ${errors.to ? "has-error" : ""}`}>
              <FiCalendar className="al-input-icon" />
              <input type="date" value={to} onChange={(e) => handleToChange(e.target.value)} />
            </div>
            {errors.to && <p className="al-error">{errors.to}</p>}
          </div>

          <div className="al-field full">
            <label>Reason</label>
            <div className={`al-input-wrapper ${errors.reason ? "has-error" : ""}`}>
              <FiUserCheck className="al-input-icon" />
              <textarea rows="3" value={reason} onChange={(e) => handleReasonChange(e.target.value)} placeholder="Explain reason for leave..." />
            </div>
            <div className="al-field-footer">
              <span>{reason.length}/500</span>
              {errors.reason && <p className="al-error">{errors.reason}</p>}
            </div>
          </div>

          <div className="al-field full">
            <label>Attachment (optional)</label>
            <label className={`al-upload-modern ${errors.attach ? "has-error" : ""}`}>
              <FiUploadCloud />
              <div className="al-upload-text">
                <span>{attach ? attach.name : "Drop file here or click to browse"}</span>
                <small>PDF, JPG, DOCX up to 5MB</small>
              </div>
              <input type="file" onChange={(e) => handleAttachChange(e.target.files[0])} />
            </label>
            {errors.attach && <p className="al-error">{errors.attach}</p>}
          </div>
        </div>

        <div className="al-summary-row">
          <div className="al-summary-pill">
            <span>Estimated days</span>
            <b>{getDayCount()}</b>
          </div>
          <div className="al-summary-pill">
            <span>Selected type</span>
            <b>{type}</b>
          </div>
        </div>

        <div className="al-actions-row">
          <button className="al-btn primary" onClick={handlePreview} disabled={submitted}>
            <FiChevronRight /> Preview request
          </button>
          <button className="al-btn ghost" id="LeaveButton">
            View previous requests
          </button>
          <span className="al-help-link">
            <FiHelpCircle /> Need help?
          </span>
        </div>
      </div>

      {preview && (
        <div className="al-preview-modal">
          <div className="al-preview-bg" onClick={() => setPreview(false)} />
          <div className="al-preview-card">
            <h4>Review Your Leave Application</h4>
            <p>
              <b>Type:</b> {type}
            </p>
            <p>
              <b>From:</b> {from} <b>To:</b> {to} <b>Days:</b> {getDayCount()}
            </p>
            <p>
              <b>Reason:</b> {reason || <i>(none)</i>}
            </p>
            <p>
              <b>Attachment:</b> {attach ? attach.name : <i>None</i>}
            </p>
            <hr />
            <button className="al-btn primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <button className="al-btn ghost" onClick={() => setPreview(false)}>
              <FiXCircle /> Cancel
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="al-success-modal">
          <div className="al-success-bg" />
          <div className="al-success-card">
            <h4>Success!</h4>
            <p>{successMessage}</p>
            <button className="al-btn primary" onClick={handleBackToDashboard}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Optionally move recent requests below */}
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
          <FiMail /> Write to <a href="mailto:support@college.com">support@college.com</a> if rejected/urgent
        </span>
      </div>
    </div>
  );
}
