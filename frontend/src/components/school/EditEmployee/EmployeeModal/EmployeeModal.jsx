// src/components/School/EmployeeModal.jsx
import React, { useState } from 'react';

const fullDummyDetails = {
  employeeName: "Ravi Kumar Sharma",
  employeeUserName: "ravi.sharma",
  dob: "1985-06-15",
  userType: "Teacher",
  designation: "Senior Mathematics Teacher",
  natureOfAppointment: "Permanent",
  joiningDate: "2015-04-01",
  department: "Mathematics",
  qualification: "M.Sc Mathematics, B.Ed",
  experienceYears: "10",
  bloodGroup: "O+",
  gender: "Male",
  maritalStatus: "Married",
  mobile: "9876543210",
  email: "ravi.sharma@school.com",
  emergencyContact: "9123456789",
  address: "Flat No. 302, Green Valley Apartments, Sector 42, New Delhi - 110021",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110021",
  bankName: "State Bank of India",
  accountNumber: "123456789012",
  ifscCode: "SBIN0001234",
  panNumber: "BRCPK5678F",
  aadharNumber: "987654321012"
};

function EmployeeModal({ employee, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...fullDummyDetails, ...employee });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Employee updated successfully!");
    setIsEditing(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'flex-start',     // ← Important: start from top
      justifyContent: 'center',
      zIndex: 9999,
      overflowY: 'auto',            // ← This makes the whole page scrollable
      padding: '20px 0'
    }} onClick={onClose}>

      <div 
        className="stf-form-container13"
        style={{
          maxWidth: '1000px',
          width: '95%',
          margin: '20px auto',
          position: 'relative',
          maxHeight: '90vh',           // ← Limits height
          overflowY: 'auto',           // ← Scroll inside modal if needed
          borderRadius: '16px'
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="stf-form-header13 centered13" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <h1>{isEditing ? 'Edit Employee' : 'Employee Details'}</h1>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '34px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '200'
            }}
          >×</button>
        </div>

        {/* Edit Button */}
        <div style={{ padding: '20px 40px 10px', textAlign: 'right' }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="stf-save-btn13"
            style={{
              padding: '10px 28px',
              fontSize: '15px',
              background: isEditing ? '#dc2626' : '#3b82f6'
            }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: '0 40px 50px' }}>
          <div className="stf-form-grid13">
            <div className="stf-form-column13">

              <div className="stf-form-group13">
                <label>Employee Name</label>
                <input type="text" value={formData.employeeName} readOnly={!isEditing} onChange={handleInput} name="employeeName" />
              </div>

              <div className="stf-form-group13">
                <label>Username</label>
                <input type="text" value={formData.employeeUserName} readOnly={!isEditing} onChange={handleInput} name="employeeUserName" />
              </div>

              <div className="stf-form-group13">
                <label>Date of Birth</label>
                <input type="text" value={new Date(formData.dob).toLocaleDateString('en-GB')} readOnly />
              </div>

              <div className="stf-form-group13">
                <label>User Type</label>
                <input type="text" value={formData.userType} readOnly style={{ background: '#eff6ff', fontWeight: '600', color: '#1e40af' }} />
              </div>

              <div className="stf-form-group13">
                <label>Designation</label>
                <input type="text" value={formData.designation} readOnly={!isEditing} onChange={handleInput} name="designation" />
              </div>

              <div className="stf-form-group13">
                <label>Department</label>
                <input type="text" value={formData.department} readOnly={!isEditing} onChange={handleInput} name="department" />
              </div>

              <div className="stf-form-group13">
                <label>Blood Group</label>
                <input type="text" value={formData.bloodGroup} readOnly style={{ background: '#fefce8', fontWeight: '600', color: '#a16207' }} />
              </div>

            </div>

            <div className="stf-form-column13">

              <div className="stf-form-group13">
                <label>Mobile Number</label>
                <input type="tel" value={formData.mobile} readOnly={!isEditing} onChange={handleInput} name="mobile" />
              </div>

              <div className="stf-form-group13">
                <label>Email</label>
                <input type="email" value={formData.email} readOnly={!isEditing} onChange={handleInput} name="email" />
              </div>

              <div className="stf-form-group13">
                <label>Address</label>
                <textarea rows="3" value={formData.address} readOnly={!isEditing} onChange={handleInput} name="address"></textarea>
              </div>

              <div className="stf-form-group13">
                <label>PAN Number</label>
                <input type="text" value={formData.panNumber} readOnly={!isEditing} onChange={handleInput} name="panNumber" style={{ background: '#dbeafe', fontWeight: '600', color: '#1e40af' }} />
              </div>

              <div className="stf-form-group13">
                <label>Aadhaar Number</label>
                <input type="text" value={formData.aadharNumber} readOnly={!isEditing} onChange={handleInput} name="aadharNumber" />
              </div>

              <div className="stf-form-group13">
                <label>Bank</label>
                <input type="text" value={formData.bankName} readOnly={!isEditing} onChange={handleInput} name="bankName" />
              </div>

            </div>
          </div>
        </div>

        {/* Save Button in Edit Mode */}
        {isEditing && (
          <div className="stf-form-actions13" style={{ position: 'sticky', bottom: 0, background: 'white', padding: '30px 40px', borderTop: '1px solid #e2e8f0' }}>
            <button type="button" onClick={handleSave} className="stf-save-btn13">
              Update Employee
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeModal;