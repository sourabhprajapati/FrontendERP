import React, { useState } from "react";
import "./StaffBirthday.css";

const staffList = [
  { id: 1, name: "Rahul Sharma", dob: "1990-02-15" },
  { id: 2, name: "Priya Verma", dob: "1989-11-20" },
  { id: 3, name: "Amit Singh", dob: "1992-02-15" },
  { id: 4, name: "Neha Gupta", dob: "1995-05-03" },
  { id: 5, name: "Rohan Mishra", dob: "1994-11-20" },
];

export default function StaffBirthday() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");

  const filtered = staffList.filter((s) => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchMonth = month ? s.dob.slice(5, 7) === month : true;
    return matchName && matchMonth;
  });

  const getReadableDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const today = new Date().toISOString().slice(5, 10); // MM-DD format

  return (
    <div className="bday-wrapper">
      <h2 className="bday-title">Staff Birthday</h2>

      {/* Search */}
      <input
        className="bday-search"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Month Filter */}
      <select
        className="bday-month-select"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">Filter by Month</option>
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

      {/* Birthday Cards */}
      <div className="bday-list">
        {filtered.map((s) => {
          const isToday = s.dob.slice(5, 10) === today;

          return (
            <div
              key={s.id}
              className={`bday-card ${isToday ? "bday-highlight" : ""}`}
            >
              <div>
                <h3>{s.name}</h3>
                <p>
                  Date of Birth: <span>{getReadableDate(s.dob)}</span>
                </p>
              </div>

              {isToday && <div className="bday-today-badge">Today!</div>}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="bday-empty">No birthdays found.</p>
        )}
      </div>
    </div>
  );
}