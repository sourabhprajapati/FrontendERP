import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { CheckCircle2, XCircle, Calendar, Users, Save, Search, Loader2 } from "lucide-react";
import "./StudentAttendance.css";

// Use relative URL in development (works with Vite proxy) or absolute URL as fallback
const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "" : "http://localhost:5000");

const CLASS_LIST = ["Select", "Nursery", "K.G.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SECTION_LIST = ["Select", "A", "B", "C", "D", "E"];

const ATTENDANCE_OPTIONS = [
  { value: "Present", label: "Present", color: "#10b981" },
  { value: "Leave", label: "Leave", color: "#f59e0b" },
  { value: "Absent", label: "Absent", color: "#ef4444" },
];

export default function StudentAttendance() {
  // Auto-set today's date
  const today = new Date().toISOString().split("T")[0];

  const [selectedClass, setSelectedClass] = useState("Select");
  const [selectedSection, setSelectedSection] = useState("Select");
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [showResults, setShowResults] = useState(false);
  const [saving, setSaving] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [noteMap, setNoteMap] = useState({});
  const [searchFilter, setSearchFilter] = useState("");

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const search = searchFilter.toLowerCase();
      return (
        s.name?.toLowerCase().includes(search) ||
        s.adm?.toLowerCase().includes(search) ||
        s.roll?.toString().includes(search)
      );
    });
  }, [students, searchFilter]);

  // Auto-fetch students when class/section changes
  useEffect(() => {
    if (selectedClass !== "Select" && selectedSection !== "Select") {
      fetchStudents();
    } else {
      setStudents([]);
      setShowResults(false);
    }
  }, [selectedClass, selectedSection]);

  // Auto-fetch existing attendance when date changes
  useEffect(() => {
    if (attendanceDate && selectedClass !== "Select" && selectedSection !== "Select" && students.length > 0) {
      fetchExistingAttendance();
    }
  }, [attendanceDate]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setShowResults(false);
      setAttendanceMap({});
      setNoteMap({});

      const params = new URLSearchParams({
        className: selectedClass,
        section: selectedSection,
      });

      const response = await fetch(`${baseURL}/api/attendance/students?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const data = await response.json();

      // Handle different response formats
      const studentsArray = Array.isArray(data) ? data : (data.students || data.data || []);

      if (studentsArray.length === 0) {
        toast.info("No students found for this class and section");
      } else {
        setStudents(studentsArray);

        // Default attendance to "Present" for all new fetches
        const defaultAttendance = {};
        studentsArray.forEach(s => {
          defaultAttendance[s.adm] = "Present";
        });
        setAttendanceMap(defaultAttendance);

        setShowResults(true);
        toast.success(`Loaded ${studentsArray.length} students`);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.message || "Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingAttendance = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/attendance/records?className=${selectedClass}&section=${selectedSection}&date=${attendanceDate}`
      );

      if (!response.ok) return;

      const data = await response.json();

      if (data.records && data.records.length > 0) {
        const newAttendanceMap = {};
        const newNoteMap = {};

        data.records.forEach((record) => {
          newAttendanceMap[record.admission] = record.attendance;
          if (record.note) {
            newNoteMap[record.admission] = record.note;
          }
        });

        setAttendanceMap(newAttendanceMap);
        setNoteMap(newNoteMap);
        toast.info("Existing attendance data loaded");
      }
    } catch (error) {
      console.error("Error fetching existing attendance:", error);
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    if (selectedClass === "Select" || selectedSection === "Select") {
      toast.warning("Please select Class & Section");
      return;
    }
    if (!attendanceDate) {
      toast.warning("Please select Attendance Date");
      return;
    }
    fetchStudents();
  }

  // Bulk actions
  const markAll = async (status) => {
    if (filtered.length === 0) {
      toast.warning("No students available!");
      return;
    }

    const updated = { ...attendanceMap };
    filtered.forEach((s) => {
      updated[s.adm] = status;
      if (status === "Present") {
        // Clear note for present students
        setNoteMap((prev) => {
          const newMap = { ...prev };
          delete newMap[s.adm];
          return newMap;
        });
      }
    });

    setAttendanceMap(updated);
    toast.success(`All students marked as ${status}`);
  };

  async function markAllHoliday() {
    await markAll("Holiday");
    // Auto-save after marking holiday
    setTimeout(() => saveAttendance(), 500);
  }

  async function saveAttendance() {
    if (!attendanceDate) {
      toast.warning("Please select Attendance Date!");
      return;
    }

    if (filtered.length === 0) {
      toast.warning("No students to save!");
      return;
    }

    // Check if at least one student is marked
    const markedCount = filtered.filter((s) => attendanceMap[s.adm] && attendanceMap[s.adm] !== "Not Marked").length;
    if (markedCount === 0) {
      toast.warning("Please mark attendance for at least one student!");
      return;
    }

    setSaving(true);

    // Use student IDs directly from student data
    const validRecords = filtered
      .map((s) => ({
        studentId: s.id,
        admission: s.adm,
        roll: s.roll,
        name: s.name,
        attendance: attendanceMap[s.adm] || "Not Marked",
        note: noteMap[s.adm] || "",
      }))
      .filter((r) => r.studentId && r.attendance && r.attendance !== "Not Marked");

    const finalData = {
      class: selectedClass,
      section: selectedSection,
      date: attendanceDate,
      records: validRecords,
    };

    try {
      const response = await fetch(`${baseURL}/api/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Attendance saved successfully for ${validRecords.length} students!`);
      } else {
        toast.error(result.message || "Failed to save attendance");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance. Please check your connection.");
    } finally {
      setSaving(false);
    }
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const present = filtered.filter((s) => attendanceMap[s.adm] === "Present").length;
    const absent = filtered.filter((s) => attendanceMap[s.adm] === "Absent").length;
    const leave = filtered.filter((s) => attendanceMap[s.adm] === "Leave").length;
    const holiday = filtered.filter((s) => attendanceMap[s.adm] === "Holiday").length;
    const unmarked = filtered.filter((s) => !attendanceMap[s.adm] || attendanceMap[s.adm] === "Not Marked").length;

    return { present, absent, leave, holiday, unmarked, total: filtered.length };
  }, [filtered, attendanceMap]);

  return (
    <div className="sa-root122">
      {/* Criteria Box */}
      <form className="criteria-box122" onSubmit={handleSearch}>
        <h1 className="sa-title122">Student Attendance</h1>
        <h2 className="criteria-heading122">Select Criteria</h2>

        <div className="criteria-row122">
          <div className="criteria-item122">
            <label>Class *</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {CLASS_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="criteria-item122">
            <label>Section *</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              {SECTION_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="criteria-item122">
            <label>Attendance Date *</label>
            <input
              type="date"
              value={attendanceDate}
              max={today}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn122 primary122 search-btn122" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={16} style={{ marginRight: "8px", animation: "spin 1s linear infinite" }} />
                Loading...
              </>
            ) : (
              <>
                <Search size={16} style={{ marginRight: "8px" }} />
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results */}
      {showResults && (
        <div className="result-box122">
          <div className="result-header122">
            <div>
              <h2 className="result-title122">Student Attendance List</h2>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", color: "#10b981" }}>
                  <CheckCircle2 size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                  Present: {stats.present}
                </span>
                <span style={{ fontSize: "14px", color: "#ef4444" }}>
                  <XCircle size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                  Absent: {stats.absent}
                </span>
                <span style={{ fontSize: "14px", color: "#f59e0b" }}>
                  Leave: {stats.leave} | Holiday: {stats.holiday}
                </span>
                {stats.unmarked > 0 && (
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    Unmarked: {stats.unmarked}
                  </span>
                )}
              </div>
            </div>

            <div className="result-actions-right122">
              <button
                className="btn122"
                style={{ backgroundColor: "#ef4444", color: "white", marginRight: "8px" }}
                onClick={() => markAll("Absent")}
                title="Mark all as Absent"
              >
                <XCircle size={16} style={{ marginRight: "4px" }} />
                All Absent
              </button>
              <button
                className="btn122 green122"
                style={{ marginRight: "8px" }}
                onClick={markAllHoliday}
                title="Mark all as Holiday and save"
              >
                <Calendar size={16} style={{ marginRight: "4px" }} />
                Mark Holiday
              </button>
              <button
                className="btn122 primary122"
                onClick={saveAttendance}
                disabled={saving}
                title="Save attendance"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} style={{ marginRight: "4px", animation: "spin 1s linear infinite" }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} style={{ marginRight: "4px" }} />
                    Save Attendance
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="result-subtitle122">
            <Users size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Total Students: {stats.total}
          </div>

          <div className="table-controls122">
            <input
              type="text"
              className="table-search122"
              placeholder="Search by name, admission no, or roll number..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="table-wrapper122">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto" }} />
                <p>Loading students...</p>
              </div>
            ) : (
              <table className="att-table122">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ADMISSION NO.</th>
                    <th>ROLL NUMBER</th>
                    <th>NAME</th>
                    <th>ATTENDANCE</th>
                    <th>NOTE</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s, index) => {
                      const status = attendanceMap[s.adm];
                      const isPresent = status === "Present";

                      return (
                        <tr key={s.adm} className={status ? `att-row-${status.toLowerCase()}` : ""}>
                          <td>{index + 1}</td>
                          <td>{s.adm || "-"}</td>
                          <td>{s.roll || "-"}</td>
                          <td className="name-cell122">{s.name || "Unnamed"}</td>

                          <td className="radio-cell122">
                            {ATTENDANCE_OPTIONS.map((opt) => {
                              const isChecked = status === opt.value;
                              return (
                                <label
                                  key={opt.value}
                                  className={`radio-label122 ${isChecked ? `checked-${opt.value.toLowerCase()}` : ''}`}
                                >
                                  <input
                                    type="radio"
                                    name={`att-${s.adm}`}
                                    value={opt.value}
                                    checked={isChecked}
                                    onChange={() =>
                                      setAttendanceMap({ ...attendanceMap, [s.adm]: opt.value })
                                    }
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              );
                            })}
                          </td>

                          <td>
                            <input
                              type="text"
                              className="note-box122"
                              placeholder={isPresent ? "Not required" : "Add note..."}
                              disabled={isPresent}
                              value={noteMap[s.adm] || ""}
                              onChange={(e) => setNoteMap({ ...noteMap, [s.adm]: e.target.value })}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Sticky Save Button */}
          {filtered.length > 0 && (
            <button
              className="btn122 primary122 sticky-save-btn122"
              onClick={saveAttendance}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 size={16} style={{ marginRight: "8px", animation: "spin 1s linear infinite" }} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} style={{ marginRight: "8px" }} />
                  Save Attendance ({stats.present + stats.absent + stats.leave + stats.holiday} marked)
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
