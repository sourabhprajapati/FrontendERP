import React, { useState } from "react";
import "./EmployeModal.css";

export default function EmployeeModal({ employee, close, save }) {
  const [form, setForm] = useState(employee);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    save(form);
    close();
  };

  return (
    <div className="emp-modal-overlay">
      <div className="emp-modal-box">
        <h2>Edit Employee</h2>

        <label>Name</label>
        <input name="name" value={form.name} onChange={update} />

        <label>Department</label>
        <input name="department" value={form.department} onChange={update} />

        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={update} />

        <div className="emp-modal-btn-row">
          <button className="emp-modal-btn-cancel" onClick={close}>
            Cancel
          </button>
          <button className="emp-modal-btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}