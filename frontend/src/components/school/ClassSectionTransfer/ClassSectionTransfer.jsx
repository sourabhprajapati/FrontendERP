import React, { useState } from "react";
import { toast } from "react-toastify";
import "./ClassSectionTransfer.css";

const API_BASE = "http://localhost:5000";

const ClassSectionTransfer = ({ role = "ADMIN" }) => {
  const [form, setForm] = useState({
    admissionNo: "",
    studentName: "",
    currentClass: "",
    currentSection: "",
    newClass: "",
    newSection: "",
    effectiveDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchStudentByAdmissionNo = async () => {
  if (!form.admissionNo.trim()) {
    console.log("Toast: Please enter Admission No");
    toast.warning("Please enter Admission No");
    return;
  }

  try {
    setLoading(true);

    // ✅ YE LINE SAHI HAI - Original jaisa exact endpoint
    const res = await fetch(
      `http://localhost:5000/api/students/by-admission?admissionNo=${form.admissionNo}`
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Student not found");
    }

    const data = await res.json();

    // Backend se jo structure aata hai uske hisaab se adjust kiya
    setForm((prev) => ({
      ...prev,
      studentName: data.basic?.name || data.name || "",
      currentClass: data.basic?.class || data.class || "",
      currentSection: data.basic?.section || data.section || "",
    }));

    console.log("Toast: Student details loaded");
    toast.success("Student details loaded");
  } catch (err) {
    console.error("Fetch error:", err);
    console.log("Toast: " + (err.message || "Student not found"));
    toast.error(err.message || "Student not found");

    // Clear fields on error
    setForm((prev) => ({
      ...prev,
      studentName: "",
      currentClass: "",
      currentSection: "",
    }));
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "ADMIN") {
      console.log("Toast: Unauthorized");
      return toast.error("Unauthorized");
    }

    if (!form.newClass || !form.newSection) {
      console.log("Toast: Please select new Class and Section");
      return toast.warning("Please select new Class and Section");
    }

    if (
      form.currentClass === form.newClass &&
      form.currentSection === form.newSection
    ) {
      console.log("Toast: New class/section must be different");
      return toast.warning("New class/section must be different");
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/students/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Transfer failed");

      console.log("Toast: Student transferred successfully!");
      toast.success("Student transferred successfully!");

      setForm((prev) => ({
        ...prev,
        newClass: "",
        newSection: "",
        reason: "",
        effectiveDate: "",
      }));
    } catch (err) {
      console.log("Toast: " + (err.message || "Transfer failed"));
      toast.error(err.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-container-premium">
      <div className="transfer-card-premium">
        <div className="card-header-premium">
          <h1>Class / Section Transfer</h1>
          <p>Promote or transfer a student to a new class and section</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Student Lookup */}
          <div className="section-premium">
            <h3>Student Lookup</h3>
            <div className="grid-premium">
              <div className="field-premium">
                <label>Admission No *</label>
                <input
                  type="text"
                  name="admissionNo"
                  value={form.admissionNo}
                  onChange={handleChange}
                  onBlur={fetchStudentByAdmissionNo}
                  placeholder="Enter admission number"
                  disabled={loading}
                />
              </div>

              <div className="field-premium">
                <label>Student Name</label>
                <input type="text" value={form.studentName} disabled />
              </div>

              <div className="field-premium">
                <label>Effective Date</label>
                <input
                  type="date"
                  name="effectiveDate"
                  value={form.effectiveDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Current vs New */}
          <div className="section-premium">
            <h3>Transfer Details</h3>
            <div className="transfer-boxes-premium">
              <div className="current-box-premium">
                <div className="box-label-premium">Current</div>
                <div className="class-display-premium">
                  {form.currentClass
                    ? `Class ${form.currentClass} - ${form.currentSection || "—"}`
                    : "—"}
                </div>
              </div>

              <div className="arrow-premium">➜</div>

              <div className="new-box-premium">
                <div className="box-label-premium">New</div>
                <div className="new-selects-premium">
                  <select
                    name="newClass"
                    value={form.newClass}
                    onChange={handleChange}
                    disabled={!form.currentClass}
                  >
                    <option value="">Select Class</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>

                  <select
                    name="newSection"
                    value={form.newSection}
                    onChange={handleChange}
                    disabled={!form.newClass}
                  >
                    <option value="">Select Section</option>
                    {["A", "B", "C", "D"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="section-premium">
            <label>Reason for Transfer (Optional)</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows="4"
              placeholder="Enter reason..."
            />
          </div>

          {/* Submit */}
          <div className="actions-premium">
            <button
              type="submit"
              className="btn-submit-premium"
              disabled={loading || !form.studentName || role !== "ADMIN"}
            >
              {loading ? "Processing..." : "Confirm Transfer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassSectionTransfer;