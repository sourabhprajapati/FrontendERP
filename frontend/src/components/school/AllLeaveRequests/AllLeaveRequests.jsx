// AllLeaveRequests.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllLeaveRequests.css"; // Keep your existing CSS

const API_BASE = "http://localhost:5000";

const AllLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Replace with real schoolId from auth context or localStorage
  const schoolId = "000000000000000000000001";

  // Fetch all leave requests (pending + history)
  useEffect(() => {
    const fetchAllLeaves = async () => {
      try {
        setLoading(true);

        // Fetch pending
        const pendingRes = await axios.get(`${API_BASE}/api/staff-leaves/pending`, {
          params: { schoolId },
        });

        // Fetch history (approved + rejected)
        const historyRes = await axios.get(`${API_BASE}/api/staff-leaves/history`, {
          params: { schoolId },
        });

        const pending = (pendingRes.data.data || []).map(item => ({
          ...item,
          status: "Pending"
        }));

        const history = (historyRes.data.data || []).filter(
          item => item.status !== "Pending"
        );

        const allRequests = [...pending, ...history]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setRequests(allRequests);
      } catch (err) {
        console.error("Failed to fetch leave requests:", err);
        setError("Failed to load leave requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeaves();
  }, [schoolId]);

  // Handle Approve / Reject
  const handleStatusUpdate = async (leaveId, newStatus) => {
    try {
      await axios.patch(
        `${API_BASE}/api/staff-leaves/${leaveId}/status`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      // Update UI instantly
      setRequests(prev =>
        prev.map(req =>
          req._id === leaveId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      alert("Failed to update status. Please try again.");
      console.error(err);
    }
  };

  // Filtering logic
  const filtered = requests.filter((r) => {
    const staffName = r.staff?.employeeName || "";
    const matchName = staffName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? r.status === statusFilter : true;
    const matchType = typeFilter ? r.leaveType === typeFilter : true;
    return matchName && matchStatus && matchType;
  });

  if (loading) {
    return <div className="leave-req-container">Loading leave requests...</div>;
  }

  if (error) {
    return <div className="leave-req-container" style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="leave-req-container">
      <h2 className="leave-req-title">All Leave Requests</h2>

      {/* Search */}
      <input
        className="leave-req-search"
        placeholder="Search staff by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="leave-req-filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Leave Types</option>
          <option>Casual Leave</option>
          <option>Sick Leave</option>
          <option>Paid Leave</option>
          <option>Maternity Leave</option>
          <option>Work From Home</option>
          <option>On Duty</option>
          <option>Half Day</option>
        </select>
      </div>

      {/* Table */}
      <div className="leave-req-table-wrapper">
        <table className="leave-req-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From → To</th>
              <th>Days</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="leave-req-empty">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              filtered.map((req) => (
                <tr key={req._id}>
                  <td>{req.staff?.employeeName || "Unknown"}</td>
                  <td>{req.leaveType}</td>
                  <td>
                    {req.fromDate} ({req.fromSession})
                    <br />→ {req.toDate} ({req.toSession})
                  </td>
                  <td>{req.days}</td>
                  <td>
                    <span
                      className={`leave-req-status leave-req-${req.status.toLowerCase()}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>{req.reason}</td>
                  <td className="leave-req-actions">
                    {req.status === "Pending" ? (
                      <>
                        <button
                          className="leave-req-approve"
                          onClick={() => handleStatusUpdate(req._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="leave-req-reject"
                          onClick={() => handleStatusUpdate(req._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#666", fontStyle: "italic" }}>
                        Processed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLeaveRequests;