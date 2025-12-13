import React, { useState, useMemo } from "react";
import "./TeacherTimeTable.css";

export default function TeacherTimeTable() {
  const teachers = ["Basan Gowd", "Amit Sharma", "Neha Verma"];

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [visibleColumns, setVisibleColumns] = useState({
    period: true,
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  // ------- DEMO TIMETABLE ----------
  const timetable = [
    {
      period: "Period 1 (06:30 AM – 07:15 AM)",
      mon: "Math – 6A – R12",
      tue: "Science – 7C – Lab 1",
      wed: "English – 8B",
      thu: "Hindi – 5A",
      fri: "",
      sat: "",
      sun: "",
    },
    {
      period: "Period 2 (07:20 AM – 08:10 AM)",
      mon: "Comp – 7A – Lab 2",
      tue: "Math – 8C",
      wed: "EVS – 4B",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
    },
    {
      period: "Period 3 (08:15 AM – 09:00 AM)",
      mon: "",
      tue: "",
      wed: "Science – 6C",
      thu: "Comp – 8A",
      fri: "",
      sat: "",
      sun: "",
    },
    { lunch: true },
    {
      period: "Period 4 (09:30 AM – 10:15 AM)",
      mon: "Eng – 7B",
      tue: "",
      wed: "",
      thu: "",
      fri: "Math – 5A",
      sat: "",
      sun: "",
    },
  ];

  const days = [
    { key: "mon", label: "MONDAY" },
    { key: "tue", label: "TUESDAY" },
    { key: "wed", label: "WEDNESDAY" },
    { key: "thu", label: "THURSDAY" },
    { key: "fri", label: "FRIDAY" },
    { key: "sat", label: "SATURDAY" },
    { key: "sun", label: "SUNDAY" },
  ];

  const filteredRows = useMemo(() => {
    if (!searchText) return timetable;
    return timetable.filter((r) =>
      r.period?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, timetable]);

  function handleSearch() {
    if (!selectedTeacher || !selectedDate) {
      alert("Please select staff & date first.");
      return;
    }
    setSearchClicked(true);
  }

  return (
    <div className="tt-container29">
      {/* SELECT CRITERIA */}
      <div className="criteria-card29">
        <div className="criteria-header29">Select Criteria</div>

        <div className="criteria-grid29">
          <div className="input-group29">
            <label>Staff *</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select Staff</option>
              {teachers.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </select>
          </div>

          <div className="input-group29">
            <label>Date *</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="input-group29">
            <label style={{ visibility: "hidden" }}>btn</label>
            <button className="search-btn29" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* TIMETABLE LIST */}
      {searchClicked && (
        <div className="list-card29">
          <div className="criteria-header29">Teacher Timetable List</div>

          <div className="top-actions29">
            {/* Column Visibility */}
            <div className="col-box29">
              <button className="col-btn29">Column Visibility Down Arrow</button>
              <div className="col-dropdown29">
                <label>
                  <input
                    type="checkbox"
                    checked={visibleColumns.period}
                    onChange={() =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        period: !prev.period,
                      }))
                    }
                  />
                  Period
                </label>
                {days.map((d) => (
                  <label key={d.key}>
                    <input
                      type="checkbox"
                      checked={visibleColumns[d.key]}
                      onChange={() =>
                        setVisibleColumns((prev) => ({
                          ...prev,
                          [d.key]: !prev[d.key],
                        }))
                      }
                    />
                    {d.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Search Filter */}
            <div className="search-filter29">
              <span>Search:</span>
              <input
                type="text"
                placeholder="Search period..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="table-area29">
            <table className="timetable-table29">
              <thead>
                <tr>
                  {visibleColumns.period && <th>PERIOD</th>}
                  {days.map(
                    (d) =>
                      visibleColumns[d.key] && <th key={d.key}>{d.label}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, i) =>
                  row.lunch ? (
                    <tr key={i} className="lunch-row29">
                      <td colSpan="20">LUNCH BREAK</td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      {visibleColumns.period && <td>{row.period}</td>}
                      {days.map(
                        (d) =>
                          visibleColumns[d.key] && <td key={d.key}>{row[d.key] || "-"}</td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}