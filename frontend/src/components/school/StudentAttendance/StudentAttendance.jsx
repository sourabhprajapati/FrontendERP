
import React, { useState, useMemo } from "react";
import "./StudentAttendance.css";

const CLASS_LIST = ["Select", "Nursery", "K.G.", "1", "2", "3", "4", "5", "6", "7", "8"];
const SECTION_LIST = ["Select", "A", "B", "C"];

const ATTENDANCE_OPTIONS = [
  { value: "Present", label: "Present" },
  { value: "Late", label: "Late" },
  { value: "Leave", label: "Leave" },
  { value: "Absent", label: "Absent" },
  { value: "Half Day", label: "Half Day" },
];

const SAMPLE_STUDENTS = [
  { roll: "1", name: "Aarav Sharma", className: "1", section: "A", adm: "ST1001" },
  { roll: "2", name: "Riya Patel", className: "1", section: "A", adm: "ST1002" },
  { roll: "3", name: "Mohit Verma", className: "1", section: "A", adm: "ST1003" },
  { roll: "4", name: "Nisha Gupta", className: "1", section: "A", adm: "ST1004" },
  { roll: "5", name: "Pawan Singh", className: "1", section: "A", adm: "ST1005" },
];

export default function StudentAttendance() {
  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");
  const [attendanceType, setAttendanceType] = useState("Select");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [students] = useState(SAMPLE_STUDENTS);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [noteMap, setNoteMap] = useState({});
  const [searchFilter, setSearchFilter] = useState("");

  const [showHolidayPopup, setShowHolidayPopup] = useState(false);
  const [holidayFrom, setHolidayFrom] = useState("");
  const [holidayTo, setHolidayTo] = useState("");

  const [visibleCols, setVisibleCols] = useState({
    index: true,
    adm: true,
    roll: true,
    name: true,
    attendance: true,
    note: true,
  });

  const filtered = useMemo(() => {
    return students
      .filter((s) => s.className === selectedClass && s.section === selectedSection)
      .filter((s) => {
        const search = searchFilter.toLowerCase();
        return (
          s.name.toLowerCase().includes(search) ||
          s.adm.toLowerCase().includes(search) ||
          s.roll.includes(search)
        );
      });
  }, [students, selectedClass, selectedSection, searchFilter]);

  function handleSearch(e) {
    e.preventDefault();
    if (selectedClass === "Select" || selectedSection === "Select") {
      alert("Please select Class & Section.");
      return;
    }
    setShowResults(true);
  }

  function toggleColumn(key) {
    setVisibleCols({
      ...visibleCols,
      [key]: !visibleCols[key],
    });
  }

  function markAllHoliday() {
    if (filtered.length === 0) {
      alert("No students available!");
      return;
    }

    let updated = { ...attendanceMap };

    filtered.forEach((s) => {
      updated[s.adm] = "Holiday";
    });

    setAttendanceMap(updated);

    alert("All students marked as Holiday!");
  }

  function saveAttendance() {
    if (!attendanceDate) {
      alert("Please select Attendance Date!");
      return;
    }

    if (filtered.length === 0) {
      alert("No students to save!");
      return;
    }

    const finalData = {
      class: selectedClass,
      section: selectedSection,
      date: attendanceDate,
      totalStudents: filtered.length,
      records: filtered.map((s) => ({
        admission: s.adm,
        roll: s.roll,
        name: s.name,
        attendance: attendanceMap[s.adm] || "Not Marked",
        note: noteMap[s.adm] || "",
      })),
    };

    console.log("FINAL SAVED DATA:", finalData);
    alert("Attendance Saved Successfully!");
  }

  function applyHolidayRange() {
    if (!holidayFrom || !holidayTo) {
      alert("Please select From & To dates");
      return;
    }

    let updated = { ...attendanceMap };

    filtered.forEach((s) => {
      updated[s.adm] = "Holiday";
    });

    setAttendanceMap(updated);
    setShowHolidayPopup(false);

    alert("Holiday applied for selected range!");
  }

  return (
    <div className="sa-root122">
     

      {/* Criteria Box */}
      <form className="criteria-box122" onSubmit={handleSearch}>
        <div className="criteria-top-btn122">
          <button type="button" className="btn122 green122" onClick={() => setShowHolidayPopup(true)}>
            Mark Holiday Range
          </button>
        </div>
          <h1 className="sa-title122">Student Attendance</h1>
        <h2 className="criteria-heading122">Select Criteria</h2>

        <div className="criteria-row122">
          <div className="criteria-item122">
            <label>Class *</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {CLASS_LIST.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="criteria-item122">
            <label>Section *</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              {SECTION_LIST.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="criteria-item122">
            <label>Attendance</label>
            <select value={attendanceType} onChange={(e) => setAttendanceType(e.target.value)}>
              <option>Select</option>
              <option>Present</option>
              <option>Late</option>
              <option>Leave</option>
              <option>Absent</option>
              <option>Holiday</option>
              <option>Half Day</option>
            </select>
          </div>

          <div className="criteria-item122">
            <label>Attendance Date</label>
            <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
          </div>

          <button type="submit" className="btn122 primary122 search-btn122">Search</button>
        </div>
      </form>

      {/* Holiday Popup */}
      {showHolidayPopup && (
        <div className="holiday-popup122">
          <div className="popup-content122">
            <h3>Mark Holiday Range</h3>

            <label>From Date:</label>
            <input type="date" value={holidayFrom} onChange={(e) => setHolidayFrom(e.target.value)} />

            <label>To Date:</label>
            <input type="date" value={holidayTo} onChange={(e) => setHolidayTo(e.target.value)} />

            <div className="popup-actions122">
              <button className="btn122 primary122" onClick={applyHolidayRange}>Apply</button>
              <button className="btn122" onClick={() => setShowHolidayPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="result-box122">
          <div className="result-header122">
            <h2 className="result-title122">Student Attendance List</h2>

            <div className="result-actions-right122">
              <button className="btn122 green122" style={{ marginRight: "10px" }} onClick={markAllHoliday}>
                Mark as Holiday
              </button>

              <button className="btn122 primary122" onClick={saveAttendance}>Save Attendance</button>
            </div>
          </div>

          <div className="result-subtitle122">Record</div>

          <div className="table-controls122">
            <select className="column-select122" onChange={(e) => toggleColumn(e.target.value)}>
              <option value="">Column Visibility</option>
              <option value="index">#</option>
              <option value="adm">ADMISSION NO.</option>
              <option value="roll">ROLL NUMBER</option>
              <option value="name">NAME</option>
              <option value="attendance">ATTENDANCE</option>
              <option value="note">NOTE</option>
            </select>

            <input
              type="text"
              className="table-search122"
              placeholder="Search student..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="table-wrapper122">
            <table className="att-table122">
              <thead>
                <tr>
                  {visibleCols.index && <th>#</th>}
                  {visibleCols.adm && <th>ADMISSION NO.</th>}
                  {visibleCols.roll && <th>ROLL NUMBER</th>}
                  {visibleCols.name && <th>NAME</th>}
                  {visibleCols.attendance && <th>ATTENDANCE</th>}
                  {visibleCols.note && <th>NOTE</th>}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>No Data Found</td>
                  </tr>
                ) : (
                  filtered.map((s, index) => (
                    <tr key={s.adm}>
                      {visibleCols.index && <td>{index + 1}</td>}
                      {visibleCols.adm && <td>{s.adm}</td>}
                      {visibleCols.roll && <td>{s.roll}</td>}
                      {visibleCols.name && <td className="name-cell122">{s.name}</td>}

                      {visibleCols.attendance && (
                        <td className="radio-cell122">
                          {ATTENDANCE_OPTIONS.map((opt) => (
                            <label key={opt.value} className="radio-label122">
                              <input
                                type="radio"
                                name={`att-${s.adm}`}
                                value={opt.value}
                                checked={attendanceMap[s.adm] === opt.value}
                                onChange={() =>
                                  setAttendanceMap({ ...attendanceMap, [s.adm]: opt.value })
                                }
                              />
                              {opt.label}
                            </label>
                          ))}
                        </td>
                      )}

                      {visibleCols.note && (
                        <td>
                          <input
                            type="text"
                            className="note-box122"
                            placeholder=""
                            value={noteMap[s.adm] || ""}
                            onChange={(e) =>
                              setNoteMap({ ...noteMap, [s.adm]: e.target.value })
                            }
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}