// RegistrationExcelUpload.jsx
import React, { useState } from 'react';
import './RegistrationExcelUpload.css';
import * as XLSX from 'xlsx';

const API_URL = 'http://localhost:5000'; // ← Change to your real backend URL in production

const RegistrationExcelUpload = () => {
  const [registrationType, setRegistrationType] = useState('all');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // success / error

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setMessage({ text: '', type: '' });
  };

  const clearFile = () => {
    setSelectedFile(null);
    setMessage({ text: '', type: '' });
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 6000);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showMessage('Please select a file first!', 'error');
      return;
    }

    if (registrationType === 'classwise' && (!selectedClass || !selectedSection)) {
      showMessage('Please select both Class and Section for Class Wise registration!', 'error');
      return;
    }

    setIsUploading(true);
    setMessage({ text: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('excelFile', selectedFile);
      formData.append('registrationFor', registrationType);
      
      if (registrationType === 'classwise') {
        formData.append('className', selectedClass);
        formData.append('section', selectedSection);
      }

      const response = await fetch(`${API_URL}/api/registration/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.errors?.join(' • ') || 'Upload failed');
      }

      showMessage(`Success! ${result.count || result.validCount} student(s) processed.`, 'success');
      
      // Optional: reset form after success
      // setSelectedFile(null);
      // setSelectedClass('');
      // setSelectedSection('');

    } catch (error) {
      showMessage(error.message || 'Something went wrong during upload', 'error');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleExcel = () => {
    const wb = XLSX.utils.book_new();

    const data = [
      // Instruction row
      ["***** Dear User, if you are copy/pasting your data from another Excel then kindly keep in mind that dates format should be in dd-MM-yyyy OR in dd/MM/yyyy format.\n\nIn case your data is in MM-dd-yyyy OR in MM/dd/yyyy format OR in any other format in existing Excel then kindly change cell type of that particular column as dd-MM-yyyy to avoid any deformation in dates format then you can copy paste your data from existing Excel to new one."],
      // Section titles
      ["ADMISSION DETAILS", "", "", "", "", "", "", "", "", "BASIC DETAILS", "PARENT DETAILS", "", "", ""],
      // Headers - must match backend validation exactly!
      [
        "Admission No./SR.No.*",
        "Admission Date*(dd-MM-yyyy)",
        "Student Name*(First Name+Last Name)",
        "Date Of Birth*(dd-MM-yyyy)",
        "Father's Mobile Number*(10 Digit only)",
        "Student Status  (Please Enter Only new / old)",
        "Samagra ID (for M.P.) / PPP (for Haryana) / PEN (for Delhi)*",
        "Child's Aadhaar No",
        "Current Address",
        "Gender (Please Enter Only Male / Female / Transgender)",
        "Father's Name",
        "Mother's Name",
        "Father's UID",
        "Mother's UID",
        "Mother's Mobile Number(10 Digit only)"
      ]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } },     // Instruction
      { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } },      // ADMISSION DETAILS
      { s: { r: 1, c: 9 }, e: { r: 1, c: 14 } }      // BASIC + PARENT DETAILS
    ];

    // Optional: make header row bold
    const headerRow = 2;
    for (let col = 0; col < 15; col++) {
      const cell = XLSX.utils.encode_cell({ r: headerRow, c: col });
      ws[cell] = { ...ws[cell], s: { font: { bold: true } } };
    }

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Sample_Registration_Sheet.xlsx");
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="title">Registration Excel Plugin</h2>

        {/* Message display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="form-group radio-group-container">
          <label className="required-label">
            Registration For <span className="required">*</span>
          </label>

          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="registrationFor"
                value="all"
                checked={registrationType === 'all'}
                onChange={() => {
                  setRegistrationType('all');
                  setMessage({ text: '', type: '' });
                }}
              />
              All Classes
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="registrationFor"
                value="classwise"
                checked={registrationType === 'classwise'}
                onChange={() => {
                  setRegistrationType('classwise');
                  setMessage({ text: '', type: '' });
                }}
              />
              Class Wise
            </label>
          </div>
        </div>

        {/* Class & Section - shown only in Class Wise mode */}
        {registrationType === 'classwise' && (
          <div className="class-section-group">
            <div className="select-row">
              <div className="select-wrapper">
                <label className="required-label">
                  Select Class <span className="required">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="custom-select"
                  disabled={isUploading}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="KG">KG</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div className="select-wrapper">
                <label className="required-label">
                  Select Section <span className="required">*</span>
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="custom-select"
                  disabled={isUploading}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="upload-section">
          <div className="file-input-wrapper">
            <label className="file-label required-label">
              Choose file to upload <span className="required">*</span>
            </label>

            <div className="file-buttons">
              <label className={`choose-btn ${isUploading ? 'disabled' : ''}`}>
                <span>+ Choose</span>
                <input
                  type="file"
                  className="hidden-file-input"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>

              <button
                className={`upload-btn ${isUploading ? 'loading' : ''}`}
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>

            {selectedFile && (
              <div className="selected-file-info">
                <span className="selected-file-name">
                  {selectedFile.name}
                </span>
                <button 
                  className="clear-file-btn" 
                  onClick={clearFile}
                  disabled={isUploading}
                  title="Remove file"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <button 
            className="sample-download-btn" 
            onClick={downloadSampleExcel}
            disabled={isUploading}
          >
            Download Sample Excel Sheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationExcelUpload;