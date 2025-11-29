import React, { useState } from "react";
import "./AllLeaveRequests.css";

const dummyData = [
  {
    id: 1,
    name: "Rahul Sharma",
    type: "Sick Leave",
    from: "2025-02-10",
    to: "2025-02-12",
    days: 3,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Verma",
    type: "Casual Leave",
    from: "2025-02-16",
    to: "2025-02-16",
    days: 1,
    reason: "Family Work",
    status: "Approved",
  },
  {
    id: 3,
    name: "Amit Singh",
    type: "Half Day",
    from: "2025-02-11",
    to: "2025-02-11",
    days: 1,
    reason: "Doctor Visit",
    status: "Rejected",
  },
];

export default function AllLeaveRequests() {
  const [requests, setRequests] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  const filtered = requests.filter((r) => {
    const matchName = r.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? r.status === statusFilter : true;
    const matchType = typeFilter ? r.type === typeFilter : true;
    return matchName && matchStatus && matchType;
  });

  return (
    <div className="leave-req-container">
      <h2 className="leave-req-title">All Leave Requests</h2>

      {/* Search */}
      <input
        className="leave-req-search"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="leave-req-filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Filter by Leave Type</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Half Day">Half Day</option>
          <option value="Paid Leave">Paid Leave</option>
        </select>
      </div>

      {/* Table */}
      <div className="leave-req-table-wrapper">
        <table className="leave-req-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From – To</th>
              <th>Days</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((req) => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.type}</td>
                <td>{req.from} → {req.to}</td>
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
                  <button
                    className="leave-req-approve"
                    onClick={() => handleAction(req.id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="leave-req-reject"
                    onClick={() => handleAction(req.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="leave-req-empty">No leave requests found.</p>
        )}
      </div>
    </div>
  );
}