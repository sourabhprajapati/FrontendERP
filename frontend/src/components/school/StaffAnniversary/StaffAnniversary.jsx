import React, { useState } from "react";
import "./StaffAnniversary.css";

export default function StaffAnniversary() {
  const [anniversaryList, setAnniversaryList] = useState([
    {
      id: 1,
      name: "Riya Sharma",
      category: "Teaching",
      department: "Maths",
      wish: "Happy Work Anniversary! Your dedication inspires everyone.",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    department: "",
    wish: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category || !form.department || !form.wish) {
      alert("Please fill all fields");
      return;
    }

    setAnniversaryList([
      ...anniversaryList,
      { id: Date.now(), ...form },
    ]);

    alert("Anniversary Added!");
    setForm({ name: "", category: "", department: "", wish: "" });
  }

  return (
    <div className="anniv-container">
      <h2 className="anniv-title">Staff Anniversary Wishes</h2>

      {/* FORM */}
      <form className="anniv-form" onSubmit={handleSubmit}>
        <div className="anniv-row">
          <div className="anniv-field">
            <label>Teacher Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>

          <div className="anniv-field">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option>Teaching</option>
              <option>Non-Teaching</option>
              <option>Admin</option>
              <option>Management</option>
            </select>
          </div>
        </div>

        <div className="anniv-row">
          <div className="anniv-field">
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option>Maths</option>
              <option>Science</option>
              <option>English</option>
              <option>Computer</option>
              <option>Office</option>
              <option>Sports</option>
              <option>Library</option>
            </select>
          </div>

          <div className="anniv-field">
            <label>Wish Message</label>
            <input
              type="text"
              name="wish"
              value={form.wish}
              onChange={handleChange}
              placeholder="Enter Wish Message"
            />
          </div>
        </div>

        <button className="anniv-add-btn" type="submit">
          Add Anniversary
        </button>
      </form>

      {/* DATA TABLE */}
      <div className="anniv-table-wrapper">
        <table className="anniv-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Department</th>
              <th>Wish</th>
            </tr>
          </thead>
          <tbody>
            {anniversaryList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.department}</td>
                <td>{item.wish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}