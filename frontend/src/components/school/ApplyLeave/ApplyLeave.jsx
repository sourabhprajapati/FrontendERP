import React, { useState } from "react";
import "./ApplyLeave.css";

export default function ApplyLeave() {
  const [form, setForm] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(null);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calcDays = () => {
    if (!form.from || !form.to) return 0;
    const d1 = new Date(form.from);
    const d2 = new Date(form.to);
    const diff = (d2 - d1) / (1000 * 60 * 60 * 24) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({
      ...form,
      days: calcDays(),
    });

    setForm({
      type: "",
      from: "",
      to: "",
      reason: "",
    });
  };

  return (
    <div className="apply-leave-container">
      <h2 className="apply-leave-title">Apply Leave</h2>

      <form className="apply-leave-form" onSubmit={handleSubmit}>
        {/* Leave Type */}
        <label>Leave Type</label>
        <select
          name="type"
          className="apply-leave-input"
          value={form.type}
          onChange={onChange}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Half Day">Half Day</option>
          <option value="Paid Leave">Paid Leave</option>
        </select>

        {/* From Date */}
        <label>From</label>
        <input
          type="date"
          name="from"
          className="apply-leave-input"
          value={form.from}
          onChange={onChange}
          required
        />

        {/* To Date */}
        <label>To</label>
        <input
          type="date"
          name="to"
          className="apply-leave-input"
          value={form.to}
          onChange={onChange}
          required
        />

        {/* Reason */}
        <label>Reason</label>
        <textarea
          name="reason"
          className="apply-leave-textarea"
          placeholder="Explain your reason..."
          value={form.reason}
          onChange={onChange}
          required
        ></textarea>

        {/* Auto Days Count */}
        <div className="apply-leave-days-box">
          Total Days: <span>{calcDays()}</span>
        </div>

        {/* Submit */}
        <button type="submit" className="apply-leave-btn">
          Submit Leave
        </button>
      </form>

      {/* Submitted Preview */}
      {submitted && (
        <div className="apply-leave-preview-card">
          <h3>Leave Submitted [Checkmark]</h3>
          <p><b>Type:</b> {submitted.type}</p>
          <p><b>From:</b> {submitted.from}</p>
          <p><b>To:</b> {submitted.to}</p>
          <p><b>Total Days:</b> {submitted.days}</p>
          <p><b>Reason:</b> {submitted.reason}</p>
        </div>
      )}
    </div>
  );
}