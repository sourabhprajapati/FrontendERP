import React from 'react';
import './Staff.css';

function Staff() {
  return (
    <div className="stf-container13">
      {/* Main Content */}
      <main className="stf-main-content13">
        <div className="stf-form-container13">
          {/* Centered Title */}
          <div className="stf-form-header13 centered13">
            <h1>Staff Registration</h1>
          </div>

          <form className="stf-employee-form13">
            {/* === SECTION 1: BASIC INFO === */}
            <div className="stf-form-grid13">
              {/* Left Column */}
              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>Employee Name <span className="stf-required13">*</span></label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Employee User Name <span className="stf-required13">*</span></label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>DOB <span className="stf-required13">*</span></label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>User Type <span className="stf-required13">*</span></label>
                  <select defaultValue="">
                    <option value="" disabled>Select Here</option>
                    <option>Admin</option>
                    <option>Teacher</option>
                    <option>Staff</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>Designation <span className="stf-required13">*</span></label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Nature of Appointment</label>
                  <select defaultValue="">
                    <option value="" disabled>Select Here</option>
                    <option>Permanent</option>
                    <option>Temporary</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>D/L No. (* for driver)</label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Joining Date <span className="stf-required13">*</span></label>
                  <input type="text" readOnly className="readonly13" />
                </div>

                <div className="stf-form-group13">
                  <label>Mobile Number 1 <span className="stf-required13">*</span></label>
                  <input type="text" className="readonly13" />
                </div>
              </div>

              {/* Right Column */}
              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>Father's Name</label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Password <span className="stf-required13">*</span></label>
                  <input type="password" />
                </div>

                <div className="stf-form-group13 stf-radio-group13">
                  <label>Gender</label>
                  <div className="stf-radio-options13">
                    <label><input type="radio" name="gender" defaultChecked /> Male</label>
                    <label><input type="radio" name="gender" /> Female</label>
                  </div>
                </div>

                <div className="stf-form-group13">
                  <label>Department</label>
                  <select defaultValue="">
                    <option value="" disabled>Select Department</option>
                    <option>Science</option>
                    <option>Arts</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>Kind of Teacher</label>
                  <select defaultValue="">
                    <option value="" disabled>Select Here</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>
                </div>

                <div className="stf-form-group13 stf-checkbox-group13">
                  <label>Teaching Class</label>
                  <div className="stf-checkbox-options13">
                    <label><input type="checkbox" /> PRT</label>
                    <label><input type="checkbox" /> Secondary</label>
                    <label><input type="checkbox" /> Sr. Secondary</label>
                  </div>
                </div>

                <div className="stf-form-group13">
                  <label>Qualification</label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Leaving Date</label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13">
                  <label>Mobile Number 2</label>
                  <input type="text" />
                </div>
              </div>
            </div>

            {/* === SECTION 2: ADDITIONAL INFO === */}
            <div className="stf-section-divider13"></div>

            <div className="stf-form-grid13">
              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>Email ID</label>
                  <input type="email" />
                </div>

                <div className="stf-form-group13">
                  <label>Other Comments</label>
                  <input type="text" />
                </div>
              </div>

              <div className="stf-form-column13">
                <div className="stf-form-group13">
                  <label>Address</label>
                  <input type="text" />
                </div>

                <div className="stf-form-group13 stf-radio-group13">
                  <label>Marital Status</label>
                  <div className="stf-radio-options13 marital13">
                    <label><input type="radio" name="marital" /> Married</label>
                    <label><input type="radio" name="marital" defaultChecked /> Unmarried</label>
                    <label><input type="radio" name="marital" /> Widowed</label>
                    <label><input type="radio" name="marital" /> Divorced</label>
                  </div>
                </div>
              </div>
            </div>

            {/* === SECTION 3: UPLOAD DOCUMENTS === */}
            <div className="stf-section-divider13"></div>

            <div className="stf-upload-section13">
              <h1 className="stf-upload-title13 centered13">
                Upload Documents (Allowed file type: png, jpg, jpeg only)
              </h1>

              <div className="stf-upload-grid-inline13">
                {[
                  { label: "Profile Photo", name: "profile" },
                  { label: "PAN Card", name: "pan" },
                  { label: "D/L", name: "dl" },
                  { label: "PG Cert./Marksheet", name: "pg" },
                  { label: "Police Verification", name: "police" },
                  { label: "Other Doc.", name: "other" },
                  { label: "Aadhar Card", name: "aadhar" },
                  { label: "Voter ID", name: "voter" },
                  { label: "UG Cert./Marksheet", name: "ug" },
                  { label: "B.Ed. Cert./Marksheet", name: "bed" },
                  { label: "Experience Cert.", name: "exp" },
                ].map((item, i) => (
                  <div className="stf-upload-item-inline13" key={i}>
                    <label className="stf-upload-label13">{item.label}</label>
                    <label className="stf-file-input-inline13">
                      Choose File
                      <input type="file" accept=".png,.jpg,.jpeg" hidden />
                      <span className="stf-file-name13">No file chosen</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* === SAVE BUTTON === */}
            <div className="stf-form-actions13">
              <button type="button" className="stf-save-btn13">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Staff;