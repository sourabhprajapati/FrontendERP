// AdmitCard.jsx - FULL WORKING CODE WITH PRINT PREVIEW FIX
import React, { useState, useRef } from 'react';
import './AdmitCard.css';
import { FaBook } from "react-icons/fa";
import { PiNotepadThin } from "react-icons/pi";
import { MdOutlineSearch } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import { AiOutlinePrinter } from "react-icons/ai";

const AdmitCard = () => {
  const [filters, setFilters] = useState({
    term: 'TERM -1',
    exam: 'PT1',
    class: '1st',
    section: 'A'
  });

  const [students, setStudents] = useState([
    { id: 1, admissionNo: '570', rollNo: '', name: 'Hend Moftah', father: 'Mo', dob: '15-03-2015', mobile: '9876543210', selected: true },
    { id: 2, admissionNo: '2322212005', rollNo: '1', name: 'TEST ATEST TEST', father: '', dob: '20-05-2014', mobile: '9876543211', selected: true },
    { id: 3, admissionNo: '2322211992', rollNo: '3', name: 'New Student', father: 'Test', dob: '03-04-2025', mobile: '1234567890', selected: false },
    { id: 4, admissionNo: '2322211993', rollNo: '4', name: 'John Doe', father: 'Robert Doe', dob: '12-06-2014', mobile: '9988776655', selected: false },
    { id: 5, admissionNo: '2322211994', rollNo: '5', name: 'Jane Smith', father: 'Michael Smith', dob: '25-08-2015', mobile: '8877665544', selected: false },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef(); // FIXED: Print ref for targeted printing

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
    
    const sorted = [...students].sort((a, b) => {
      const aVal = (a[key] || '').toString().toLowerCase();
      const bVal = (b[key] || '').toString().toLowerCase();
      return aVal < bVal ? (direction === 'asc' ? -1 : 1) : 
             aVal > bVal ? (direction === 'asc' ? 1 : -1) : 0;
    });
    setStudents(sorted);
  };

  const handleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setStudents(students.map(s => ({ ...s, selected: newVal })));
  };

  const handleSelectStudent = (id) => {
    const updated = students.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    );
    setStudents(updated);
    setSelectAll(updated.every(s => s.selected));
  };

  const handleGenerate = () => {
    const selected = students.filter(s => s.selected);
    if (selected.length === 0) {
      alert('Please select at least one student');
      return;
    }
    setShowPrintModal(true);
  };

 const handlePrint = () => {
  setShowPrintModal(false);
  setTimeout(() => {
    window.print();
  }, 300);
};

  const handleCloseModal = () => {
    setShowPrintModal(false);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.admissionNo.includes(searchTerm) || 
    (s.father || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudents = students.filter(s => s.selected);
  const selectedCount = selectedStudents.length;

  const AdmitCardTemplate = ({ student }) => (
    <div className="ac-admit-card-print">
      <div className="ac-admit-card-border">
        {/* School Header */}
        <div className="ac-admit-card-header">
          <div className="ac-school-logo">
            <div className="ac-logo-box">NLET</div>
            <div className="ac-logo-text">
              NLET INSTITUTE<br/>
              MANAGEMENT SOFTWARE
            </div>
          </div>
          <div className="ac-school-info">
            <h2>B121- ASHOK MARG, BAPU NAGAR - 302029</h2>
            <p>Email - MITTSURE@CARD.in | Phone - 8058848888</p>
            <p>AFFILIATION NO. : 1538</p>
          </div>
        </div>

        {/* Examination Title */}
        <div className="ac-examination-title">
          <h3>Examination Admit Card</h3>
          <p>Session - 2025-26</p>
          <h4>{filters.exam} - {filters.term}</h4>
        </div>

        {/* Student Details Table */}
        <div className="ac-student-details-container">
          <table className="ac-details-table">
            <tr>
              <td className="ac-detail-label">Admission No :</td>
              <td className="ac-detail-value">{student.admissionNo}</td>
              <td className="ac-detail-label">Roll No :</td>
              <td className="ac-detail-value">{student.rollNo || '—'}</td>
              <td className="ac-photo-cell">
                <div className="ac-photo-placeholder">
                  <div className="ac-no-image-icon">👤</div>
                  <p>NO IMAGE</p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="ac-detail-label">Student's Name :</td>
              <td className="ac-detail-value">{student.name}</td>
              <td className="ac-detail-label">D.O.B :</td>
              <td className="ac-detail-value">{student.dob}</td>
              <td></td>
            </tr>
            <tr>
              <td className="ac-detail-label">Father's Name :</td>
              <td className="ac-detail-value">{student.father || '—'}</td>
              <td className="ac-detail-label">Mobile No :</td>
              <td className="ac-detail-value">{student.mobile}</td>
              <td></td>
            </tr>
            <tr>
              <td className="ac-detail-label">Class - Section :</td>
              <td className="ac-detail-value">{filters.class} - {filters.section}</td>
              <td colSpan="3"></td>
            </tr>
          </table>
        </div>

        {/* Exam Schedule */}
        <div className="ac-exam-schedule">
          <table className="ac-schedule-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Subject</th>
                <th>Invigilator's Sign</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="ac-no-data">No Data Found!</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="ac-signature-section">
          <table className="ac-signature-table">
            <tr>
              <td className="ac-signature-cell">
                <div className="ac-signature-area">
                  <span className="ac-signature-img">________________</span>
                </div>
                <div className="ac-signature-label">Class Teacher's Signature</div>
              </td>
              <td className="ac-signature-cell">
                <div className="ac-signature-area">
                  <span className="ac-signature-img">________________</span>
                </div>
                <div className="ac-signature-label">Principal's Signature</div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="ac-note-cell">
                Note: (Current_balance)
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Screen UI - Hidden during print */}
      <div className="ac-container ac-no-print">
        {/* Header */}
        <div className="ac-header">
          <div className="ac-logo-title">
            <FaBook className="ac-icon" />
            <h1>Admit Card</h1>
          </div>
          <div className="ac-breadcrumb">
            <span>Exams</span>
            <span className="ac-separator">/</span>
            <span className="ac-exam-link">Admit Card</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="ac-criteria-section">
          <h3>Filter Criteria</h3>
          <div className="ac-filter-row">
            <div className="ac-filter-group">
              <label>Term <span className="ac-required">*</span></label>
              <select value={filters.term} onChange={(e) => handleFilterChange('term', e.target.value)}>
                <option>TERM -1</option>
                <option>TERM -2</option>
              </select>
            </div>
            <div className="ac-filter-group">
              <label>Exam <span className="ac-required">*</span></label>
              <select value={filters.exam} onChange={(e) => handleFilterChange('exam', e.target.value)}>
                <option>PT1</option>
                <option>PT2</option>
              </select>
            </div>
            <div className="ac-filter-group">
              <label>Class <span className="ac-required">*</span></label>
              <select value={filters.class} onChange={(e) => handleFilterChange('class', e.target.value)}>
                <option>1st</option>
                <option>2nd</option>
              </select>
            </div>
            <div className="ac-filter-group">
              <label>Section <span className="ac-required">*</span></label>
              <select value={filters.section} onChange={(e) => handleFilterChange('section', e.target.value)}>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
          </div>
          <div className="ac-search-btn-container">
            <button className="ac-search-btn">Search</button>
          </div>
        </div>

        {/* Students List */}
        <div className="ac-list-section">
          <div className="ac-list-header">
            <h3>Students List</h3>
            <div className="ac-list-controls">
              <button className="ac-generate-btn" onClick={handleGenerate}>
                Generate Admit Cards
              </button>
            </div>
          </div>

          <div className="ac-toolbar">
            <div className="ac-toolbar-buttons">
              <button className="ac-tool-btn">Excel</button>
              <button className="ac-tool-btn ac-dropdown">PDF</button>
            </div>
            <div className="ac-show-entries">
              <label>Show</label>
              <select>
                <option>10</option>
                <option>25</option>
              </select>
              <label>entries</label>
            </div>
            <div className="ac-search-box">
              <label>Search:</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students..."
              />
            </div>
          </div>

          <table className="ac-student-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th onClick={() => handleSort('admissionNo')}>ADMISSION NO. <span className="ac-sort-icon">↑↓</span></th>
                <th onClick={() => handleSort('rollNo')}>ROLL NUMBER <span className="ac-sort-icon">↑↓</span></th>
                <th onClick={() => handleSort('name')}>STUDENT <span className="ac-sort-icon">↑↓</span></th>
                <th onClick={() => handleSort('father')}>FATHER <span className="ac-sort-icon">↑↓</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className={student.selected ? 'ac-selected-row' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={student.selected}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td>{student.admissionNo}</td>
                    <td>{student.rollNo || '-'}</td>
                    <td className="ac-student-name">{student.name}</td>
                    <td>{student.father || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredStudents.length > 0 && (
            <div className="ac-table-info">
              Showing {filteredStudents.length} entries
            </div>
          )}
        </div>
      </div>

      {/* FIXED: Print Confirmation Modal */}
      {showPrintModal && (
        <div className="ac-modal-overlay">
          <div className="ac-modal-content">
            <div className="ac-modal-header">
              <h2>Confirm Print</h2>
              <button className="ac-close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="ac-modal-body">
              <p>Ready to print <strong>{selectedCount}</strong> admit card(s):</p>
              <ul className="ac-student-list">
                {selectedStudents.slice(0, 5).map(student => (
                  <li key={student.id}>
                    {student.name} ({student.admissionNo})
                  </li>
                ))}
                {selectedCount > 5 && <li>...</li>}
              </ul>
            </div>
            <div className="ac-modal-actions">
              <button className="ac-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="ac-print-btn" onClick={handlePrint}>
                <AiOutlinePrinter style={{ marginRight: 8 }} />
                Print Admit Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIXED: PRINT SECTION - Always rendered, positioned off-screen */}
      <div ref={printRef} className="ac-print-section">
        {selectedStudents.map((student, index) => (
          <AdmitCardTemplate key={student.id + index} student={student} />
        ))}
      </div>
    </>
  );
};

export default AdmitCard;
