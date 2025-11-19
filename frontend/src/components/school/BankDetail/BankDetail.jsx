import React from 'react';
import './BankDetail.css';

const BankDetail = () => {
  return (
    <main className="school-main-content4">
    <div className="bank-details-container">
      <h2 className="form-title">Bank Details</h2>
      <form className="bank-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              placeholder="Enter Bank Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountHolder">Bank Account Holder Name</label>
            <input
              type="text"
              id="accountHolder"
              placeholder="Enter Account Holder Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="branchName">Branch Name</label>
            <input
              type="text"
              id="branchName"
              placeholder="Enter Branch Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountNumber">Bank Account Number</label>
            <input
              type="text"
              id="accountNumber"
              placeholder="Enter Account Number"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="ifscCode">IFSC Code</label>
            <input
              type="text"
              id="ifscCode"
              placeholder="Enter IFSC Code"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="reset" className="reset-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
    </main>
  );
};

export default BankDetail;