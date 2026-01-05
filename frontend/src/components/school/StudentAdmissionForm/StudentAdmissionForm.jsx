import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StudentAdmissionForm.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const StudentAdmissionForm = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openSections, setOpenSections] = useState({
    studentDetails: true,
    customField: false,
    parentGuardian: false,
    uploadDocs: false,
  });

  const printRef = useRef();

  useEffect(() => {
    if (location.state?.isEdit && location.state?.student) {
      setIsEdit(true);
      setStudentData(location.state.student);
      setLoading(true);

      // Fetch latest student data
      fetch(`http://localhost:5000/api/students/${location.state.student._id}`)
        .then(res => res.json())
        .then(data => {
          setStudentData(data);
          // Pre-fill form after a short delay to ensure DOM is ready
          setTimeout(() => {
            preFillForm(data);
          }, 100);
        })
        .catch(err => console.error("Failed to fetch student data", err))
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  const preFillForm = (data) => {
    const form = document.querySelector('form');
    if (!form || !data) return;

    // Basic info
    const basic = data.basic || {};
    form.admissionPrefix.value = basic.admissionPrefix || "";
    form.admissionNo.value = basic.admissionNo || "";
    form.class.value = basic.class || "";
    form.section.value = basic.section || "";
    form.rollNo.value = basic.rollNo || "";
    form.biometricId.value = basic.biometricId || "";
    form.admissionDate.value = basic.admissionDate ? basic.admissionDate.split('T')[0] : "";
    form.firstName.value = basic.firstName || "";
    form.lastName.value = basic.lastName || "";
    form.gender.value = basic.gender || "";
    form.dob.value = basic.dob ? basic.dob.split('T')[0] : "";
    form.category.value = basic.category || "";
    form.religion.value = basic.religion || "";
    form.caste.value = basic.caste || "";
    form.mobile.value = basic.mobile || "";
    form.email.value = basic.email || "";
    form.bloodGroup.value = basic.bloodGroup || "";
    form.house.value = basic.house || "";
    form.height.value = basic.height || "";
    form.weight.value = basic.weight || "";
    form.aadhaar.value = basic.aadhaar || "";
    form.admittedClass.value = basic.admittedClass || "";
    form.asOnDate.value = basic.asOnDate ? basic.asOnDate.split('T')[0] : "";

    // Personal info
    const personal = data.personal || {};
    form.reference.value = personal.reference || "";
    form.panNumber.value = personal.panNumber || "";
    form.pen.value = personal.pen || "";
    form.srNo.value = personal.srNo || "";
    form.hobby.value = personal.hobby || "";
    form.familyIncome.value = personal.familyIncome || "";

    // Guardians info
    const guardians = data.guardians || {};
    const father = guardians.father || {};
    form.fatherName.value = father.name || "";
    form.fatherPhone.value = father.phone || "";
    form.fatherDob.value = father.dob ? father.dob.split('T')[0] : "";
    form.fatherOccupation.value = father.occupation || "";

    const mother = guardians.mother || {};
    form.motherName.value = mother.name || "";
    form.motherPhone.value = mother.phone || "";
    form.motherDob.value = mother.dob ? mother.dob.split('T')[0] : "";
    form.motherOccupation.value = mother.occupation || "";

    form.guardianIs.value = guardians.guardianIs || "father";
    const guardian = guardians.guardian || {};
    form.guardianName.value = guardian.name || "";
    form.guardianRelation.value = guardian.relation || "";
    form.guardianEmail.value = guardian.email || "";
    form.guardianPhone.value = guardian.phone || "";
    form.guardianOccupation.value = guardian.occupation || "";
    form.guardianAddress.value = guardian.address || "";
    form.marriageAnniversary.value = guardians.marriageAnniversary ? guardians.marriageAnniversary.split('T')[0] : "";
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Arrows
  const UpArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="3.5">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );

  const DownArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#95a5a6" strokeWidth="3">
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

  // FORM SUBMIT WITH API + FILES
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Structured data for backend
    const structuredData = {
      basic: {
        admissionPrefix: formData.get("admissionPrefix") || "",
        admissionNo: formData.get("admissionNo") || "",
        class: formData.get("class") || "",
        section: formData.get("section") || "",
        rollNo: formData.get("rollNo") || "",
        biometricId: formData.get("biometricId") || "",
        admissionDate: formData.get("admissionDate") || "",
        firstName: formData.get("firstName") || "",
        lastName: formData.get("lastName") || "",
        name: `${formData.get("firstName") || ""} ${formData.get("lastName") || ""}`.trim(),
        gender: formData.get("gender") || "",
        dob: formData.get("dob") || "",
        category: formData.get("category") || "",
        religion: formData.get("religion") || "",
        caste: formData.get("caste") || "",
        mobile: formData.get("mobile") || "",
        email: formData.get("email") || "",
        bloodGroup: formData.get("bloodGroup") || "",
        house: formData.get("house") || "",
        height: formData.get("height") || "",
        weight: formData.get("weight") || "",
        aadhaar: formData.get("aadhaar") || "",
        admittedClass: formData.get("admittedClass") || "",
        asOnDate: formData.get("asOnDate") || "",
      },
      personal: {
        reference: formData.get("reference") || "",
        panNumber: formData.get("panNumber") || "",
        pen: formData.get("pen") || "",
        srNo: formData.get("srNo") || "",
        hobby: formData.get("hobby") || "",
        familyIncome: formData.get("familyIncome") || "",
      },
      guardians: {
        father: {
          name: formData.get("fatherName") || "",
          phone: formData.get("fatherPhone") || "",
          dob: formData.get("fatherDob") || "",
          occupation: formData.get("fatherOccupation") || "",
        },
        mother: {
          name: formData.get("motherName") || "",
          phone: formData.get("motherPhone") || "",
          dob: formData.get("motherDob") || "",
          occupation: formData.get("motherOccupation") || "",
        },
        guardianIs: formData.get("guardianIs") || "father",
        guardian: {
          name: formData.get("guardianName") || "",
          relation: formData.get("guardianRelation") || "",
          email: formData.get("guardianEmail") || "",
          phone: formData.get("guardianPhone") || "",
          occupation: formData.get("guardianOccupation") || "",
          address: formData.get("guardianAddress") || "",
        },
        marriageAnniversary: formData.get("marriageAnniversary") || "",
      },
      documents: [],
    };

    // Prepare final FormData for multipart upload
    const submitFormData = new FormData();
    submitFormData.append("data", JSON.stringify(structuredData));

    // Append photo files
    ["studentPhoto", "fatherPhoto", "motherPhoto", "guardianPhoto"].forEach((field) => {
      const file = formData.get(field);
      if (file && file.size > 0) {
        submitFormData.append(field, file);
      }
    });

    // Append document files
    for (let i = 0; i < 10; i++) {
      const file = formData.get(`doc-${i}`);
      if (file && file.size > 0) {
        submitFormData.append("documents", file);
      }
    }

    try {
      const url = isEdit ? `http://localhost:5000/api/students/${studentData._id}` : "http://localhost:5000/api/students";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: submitFormData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEdit ? "Student updated successfully!" : "Student admitted successfully!");
        if (!isEdit) {
          e.target.reset();
        }
      } else {
        alert(result.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error – Is backend running?");
    }
  };

  if (loading) {
    return <div className="loading">Loading student data...</div>;
  }

  return (
    <div className="admission-container20">
      {/* Header */}
      <div className="header20">
        <h2>
          <span className="icon">Document</span> {isEdit ? "Edit Student" : "Student Admission"}
        </h2>
        <div className="breadcrumb20">Student Info / {isEdit ? "Edit Student" : "Student Admission"}</div>
      </div>

      <div className="form-header20">
        <h3>{isEdit ? "Edit Student Form" : "Student Admission Form"}</h3>
        <div className="actions20">
          <button className="btn-download20" onClick={handleDownloadPDF}>
            Download Form
          </button>
          {!isEdit && <button className="btn-import20">Import Student</button>}
        </div>
      </div>

      {/* Hidden PDF Template */}
      <div style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm" }}>
        <div ref={printRef} style={{ width: "210mm", padding: "15mm 20mm", background: "white", fontFamily: "'Times New Roman', serif", fontSize: "11pt" }}>
          {/* Your beautiful NLET PDF template here - unchanged */}
          {/* ... (keep exactly as you have it) ... */}
        </div>
      </div>

      {/* MAIN FORM */}
      <form onSubmit={handleSubmit}>
        {/* Student Details */}
        <div className={`section20 ${openSections.studentDetails ? "open20" : ""}`}>
          <div className="section-header20" onClick={() => toggleSection("studentDetails")}>
            <h4>Student Details</h4>
            <span className="arrow20">{openSections.studentDetails ? <UpArrow /> : <DownArrow />}</span>
          </div>

          {openSections.studentDetails && (
            <div className="section-content20">
              <div className="form-grid20">
                <div className="field20">
                  <label>Admission No. *</label>
                  <div className="admission-no20">
                    <input type="text" name="admissionPrefix" placeholder="Prefix" className="prefix20" />
                    <input type="text" name="admissionNo" defaultValue="2322212010" />
                  </div>
                </div>

                <div className="field20">
                  <label>Class *</label>
                  <select name="class" required>
                    <option value="" disabled selected>Select</option>
                    <option>I</option><option>II</option><option>III</option><option>IV</option>
                    <option>V</option><option>VI</option><option>VII</option><option>VIII</option>
                    <option>IX</option><option>X</option><option>XI</option><option>XII</option>
                  </select>
                </div>

                <div className="field20">
                  <label>Section *</label>
                  <select name="section" required>
                    <option value="" disabled selected>Select</option>
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>

                <div className="field20"><label>Roll Number</label><input name="rollNo" /></div>
                <div className="field20"><label>Biometric Id</label><input name="biometricId" /></div>
                <div className="field20"><label>Admission Date</label><input type="date" name="admissionDate" defaultValue="2025-12-06" /></div>

                <div className="field20"><label>First Name *</label><input name="firstName" required /></div>
                <div className="field20"><label>Last Name</label><input name="lastName" /></div>
                <div className="field20">
                  <label>Gender *</label>
                  <select name="gender" required>
                    <option value="" disabled selected>Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>

                <div className="field20"><label>Date of Birth *</label><input type="date" name="dob" required /></div>
                <div className="field20">
                  <label>Category</label>
                  <select name="category">
                    <option value="" disabled selected>Select</option>
                    <option>General</option><option>OBC</option><option>SC</option><option>ST</option>
                  </select>
                </div>
                <div className="field20"><label>Religion</label><input name="religion" /></div>

                {/* Student Photo - WORKING UPLOAD */}
                <div className="field20 photo-field20">
                  <label>Student Photo</label>
                  <div className="photo-upload20">
                    <div className="placeholder20">NO IMAGE<br />AVAILABLE</div>
                    <label className="upload-btn20">
                      Upload
                      <input type="file" name="studentPhoto" accept="image/*" hidden />
                    </label>
                  </div>
                </div>

                <div className="field20"><label>Caste</label><input name="caste" /></div>
                <div className="field20"><label>Mobile Number</label><input name="mobile" /></div>
                <div className="field20"><label>Email</label><input type="email" name="email" /></div>

                <div className="field20">
                  <label>Blood Group</label>
                  <select name="bloodGroup">
                    <option value="" disabled selected>Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>

                <div className="field20">
                  <label>House</label>
                  <select name="house">
                    <option value="" disabled selected>Select</option>
                    <option>Red</option><option>Blue</option><option>Green</option><option>Yellow</option>
                  </select>
                </div>

                <div className="field20"><label>Height</label><input name="height" placeholder="e.g. 5.6 ft" /></div>
                <div className="field20"><label>Weight</label><input name="weight" placeholder="e.g. 55 kg" /></div>
                <div className="field20"><label>Aadhar Number</label><input name="aadhaar" /></div>
                <div className="field20"><label>Admitted Class</label><input name="admittedClass" /></div>
                <div className="field20"><label>As on Date</label><input type="date" name="asOnDate" /></div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Field */}
        <div className={`section20 ${openSections.customField ? "open20" : ""}`}>
          <div className="section-header20" onClick={() => toggleSection("customField")}>
            <h4>Custom Field</h4>
            <span className="arrow20">{openSections.customField ? <UpArrow /> : <DownArrow />}</span>
          </div>
          {openSections.customField && (
            <div className="section-content20">
              <div className="form-grid20">
                <div className="field20"><label>Reference</label><input name="reference" /></div>
                <div className="field20"><label>Pan number</label><input name="panNumber" /></div>
                <div className="field20"><label>PEN</label><input name="pen" /></div>
                <div className="field20"><label>SR NO</label><input name="srNo" /></div>
                <div className="field20"><label>Hobby *</label><input name="hobby" required /></div>
                <div className="field20"><label>Family Income</label><input name="familyIncome" /></div>
              </div>
            </div>
          )}
        </div>

        {/* Parent Guardian */}
        <div className={`section20 ${openSections.parentGuardian ? "open20" : ""}`}>
          <div className="section-header20" onClick={() => toggleSection("parentGuardian")}>
            <h4>Parent / Guardian Details</h4>
            <span className="arrow20">{openSections.parentGuardian ? <UpArrow /> : <DownArrow />}</span>
          </div>

          {openSections.parentGuardian && (
            <div className="section-content20">
              <div className="parent-row20">
                <div className="field20"><label>Father Name</label><input name="fatherName" /></div>
                <div className="field20"><label>Father Phone</label><input name="fatherPhone" /></div>
                <div className="field20"><label>Father Dob</label><input type="date" name="fatherDob" /></div>
                <div className="field20 photo-field20">
                  <label>Father Photo</label>
                  <div className="photo-upload20">
                    <div className="placeholder20">NO IMAGE<br />AVAILABLE</div>
                    <label className="upload-btn20">
                      Upload
                      <input type="file" name="fatherPhoto" accept="image/*" hidden />
                    </label>
                  </div>
                </div>
                <div className="field20"><label>Father Occupation</label><input name="fatherOccupation" /></div>
                <div className="field20"><label>Marriage Anniversary Date</label><input type="date" name="marriageAnniversary" /></div>
              </div>

              <div className="parent-row20">
                <div className="field20"><label>Mother Name</label><input name="motherName" /></div>
                <div className="field20"><label>Mother Phone</label><input name="motherPhone" /></div>
                <div className="field20 photo-field20">
                  <label>Mother Photo</label>
                  <div className="photo-upload20">
                    <div className="placeholder20">NO IMAGE<br />AVAILABLE</div>
                    <label className="upload-btn20">
                      Upload
                      <input type="file" name="motherPhoto" accept="image/*" hidden />
                    </label>
                  </div>
                </div>
                <div className="field20"><label>Mother Dob</label><input type="date" name="motherDob" /></div>
                <div className="field20"><label>Mother Occupation</label><input name="motherOccupation" /></div>
              </div>

              <div className="guardian-radio20">
                <label>If Guardian Is :</label>
                <label><input type="radio" name="guardianIs" value="father" defaultChecked /> Father</label>
                <label><input type="radio" name="guardianIs" value="mother" /> Mother</label>
                <label><input type="radio" name="guardianIs" value="other" /> Other</label>
              </div>

              <div className="form-grid20">
                <div className="field20"><label>Guardian Name *</label><input name="guardianName" required /></div>
                <div className="field20"><label>Guardian Relation</label><input name="guardianRelation" /></div>
                <div className="field20"><label>Guardian Email</label><input type="email" name="guardianEmail" /></div>
                <div className="field20 photo-field20">
                  <label>Guardian Photo</label>
                  <div className="photo-upload20">
                    <div className="placeholder20">NO IMAGE<br />AVAILABLE</div>
                    <label className="upload-btn20">
                      Upload
                      <input type="file" name="guardianPhoto" accept="image/*" hidden />
                    </label>
                  </div>
                </div>
                <div className="field20"><label>Guardian Phone *</label><input name="guardianPhone" required /></div>
                <div className="field20"><label>Guardian Occupation</label><input name="guardianOccupation" /></div>
                <div className="field20 full-width20">
                  <label>Guardian Address</label>
                  <textarea name="guardianAddress" rows="4"></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Documents */}
        <div className={`section20 ${openSections.uploadDocs ? "open20" : ""}`}>
          <div className="section-header20" onClick={() => toggleSection("uploadDocs")}>
            <h4>Upload Documents</h4>
            <span className="arrow20">{openSections.uploadDocs ? <UpArrow /> : <DownArrow />}</span>
          </div>

          {openSections.uploadDocs && (
            <div className="section-content20">
              <table className="upload-table20">
                <thead>
                  <tr><th>#</th><th>TITLE</th><th>DOCUMENTS</th></tr>
                </thead>
                <tbody>
                  {[
                    "Report Card", "TC", "samagra id", "NIDA Card Number",
                    "previous year Marksheet", "Student", "studnet DOB",
                    "Adhaar Card", "Aman", "PIP/"
                  ].map((title, i) => (
                    <tr key={i}>
                      <td>{i + 1}.</td>
                      <td><input value={title} readOnly className="title-input20" /></td>
                      <td>
                        <label className="file-upload20">
                          Choose File
                          <input type="file" name={`doc-${i}`} hidden />
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

        {/* Submit */}
        <div className="submit-btn-container20">
          <button type="submit" className="btn-submit20">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StudentAdmissionForm;