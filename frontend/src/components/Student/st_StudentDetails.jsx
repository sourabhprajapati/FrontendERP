import React, { useState, useEffect } from 'react';
import './st_StudentDetails.css';

const StudentDetails = () => {
  const [personal, setPersonal] = useState([]);
  const [admissionData, setAdmissionData] = useState([]);
  const [guardiansData, setGuardiansData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        console.warn("studentId not found in localStorage");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`
      );

      const studentData = await response.json();

      // 🔹 PERSONAL
      setPersonal([
        { label: "Aadhaar (ID)", value: studentData.aadhaar || "not entered" },
        {
          label: "Date of Birth",
          value: studentData.dob
            ? new Date(studentData.dob).toLocaleDateString()
            : "not entered",
        },
        { label: "Gender", value: studentData.gender || "not entered" },
        { label: "Religion", value: studentData.religion || "not entered" },
        { label: "Category", value: studentData.category || "not entered" },
        { label: "Blood Group", value: studentData.bloodGroup || "not entered" },
        { label: "Permanent Address", value: studentData.address || "not entered" },
        { label: "Single Parent", value: studentData.singleParent ? "Yes" : "No" },
        { label: "Disability", value: studentData.disability ? "Yes" : "No" },
        { label: "Pin Code", value: studentData.pinCode || "not entered" },
        { label: "Mother's Mobile", value: studentData.parentPhone || "not entered" },
      ]);

      // 🔹 ADMISSION
      setAdmissionData([
        {
          label: "Admission Date",
          value: studentData.admissionDate
            ? new Date(studentData.admissionDate).toLocaleDateString()
            : "not entered",
        },
        {
          label: "Admit Class",
          value: `${studentData.class}-${studentData.section}`,
        },
        { label: "Country", value: "India" },
        { label: "Current Address", value: studentData.address || "not entered" },
      ]);

      // 🔹 GUARDIANS
      setGuardiansData([
        { label: "Father's Name", value: studentData.parentName || "not entered" },
        { label: "Father's Mobile", value: studentData.parentPhone || "not entered" },
      ]);

      // ðŸ« SCHOOL DETAILS
      if (studentData.school) {
        setSchoolData([
          { label: "School Name", value: studentData.school.schoolName || "not entered" },
          { label: "State", value: studentData.school.state || "not entered" },
          { label: "District", value: studentData.school.district || "not entered" },
          { label: "Address", value: studentData.school.address || "not entered" },
          { label: "Email", value: studentData.school.email || "not entered" },
          { label: "Contact Number", value: studentData.school.contactNo || "not entered" },
          { label: "Contact Person", value: studentData.school.contactPerson || "not entered" },
          { label: "Board", value: studentData.school.selectBoard || "not entered" },
          { label: "Grade", value: studentData.school.grade || "not entered" },
          { label: "Strength", value: studentData.school.strength || "not entered" },
        ]);
      }

      setUsername(studentData.username || "");
      setPassword(studentData.password || "");
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>

      {/* Personal Information */}
      <div className="details-section">
        <h3>Personal Information</h3>
        <div className="details-grid">
          {personal.map((item, index) => (
            <div key={index} className="detail-item">
              <label>{item.label}:</label>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Admission Information */}
      <div className="details-section">
        <h3>Admission Information</h3>
        <div className="details-grid">
          {admissionData.map((item, index) => (
            <div key={index} className="detail-item">
              <label>{item.label}:</label>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guardians Information */}
      <div className="details-section">
        <h3>Guardians Information</h3>
        <div className="details-grid">
          {guardiansData.map((item, index) => (
            <div key={index} className="detail-item">
              <label>{item.label}:</label>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* School Information */}
      <div className="details-section">
        <h3>School Information</h3>
        <div className="details-grid">
          {schoolData.map((item, index) => (
            <div key={index} className="detail-item">
              <label>{item.label}:</label>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login Credentials */}
      <div className="details-section">
        <h3>Login Credentials</h3>
        <div className="credentials">
          <div className="detail-item">
            <label>Username:</label>
            <span>{username}</span>
          </div>
          <div className="detail-item">
            <label>Password:</label>
            <span>{password}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
