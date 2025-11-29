import React, { useState } from 'react';
import './AdmissionEnquiry.css';

function AdmissionEnquiry() {
  const [address, setAddress] = useState('');
  const maxChars = 200;
  const remaining = maxChars - address.length;

  return (
    <div className="admission-page">
      {/* Main Form */}
      <div className="admission-form-wrapper">
        <div className="admission-form-card">
          <header className="admission-header">
            <div className="admission-header-content">
              <h1>Admission Enquiry</h1>
            </div>
          </header>

          <form className="enquiry-form">
            <div className="admission-grid">
              {/* Left Column */}
              <div className="admission-column">
                <div className="admission-field">
                  <label>Visiting Date <span className="admission-required">*</span></label>
                  <input type="date" />
                </div>

                <div className="admission-field">
                  <label>Admission Session <span className="admission-required">*</span></label>
                  <select defaultValue="2025-2026">
                    <option>2025-2026</option>
                    <option>2026-2027</option>
                    <option>2027-2028</option>
                  </select>
                </div>

                <div className="admission-field">
                  <label>Admission Class <span className="admission-required">*</span></label>
                  <select defaultValue="">
                    <option value="" disabled>Select Here</option>
                    <option>Nursery</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>

                <div className="admission-field">
                  <label>Student Name <span className="admission-required">*</span></label>
                  <input type="text" placeholder="Enter student name" />
                </div>

                <div className="admission-textarea-group">
                  <label>Address</label>
                  <div className="admission-textarea-wrapper">
                    <textarea
                      rows="4"
                      maxLength={maxChars}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter full address..."
                    />
                    <span className={`admission-char-counter ${remaining <= 20 ? 'warning' : ''}`}>
                      {remaining} characters remaining
                    </span>
                  </div>
                </div>

                <div className="admission-field">
                  <label>How you know about us ? <span className="admission-required">*</span></label>
                  <div className="admission-radio-group">
                    <label><input type="radio" name="source" /> Advertisement</label>
                    <label><input type="radio" name="source" /> Online</label>
                    <label><input type="radio" name="source" /> Reference</label>
                    <label><input type="radio" name="source" defaultChecked /> Other</label>
                  </div>
                </div>

                <div className="admission-field">
                  <label>Remark</label>
                  <textarea rows="4" placeholder="Any additional information..."></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="admission-column">
                <div className="admission-field">
                  <label>Father's Name <span className="admission-required">*</span></label>
                  <input type="text" placeholder="Enter father's name" />
                </div>

                <div className="admission-field">
                  <label>Mother's Name</label>
                  <input type="text" placeholder="Enter mother's name" />
                </div>

                <div className="admission-field">
                  <label>Gender</label>
                  <div className="admission-radio-group">
                    <label><input type="radio" name="gender" defaultChecked /> Male</label>
                    <label><input type="radio" name="gender" /> Female</label>
                  </div>
                </div>

                <div className="admission-field">
                  <label>DOB <span className="admission-required">*</span></label>
                  <input type="date" />
                </div>

                <div className="admission-field">
                  <label>Father's Mob No. <span className="admission-required">*</span></label>
                  <input type="tel" />
                </div>

                <div className="admission-field">
                  <label>Mother's Mob No.</label>
                  <input type="tel" />
                </div>

                <div className="admission-field">
                  <label>E-mail</label>
                  <input type="email" placeholder="example@domain.com" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="admission-submit-wrapper">
              <button type="submit" className="admission-submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionEnquiry;