import React, { useState } from 'react';
import './AdmissionEnquiry.css';

function AdmissionEnquiry() {
  const [formData, setFormData] = useState({
    visitingDate: '',
    session: '2025-2026',
    admissionClass: '',
    studentName: '',
    address: '',
    source: 'Other',
    remark: '',
    fatherName: '',
    motherName: '',
    gender: 'Male',
    dob: '',
    fatherMobile: '',
    motherMobile: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/admission/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          visitingDate: '', session: '2025-2026', admissionClass: '', studentName: '',
          address: '', source: 'Other', remark: '', fatherName: '', motherName: '',
          gender: 'Male', dob: '', fatherMobile: '', motherMobile: '', email: ''
        });
        setTimeout(() => setSuccess(false), 7000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-page">

      {/* Beautiful Success Message - Same Style as "Add Visitors" */}
      {success && (
        <div className="admission-success-overlay">
          <div className="admission-success-card">
            <h2>Thank You!</h2>
            <div className="admission-success-line"></div>
            <p>Your admission enquiry has been submitted successfully.<br />
            We will contact you soon on <strong>{formData.fatherMobile || 'your mobile'}</strong>.</p>
          </div>
        </div>
      )}

      <div className="admission-form-wrapper">
        <div className="admission-form-card">
          <header className="admission-header">
            <div className="admission-header-content">
              <h1>Admission Enquiry</h1>
            </div>
          </header>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="admission-grid">
              {/* Left Column */}
              <div className="admission-column">
                <div className="admission-field">
                  <label>Visiting Date <span className="admission-required">*</span></label>
                  <input type="date" name="visitingDate" value={formData.visitingDate} onChange={handleChange} required />
                </div>

                <div className="admission-field">
                  <label>Admission Session <span className="admission-required">*</span></label>
                  <select name="session" value={formData.session} onChange={handleChange} required>
                    <option>2025-2026</option>
                    <option>2026-2027</option>
                    <option>2027-2028</option>
                  </select>
                </div>

                <div className="admission-field">
                  <label>Admission Class <span className="admission-required">*</span></label>
                  <select name="admissionClass" value={formData.admissionClass} onChange={handleChange} required>
                    <option value="" disabled>Select Class</option>
                    {['Nursery','LKG','UKG','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10'].map(cls => (
                      <option key={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div className="admission-field">
                  <label>Student Name <span className="admission-required">*</span></label>
                  <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Full name" required />
                </div>

                <div className="admission-textarea-group">
                  <label>Address</label>
                  <div className="admission-textarea-wrapper">
                    <textarea
                      name="address"
                      rows="4"
                      maxLength="200"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Full address..."
                    />
                    <span className={`admission-char-counter ${formData.address.length > 180 ? 'warning' : ''}`}>
                      {200 - formData.address.length} left
                    </span>
                  </div>
                </div>

                <div className="admission-field">
                  <label>How did you hear about us? <span className="admission-required">*</span></label>
                  <div className="admission-radio-group">
                    {['Advertisement', 'Online', 'Reference', 'Other'].map(item => (
                      <label key={item}>
                        <input
                          type="radio"
                          name="source"
                          value={item}
                          checked={formData.source === item}
                          onChange={handleChange}
                        /> {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="admission-field">
                  <label>Remark</label>
                  <textarea name="remark" rows="4" value={formData.remark} onChange={handleChange} placeholder="Any additional info..."></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="admission-column">
                <div className="admission-field">
                  <label>Father's Name <span className="admission-required">*</span></label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                </div>

                <div className="admission-field">
                  <label>Mother's Name</label>
                  <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
                </div>

                <div className="admission-field">
                  <label>Gender</label>
                  <div className="admission-radio-group">
                    <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
                    <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
                  </div>
                </div>

                <div className="admission-field">
                  <label>Date of Birth <span className="admission-required">*</span></label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>

                <div className="admission-field">
                  <label>Father's Mobile <span className="admission-required">*</span></label>
                  <input type="tel" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} required />
                </div>

                <div className="admission-field">
                  <label>Mother's Mobile</label>
                  <input type="tel" name="motherMobile" value={formData.motherMobile} onChange={handleChange} />
                </div>

                <div className="admission-field">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="admission-submit-wrapper">
              <button type="submit" className="admission-submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionEnquiry;