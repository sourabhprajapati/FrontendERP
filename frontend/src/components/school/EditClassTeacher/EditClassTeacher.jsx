// src/components/School/EditClassTeacher.jsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditClassTeacher.css";

const API_BASE = "http://localhost:5000/api";

export default function EditClassTeacher() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes] = useState([
    "Nursery A",
    "Nursery B",
    "KG A",
    "KG B",
    "1st A",
    "1st B",
    "2nd A",
    "2nd B",
    "3rd A",
    "3rd B",
  ]);

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const schoolId =
    localStorage.getItem("schoolId") || "000000000000000000000001";

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch all teachers
        const teachersRes = await fetch(
          `${API_BASE}/staff/all?schoolId=${encodeURIComponent(schoolId)}`,
          {
            method: "GET",
            // No need for Content-Type or body on GET
          }
        );
        const teachersData = await teachersRes.json();
        if (!teachersData.success) throw new Error(teachersData.message);
        setTeachers(teachersData.data || []);

        // 2. Fetch current class-teacher assignments
        const assignmentsRes = await fetch(
          `${API_BASE}/class-teacher/assignments?schoolId=${encodeURIComponent(
            schoolId
          )}`
        );
        const assignmentsData = await assignmentsRes.json();
        if (!assignmentsData.success) throw new Error(assignmentsData.message);
        setAssignments(assignmentsData.data || []);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

const handleEdit = (assignment) => {
  console.log("=== DEBUG: Assignment clicked ===");
  console.log("Full object:", assignment);
  console.log("Keys available:", Object.keys(assignment || {}));
  console.log("_id exists?", assignment?._id);
  console.log("teacherId exists?", assignment?.teacherId);
  console.log("className:", assignment?.className);

  const realId = assignment?._id || assignment?.id; // fallback for different naming

  if (!realId) {
    console.error("Missing ID - cannot edit:", assignment);
    toast.error("Invalid assignment data - cannot update");
    return;
  }

  setSelected({
    _id: realId.toString(),
    teacherId: assignment.teacherId,
    className: assignment.className,
    teacherName: assignment.teacher || "Unknown",
  });
};
const handleSave = async () => {
  // Safety checks
  if (!selected) {
    toast.error("No assignment selected");
    return;
  }

  if (!selected._id) {
    console.error("Missing assignment _id:", selected);
    toast.error("Invalid assignment data - cannot update");
    return;
  }

  if (!selected.teacherId || !selected.className) {
    toast.warning("Please select both teacher and class");
    return;
  }

  try {
    console.log("Updating assignment with ID:", selected._id); // ← debug

    const res = await fetch(
      `${API_BASE}/class-teacher/assign/${selected._id}`,  // ← FIXED: use _id, not schoolId
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,               // still needed for security check
          className: selected.className,
          teacherId: selected.teacherId,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.message || "Update failed");
    }

    toast.success("Class Teacher Updated Successfully!");

    // Update local state (optimistic update)
    setAssignments((prev) =>
      prev.map((a) =>
        a._id === selected._id
          ? { ...a, className: selected.className, teacher: result.data?.teacher || a.teacher }
          : a
      )
    );

    setSelected(null);
  } catch (err) {
    console.error("Update error:", err);
    toast.error(err.message || "Failed to update assignment");
  }
};
  if (loading) return <div className="ect-container">Loading...</div>;
  if (error) return <div className="ect-container error">Error: {error}</div>;

  return (
    <div className="ect-container">
      <ToastContainer position="top-right" autoClose={4000} />

      <h2 className="ect-title">Edit / View Class Teacher</h2>

      {/* Table */}
      <div className="ect-table-wrapper">
        <table className="ect-table">
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Current Class</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#666" }}>
                  No class teachers assigned yet
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr key={a._id}>
                  <td>{a.teacher}</td>
                  <td>{a.className}</td>
                  <td>
                    <button
                      className="ect-edit-btn"
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {selected && (
        <div className="ect-edit-card">
          <h3>Edit Class Teacher Assignment</h3>

          <label>Teacher Name:</label>
          <select
            value={selected.teacherId}
            onChange={(e) =>
              setSelected({
                ...selected,
                teacherId: e.target.value,
                teacherName: e.target.options[e.target.selectedIndex].text,
              })
            }
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.employeeName}
              </option>
            ))}
          </select>

          <label>Assign Class:</label>
          <select
            value={selected.className}
            onChange={(e) =>
              setSelected({ ...selected, className: e.target.value })
            }
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="ect-btn-row">
            <button className="ect-save-btn" onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="ect-cancel-btn"
              onClick={() => setSelected(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
