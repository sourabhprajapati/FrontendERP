// frontend/components/BankDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BankDetail.css';

const BankDetail = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountHolderName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/school/bank-details');
        if (res.data.success && res.data.data) {
          setFormData(res.data.data);
        }
      } catch (err) {
        console.log('No bank details found yet');
      }
    };
    fetchBankDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await axios.post('http://localhost:5000/api/school/bank-details', formData);
      setMessage({ text: res.data.message, type: 'success' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to save bank details',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      bankName: '',
      accountHolderName: '',
      branchName: '',
      accountNumber: '',
      ifscCode: ''
    });
    setMessage({ text: '', type: '' });
  };

  return (
    <main className="school-main-content4">
      <div className="bank-details-container">
        <h2 className="form-title">Bank Details</h2>

        {message.text && (
          <div
            className={message.type === 'success' ? 'alert-success' : 'alert-danger'}
            style={{
              padding: '12px',
              margin: '15px 0',
              borderRadius: '6px',
              textAlign: 'center',
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24'
            }}
          >
            {message.text}
          </div>
        )}

        <form className="bank-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="bankName">Bank Name *</label>
              <input
                type="text"
                id="bankName"
                value={formData.bankName || ''}
                onChange={handleChange}
                placeholder="e.g. State Bank of India"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountHolderName">Account Holder Name *</label>
              <input
                type="text"
                id="accountHolderName"
                value={formData.accountHolderName || ''}
                onChange={handleChange}
                placeholder="As per bank passbook"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchName">Branch Name</label>
              <input
                type="text"
                id="branchName"
                value={formData.branchName || ''}
                onChange={handleChange}
                placeholder="e.g. Civil Lines Branch"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number *</label>
              <input
                type="text"
                id="accountNumber"
                value={formData.accountNumber || ''}
                onChange={handleChange}
                placeholder="Enter account number"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="ifscCode">IFSC Code *</label>
              <input
                type="text"
                id="ifscCode"
                value={formData.ifscCode || ''}
                onChange={handleChange}
                placeholder="e.g. SBIN0001234"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Bank Details'}
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BankDetail;