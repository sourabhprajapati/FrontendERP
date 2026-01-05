// src/components/School/EmployeeModal.jsx
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const API_BASE_URL = "http://localhost:5000"; // Change to your production URL

function EmployeeModal({ employee, onClose, onSaveSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: employee?.employeeName || "",
    employeeUserName: employee?.employeeUserName || "",
    dob: employee?.dob || "",
    userType: employee?.userType || "Teacher",
    designation: employee?.designation || "",
    natureOfAppointment: employee?.natureOfAppointment || "",
    joiningDate: employee?.joiningDate || "",
    department: employee?.department || "",
    qualification: employee?.qualification || "",
    experienceYears: employee?.experienceYears || "",
    bloodGroup: employee?.bloodGroup || "",
    gender: employee?.gender || "",
    maritalStatus: employee?.maritalStatus || "",
    mobile: employee?.mobile || "",
    email: employee?.email || "",
    emergencyContact: employee?.emergencyContact || "",
    address: employee?.address || "",
    city: employee?.city || "",
    state: employee?.state || "",
    pincode: employee?.pincode || "",
    bankName: employee?.bankName || "",
    accountNumber: employee?.accountNumber || "",
    ifscCode: employee?.ifscCode || "",
    panNumber: employee?.panNumber || "",
    aadharNumber: employee?.aadharNumber || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.employeeName.trim()) return "Employee Name is required";
    if (!formData.mobile.trim()) return "Mobile Number is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.designation.trim()) return "Designation is required";
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const schoolId =
        localStorage.getItem("schoolId") || "000000000000000000000001";
      if (!schoolId)
        throw new Error("School ID not found. Please login again.");

      const response = await fetch(
        `${API_BASE_URL}/api/staff/update/${employee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if you use JWT
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            ...formData,
            schoolId,
            // Convert dates to ISO if backend expects Date objects
            dob: formData.dob
              ? new Date(formData.dob).toISOString()
              : undefined,
            joiningDate: formData.joiningDate
              ? new Date(formData.joiningDate).toISOString()
              : undefined,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update employee");
      }

      toast.success("Employee updated successfully!");
      setTimeout(() => {
        setIsEditing(false);
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 9999,
        overflowY: "auto",
        padding: "20px 0",
      }}
      onClick={onClose}
    >
      <div
        className="stf-form-container13"
        style={{
          maxWidth: "1100px",
          width: "95%",
          margin: "20px auto",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          background: "white",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
       <ToastContainer
               position="top-right"
               autoClose={4000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light" // or "dark" / "colored"
             />
        <div
          className="stf-form-header13 centered13"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#1e40af",
            color: "white",
            padding: "20px 40px",
          }}
        >
          <h1>{isEditing ? "Edit Employee Details" : "Employee Profile"}</h1>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              fontSize: "36px",
              color: "white",
              cursor: "pointer",
              fontWeight: "300",
            }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div
            style={{
              color: "#dc2626",
              padding: "12px 40px",
              background: "#fee2e2",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "#16a34a",
              padding: "12px 40px",
              background: "#ecfdf5",
            }}
          >
            {success}
          </div>
        )}

        {/* Edit Toggle */}
        <div style={{ padding: "20px 40px", textAlign: "right" }}>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setError(null);
              setSuccess(null);
            }}
            style={{
              padding: "10px 24px",
              background: isEditing ? "#dc2626" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
            disabled={loading}
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "0 40px 60px" }}>
          <div
            className="stf-form-grid13"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* Column 1 */}
            <div>
              <div className="stf-form-group13">
                <label>Employee Name *</label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  readOnly={!isEditing}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="stf-form-group13">
                <label>Username *</label>
                <input
                  type="text"
                  name="employeeUserName"
                  value={formData.employeeUserName}
                  readOnly={!isEditing}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="stf-form-group13">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob ? formData.dob.split("T")[0] : ""}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              <div className="stf-form-group13">
                <label>User Type</label>
                <select
                  name="userType"
                  value={formData.userType}
                  disabled={!isEditing}
                  onChange={handleInput}
                  style={{ background: "#eff6ff", fontWeight: "600" }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="stf-form-group13">
                <label>Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  readOnly={!isEditing}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="stf-form-group13">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              <div className="stf-form-group13">
                <label>Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="stf-form-group13">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  readOnly={!isEditing}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="stf-form-group13">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly={!isEditing}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="stf-form-group13">
                <label>Address</label>
                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              <div className="stf-form-group13">
                <label>PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              <div className="stf-form-group13">
                <label>Aadhaar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              <div className="stf-form-group13">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  readOnly={!isEditing}
                  onChange={handleInput}
                />
              </div>

              {/* Add more fields as needed */}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              background: "white",
              padding: "20px 40px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 5,
            }}
          >
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                padding: "12px 32px",
                background: loading ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeModal;
