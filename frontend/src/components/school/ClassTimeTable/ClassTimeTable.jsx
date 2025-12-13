import React, { useState } from "react";
import "./ClassTimeTable.css";

const CLASSES = ["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8"];
const SECTIONS = ["A", "B", "C"];
const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SUBJECTS = ["English", "Math", "EVS", "Hindi", "Science", "Computer"];
const TEACHERS = ["Ms. Sharma", "Mr. Verma", "Ms. Kapoor", "Mr. Singh"];

export default function ClassTimeTable() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [daysDropdownOpen, setDaysDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showTeacher, setShowTeacher] = useState(true);

  const PERIODS = [
    { id: "P1", label: "08:00 AM - 09:00 AM" },
    { id: "P2", label: "09:00 AM - 10:00 AM" },
    { id: "P3", label: "10:00 AM - 11:00 AM" },
    { id: "P4", label: "11:00 AM - 12:00 PM" },
    { id: "P5", label: "12:00 PM - 01:00 PM" },
  ];

  const [tableData, setTableData] = useState({});

  const toggleDay = (day) => {
    if (day === "All Days") {
      setSelectedDays(selectedDays.length === ALL_DAYS.length ? [] : [...ALL_DAYS]);
      return;
    }
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubjectChange = (day, pid, subject) => {
    setTableData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [pid]: {
          subject,
          teacher: prev[day]?.[pid]?.teacher || "",
        },
      },
    }));
  };

  const handleTeacherChange = (day, pid, teacher) => {
    setTableData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [pid]: { ...prev[day]?.[pid], teacher },
      },
    }));
  };

  const handleSearch = () => {
    if (!selectedClass || !selectedSection || selectedDays.length === 0) {
      alert("Please fill all fields");
      return;
    }
    setShowTable(true);
  };

  const handleSave = () => {
    localStorage.setItem("class-timetable-data", JSON.stringify(tableData));
    alert("Timetable Saved Successfully!");
  };

  const handlePrint = () => window.print();

  const today = new Date().toLocaleDateString("en-GB");

  return (
    <div className="ct-container28">
      <h1 className="main-title28 no-print28">Class Time Table</h1>

      {/* Criteria Card */}
      <div className="criteria-card28 no-print28">
        <h3 className="criteria-title28">Select Criteria</h3>

        <div className="criteria-row28 full-width28">
          <div className="criteria-item28 full-block28">
            <label>Class *</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="criteria-item28 full-block28">
            <label>Section *</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              <option value="">Select Section</option>
              {SECTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="criteria-item28 full-block28 days-dropdown-wrap28">
            <label>Select Days *</label>
            <div
              className="dropdown-btn28"
              onClick={() => setDaysDropdownOpen(!daysDropdownOpen)}
            >
              {selectedDays.length === 0
                ? "Select Days"
                : selectedDays.length === ALL_DAYS.length
                ? "All Days"
                : `${selectedDays.length} Day${selectedDays.length > 1 ? "s" : ""} Selected`}
              <span className="arrow28">Down Arrow</span>
            </div>

            {daysDropdownOpen && (
              <div className="days-dropdown28">
                <label className="dropdown-item28">
                  <input
                    type="checkbox"
                    checked={selectedDays.length === ALL_DAYS.length}
                    onChange={() => toggleDay("All Days")}
                  />{" "}
                  All Days
                </label>
                {ALL_DAYS.map((d) => (
                  <label key={d} className="dropdown-item28">
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(d)}
                      onChange={() => toggleDay(d)}
                    />{" "}
                    {d}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button className="search-btn28 small-search28" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Timetable Table */}
      {showTable && (
        <div
          className="table-card28"
          data-class={selectedClass}
          data-section={selectedSection}
          data-date={today}
        >
          <div className="table-header28 no-print28">
            <h3>Class TimeTable - {selectedClass} {selectedSection}</h3>
            <div className="header-btns28">
              <button className="toggle-btn28" onClick={() => setShowTeacher(!showTeacher)}>
                {showTeacher ? "Hide Teacher" : "Show Teacher"}
              </button>
              <button className="print-btn28" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>

          <div className="table-scroll28">
            <table className="timetable-table28">
              <thead>
                <tr>
                  <th>Period / Time</th>
                  {selectedDays.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((p) => (
                  <tr key={p.id}>
                    <td className="period-col28">
                      <b>Period {p.id.replace("P", "")}</b>
                      <div className="time-text28">{p.label}</div>
                    </td>

                    {selectedDays.map((day) => {
                      const cell = tableData[day]?.[p.id] || {};
                      return (
                        <td key={day}>
                          {/* Edit Mode (Visible on Screen Only) */}
                          <select
                            className="select-subject28 no-print28"
                            value={cell.subject || ""}
                            onChange={(e) => handleSubjectChange(day, p.id, e.target.value)}
                          >
                            <option value="">Select Subject</option>
                            {SUBJECTS.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>

                          {showTeacher && (
                            <select
                              className="select-teacher28 no-print28"
                              value={cell.teacher || ""}
                              onChange={(e) => handleTeacherChange(day, p.id, e.target.value)}
                            >
                              <option value="">Select Teacher</option>
                              {TEACHERS.map((t) => (
                                <option key={t}>{t}</option>
                              ))}
                            </select>
                          )}

                          {/* Print Mode (Visible Only When Printing) */}
                          <div className="print-subject28">
                            {cell.subject || "-"}
                          </div>
                          {showTeacher && (
                            <div className="print-teacher28">
                              {cell.teacher || ""}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="save-btn28 no-print28" onClick={handleSave}>
            Save Timetable
          </button>
        </div>
      )}
    </div>
  );
}