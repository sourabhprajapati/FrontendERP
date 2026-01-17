import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  UploadCloud,
  HelpCircle,
  Mail,
  XCircle,
  ChevronRight,
  Info,
  Clock,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  FileText
} from "lucide-react";
import { toast } from "react-toastify";
import "./ApplyLeave1.css";

const StudentLeaveDashboard = () => {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [prevRequests, setPrevRequests] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({ percentage: 0 });

  const studentData = JSON.parse(localStorage.getItem("student")) || {};
  const studentId = studentData._id;
  const admissionNo = studentData.basic?.admissionNo || localStorage.getItem('studentAdmissionNo') || '2322212010';
  const baseURL = "http://localhost:5000";

  const leaveCategories = [
    { label: "Sick Leave", color: "#ef4444", icon: AlertCircle },
    { label: "Urgent Work", color: "#f59e0b", icon: Clock },
    { label: "Family Function", color: "#8b5cf6", icon: User },
    { label: "Other", color: "#6b7280", icon: Info },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch leave history
      const leaveRes = await fetch(`${baseURL}/api/leaves?studentId=${admissionNo}`);
      if (leaveRes.ok) {
        const data = await leaveRes.json();
        setPrevRequests(data);
      }

      // Fetch attendance for context
      const attRes = await fetch(`${baseURL}/api/attendance/details/${admissionNo}`);
      if (attRes.ok) {
        const attData = await attRes.json();
        setAttendanceSummary(attData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const validateField = (name, value) => {
    let error = "";
    const today = new Date().toISOString().split("T")[0];

    if (name === "from") {
      if (!value) error = "Start date is required";
      else if (value < today) error = "Past dates are not allowed";
    }
    if (name === "to" && !isHalfDay) {
      if (!value) error = "End date is required";
      else if (fromDate && value < fromDate) error = "End date cannot be before start date";
    }
    if (name === "reason") {
      if (!value.trim()) error = "Please provide a reason";
      else if (value.length < 10) error = "Reason is too short";
    }
    return error;
  };

  const getDayCount = () => {
    if (isHalfDay) return 0.5;
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async () => {
    const newErrors = {
      from: validateField("from", fromDate),
      to: isHalfDay ? "" : validateField("to", toDate),
      reason: validateField("reason", reason),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(e => e)) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('studentId', admissionNo);
      formData.append('type', leaveType);
      formData.append('fromDate', fromDate);
      formData.append('toDate', isHalfDay ? fromDate : toDate);
      formData.append('reason', reason);
      formData.append('isHalfDay', isHalfDay);
      if (attachment) formData.append('attachment', attachment);

      const response = await fetch(`${baseURL}/api/leaves`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setSuccessMessage("Your leave application has been submitted and is pending approval.");
        setPreview(false);
        fetchData();
        // Reset form
        setFromDate("");
        setToDate("");
        setReason("");
        setAttachment(null);
        setIsHalfDay(false);
      } else {
        const err = await response.json();
        toast.error(err.error || "Submission failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-page-container">
      {/* Top Overview Cards */}
      <div className="al-stats-row">
        <div className="al-stat-card glass shadow">
          <div className="al-stat-info">
            <CheckCircle2 className="al-stat-icon green" />
            <div>
              <h3>{prevRequests.filter(r => r.status === 'Approved').length}</h3>
              <p>Approved Leaves</p>
            </div>
          </div>
        </div>
        <div className="al-stat-card glass shadow">
          <div className="al-stat-info">
            <Clock className="al-stat-icon orange" />
            <div>
              <h3>{prevRequests.filter(r => r.status === 'Pending').length}</h3>
              <p>Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="al-stat-card glass shadow">
          <div className="al-stat-info">
            <AlertCircle className="al-stat-icon blue" />
            <div>
              <h3>{attendanceSummary.percentage}%</h3>
              <p>Attendance Health</p>
            </div>
          </div>
        </div>
      </div>

      <div className="al-main-layout">
        {/* Application Form */}
        <div className="al-form-card glass shadow st-animate-fade-in">
          <div className="al-form-header">
            <div className="al-header-title">
              <FileText size={24} color="#3182ce" />
              <div>
                <h2>Apply for Leave</h2>
                <p>Ensure your studies remain on track</p>
              </div>
            </div>
          </div>

          <div className="al-section">
            <label className="al-label">Select Category</label>
            <div className="al-category-grid">
              {leaveCategories.map((cat) => (
                <button
                  key={cat.label}
                  className={`al-cat-btn ${leaveType === cat.label ? 'active' : ''}`}
                  onClick={() => setLeaveType(cat.label)}
                  style={{ "--cat-color": cat.color }}
                >
                  <cat.icon size={18} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="al-form-body">
            <div className="al-row">
              <div className="al-field">
                <label className="al-label">Start Date</label>
                <div className={`al-input-box ${errors.from ? 'error' : ''}`}>
                  <Calendar size={18} />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                {errors.from && <span className="al-err-text">{errors.from}</span>}
              </div>

              {!isHalfDay && (
                <div className="al-field">
                  <label className="al-label">End Date</label>
                  <div className={`al-input-box ${errors.to ? 'error' : ''}`}>
                    <Calendar size={18} />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  {errors.to && <span className="al-err-text">{errors.to}</span>}
                </div>
              )}
            </div>

            <div className="al-toggle-row">
              <label className="al-toggle">
                <input
                  type="checkbox"
                  checked={isHalfDay}
                  onChange={(e) => setIsHalfDay(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <div className="al-toggle-text">
                <b>Apply for Half-Day</b>
                <p>Leave for morning/afternoon session only</p>
              </div>
            </div>

            <div className="al-field">
              <label className="al-label">Reason for Leave</label>
              <div className={`al-input-box ${errors.reason ? 'error' : ''}`}>
                <textarea
                  placeholder="Tell your teacher why you need leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="al-field-meta">
                <span>{reason.length}/500 characters</span>
                {errors.reason && <span className="al-err-text">{errors.reason}</span>}
              </div>
            </div>

            <div className="al-field">
              <label className="al-label">Attachment <small>(Optional)</small></label>
              <div className="al-upload-area">
                <input
                  type="file"
                  id="leave-file"
                  onChange={(e) => setAttachment(e.target.files[0])}
                  hidden
                />
                <label htmlFor="leave-file" className="al-upload-label">
                  <UploadCloud size={24} />
                  <span>{attachment ? attachment.name : "Upload medical report or letter"}</span>
                  <small>PDF, JPG, PNG (Max 5MB)</small>
                </label>
              </div>
            </div>
          </div>

          <div className="al-form-footer">
            <div className="al-summary">
              <span>Applying for</span>
              <b>{getDayCount()} Day(s)</b>
            </div>
            <button
              className="al-submit-btn"
              onClick={() => setPreview(true)}
              disabled={loading}
            >
              Preview Request <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="al-history-column">
          <div className="al-history-card glass shadow">
            <div className="al-card-header">
              <h3>Recent Applications</h3>
              <LayoutDashboard size={20} color="#718096" />
            </div>
            <div className="al-history-list">
              {prevRequests.length === 0 ? (
                <div className="al-empty">
                  <Mail size={32} />
                  <p>No leave requests found</p>
                </div>
              ) : (
                prevRequests.slice(0, 5).map((req, i) => (
                  <div key={i} className="al-history-item">
                    <div className="al-item-header">
                      <span className={`al-tag ${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                      <small>{new Date(req.submittedAt || Date.now()).toLocaleDateString()}</small>
                    </div>
                    <div className="al-item-body">
                      <h4>{req.type}</h4>
                      <p>{new Date(req.fromDate).toLocaleDateString()} - {new Date(req.toDate).toLocaleDateString()}</p>
                    </div>
                    {req.remarks && (
                      <div className="al-item-remark">
                        <Info size={12} />
                        <span>Teacher: {req.remarks}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="al-info-card glass shadow">
            <div className="al-info-icon">
              <HelpCircle color="#3182ce" />
            </div>
            <h4>Quick Guidelines</h4>
            <ul>
              <li>Medical leaves require an attachment after 2 days.</li>
              <li>Apply at least 1 day in advance for non-emergencies.</li>
              <li>Attendance below 75% should be avoided.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="al-modal-overlay">
          <div className="al-modal-card al-preview-modal animate-scale-up">
            <div className="al-modal-header">
              <h3>Confirm Application</h3>
              <button onClick={() => setPreview(false)}><XCircle /></button>
            </div>
            <div className="al-modal-content">
              <div className="al-confirm-item">
                <span className="label">Category</span>
                <span className="value">{leaveType}</span>
              </div>
              <div className="al-confirm-item">
                <span className="label">Duration</span>
                <span className="value">{fromDate} {isHalfDay ? '(Half Day)' : `to ${toDate}`}</span>
              </div>
              <div className="al-confirm-item">
                <span className="label">Total Days</span>
                <span className="value">{getDayCount()}</span>
              </div>
              <div className="al-confirm-item">
                <span className="label">Reason</span>
                <p className="value reason">{reason}</p>
              </div>
            </div>
            <div className="al-modal-footer">
              <button className="al-modal-btn cancel" onClick={() => setPreview(false)}>Edit</button>
              <button className="al-modal-btn confirm" onClick={handleSubmit}>
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitted && (
        <div className="al-modal-overlay">
          <div className="al-modal-card al-success-modal animate-scale-up">
            <div className="al-success-icon">
              <CheckCircle2 size={64} color="#38a169" />
            </div>
            <h3>Application Submitted</h3>
            <p>{successMessage}</p>
            <button className="al-modal-btn close" onClick={() => setSubmitted(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLeaveDashboard;
