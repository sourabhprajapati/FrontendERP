

import React, { useState } from "react";
import "./StaffAttendance.css";

export default function StaffAttendance() {
  // Dummy staff list
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Amit Sharma", status: "none" },
    { id: 2, name: "Priya Singh", status: "none" },
    { id: 3, name: "Rahul Verma", status: "none" },
    { id: 4, name: "Kajal Mehta", status: "none" },
  ]);

  const [search, setSearch] = useState("");

  // Search filter
  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Mark present / absent
  const updateStatus = (id, status) => {
    const updated = staffList.map((s) =>
      s.id === id ? { ...s, status } : s
    );
    setStaffList(updated);
  };

  return (
    <div className="attendance-container">
      <h2>Staff Attendance</h2>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff Name</th>
            <th>Status</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {filteredStaff.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No Staff Found
              </td>
            </tr>
          ) : (
            filteredStaff.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>
                  <span
                    className={
                      s.status === "present"
                        ? "present"
                        : s.status === "absent"
                        ? "absent"
                        : "none"
                    }
                  >
                    {s.status === "none" ? "Not Marked" : s.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-present"
                    onClick={() => updateStatus(s.id, "present")}
                  >
                    Present
                  </button>
                  <button
                    className="btn btn-absent"
                    onClick={() => updateStatus(s.id, "absent")}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}