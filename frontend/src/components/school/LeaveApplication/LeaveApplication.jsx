// LeaveApplication.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaveApplication.css";

const API_BASE = "http://localhost:5000"; // adjust if your backend is on different port/domain

const LeaveApplication = () => {
  const [activeTab, setActiveTab] = useState("apply");
  const [expandedItems, setExpandedItems] = useState({});
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

  // Employee selection & search
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    fromSession: "Full Day",
    toDate: "",
    toSession: "Full Day",
    days: "",
    reason: "",
    contactDetails: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // History & Pending data
  const [history, setHistory] = useState([]);
  const [pending, setPending] = useState([]);

  // Assume schoolId comes from auth context or localStorage
  const schoolId = "000000000000000000000001"; // ← Replace with real value from auth

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/staff/all`, {
          params: { schoolId },
        });
        setEmployees(res.data.data || []);
      } catch (err) {
        console.error("Failed to load employees:", err);
      }
    };
    fetchEmployees();
  }, []);
  useEffect(() => {
  if (formData.fromDate && formData.toDate) {
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);

    const diffTime = to - from;
    const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;

    if (diffDays > 0) {
      setFormData(prev => ({
        ...prev,
        days: diffDays
      }));
    }
  }
}, [formData.fromDate, formData.toDate]);


  // Fetch history when tab changes or employee selection changes
  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    } else if (activeTab === "pending") {
      fetchPending();
    }
  }, [activeTab, selectedEmployee]);

  const fetchHistory = async () => {
    try {
      const params = { schoolId };
      if (selectedEmployee) params.staffId = selectedEmployee;
      const res = await axios.get(`${API_BASE}/api/staff-leaves/history`, {
        params,
      });
      setHistory(res.data.data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/staff-leaves/pending`, {
        params: { schoolId },
      });
      setPending(res.data.data || []);
    } catch (err) {
      console.error("Failed to load pending leaves:", err);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.employeeName?.toLowerCase().includes(searchEmployee.toLowerCase()) ||
      emp.employeeUserName?.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      setError("Please select an employee");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const submitData = new FormData();
      submitData.append("schoolId", schoolId);
      submitData.append("staffId", selectedEmployee);
      submitData.append("leaveType", formData.leaveType);
      submitData.append("fromDate", formData.fromDate);
      submitData.append("fromSession", formData.fromSession);
      submitData.append("toDate", formData.toDate);
      submitData.append("toSession", formData.toSession);
      submitData.append("days", formData.days);
      submitData.append("reason", formData.reason.trim());
      submitData.append("contactDetails", formData.contactDetails);
      if (attachment) submitData.append("attachment", attachment);

      const res = await axios.post(
        `${API_BASE}/api/staff-leaves/apply`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess("Leave application submitted successfully!");
      setFormData({
        leaveType: "",
        fromDate: "",
        fromSession: "Full Day",
        toDate: "",
        toSession: "Full Day",
        days: "",
        reason: "",
        contactDetails: "",
      });
      setAttachment(null);
      setSelectedEmployee(null);
      setSearchEmployee("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="staff-leave-application-container44">
      <div className="staff-tabs44">
        <button
          className={`staff-tab44 ${activeTab === "apply" ? "active" : ""}`}
          onClick={() => setActiveTab("apply")}
        >
          Apply
        </button>
        <button
          className={`staff-tab44 ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`staff-tab44 ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      <div className="staff-content-wrapper44">
        {/* Apply Tab */}
        {activeTab === "apply" && (
          <>
            <div className="staff-info-banner44">
              Leave is earned by an employee and granted by the employer...
              <span className="staff-hide-link44">Hide</span>
            </div>

            <h2 className="staff-form-title44">Applying for Leave</h2>

            {/* Employee Selection */}
            <div className="staff-form-group44">
              <label className="staff-required44">Employee</label>
              <div className="staff-employee-search-wrapper44">
                <input
                  type="text"
                  className="staff-form-control44 staff-employee-search-input44"
                  placeholder="Search employee by name or ID..."
                  value={searchEmployee}
                  onChange={(e) => {
                    setSearchEmployee(e.target.value);
                    setSelectedEmployee(null);
                    setShowEmployeeDropdown(true);
                  }}
                  onFocus={() => setShowEmployeeDropdown(true)}
                />

                {showEmployeeDropdown && searchEmployee && (
                  <div className="staff-employee-dropdown44">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp) => (
                        <div
                          key={emp._id}
                          className="staff-employee-option44"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedEmployee(emp._id);
                            setSearchEmployee(emp.employeeName);
                            setShowEmployeeDropdown(false); 
                          }}
                        >
                          <div className="staff-employee-name44">
                            {emp.employeeName}
                          </div>
                          <div className="staff-employee-id44">
                            {emp.employeeUserName} • {emp.department || "N/A"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="staff-no-results44">
                        No employees found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div
                className="error-message"
                style={{ color: "red", marginBottom: "16px" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="success-message"
                style={{ color: "green", marginBottom: "16px" }}
              >
                {success}
              </div>
            )}

            <form className="staff-leave-form44" onSubmit={handleSubmit}>
              {/* Leave Type */}
              <div className="staff-form-group44">
                <label className="staff-required44">Leave type</label>
                <select
                  className="staff-form-control44"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option>Casual Leave</option>
                  <option>Paid Leave</option>
                  <option>Special Leave</option>
                  <option>Loss to Pay</option>
                  <option>Comp-off</option>
                  <option>Work From Home</option>
                  <option>On Duty</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="staff-date-range-container44">
                <div className="staff-form-group44 staff-date-group44">
                  <label className="staff-required44">From date</label>
                  <div className="staff-date-input-wrapper44">
                    <input
                      type="date"
                      className="staff-form-control44 staff-date-input44"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      required
                    />
                    <select
                      className="staff-session-select44"
                      name="fromSession"
                      value={formData.fromSession}
                      onChange={handleInputChange}
                    >
                      <option>Full Day</option>
                      <option>Session 1</option>
                      <option>Session 2</option>
                    </select>
                  </div>
                </div>

                <div className="staff-form-group44 staff-date-group44">
                  <label className="staff-required44">To</label>
                  <div className="staff-date-input-wrapper44">
                    <input
                      type="date"
                      className="staff-form-control44 staff-date-input44"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      required
                    />
                    <select
                      className="staff-session-select44"
                      name="toSession"
                      value={formData.toSession}
                      onChange={handleInputChange}
                    >
                      <option>Full Day</option>
                      <option>Session 1</option>
                      <option>Session 2</option>
                    </select>
                  </div>
                </div>

                <div className="staff-balance-info44">
                  <div>
                    Leave Balance: <strong>—</strong>
                  </div>
                  <div>
                    Applying For: <strong>{formData.days || "—"}</strong> days
                  </div>
                </div>
              </div>

              {/* Reason & Contact */}
              <div className="staff-form-group44">
                <label className="staff-label44">Contact details</label>
                <textarea
                  className="staff-form-control44 staff-contact-textarea44"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>

              <div className="staff-form-group44">
                <label className="staff-required44">Reason</label>
                <textarea
                  className="staff-form-control44 staff-reason-textarea44"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Enter reason"
                  rows="3"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="staff-form-group44">
                <label className="staff-label44">Attach File</label>
                <div className="staff-file-upload-wrapper44">
                  <input
                    type="file"
                    id="attachment"
                    className="staff-file-input44"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="attachment"
                    className="staff-file-upload-label44"
                  >
                    Choose File
                  </label>
                  <span className="staff-file-types-info44">
                    {attachment ? attachment.name : "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="staff-form-actions44">
                <button
                  type="submit"
                  className="staff-btn44 staff-submit-btn44"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="staff-btn44 staff-cancel-btn44"
                  onClick={() => {
                    setFormData({
                      leaveType: "",
                      fromDate: "",
                      fromSession: "Full Day",
                      toDate: "",
                      toSession: "Full Day",
                      days: "",
                      reason: "",
                      contactDetails: "",
                    });
                    setAttachment(null);
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {/* Pending Tab */}
        {activeTab === "pending" && (
          <div className="staff-history-container44">
            {pending.length === 0 ? (
              <div className="staff-empty-state44">
                <p className="staff-empty-message44">
                  No pending leave requests
                </p>
              </div>
            ) : (
              pending.map((item, index) => (
                <div key={item._id} className="staff-history-item44">
                  {/* Similar structure as history items */}
                  <div className="staff-history-header44">
                    <span className="staff-status44">{item.status}</span>
                  </div>
                  <div className="staff-history-summary44">
                    <div>{item.staff?.employeeName || "Unknown"}</div>
                    <div>{item.leaveType}</div>
                    <div>{item.days} days</div>
                  </div>
                  {/* ... more details ... */}
                </div>
              ))
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="staff-history-container44">
            {history.length === 0 ? (
              <div className="staff-empty-state44">
                <p className="staff-empty-message44">No leave history found</p>
              </div>
            ) : (
              history.map((item, index) => {
                const isExpanded = expandedItems[index] ?? false;
                return (
                  <div key={item._id} className="staff-history-item44">
                    <div className="staff-history-header44">
                      <span
                        className={`staff-status44 ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                      <button
                        className="staff-expand-toggle44"
                        onClick={() => toggleExpand(index)}
                      >
                        {isExpanded ? "▲" : "▼"}
                      </button>
                    </div>
                    <div className="staff-history-summary44">
                      <div>{item.staff?.employeeName || "—"}</div>
                      <div>{item.leaveType}</div>
                      <div>{item.days} days</div>
                    </div>
                    {isExpanded && (
                      <div className="staff-history-details44">
                        <div>
                          Duration: {item.fromDate} ({item.fromSession}) to{" "}
                          {item.toDate} ({item.toSession})
                        </div>
                        <div>Reason: {item.reason}</div>
                        <div>
                          Applied on {item.appliedOn} by {item.appliedBy}
                        </div>
                        {item.attachment && (
                          <div>
                            Attachment:{" "}
                            <a
                              href={`/uploads/staff-leave-attachments/${item.attachment}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplication;
