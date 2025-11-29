import { useState } from "react";
import "./ComplaintForm.css";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Complaint submitted successfully! (Frontend only)");
    console.log("Complaint Data:", form);
  }

  return (
    <div className="cf-wrapper14">
      {/* Optional Header */}
      {/* <header className="cf-header14">Complaint Portal</header> */}

      <div className="cf-container14">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "40px",
            fontWeight: "600",
            color: "#003366",
          }}
        >
          Complaint Form
        </h1>

        <form className="cf-form14" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </label>

          <label>
            Contact Number
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="e.g. 9876543210"
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Brief summary of your complaint"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Please describe your complaint in detail..."
            />
          </label>

          <button type="submit" className="cf-btn14">
            Submit Complaint
          </button>
        </form>
      </div>

      {/* Optional Footer */}
      {/* <footer className="cf-footer14">
        © 2025 Your Organization. All rights reserved.
      </footer> */}
    </div>
  );
}