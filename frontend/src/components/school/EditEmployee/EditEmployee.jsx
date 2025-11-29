import React, { useState } from "react";
import "./EditEmployee.css";
import EmployeeModal from "./EmployeeModal/EmployeeModal";

const initialEmployees = [
  { id: 1, name: "Rahul Sharma", department: "Math", phone: "9876543210" },
  { id: 2, name: "Priya Verma", department: "Science", phone: "9876500000" },
  { id: 3, name: "Amit Singh", department: "English", phone: "9988776655" },
];

export default function EditEmployee() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateEmployee = (updated) => {
    const newList = employees.map((e) =>
      e.id === updated.id ? updated : e
    );
    setEmployees(newList);
  };

  return (
    <div className="edit-emp-wrapper">
      <h2 className="edit-emp-title">Edit / View Employee</h2>

      {/* Search */}
      <input
        type="text"
        className="edit-emp-search"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Employee List */}
      <div className="edit-emp-list">
        {filtered.map((emp) => (
          <div key={emp.id} className="edit-emp-card">
            <div className="edit-emp-info">
              <h3>{emp.name}</h3>
              <p>Department: <span>{emp.department}</span></p>
              <p>Phone: <span>{emp.phone}</span></p>
            </div>

            <button
              className="edit-emp-btn-edit"
              onClick={() => setSelected(emp)}
            >
              View / Edit
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="edit-emp-empty">No employees found.</p>
        )}
      </div>

      {selected && (
        <EmployeeModal
          employee={selected}
          close={() => setSelected(null)}
          save={updateEmployee}
        />
      )}
    </div>
  );
}