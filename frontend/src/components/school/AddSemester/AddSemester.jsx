import { useState } from "react";
import "./AddSemester.css";

const ALL_CLASSES = [
  "Pre-Primary",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Class 13",
  "Class 14",
  "Class 15",
  "Class 16",
  "Class 17",
  "Class 18",
  "Class 19",
  "Class 20",
  "Class 21", // Added as requested
];

const SEMESTER_TYPES = ["Semester 1", "Semester 2", "Term 1", "Term 2", "Final"];

export default function AddSemester() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    percentageWeight: "",
    isFinal: "no",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const toggleClass = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!selectedClasses.length) e.classes = "Select at least one class";
    if (!form.name.trim()) e.name = "Semester name is required";
    if (!form.code.trim()) e.code = "Short code is required";
    if (!form.percentageWeight.trim()) {
      e.percentageWeight = "Weightage is required";
    } else if (
      isNaN(Number(form.percentageWeight)) ||
      Number(form.percentageWeight) <= 0
    ) {
      e.percentageWeight = "Enter a valid percentage";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        classes: selectedClasses,
        ...form,
        percentageWeight: Number(form.percentageWeight),
      };

      // Replace with your actual API endpoint
      await fetch("/api/semesters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Reset form on success
      setSelectedClasses([]);
      setForm({
        name: "",
        code: "",
        percentageWeight: "",
        isFinal: "no",
        description: "",
      });
      setErrors({});
      alert("Semester created successfully!");
    } catch (err) {
      alert("Failed to save semester. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sem-page">
      <header className="sem-header">
        <div>
          <h1>Add Semester</h1>
          <p>Create or update semester configuration for selected classes.</p>
        </div>
        <button
          type="button"
          className="sem-header-btn"
          onClick={() => {
            setSelectedClasses([]);
            setForm({
              name: "",
              code: "",
              percentageWeight: "",
              isFinal: "no",
              description: "",
            });
            setErrors({});
          }}
        >
          Reset Form
        </button>
      </header>

      <form className="sem-layout" onSubmit={handleSubmit}>
        {/* Left Panel: Class Selector */}
        <section className="sem-panel">
          <div className="panel-head">
            <h2>Select Classes</h2>
            <span className="badge">{selectedClasses.length} selected</span>
          </div>

          <div className="sem-search-row">
            <input
              type="text"
              className="sem-search"
              placeholder="Search classes..."
              onChange={() => {}}
            />
          </div>

          <div className="class-list">
            {ALL_CLASSES.map((cls) => {
              const isActive = selectedClasses.includes(cls);
              return (
                <label
                  key={cls}
                  className={`class-chip ${isActive ? "class-chip--active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => toggleClass(cls)}
                  />
                  <span>{cls}</span>
                </label>
              );
            })}
          </div>

          {errors.classes && <p className="field-error">{errors.classes}</p>}
        </section>

        {/* Right Panel: Semester Details */}
        <section className="sem-panel">
          <div className="panel-head">
            <h2>Semester Details</h2>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                Semester Name <span className="req">*</span>
              </label>
              <select
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "has-error" : ""}`}
              >
                <option value="">Select semester</option>
                {SEMESTER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Short Code <span className="req">*</span>
              </label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. S1, TERM1"
                className={`form-input ${errors.code ? "has-error" : ""}`}
              />
              {errors.code && <p className="field-error">{errors.code}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Weightage (%) <span className="req">*</span>
              </label>
              <input
                type="number"
                name="percentageWeight"
                value={form.percentageWeight}
                onChange={handleChange}
                placeholder="e.g. 40"
                className={`form-input ${errors.percentageWeight ? "has-error" : ""}`}
              />
              {errors.percentageWeight && (
                <p className="field-error">{errors.percentageWeight}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Final Result Semester?</label>
              <div className="pill-row">
                {["yes", "no"].map((val) => (
                  <label
                    key={val}
                    className={`pill ${form.isFinal === val ? "pill--active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="isFinal"
                      value={val}
                      checked={form.isFinal === val}
                      onChange={handleChange}
                    />
                    <span>{val === "yes" ? "Yes" : "No"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Note (Optional)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-input textarea"
              rows={4}
              placeholder="Any additional notes for teachers or admins..."
            />
          </div>

          <div className="sem-footer">
            <div className="sem-summary">
              <span className="summary-label">Selected Classes:</span>
              <span className="summary-value">
                {selectedClasses.length
                  ? selectedClasses.join(", ")
                  : "None selected"}
              </span>
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Semester"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}