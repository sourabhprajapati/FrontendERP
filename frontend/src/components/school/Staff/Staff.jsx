// src/components/School/Staff.jsx
import React, { useState } from "react";
import "./Staff.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE = "http://localhost:5000/api";

function Staff() {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeUserName: "",
    password: "",
    fatherName: "",
    dob: "",
    gender: "Male",
    maritalStatus: "Unmarried",

    userType: "",
    department: "",
    designation: "",
    kindOfTeacher: "",
    natureOfAppointment: "",
    teachingClass: [], // array for checkboxes

    dlNumber: "",
    qualification: "",
    joiningDate: "",
    leavingDate: "",

    mobile1: "",
    mobile2: "",
    email: "",
    address: "",
    otherComments: "",
  });

  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, teachingClass: [...prev.teachingClass, value] };
      } else {
        return {
          ...prev,
          teachingClass: prev.teachingClass.filter((item) => item !== value),
        };
      }
    });
  };

  const handleFile = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
      const span = e.target.parentElement.querySelector(".stf-file-name13");
      if (span) span.textContent = file.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "teachingClass") {
        value.forEach((item) => data.append("teachingClass", item));
      } else {
        data.append(key, value);
      }
    });
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    const SCHOOL_ID = "000000000000000000000001";
    data.append("schoolId", SCHOOL_ID);

    // Map frontend names to backend (if needed)
    data.append("mobile", formData.mobile1);
    data.append("dl", formData.dlNumber);

    try {
      const res = await fetch(`${API_BASE}/staff/create`, {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Staff registered successfully!", {
          position: "top-right",
          autoClose: 4000,
        });
        // Reset form
        setFormData({
          employeeName: "",
          employeeUserName: "",
          password: "",
          fatherName: "",
          dob: "",
          gender: "Male",
          maritalStatus: "Unmarried",
          userType: "",
          department: "",
          designation: "",
          kindOfTeacher: "",
          natureOfAppointment: "",
          teachingClass: [],
          dlNumber: "",
          qualification: "",
          joiningDate: "",
          leavingDate: "",
          mobile1: "",
          mobile2: "",
          email: "",
          address: "",
          otherComments: "",
        });
        setFiles({});
        document
          .querySelectorAll(".stf-file-name13")
          .forEach((span) => (span.textContent = "No file chosen"));
      } else {
        toast.error(json.message || "Failed to save staff", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stf-container13">
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
        theme="light"
      />
      <main className="stf-main-content13">
        <div className="stf-form-container13">
          <div className="stf-form-header13 centered13">
            <h1>Staff Registration Form</h1>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* ========== PERSONAL INFORMATION ========== */}
            <div className="stf-form-grid13">
              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>
                    Employee Name <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Employee Username <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeUserName"
                    value={formData.employeeUserName}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Password <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Date of Birth <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Gender <span className="stf-required13">*</span>
                  </label>
                  <div className="stf-radio-options13">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInput}
                        required
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInput}
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>

                <div className="stf-form-group13">
                  <label>
                    User Type <span className="stf-required13">*</span>
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInput}
                    required
                  >
                    <option value="">Select Here</option>
                    <option>Admin</option>
                    <option>Authority</option>
                    <option>Principal</option>
                    <option>Vice Principal</option>
                    <option>Administrative Officer</option>
                    <option>Accounts</option>
                    <option>Teacher</option> {/* As per your screenshot */}
                    <option>Librarian</option>
                    <option>Front Office</option>
                    <option>Office Staff</option>
                    <option>Transport Manager</option>
                    <option>Driver</option>
                    <option>Conductor</option>
                    <option>Attendant</option>
                    <option>Security</option>
                    <option>Others</option>
                    <option>Book Scanner</option>
                    <option>Warden</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>
                    Designation <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Nature of Appointment</label>
                  <select
                    name="natureOfAppointment"
                    value={formData.natureOfAppointment}
                    onChange={handleInput}
                  >
                    <option value="">Select Here</option>
                    <option>Permanent</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                    <option>Probation</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>D/L No. (for driver)</label>
                  <input
                    type="text"
                    name="dlNumber"
                    value={formData.dlNumber}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Joining Date <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>
                    Mobile Number 1 <span className="stf-required13">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Other Comments</label>
                  <textarea
                    name="otherComments"
                    value={formData.otherComments}
                    onChange={handleInput}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInput}
                  >
                    <option value="">Select Department</option>
                    <option>Administration</option>
                    <option>Teaching</option>
                    <option>Accounts</option>
                    <option>Transport</option>
                    <option>Library</option>
                    <option>Others</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>Kind of Teacher</label>
                  <select
                    name="kindOfTeacher"
                    value={formData.kindOfTeacher}
                    onChange={handleInput}
                  >
                    <option value="">Select Here</option>
                    <option>PRT</option>
                    <option>TGT</option>
                    <option>PGT</option>
                    <option>Non-Teaching</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>Teaching Class</label>
                  <div className="stf-teaching-class-group13">
                    <div className="stf-teaching-class-option13">
                      <input
                        type="checkbox"
                        value="PRT"
                        checked={formData.teachingClass.includes("PRT")}
                        onChange={handleCheckbox}
                        id="teaching-prt"
                      />
                      <label htmlFor="teaching-prt">PRT</label>
                    </div>

                    <div className="stf-teaching-class-option13">
                      <input
                        type="checkbox"
                        value="Secondary"
                        checked={formData.teachingClass.includes("Secondary")}
                        onChange={handleCheckbox}
                        id="teaching-secondary"
                      />
                      <label htmlFor="teaching-secondary">Secondary</label>
                    </div>

                    <div className="stf-teaching-class-option13">
                      <input
                        type="checkbox"
                        value="Sr. Secondary"
                        checked={formData.teachingClass.includes(
                          "Sr. Secondary",
                        )}
                        onChange={handleCheckbox}
                        id="teaching-srsecondary"
                      />
                      <label htmlFor="teaching-srsecondary">
                        Sr. Secondary
                      </label>
                    </div>
                  </div>
                </div>

                <div className="stf-form-group13">
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Leaving Date</label>
                  <input
                    type="date"
                    name="leavingDate"
                    value={formData.leavingDate}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Mobile Number 2</label>
                  <input
                    type="tel"
                    name="mobile2"
                    value={formData.mobile2}
                    onChange={handleInput}
                  />
                </div>

                <div className="stf-form-group13">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInput}
                    rows="3"
                  ></textarea>
                </div>

                <div className="stf-form-group13">
                  <label>Marital State</label>
                  <div className="stf-radio-options13">
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Married"
                        checked={formData.maritalStatus === "Married"}
                        onChange={handleInput}
                      />{" "}
                      Married
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Unmarried"
                        checked={formData.maritalStatus === "Unmarried"}
                        onChange={handleInput}
                      />{" "}
                      Unmarried
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Widowed"
                        checked={formData.maritalStatus === "Widowed"}
                        onChange={handleInput}
                      />{" "}
                      Widowed
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Divorced"
                        checked={formData.maritalStatus === "Divorced"}
                        onChange={handleInput}
                      />{" "}
                      Divorced
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Separated"
                        checked={formData.maritalStatus === "Separated"}
                        onChange={handleInput}
                      />{" "}
                      Separated
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== DOCUMENT UPLOAD ========== */}
            <div className="stf-upload-section13">
              <h2 className="stf-upload-title13 centered13">
                Upload Documents (JPG/PNG only - Max 5MB)
              </h2>
              <div className="stf-upload-grid-inline13">
                {[
                  { label: "Profile Photo", name: "profilePhoto" },
                  { label: "PAN Card", name: "panCard" },
                  { label: "Aadhar Card", name: "aadharCard" },
                  { label: "Driving License", name: "dl" },
                  { label: "UG Certificate", name: "ugCert" },
                  { label: "PG Certificate", name: "pgCert" },
                  { label: "B.Ed Certificate", name: "bedCert" },
                  { label: "Experience Certificate", name: "experienceCert" },
                  { label: "Police Verification", name: "policeVerification" },
                  { label: "Voter ID", name: "voterId" },
                  { label: "Other Document", name: "otherDoc" },
                ].map((item) => (
                  <div className="stf-upload-item-inline13" key={item.name}>
                    <div className="stf-upload-label13">{item.label}</div>
                    <label className="stf-file-input-inline13">
                      Choose File
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFile(e, item.name)}
                      />
                      <span className="stf-file-name13">No file chosen</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="stf-form-actions13">
              <button
                type="submit"
                className="stf-save-btn13"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Staff"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Staff;
