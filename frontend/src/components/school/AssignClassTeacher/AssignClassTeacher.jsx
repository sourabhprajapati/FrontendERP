// src/components/School/AssignClassTeacher.jsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AssignClassTeacher.css";

const API_BASE = "http://localhost:5000/api";

export default function AssignClassTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [classes] = useState([
    "Nursery", "LKG", "UKG",
    "1st", "2nd", "3rd", "4th",
    "5th", "6th", "7th", "8th"
  ]);

  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const schoolId = localStorage.getItem("schoolId") || "000000000000000000000001";

  // Fetch teachers and current assignments
  useEffect(() => {
   // In your useEffect
const fetchData = async () => {
  setLoading(true);
  try {
    // Fetch staff (teachers) - using GET
    const staffRes = await fetch(
      `${API_BASE}/staff/all?schoolId=${encodeURIComponent(schoolId)}`
    );

    const staffData = await staffRes.json();
    if (!staffData.success) {
      throw new Error(staffData.message || "Failed to load teachers");
    }

    // Filter only teachers
    const teacherList = staffData.data.filter(
      staff => staff.userType === "Teacher"
    );
    setTeachers(teacherList);

    // Fetch assignments (already GET)
    const assignRes = await fetch(
      `${API_BASE}/class-teacher/assignments?schoolId=${encodeURIComponent(schoolId)}`
    );
    const assignData = await assignRes.json();
    if (assignData.success) {
      setAssigned(assignData.data || []);
    }
  } catch (err) {
    toast.error(err.message || "Failed to load data");
  } finally {
    setLoading(false);
  }
};
    fetchData();
  }, [schoolId]);

  const filteredTeachers = teachers.filter((t) =>
    t.employeeName?.toLowerCase().includes(search.toLowerCase())
  );

  const assignTeacher = async () => {
    if (!selectedTeacher || !selectedClass) {
      toast.warning("Please select both teacher and class!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/class-teacher/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          className: selectedClass,
          teacherId: selectedTeacher,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to assign teacher");
      }

      toast.success(`Successfully assigned ${selectedClass} to ${result.data.teacher}`);

      // Add to local state (optimistic update)
      setAssigned((prev) => [
        ...prev,
        {
          className: selectedClass,
          teacher: result.data.teacher,
          designation: result.data.designation,
        },
      ]);

      // Reset selection
      setSelectedTeacher("");
      setSelectedClass("");
    } catch (err) {
      toast.error(err.message || "Assignment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-ct-wrapper">
      <ToastContainer position="top-right" autoClose={4000} />

      <h2 className="assign-ct-title">Assign Class Teacher</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}

      {/* SEARCH BOX */}
      <input
        className="assign-ct-search"
        placeholder="Search teacher by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
      />

      {/* TEACHERS LIST */}
      <div className="assign-ct-teacher-list">
        {loading ? (
          <p className="assign-ct-empty">Loading teachers...</p>
        ) : filteredTeachers.length === 0 ? (
          <p className="assign-ct-empty">No teachers found.</p>
        ) : (
          filteredTeachers.map((t) => (
            <div
              key={t._id}
              className={`assign-ct-teacher-card ${
                selectedTeacher === t._id ? "active" : ""
              }`}
              onClick={() => setSelectedTeacher(t._id)}
            >
              {t.employeeName}
              <small style={{ color: "#666", display: "block" }}>
                {t.designation || "Teacher"}
              </small>
            </div>
          ))
        )}
      </div>

      {/* CLASS SELECT */}
      <select
        className="assign-ct-class-select"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        disabled={loading}
      >
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {/* ASSIGN BUTTON */}
      <button
        className="assign-ct-btn-assign"
        onClick={assignTeacher}
        disabled={loading || !selectedTeacher || !selectedClass}
      >
        {loading ? "Assigning..." : "Assign Teacher"}
      </button>

      {/* ASSIGNED LIST */}
      <h3 className="assign-ct-assigned-heading">Assigned Class Teachers</h3>

      <div className="assign-ct-assigned-list">
        {assigned.length === 0 ? (
          <p className="assign-ct-empty">No classes assigned yet.</p>
        ) : (
          assigned.map((a, index) => (
            <div key={index} className="assign-ct-assigned-card">
              <span>
                <strong className="assign-ct-green">{a.className}</strong> →{" "}
                <strong className="assign-ct-blue">{a.teacher}</strong>
              </span>
              {a.designation && (
                <small style={{ color: "#666", display: "block" }}>
                  {a.designation}
                </small>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}