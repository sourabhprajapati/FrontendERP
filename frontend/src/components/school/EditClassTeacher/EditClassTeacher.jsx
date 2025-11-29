

import React, { useState } from "react";
import "./EditClassTeacher.css";

export default function EditClassTeacher() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Riya Sharma", classAssigned: "1st A", phone: "9876543210" },
    { id: 2, name: "Amit Verma", classAssigned: "2nd B", phone: "9876501234" },
    { id: 3, name: "Priya Singh", classAssigned: "3rd A", phone: "9001234567" },
  ]);

  const [selected, setSelected] = useState(null);

  const classes = [
    "Nursery A", "Nursery B",
    "KG A", "KG B",
    "1st A", "1st B",
    "2nd A", "2nd B",
    "3rd A", "3rd B"
  ];

  function handleEdit(t) {
    setSelected({ ...t });
  }

  function handleSave() {
    setTeachers((prev) =>
      prev.map((t) => (t.id === selected.id ? selected : t))
    );
    alert("Class Teacher Updated Successfully!");
    setSelected(null);
  }

  return (
    <div className="ect-container">
      <h2 className="ect-title">Edit / View Class Teacher</h2>

      {/* Table */}
      <div className="ect-table-wrapper">
        <table className="ect-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Class</th>
              <th>Phone</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.classAssigned}</td>
                <td>{t.phone}</td>
                <td>
                  <button className="ect-edit-btn" onClick={() => handleEdit(t)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {selected && (
        <div className="ect-edit-card">
          <h3>Edit Class Teacher</h3>

          <label>Name:</label>
          <input
            type="text"
            value={selected.name}
            onChange={(e) => setSelected({ ...selected, name: e.target.value })}
          />

          <label>Phone:</label>
          <input
            type="text"
            value={selected.phone}
            onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
          />

          <label>Assign Class:</label>
          <select
            value={selected.classAssigned}
            onChange={(e) =>
              setSelected({ ...selected, classAssigned: e.target.value })
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

            <button className="ect-cancel-btn" onClick={() => setSelected(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}