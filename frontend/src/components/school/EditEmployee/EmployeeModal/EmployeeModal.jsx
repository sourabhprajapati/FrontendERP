// src/components/School/EmployeeModal/EmployeeModal.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, Edit3 } from "lucide-react";
import "./EmployeModal.css"; // New modern modal styles

const API_BASE_URL = "http://localhost:5000";

function EmployeeModal({ employee, onClose, onSaveSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: employee?.employeeName || "",
    employeeUserName: employee?.employeeUserName || "",
    fatherName: employee?.fatherName || "",
    dob: employee?.dob || "",
    userType: employee?.userType || "",
    designation: employee?.designation || "",
    department: employee?.department || "",
    kindOfTeacher: employee?.kindOfTeacher || "",
    natureOfAppointment: employee?.natureOfAppointment || "",
    teachingClass: employee?.teachingClass || [],
    qualification: employee?.qualification || "",
    joiningDate: employee?.joiningDate || "",
    leavingDate: employee?.leavingDate || "",
    mobile: employee?.mobile || "",
    mobile2: employee?.mobile2 || "",
    email: employee?.email || "",
    address: employee?.address || "",
    otherComments: employee?.otherComments || "",
    // Add more fields as needed...
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSave = async () => {
  setLoading(true);
  try {
    const schoolId = localStorage.getItem("schoolId") || "000000000000000000000001";

    const response = await fetch(`${API_BASE_URL}/api/staff/update/${employee._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        schoolId // ← ADD THIS LINE
      }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Employee updated successfully!");
      onSaveSuccess?.();
    } else {
      toast.error(result.message || "Update failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Network error. Please try again.");
  } finally {
    setLoading(false);
    setIsEditing(false);
  }
};
  return (
    <div className="emp-modal-overlay-2026" onClick={onClose}>
      <div className="emp-modal-wrapper-2026" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="emp-modal-header-2026">
          <button onClick={onClose} className="emp-modal-close-btn-2026">
            <X size={28} />
          </button>
          <h2>Employee Details</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="emp-modal-edit-btn-2026">
              <Edit3 size={20} />
              Edit
            </button>
          )}
        </div>

        {/* Body - Using your main form grid */}
        <div className="emp-modal-body-2026">
          <div className="stf-form-grid13">
            <div className="stf-form-column13">
              <div className="stf-form-group13">
                <label>Employee Name</label>
                <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Father's Name</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Contact No.</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInput} readOnly={!isEditing} />
              </div>
            </div>

            <div className="stf-form-column13">
              <div className="stf-form-group13">
                <label>User Type (Category)</label>
                <input type="text" value={formData.userType} readOnly />
              </div>
              <div className="stf-form-group13">
                <label>Kind of Teacher</label>
                <input type="text" name="kindOfTeacher" value={formData.kindOfTeacher} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Nature of Appointment</label>
                <input type="text" name="natureOfAppointment" value={formData.natureOfAppointment} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Teaching Class</label>
                <input type="text" value={formData.teachingClass?.join(", ") || "-"} readOnly />
              </div>
              <div className="stf-form-group13">
                <label>Joining Date</label>
                <input type="text" name="joiningDate" value={formData.joiningDate} onChange={handleInput} readOnly={!isEditing} />
              </div>
              <div className="stf-form-group13">
                <label>Address</label>
                <textarea name="address" rows="3" value={formData.address} onChange={handleInput} readOnly={!isEditing} />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (only in edit mode) */}
        {isEditing && (
          <div className="emp-modal-footer-2026">
            <button onClick={handleSave} disabled={loading} className="emp-modal-save-btn-2026">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeModal;