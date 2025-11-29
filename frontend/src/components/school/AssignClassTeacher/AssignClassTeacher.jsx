import React, { useState } from "react";
import "./AssignClassTeacher.css";

const teachers = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Verma" },
  { id: 3, name: "Amit Singh" },
];

const classes = [
  "Nursery", "LKG", "UKG",
  "1st", "2nd", "3rd", "4th",
  "5th", "6th", "7th", "8th"
];

export default function AssignClassTeacher() {
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assigned, setAssigned] = useState([]);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const assignTeacher = () => {
    if (!selectedTeacher || !selectedClass) return alert("Please select both!");

    const already = assigned.find((a) => a.className === selectedClass);
    if (already) {
      alert("This class is already assigned!");
      return;
    }

    setAssigned([
      ...assigned,
      {
        id: Date.now(),
        teacher: teachers.find((t) => t.id == selectedTeacher).name,
        className: selectedClass,
      },
    ]);

    setSelectedTeacher("");
    setSelectedClass("");
  };

  return (
    <div className="assign-ct-wrapper">
      <h2 className="assign-ct-title">Assign Class Teacher</h2>

      {/* SEARCH BOX */}
      <input
        className="assign-ct-search"
        placeholder="Search teacher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TEACHERS LIST */}
      <div className="assign-ct-teacher-list">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className={`assign-ct-teacher-card ${
              selectedTeacher == t.id ? "active" : ""
            }`}
            onClick={() => setSelectedTeacher(t.id)}
          >
            {t.name}
          </div>
        ))}

        {filteredTeachers.length === 0 && (
          <p className="assign-ct-empty">No teachers found.</p>
        )}
      </div>

      {/* CLASS SELECT */}
      <select
        className="assign-ct-class-select"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Select Class</option>
        {classes.map((cls, index) => (
          <option key={index} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      {/* ASSIGN BUTTON */}
      <button className="assign-ct-btn-assign" onClick={assignTeacher}>
        Assign Teacher
      </button>

      {/* ASSIGNED LIST */}
      <h3 className="assign-ct-assigned-heading">Assigned Class Teachers</h3>

      <div className="assign-ct-assigned-list">
        {assigned.map((a) => (
          <div key={a.id} className="assign-ct-assigned-card">
            <span>
              <strong className="assign-ct-green">{a.className}</strong> →{" "}
              <strong className="assign-ct-blue">{a.teacher}</strong>
            </span>
          </div>
        ))}

        {assigned.length === 0 && (
          <p className="assign-ct-empty">No classes assigned yet.</p>
        )}
      </div>
    </div>
  );
}