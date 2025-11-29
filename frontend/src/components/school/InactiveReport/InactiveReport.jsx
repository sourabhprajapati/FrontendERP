

import React, { useState } from "react";
import "./InactiveReport.css";

const inactiveData = [
  {
    id: 1,
    name: "Rahul Sharma",
    lastActive: "2024-10-15",
    reason: "Long Leave",
  },
  {
    id: 2,
    name: "Neha Gupta",
    lastActive: "2024-08-10",
    reason: "Maternity Leave",
  },
  {
    id: 3,
    name: "Amit Singh",
    lastActive: "2024-09-05",
    reason: "Resigned",
  },
  {
    id: 4,
    name: "Priya Verma",
    lastActive: "2024-07-20",
    reason: "Health Issue",
  },
];

export default function InactiveReport() {
  const [list, setList] = useState(inactiveData);
  const [search, setSearch] = useState("");
  const [filterReason, setFilterReason] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  const handleReactivate = (id) => {
    setList(list.filter((entry) => entry.id !== id));
  };

  const filtered = list.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchReason = filterReason ? item.reason === filterReason : true;
    const matchMonth = filterMonth
      ? item.lastActive.slice(5, 7) === filterMonth
      : true;

    return matchName && matchReason && matchMonth;
  });

  return (
    <div className="inactive-container">
      <h2 className="inactive-title">Inactive Staff Report</h2>

      {/* Search */}
      <input
        className="inactive-search"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="inactive-filters">
        <select
          value={filterReason}
          onChange={(e) => setFilterReason(e.target.value)}
        >
          <option value="">Filter by Reason</option>
          <option value="Long Leave">Long Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Health Issue">Health Issue</option>
          <option value="Resigned">Resigned</option>
        </select>

        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Filter by Last Active Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Table */}
      <div className="inactive-table-wrapper">
        <table className="inactive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Active</th>
              <th>Reason</th>
              <th>Reactivate</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.lastActive}</td>
                <td>{item.reason}</td>
                <td>
                  <button
                    className="reactivate-btn"
                    onClick={() => handleReactivate(item.id)}
                  >
                    Reactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="inactive-empty">No inactive staff found.</p>
        )}
      </div>
    </div>
  );
}