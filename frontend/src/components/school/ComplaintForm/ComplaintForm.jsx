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

  // Simple validation
  if (!form.name || !form.email || !form.phone || !form.subject || !form.description) {
    alert("Please fill all fields");
    return;
  }

  fetch('http://localhost:5000/api/complaints/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Complaint submitted successfully! We'll get back to you soon.");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          description: "",
        });
      } else {
        alert("Failed: " + data.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Network error. Please try again.");
    });
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