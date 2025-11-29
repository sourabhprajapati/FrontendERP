import React, { useState } from 'react';
import './ConcessionsForm.css';
import { toast } from 'sonner';

const ConcessionsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    classGrade: '',
    parentName: '',
    reason: '',
    siblings: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.classGrade || !formData.parentName || 
        !formData.reason || !formData.siblings || !formData.amount) {
      toast.error('Please fill in all fields');
      return;
    }

    console.log('Form submitted:', formData);
    toast.success('Concession application submitted successfully!');
    
    setFormData({
      name: '',
      classGrade: '',
      parentName: '',
      reason: '',
      siblings: '',
      amount: ''
    });
  };

  return (
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
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
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
              step="0.01"
              required
            />
          </div>
     <div className="concession-submit-wrapper">
          <button type="submit" className="concession-submit-btn">
            Submit Application
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConcessionsForm;