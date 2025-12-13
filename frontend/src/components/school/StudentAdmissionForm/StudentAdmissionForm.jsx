// src/components/StudentAdmissionForm.jsx
import React, { useState } from "react";
import "./StudentAdmissionForm.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
const StudentAdmissionForm = () => {
  const [openSections, setOpenSections] = useState({
    studentDetails: true,
    customField: false,
    parentGuardian: false,
    otherDetails: false,
    uploadDocs: false,
  });
  const printRef = useRef();
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Red Up Arrow - Exact match with your screenshot
  const UpArrow = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e74c3c"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginTop: "2px" }}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );

  // Gray Down Arrow
  const DownArrow = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#95a5a6"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Student_Admission_Form_2025-26.pdf");
  };

  return (
    <div className="admission-container20">
      {/* Header */}
      <div className="header20">
        <h2>
          <span className="icon">Document</span> Student Admission
        </h2>
        <div className="breadcrumb20">Student Info / Student Admission</div>
      </div>

      {/* Form Title + Buttons */}
      <div className="form-header20">
        <h3>Student Admission Form</h3>
        <div className="actions20">
          <button className="btn-download20" onClick={handleDownloadPDF}>
            Download Form
          </button>
          <button className="btn-import20">Import Student</button>
        </div>
      </div>
      {/* ====== HIDDEN PERFECT NLET PDF TEMPLATE (DO NOT DELETE) ====== */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
        }}
      >
        <div
          ref={printRef}
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "15mm 20mm",
            background: "white",
            fontFamily: "'Times New Roman', serif",
            fontSize: "11pt",
            color: "#000",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <img
              src="https://i.postimg.cc/kX8z5M8D/nlet-logo.png"
              alt="NLET"
              style={{ height: "45px" }}
            />
            <h2 style={{ margin: "8px 0 0 0", fontSize: "18pt" }}>
              NLET - Institute Management Software
            </h2>
            <p style={{ margin: "5px 0", fontSize: "12pt" }}>
              19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005
              <br />
              8058848888
              <br />
              <strong>AFFILIATION NO. : 1538 </strong>
            </p>
            <div
              style={{
                background: "#e67e22",
                color: "white",
                padding: "10px 40px",
                borderRadius: "30px",
                display: "inline-block",
                fontWeight: "bold",
                fontSize: "14pt",
                margin: "15px 0",
              }}
            >
              Student Admission Form (2025-26)
            </div>
          </div>

          <h3
            style={{
              borderBottom: "3px solid #f39c12",
              paddingBottom: "5px",
              margin: "20px 0 10px 0",
            }}
          >
            Personal Information
          </h3>
          <table
            style={{ width: "100%", marginBottom: "15px", lineHeight: "1.8" }}
          >
            <tbody>
              <tr>
                <td style={{ width: "22%" }}>Admission No. :</td>
                <td style={{ borderBottom: "1px solid #000", width: "48%" }}>
                  __________________________________________
                </td>
                <td
                  rowSpan="6"
                  style={{ textAlign: "right", verticalAlign: "top" }}
                >
                  <div
                    style={{
                      width: "110px",
                      height: "130px",
                      border: "2px solid #ccc",
                      background: "#f5f5f5",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#aaa",
                      fontSize: "10pt",
                    }}
                  >
                    NO IMAGE
                    <br />
                    AVAILABLE
                  </div>
                </td>
              </tr>
              <tr>
                <td>Student Name :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  _____________________________________________________________
                </td>
              </tr>
              <tr>
                <td>Roll No. :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  _____________________________________________________________
                </td>
              </tr>
              <tr>
                <td>SSSMID :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  _________________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  PEN No. : _________________________
                </td>
              </tr>
              <tr>
                <td>Class :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  ________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  Section : _____________ Date Of Birth : _____________
                </td>
              </tr>
              <tr>
                <td>Gender :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  ________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  Mobile No. : ________________ Email : ________________
                </td>
              </tr>
              <tr>
                <td>Admission Date :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  ________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  Caste : _____________ Religion : _____________
                </td>
              </tr>
              <tr>
                <td>Category :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  ________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  Blood Group : _____________ RTE : _____________
                </td>
              </tr>
              <tr>
                <td>Aadhar No. :</td>
                <td style={{ borderBottom: "1px solid #000" }}>
                  ________________
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  Notes : _____________ School House : _____________
                </td>
              </tr>
            </tbody>
          </table>

          <h3
            style={{
              borderBottom: "3px solid #f39c12",
              paddingBottom: "5px",
              margin: "20px 0 10px 0",
            }}
          >
            Parent Guardian Detail
          </h3>
          <table style={{ width: "100%", marginBottom: "15px" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%", verticalAlign: "top" }}>
                  <strong>Father Name :</strong>{" "}
                  _____________________________________
                  <br />
                  <strong>Father Phone :</strong>{" "}
                  _____________________________________
                  <br />
                  <strong>Father Occupation :</strong>{" "}
                  _____________________________________
                </td>
                <td style={{ width: "50%", verticalAlign: "top" }}>
                  <strong>Mother Name :</strong>{" "}
                  _____________________________________
                  <br />
                  <strong>Mother Phone :</strong>{" "}
                  _____________________________________
                  <br />
                  <strong>Mother Occupation :</strong>{" "}
                  _____________________________________
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <strong>Guardian Name :</strong>{" "}
                  _____________________________________
                </td>
                <td>
                  <strong>Guardian Phone :</strong>{" "}
                  _____________________________________
                </td>
              </tr>
              <tr>
                <td>
                  <strong>G.Occupation :</strong>{" "}
                  _____________________________________
                </td>
                <td>
                  <strong>Guardian Email :</strong>{" "}
                  _____________________________________
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <strong>Guardian Address :</strong>
                  <br />
                  <div
                    style={{
                      border: "1px solid #000",
                      height: "60px",
                      marginTop: "8px",
                    }}
                  >
                    &nbsp;
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "110px",
                  height: "140px",
                  border: "2px solid #ccc",
                  background: "#f9f9f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                }}
              >
                NO IMAGE
                <br />
                AVAILABLE
              </div>
              <br />
              Father Photo
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "110px",
                  height: "140px",
                  border: "2px solid #ccc",
                  background: "#f9f9f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                }}
              >
                NO IMAGE
                <br />
                AVAILABLE
              </div>
              <br />
              Mother Photo
            </div>
          </div>

          <h3
            style={{
              borderBottom: "3px solid #f39c12",
              paddingBottom: "5px",
              margin: "20px 0 10px 0",
            }}
          >
            Miscellaneous Details
          </h3>
          <div style={{ lineHeight: "2" }}>
            Permanent Address :
            _____________________________________________________________________
            <br />
            Current Address :
            _____________________________________________________________________
            <br />
            Previous School :
            _____________________________________________________________________
            <br />
            National Identification Number :
            ______________________________________________________
            <br />
            Attached Document :
            _________________________________________________________________
            <br />
            Bank Details :
            _____________________________________________________________________
            <br />
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              __________________________
              <br />
              <strong>Parent Signature</strong>
            </div>
            <div>
              __________________________
              <br />
              <strong>Authorized Signature</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Student Details ==================== */}
      <div
        className={`section20 ${openSections.studentDetails ? "open20" : ""}`}
      >
        <div
          className="section-header20"
          onClick={() => toggleSection("studentDetails")}
        >
          <h4>Student Details</h4>
          <span className="arrow20">
            {openSections.studentDetails ? <UpArrow /> : <DownArrow />}
          </span>
        </div>

        {openSections.studentDetails && (
          <div className="section-content20">
            <div className="form-grid20">
              {/* Admission No */}
              <div className="field20">
                <label>Admission No. *</label>
                <div className="admission-no20">
                  <input
                    type="text"
                    placeholder="Prefix"
                    className="prefix20"
                  />
                  <input type="text" defaultValue="2322212010" />
                </div>
              </div>

              <div className="field20">
                <label>Class *</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>I</option>
                  <option>II</option>
                  <option>III</option>
                  <option>IV</option>
                  <option>V</option>
                  <option>VI</option>
                  <option>VII</option>
                  <option>VIII</option>
                  <option>IX</option>
                  <option>X</option>
                  <option>XI</option>
                  <option>XII</option>
                </select>
              </div>

              <div className="field20">
                <label>Section *</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>
              </div>

              <div className="field20">
                <label>Roll Number</label>
                <input />
              </div>
              <div className="field20">
                <label>Biometric Id</label>
                <input />
              </div>
              <div className="field20">
                <label>Admission Date</label>
                <input type="date" defaultValue="2025-12-06" />
              </div>

              <div className="field20">
                <label>First Name *</label>
                <input />
              </div>
              <div className="field20">
                <label>Last Name</label>
                <input />
              </div>
              <div className="field20">
                <label>Gender *</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field20">
                <label>Date of Birth *</label>
                <input type="date" />
              </div>
              <div className="field20">
                <label>Category</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>
              <div className="field20">
                <label>Religion</label>
                <input />
              </div>

              {/* Student Photo */}
              <div className="field20 photo-field20">
                <label>Student Photo</label>
                <div className="photo-upload20">
                  <div className="placeholder20">
                    NO IMAGE
                    <br />
                    AVAILABLE
                  </div>
                  <button className="upload-btn20">Upload</button>
                </div>
              </div>

              <div className="field20">
                <label>Caste</label>
                <input />
              </div>
              <div className="field20">
                <label>Mobile Number</label>
                <input />
              </div>
              <div className="field20">
                <label>Email</label>
                <input type="email" />
              </div>

              <div className="field20">
                <label>Blood Group</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="field20">
                <label>House</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Yellow</option>
                </select>
              </div>

              <div className="field20">
                <label>Sponsor</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                </select>
              </div>

              <div className="field20">
                <label>Height</label>
                <input placeholder="e.g. 5.6 ft" />
              </div>
              <div className="field20">
                <label>Weight</label>
                <input placeholder="e.g. 55 kg" />
              </div>
              <div className="field20">
                <label>Aadhar Number</label>
                <input />
              </div>

              <div className="field20">
                <label>Admitted Class</label>
                <input />
              </div>
              <div className="field20">
                <label>As on Date</label>
                <input type="date" />
              </div>

              <div className="referral20">
                <label>Referral By</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                </select>
                <button className="btn-add20">Add</button>
              </div>

              <button className="btn-sibling20">+ Add Sibling</button>
            </div>
          </div>
        )}
      </div>

      {/* ==================== Custom Field ==================== */}
      <div className={`section20 ${openSections.customField ? "open20" : ""}`}>
        <div
          className="section-header20"
          onClick={() => toggleSection("customField")}
        >
          <h4>Custom Field</h4>
          <span className="arrow20">
            {openSections.customField ? <UpArrow /> : <DownArrow />}
          </span>
        </div>
        {openSections.customField && (
          <div className="section-content20">
            <div className="form-grid20">
              <div className="field20">
                <label>Reference</label>
                <input />
              </div>
              <div className="field20">
                <label>Pan number</label>
                <input />
              </div>
              <div className="field20">
                <label>PEN</label>
                <input />
              </div>
              <div className="field20">
                <label>SR NO</label>
                <input />
              </div>
              <div className="field20">
                <label>Hobby *</label>
                <input />
              </div>
              <div className="field20">
                <label>Family Income</label>
                <input />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== Parent / Guardian Details ==================== */}
      <div
        className={`section20 ${openSections.parentGuardian ? "open20" : ""}`}
      >
        <div
          className="section-header20"
          onClick={() => toggleSection("parentGuardian")}
        >
          <h4>Parent / Guardian Details</h4>
          <span className="arrow20">
            {openSections.parentGuardian ? <UpArrow /> : <DownArrow />}
          </span>
        </div>

        {openSections.parentGuardian && (
          <div className="section-content20">
            {/* Father */}
            <div className="parent-row20">
              <div className="field20">
                <label>Father Name</label>
                <input />
              </div>
              <div className="field20">
                <label>Father Phone</label>
                <input />
              </div>
              <div className="field20">
                <label>Father Dob</label>
                <input type="date" />
              </div>
              <div className="field20 photo-field20">
                <label>Father Photo</label>
                <div className="photo-upload20">
                  <div className="placeholder20">
                    NO IMAGE
                    <br />
                    AVAILABLE
                  </div>
                  <button className="upload-btn20">Upload</button>
                </div>
              </div>
              <div className="field20">
                <label>Father Occupation</label>
                <input />
              </div>
              <div className="field20">
                <label>Marriage Anniversary Date</label>
                <input type="date" />
              </div>
            </div>

            {/* Mother */}
            <div className="parent-row20">
              <div className="field20">
                <label>Mother Name</label>
                <input />
              </div>
              <div className="field20">
                <label>Mother Phone</label>
                <input />
              </div>
              <div className="field20 photo-field20">
                <label>Mother Photo</label>
                <div className="photo-upload20">
                  <div className="placeholder20">
                    NO IMAGE
                    <br />
                    AVAILABLE
                  </div>
                  <button className="upload-btn20">Upload</button>
                </div>
              </div>
              <div className="field20">
                <label>Mother Dob</label>
                <input type="date" />
              </div>
              <div className="field20">
                <label>Mother Occupation</label>
                <input />
              </div>
            </div>

            {/* Guardian Radio */}
            <div className="guardian-radio20">
              <label>If Guardian Is :</label>
              <label>
                <input type="radio" name="guardian" value="father" /> Father
              </label>
              <label>
                <input type="radio" name="guardian" value="mother" /> Mother
              </label>
              <label>
                <input type="radio" name="guardian" value="other" /> Other
              </label>
            </div>

            {/* Guardian Fields */}
            <div className="form-grid20">
              <div className="field20">
                <label>Guardian Name *</label>
                <input />
              </div>
              <div className="field20">
                <label>Guardian Relation</label>
                <input />
              </div>
              <div className="field20">
                <label>Guardian Email</label>
                <input type="email" />
              </div>
              <div className="field20 photo-field20">
                <label>Guardian Photo</label>
                <div className="photo-upload20">
                  <div className="placeholder20">
                    NO IMAGE
                    <br />
                    AVAILABLE
                  </div>
                  <button className="upload-btn20">Upload</button>
                </div>
              </div>
              <div className="field20">
                <label>Guardian Phone *</label>
                <input />
              </div>
              <div className="field20">
                <label>Guardian Occupation</label>
                <input />
              </div>
              <div className="field20 full-width20">
                <label>Guardian Address</label>
                <textarea rows="4" placeholder="Enter address..."></textarea>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== Upload Documents ==================== */}
      <div className={`section20 ${openSections.uploadDocs ? "open20" : ""}`}>
        <div
          className="section-header20"
          onClick={() => toggleSection("uploadDocs")}
        >
          <h4>Upload Documents</h4>
          <span className="arrow20">
            {openSections.uploadDocs ? <UpArrow /> : <DownArrow />}
          </span>
        </div>

        {openSections.uploadDocs && (
          <div className="section-content20">
            <table className="upload-table20">
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>DOCUMENTS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Report Card",
                  "TC",
                  "samagra id",
                  "NIDA Card Number",
                  "previous year Marksheet",
                  "Student",
                  "studnet DOB",
                  "Adhaar Card",
                  "Aman",
                  "PIP/",
                ].map((title, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>
                      <input value={title} readOnly className="title-input20" />
                    </td>
                    <td>
                      <label className="file-upload20">
                        Choose File
                        <input type="file" />
                        <span>No file chosen</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="submit-btn-container20">
        <button className="btn-submit20">Submit</button>
      </div>
    </div>
  );
};

export default StudentAdmissionForm;
