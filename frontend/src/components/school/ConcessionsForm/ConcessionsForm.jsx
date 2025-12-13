// src/components/ConcessionsForm.jsx
import React, { useState } from 'react';
import './ConcessionsForm.css';

const ConcessionsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    classGrade: '',
    parentName: '',
    reason: '',
    siblings: '',
    amount: ''
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
      const res = await fetch('http://localhost:5000/api/concessions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          classGrade: formData.classGrade,
          parentName: formData.parentName.trim(),
          reason: formData.reason.trim(),
          siblings: formData.siblings.trim(),
          amount: Number(formData.amount)
        })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '', classGrade: '', parentName: '',
          reason: '', siblings: '', amount: ''
        });
        setTimeout(() => setSuccess(false), 7000);
      } else {
        alert('Error: ' + (data.message || 'Submission failed'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-Screen Success Overlay - Same Style as Your Other Forms */}
      {success && (
        <div className="concession-success-overlay">
          <div className="concession-success-card">
            <h2>Application Received!</h2>
            <div className="concession-success-line"></div>
            <p>
              Thank you, <strong>{formData.name}</strong>!<br />
              Your fee concession request has been submitted successfully.<br />
              We will review it and get back to you soon.
            </p>
          </div>
        </div>
      )}

      <div className="concession-page">
        <div className="concession-wrapper">
          <h1 className="concession-title">Concession Form</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="concession-field">
              <label className="concession-label" htmlFor="name">
                Student Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="concession-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                required
              />
            </div>

            <div className="concession-field">
              <label className="concession-label" htmlFor="classGrade">
                Class / Grade *
              </label>
              <select
                id="classGrade"
                name="classGrade"
                className="concession-select"
                value={formData.classGrade}
                onChange={handleChange}
                required
              >
                <option value="">Select Class/Grade</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>

            <div className="concession-field">
              <label className="concession-label" htmlFor="parentName">
                Parent Name *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                className="concession-input"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent's full name"
                required
              />
            </div>

            <div className="concession-field">
              <label className="concession-label" htmlFor="reason">
                Reason for Concession *
              </label>
              <textarea
                id="reason"
                name="reason"
                className="concession-textarea"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please provide detailed reason for requesting concession"
                required
              />
            </div>

            <div className="concession-field">
              <label className="concession-label" htmlFor="siblings">
                About Siblings *
              </label>
              <textarea
                id="siblings"
                name="siblings"
                className="concession-textarea"
                value={formData.siblings}
                onChange={handleChange}
                placeholder="Provide information about siblings (number, grades, etc.)"
                required
              />
            </div>

            <div className="concession-field">
              <label className="concession-label" htmlFor="amount">
                Concession Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="concession-input"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter requested concession amount"
                min="0"
                required
              />
            </div>

            <div className="concession-submit-wrapper">
              <button 
                type="submit" 
                className="concession-submit-btn"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConcessionsForm;