// src/components/School/Staff.jsx
import React, { useState } from 'react';
import './Staff.css';

const API_BASE = "http://localhost:5000/api";

function Staff() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeUserName: '',
    dob: '',
    userType: '',
    designation: '',
    natureOfAppointment: '',
    joiningDate: '',
    department: '',
    qualification: '',
    experienceYears: '',
    bloodGroup: '',
    gender: '',
    maritalStatus: '',
    mobile: '',
    email: '',
    emergencyContact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      const span = e.target.parentElement.querySelector('.stf-file-name13');
      if (span) span.textContent = file.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    const SCHOOL_ID = "000000000000000000000001";
    data.append('schoolId', SCHOOL_ID);

    try {
      const res = await fetch(`${API_BASE}/staff/create`, {
        method: 'POST',
        body: data
      });

      const json = await res.json();

      if (json.success) {
        setMessage('Staff registered successfully!');
        setFormData({
          employeeName: '', employeeUserName: '', dob: '', userType: '', designation: '',
          natureOfAppointment: '', joiningDate: '', department: '', qualification: '',
          experienceYears: '', bloodGroup: '', gender: '', maritalStatus: '',
          mobile: '', email: '', emergencyContact: '', address: '', city: '',
          state: '', pincode: '', bankName: '', accountNumber: '', ifscCode: '',
          panNumber: '', aadharNumber: ''
        });
        setFiles({});
        document.querySelectorAll('.stf-file-name13').forEach(span => span.textContent = 'No file chosen');
      } else {
        setMessage(json.message || 'Failed to save staff');
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 8000);
    }
  };

  return (
    <div className="stf-container13">
      <main className="stf-main-content13">
        <div className="stf-form-container13">

          <div className="stf-form-header13 centered13">
            <h1>Staff Registration Form</h1>
          </div>

          {message && (
            <div className="stf-message13" style={{
              backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
              color: message.includes('success') ? '#155724' : '#721c24',
              border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            {/* ========== PERSONAL INFORMATION ========== */}
            <div className="stf-form-grid13">
              <div className="stf-form-column13">

                <div className="stf-form-group13">
                  <label>Employee Name <span className="stf-required13">*</span></label>
                  <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>Employee Username <span className="stf-required13">*</span></label>
                  <input type="text" name="employeeUserName" value={formData.employeeUserName} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>Date of Birth <span className="stf-required13">*</span></label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>User Type <span className="stf-required13">*</span></label>
                  <select name="userType" value={formData.userType} onChange={handleInput} required>
                    <option value="">Select Type</option>
                    <option>Admin</option>
                    <option>Teacher</option>
                    <option>Staff</option>
                  </select>
                </div>

                <div className="stf-form-group13">
                  <label>Designation <span className="stf-required13">*</span></label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>Nature of Appointment</label>
                  <input type="text" name="natureOfAppointment" value={formData.natureOfAppointment} onChange={handleInput} placeholder="e.g., Permanent, Contract, Temporary" />
                </div>

                <div className="stf-form-group13">
                  <label>Joining Date</label>
                  <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleInput} placeholder="e.g., Science, Admin, Accounts" />
                </div>

                <div className="stf-form-group13">
                  <label>Qualification</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleInput} placeholder="e.g., M.Sc, B.Ed" />
                </div>

                <div className="stf-form-group13">
                  <label>Experience (Years)</label>
                  <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInput} min="0" />
                </div>

                <div className="stf-form-group13">
                  <label>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInput}>
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                  </select>
                </div>
                 <div className="stf-form-group13">
                  <label>Gender <span className="stf-required13">*</span></label>
                  <div className="stf-radio-options13">
                    <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInput} required /> Male</label>
                    <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInput} /> Female</label>
                    <label><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleInput} /> Other</label>
                  </div>
                </div>
                 <div className="stf-form-group13">
                  <label>Marital Status</label>
                  <div className="stf-radio-options13">
                    <label><input type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleInput} /> Single</label>
                    <label><input type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleInput} /> Married</label>
                  </div>
                </div>


              </div>

              <div className="stf-form-column13">

               

               

                <div className="stf-form-group13">
                  <label>Mobile Number <span className="stf-required13">*</span></label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>Email Address <span className="stf-required13">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInput} required />
                </div>

                <div className="stf-form-group13">
                  <label>Emergency Contact</label>
                  <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>Address <span className="stf-required13">*</span></label>
                  <textarea name="address" value={formData.address} onChange={handleInput} rows="3" required></textarea>
                </div>

                <div className="stf-form-group13">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInput} />
                </div>

                {/* Bank Details */}
                <div className="stf-form-group13">
                  <label>Bank Name</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>Account Number</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>IFSC Code</label>
                  <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInput} />
                </div>

                <div className="stf-form-group13">
                  <label>PAN Number</label>
                  <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInput} placeholder="ABCDE1234F" />
                </div>

                <div className="stf-form-group13">
                  <label>Aadhaar Number</label>
                  <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleInput} maxLength="12" placeholder="XXXX XXXX XXXX" />
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
                  { label: "Other Document", name: "otherDoc" }
                ].map(item => (
                  <div className="stf-upload-item-inline13" key={item.name}>
                    <div className="stf-upload-label13">{item.label}</div>
                    <label className="stf-file-input-inline13">
                      Choose File
                      <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => handleFile(e, item.name)} />
                      <span className="stf-file-name13">No file chosen</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="stf-form-actions13">
              <button type="submit" className="stf-save-btn13" disabled={saving}>
                {saving ? 'Saving...' : 'Save Staff'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Staff;