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

  // New: Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8'
  ];

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

  // MAIN SUBMIT FUNCTION — THIS IS THE KEY
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    // Optional: Log to see what is being sent
    console.log("Sending FormData...");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('http://localhost:5000/api/schoolinfo/create', {
        method: 'POST',
        body: formData,
        // DO NOT set Content-Type — let browser set multipart boundary
      });

      const result = await response.json();
      console.log("Response:", result);

      if (result.success) {
        alert("School registered successfully!");
        e.target.reset();
        setSchoolLogo(null);
        setTcHeaderLogo(null);
      } else {
        alert("Error: " + (result.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Failed to connect to server. Is backend running on port 5000?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="si-main">
      <div className="si-wrapper">
        <div className="si-container">
          <h1 className="si-title">School Details</h1>

          <form className="si-form" onSubmit={handleSubmit}>

            {/* ================== SCHOOL INFO GRID ================== */}
            <div className="si-grid">
              <div className="si-group">
                <label>School Name <span className="si-required">*</span></label>
                <input type="text" name="schoolName" placeholder="Enter School Name" required />
              </div>

              <div className="si-group">
                <label>Email <span className="si-required">*</span></label>
                <input type="email" name="email" placeholder="Enter Email" required />
              </div>

              <div className="si-group">
                <label>Academic Session <span className="si-required">*</span></label>
                <select name="academicSession" required>
                  <option value="" disabled>--Select--</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>

              <div className="si-group">
                <label>Website</label>
                <input type="url" name="website" placeholder="Enter Website" />
              </div>

              <div className="si-group">
                <label>Decision Maker</label>
                <input type="text" name="decisionMaker" placeholder="Enter Decision Maker Name" />
              </div>

              <div className="si-group">
                <label>Mobile No. <span className="si-required">*</span></label>
                <input type="tel" name="mobileNo" placeholder="Enter Decision Maker Mobile" required />
              </div>

              <div className="si-group">
                <label>Decision Maker Role</label>
                <select name="decisionMakerRole">
                  <option value="">--Select--</option>
                  <option>Principal</option>
                  <option>Administrator</option>
                </select>
              </div>

              <div className="si-group">
                <label>Strength</label>
                <input type="number" name="strength" placeholder="Enter Strength" />
              </div>

              <div className="si-group">
                <label>School Affiliation Number/PAN Number</label>
                <input type="text" name="affiliationNumber" placeholder="Enter School Affiliation Number" />
              </div>

              <div className="si-group">
                <label>School Registration Number</label>
                <input type="text" name="registrationNumber" placeholder="Enter School Registration Number" />
              </div>
            </div>

            {/* ================== ADDRESS DETAILS ================== */}
            <div className="si-divider">
              <h2 className="si-section-title">Address Details</h2>
            </div>
            <div className="si-grid">
              <div className="si-group">
                <label>Pin Code <span className="si-required">*</span></label>
                <input type="text" name="pincode" placeholder="Enter PIN Code" required />
              </div>
              <div className="si-group">
                <label>State <span className="si-required">*</span></label>
                <select name="state" required>
                  <option value="" disabled>Select</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                </select>
              </div>
              <div className="si-group">
                <label>District <span className="si-required">*</span></label>
                <select name="district" required>
                  <option value="" disabled>Select</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Nashik</option>
                </select>
              </div>
              <div className="si-group">
                <label>Address Line 1</label>
                <input type="text" name="addressLine1" placeholder="Enter Address" />
              </div>
              <div className="si-group">
                <label>Address Line 2</label>
                <input type="text" name="addressLine2" placeholder="Enter Address" />
              </div>
            </div>

            {/* ================== LOGO UPLOAD SECTION ================== */}
            <div className="si-logo-section">
              <h2 className="si-section-title">School Logo</h2>

              {/* School Logo Row */}
              <div className="si-logo-row">
                <div className="si-logo-label">School Logo</div>

                <div className="si-file-area">
                  <input
                    type="file"
                    name="schoolLogo"
                    accept="image/*"
                    ref={schoolFileRef}
                    onChange={(e) => handleFile(e, 'school')}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="si-choose-btn"
                    onClick={() => schoolFileRef.current?.click()}
                  >
                    Choose File
                  </button>
                  <span className="si-file-text">
                    {schoolLogo ? 'File chosen' : 'No file chosen'}
                  </span>
                </div>

                <div className="si-preview-label">Logo</div>
                <div className="si-preview-area">
                  {schoolLogo ? (
                    <img src={schoolLogo} alt="School Logo" className="si-preview-img" />
                  ) : (
                    <div className="si-no-img">No logo uploaded</div>
                  )}
                </div>

                <button
                  type="button"
                  className="si-remove-btn"
                  onClick={() => removeLogo('school')}
                  disabled={!schoolLogo}
                >
                  <span className="remove-icon">-</span> Remove School Logo
                </button>
              </div>

              {/* TC Header Logo Row */}
              <div className="si-logo-row">
                <div className="si-logo-label">TC Header Logo</div>

                <div className="si-file-area">
                  <input
                    type="file"
                    name="tcHeaderLogo"
                    accept="image/*"
                    ref={tcFileRef}
                    onChange={(e) => handleFile(e, 'tc')}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="si-choose-btn"
                    onClick={() => tcFileRef.current?.click()}
                  >
                    Choose File
                  </button>
                  <span className="si-file-text">
                    {tcHeaderLogo ? 'File chosen' : 'No file chosen'}
                  </span>
                </div>

                <div className="si-preview-label">TC Header</div>
                <div className="si-preview-area">
                  {tcHeaderLogo ? (
                    <img src={tcHeaderLogo} alt="TC Header Logo" className="si-preview-img" />
                  ) : (
                    <div className="si-no-img">No logo uploaded</div>
                  )}
                </div>

                <button
                  type="button"
                  className="si-remove-btn"
                  onClick={() => removeLogo('tc')}
                  disabled={!tcHeaderLogo}
                >
                  <span className="remove-icon">-</span> Remove TC Header
                </button>
              </div>
            </div>

            {/* ================== SECURITY SETTINGS ================== */}
            <div className="si-settings-section">
              <h2 className="si-section-title">Security Settings</h2>

              <div className="si-settings-grid">
                <div className="si-settings-row">
                  <label>OTP For Fee Discount</label>
                  <div className="si-radio-group">
                    <label><input type="radio" name="otpForFeeDiscount" value="true" /> Yes</label>
                    <label><input type="radio" name="otpForFeeDiscount" value="false" defaultChecked /> No</label>
                  </div>
                </div>
                <div className="si-settings-row">
                  <label>Discount OTP Mob. No</label>
                  <input type="text" name="discountOtpMobile" placeholder="Enter mobile number" />
                </div>
              </div>
            </div>

            {/* ================== SUBMIT / CANCEL ================== */}
            <div className="si-actions">
              <button type="submit" className="si-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className="si-cancel-btn" onClick={() => window.location.reload()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SchoolInfo;