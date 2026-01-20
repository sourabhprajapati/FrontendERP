import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AssignClassTeacher.css";

const API_BASE = "http://localhost:5000/api";

export default function AssignClassTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
  ];

  const schoolId =
    localStorage.getItem("schoolId") || "000000000000000000000001";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const staffRes = await fetch(
          `${API_BASE}/staff/all?schoolId=${schoolId}`,
        );
        const staffData = await staffRes.json();

        const teacherList = staffData.data.filter(
          (s) => s.userType === "Teacher",
        );
        setTeachers(teacherList);

        const assignRes = await fetch(
          `${API_BASE}/class-teacher/assignments?schoolId=${schoolId}`,
        );
        const assignData = await assignRes.json();

        if (assignData.success) {
          setAssigned(assignData.data || []);
        }
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  const filteredTeachers = teachers.filter((t) =>
    t.employeeName?.toLowerCase().includes(search.toLowerCase()),
  );

  const assignTeacher = async () => {
    if (!selectedTeacher || !selectedClass) {
      toast.warning("Please select teacher and class");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/class-teacher/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          teacherId: selectedTeacher._id,
          className: selectedClass,
        }),
      });

      const result = await res.json();
      if (!result.success) throw new Error();

      toast.success("Class teacher assigned");

     setAssigned((prev) => [
  ...prev,
  {
    _id: result.data._id, // ✅ REQUIRED
    className: result.data.className,
    teacher: result.data.teacher,
    designation: result.data.designation,
  },
]);


      setSelectedClass("");
      setSelectedTeacher(null);
    } catch {
      toast.error(err.message || "Teacher already assigned to another class");
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (assignmentId) => {
  if (!window.confirm("Unassign this class teacher?")) return;

  try {
    const res = await fetch(
  `${API_BASE}/class-teacher/assign/${assignmentId}?schoolId=${schoolId}`,
  { method: "DELETE" }
);


    const result = await res.json();

    if (!result.success) throw new Error();

    toast.success("Class teacher unassigned");

    setAssigned((prev) =>
      prev.filter((a) => a._id !== assignmentId)
    );
  } catch {
    toast.error("Failed to unassign");
  }
};

  return (
    <div className="assign-ui-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="assign-ui-header">
        <h2>Assign Class Teacher</h2>
        <p>Choose a teacher and assign them to a class</p>
      </div>

      <div className="assign-ui-layout">
        {/* LEFT – TEACHERS */}
        <div className="assign-ui-panel">
          <input
            className="assign-ui-search"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="assign-ui-teacher-list">
            {filteredTeachers.map((t) => (
              <div
                key={t._id}
                className={`assign-ui-teacher ${
                  selectedTeacher?._id === t._id ? "selected" : ""
                }`}
                onClick={() => setSelectedTeacher(t)}
              >
                <div className="avatar">{t.employeeName?.charAt(0)}</div>
                <div>
                  <div className="name">{t.employeeName}</div>
                  <div className="role">{t.designation || "Teacher"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – ASSIGN */}
        <div className="assign-ui-panel soft">
          <h3>Assignment</h3>

          <div className="assign-ui-selected">
            {selectedTeacher ? (
              <>
                <strong>{selectedTeacher.employeeName}</strong>
                <span>{selectedTeacher.designation}</span>
              </>
            ) : (
              <span>Select a teacher</span>
            )}
          </div>

          <select
            className="assign-ui-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            className="assign-ui-button"
            disabled={loading || !selectedTeacher || !selectedClass}
            onClick={assignTeacher}
          >
            {loading ? "Assigning..." : "Assign Teacher"}
          </button>

          <div className="assign-ui-divider" />

          <h4>Assigned Classes</h4>

          <div className="assign-ui-tags">
            {assigned.length === 0 ? (
              <p className="empty">No assignments yet</p>
            ) : (
              assigned.map((a, i) => (
                <div key={i} className="assign-ui-tag">
                  <div>
                    <strong>{a.className}</strong>
                    <span>{a.teacher}</span>
                  </div>

                  <button
                    className="assign-ui-delete"
                    title="Unassign"
                    onClick={() => handleDelete(a._id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
