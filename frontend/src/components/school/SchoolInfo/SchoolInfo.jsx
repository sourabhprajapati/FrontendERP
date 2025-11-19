import React, { useState, useRef, useEffect } from 'react';
import './SchoolInfo.css';

const SchoolInfo = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Logo states
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [tcHeaderLogo, setTcHeaderLogo] = useState(null);
  const schoolFileRef = useRef(null);
  const tcFileRef = useRef(null);

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8'
  ];

  // Multi-select logic
  const toggleClass = (cls) => {
    setSelectedClasses(prev =>
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // File handlers
  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'school') setSchoolLogo(reader.result);
      else setTcHeaderLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = (type) => {
    if (type === 'school') {
      setSchoolLogo(null);
      if (schoolFileRef.current) schoolFileRef.current.value = '';
    } else {
      setTcHeaderLogo(null);
      if (tcFileRef.current) tcFileRef.current.value = '';
    }
  };

  return (
    <main className="school-main-content1">
    <div className="page-wrapper">
      <div className="school-form-container">
        <h1 className="form-title">School Details</h1>

        <form className="school-form">
          {/* ================== SCHOOL INFO GRID ================== */}
          <div className="form-grid">
              <div className="form-group">
              <label>Assign To  <span className="required">*</span></label>
              <input type="text" placeholder="Enter School Name" readOnly/>
            </div>
            <div className="form-group">
              <label>School Name <span className="required">*</span></label>
              <input type="text" placeholder="Enter School Name" />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter Username" />
            </div>
            <div className="form-group">
              <label>Password <span className="required">*</span></label>
              <input type="password" placeholder="Mtnl23" />
            </div>
           
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label>Academic Session <span className="required">*</span></label>
              <select defaultValue=""><option value="" disabled>--Select--</option><option>2024-2025</option><option>2025-2026</option></select>
            </div>
         
            <div className="form-group">
              <label>Website</label>
              <input type="url" placeholder="Enter Website" />
            </div>
            <div className="form-group">
              <label>Decision Maker</label>
              <input type="text" placeholder="Enter Decision Maker Name" />
            </div>
            <div className="form-group">
              <label>Mobile No. <span className="required">*</span></label>
              <input type="tel" placeholder="Enter Decision Maker Mobile" />
            </div>
            <div className="form-group">
              <label>Decision Maker Role</label>
              <select defaultValue=""><option value="" disabled>--Select--</option><option>Principal</option><option>Administrator</option></select>
            </div>
           
            <div className="form-group">
              <label>Strength</label>
              <input type="number" placeholder="Enter Strength" />
            </div>
          
            <div className="form-group">
              <label>School Affiliation Number/PAN Number</label>
              <input type="text" placeholder="Enter School Affiliation Number" />
            </div>
            <div className="form-group">
              <label>School Registration Number</label>
              <input type="text" placeholder="Enter School Registration Number" />
            </div>
           
          </div>

          {/* ================== ADDRESS DETAILS ================== */}
          <div className="section-divider">
            <h2 className="section-title">Address Details</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Pin Code <span className="required">*</span></label>
              <input type="text" placeholder="Enter PIN Code" />
            </div>
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <select defaultValue=""><option value="" disabled>Select</option><option>Maharashtra</option><option>Delhi</option><option>Karnataka</option></select>
            </div>
            <div className="form-group">
              <label>District <span className="required">*</span></label>
              <select defaultValue=""><option value="" disabled>Select</option><option>Mumbai</option><option>Pune</option><option>Nashik</option></select>
            </div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" placeholder="Enter Address" />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" placeholder="Enter Address" />
            </div>
            
          </div>

          {/* ================== LOGO UPLOAD SECTION ================== */}
          <div className="logo-section">
            <h2 className="section-title">School Logo</h2>

            {/* School Logo Row */}
            <div className="logo-row">
              <div className="logo-label">School Logo</div>

              <div className="file-area">
                <input
                  type="file"
                  accept="image/*"
                  ref={schoolFileRef}
                  onChange={(e) => handleFile(e, 'school')}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="choose-btn"
                  onClick={() => schoolFileRef.current?.click()}
                >
                  Choose File
                </button>
                <span className="file-text">
                  {schoolLogo ? 'File chosen' : 'No file chosen'}
                </span>
              </div>

              <div className="preview-label">Logo</div>

              <div className="preview-area">
                {schoolLogo ? (
                  <img src={schoolLogo} alt="School Logo" className="preview-img" />
                ) : (
                  <div className="no-img">No logo uploaded</div>
                )}
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeLogo('school')}
                disabled={!schoolLogo}
              >
                <span className="remove-icon">-</span> Remove School Logo
              </button>
            </div>

            {/* TC Header Logo Row */}
            <div className="logo-row">
              <div className="logo-label">TC Header Logo</div>

              <div className="file-area">
                <input
                  type="file"
                  accept="image/*"
                  ref={tcFileRef}
                  onChange={(e) => handleFile(e, 'tc')}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="choose-btn"
                  onClick={() => tcFileRef.current?.click()}
                >
                  Choose File
                </button>
                <span className="file-text">
                  {tcHeaderLogo ? 'File chosen' : 'No file chosen'}
                </span>
              </div>

              <div className="preview-label">TC Header</div>

              <div className="preview-area">
                {tcHeaderLogo ? (
                  <img src={tcHeaderLogo} alt="TC Header Logo" className="preview-img" />
                ) : (
                  <div className="no-img">No logo uploaded</div>
                )}
              </div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeLogo('tc')}
                disabled={!tcHeaderLogo}
              >
                <span className="remove-icon">-</span> Remove TC Header
              </button>
            </div>
          </div>

          {/* ================== NEW: SECURITY SETTINGS & FEES INFO ================== */}
          <div className="settings-section">
            <h2 className="section-title">Security Settings</h2>

            <div className="settings-grid">
              {/* Row 1 */}
              <div className="settings-row">
                <label>OTP For Fee Discount</label>
                <div className="radio-group">
                  <label><input type="radio" name="otp-fee-discount" defaultChecked={false} /> Yes</label>
                  <label><input type="radio" name="otp-fee-discount" defaultChecked /> No</label>
                </div>
              </div>
              <div className="settings-row">
                <label>Discount OTP Mob. No</label>
                <input type="text" />
              </div>

              {/* Row 2 */}
              <div className="settings-row">
                <label>OTP For Cancel Fee Receipt</label>
                <div className="radio-group">
                  <label><input type="radio" name="otp-cancel-receipt" /> Yes</label>
                  <label><input type="radio" name="otp-cancel-receipt" defaultChecked /> No</label>
                </div>
              </div>
              <div className="settings-row">
                <label>Cancel Fee OTP Mob. No</label>
                <input type="text"  />
              </div>

              {/* Row 3 */}
              <div className="settings-row">
                <label>Auto Collection SMS</label>
                <div className="radio-group">
                  <label><input type="radio" name="auto-sms" /> Yes</label>
                  <label><input type="radio" name="auto-sms" defaultChecked /> No</label>
                </div>
              </div>
              <div className="settings-row">
                <label>Collection SMS Mob. No</label>
                <input type="text"  />
              </div>

              {/* Row 4 */}
              <div className="settings-row">
                <label>Concession Request</label>
                <div className="radio-group">
                  <label><input type="radio" name="concession-req" /> Yes</label>
                  <label><input type="radio" name="concession-req" defaultChecked /> No</label>
                </div>
              </div>
              <div className="settings-row">
                <label>Permit Class Teacher(s) to Send Attendance Alerts to Parents?</label>
                <div className="radio-group">
                  <label><input type="radio" name="attendance-alert" /> Yes</label>
                  <label><input type="radio" name="attendance-alert" defaultChecked /> No</label>
                </div>
              </div>

              {/* Row 5 */}
              <div className="settings-row">
                <label>Permit Class Teacher(s) to Approve/Deny Student Leave Request?</label>
                <div className="radio-group">
                  <label><input type="radio" name="leave-approve" /> Yes</label>
                  <label><input type="radio" name="leave-approve" defaultChecked /> No</label>
                </div>
              </div>
              <div className="settings-row">
                <label>Time Table Schedule</label>
                <div className="radio-group">
                  <label><input type="radio" name="timetable" defaultChecked /> Summer</label>
                  <label><input type="radio" name="timetable" /> Winter</label>
                </div>
              </div>
            </div>

          </div>

          {/* ================== SUBMIT / CANCEL ================== */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </main>
  );
};

export default SchoolInfo;