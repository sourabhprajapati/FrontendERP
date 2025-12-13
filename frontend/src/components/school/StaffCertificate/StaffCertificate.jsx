// StaffCertificate.jsx - DEPARTMENT-ONLY Filtering (Classes renamed with 121 suffix)
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import './StaffCertificate.css'; // Make sure this imports the version with 121 classes
import { GrCertificate } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";


const formatDateDDMMMYYYY = (date = new Date()) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = date.toLocaleString('en-GB', { month: 'short' });
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};


const StaffCertificate = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    Role: 'All',
    certificate: 'Experience Certificate'
  });
  const [showResults, setShowResults] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [printView, setPrintView] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  const [staffs] = useState([
    {
      id: 1,
      STAFFNAME: 'AKASH',
      DEPARTMENT: 'Teacher',
      DESIGNATION: 'Teacher',
      FATHERNAME: 'Ramveer',
      DOB: '03-04-1985',
      GENDER: 'Male',
      CATEGORY: '',
      MOBILENO: '8789448465',
      status: 'Issued By : Demo User On : 29-04-2025 06:21 PM'
    },
    {
      id: 2,
      STAFFNAME: 'Jay',
      DEPARTMENT: 'Admin',
      DESIGNATION: 'Principle',
      FATHERNAME: 'Jacob',
      DOB: '03-04-1987',
      GENDER: 'Male',
      CATEGORY: '',
      MOBILENO: '8789448467',
      status: 'Issued By : Demo User'
    },
    {
      id: 3,
      STAFFNAME: 'Bob',
      DEPARTMENT: 'Teacher',
      DESIGNATION: 'HOD',
      FATHERNAME: 'Ramveer',
      DOB: '03-04-1985',
      GENDER: 'Male',
      CATEGORY: '',
      MOBILENO: '8789448465',
      status: 'Issued By : Demo User'
    }
  ]);


  // ✅ STEP 1: DEPARTMENT-ONLY Filter (CHANGED)
  const roleFilteredStaffs = useMemo(() => {
    if (searchCriteria.Role === 'All') return staffs;
   
    // DEPARTMENT-ONLY exact match
    return staffs.filter(staff =>
      staff.DEPARTMENT === searchCriteria.Role
    );
  }, [searchCriteria.Role, staffs]);


  // STEP 2: Sorting
  const sortedStaffs = useMemo(() => {
    if (!sortConfig.key) return roleFilteredStaffs;
    return [...roleFilteredStaffs].sort((a, b) => {
      const aVal = (a[sortConfig.key] ?? '').toString().toLowerCase();
      const bVal = (b[sortConfig.key] ?? '').toString().toLowerCase();
      if (aVal === bVal) return 0;
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [roleFilteredStaffs, sortConfig]);


  // STEP 3: Search Filter
  const filteredStaffs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sortedStaffs;
    return sortedStaffs.filter(s =>
      Object.values(s).join(' ').toLowerCase().includes(term)
    );
  }, [sortedStaffs, searchTerm]);


  // STEP 4: Pagination
  const totalPages = Math.max(1, Math.ceil(filteredStaffs.length / pageSize));
  const paginatedStaffs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStaffs.slice(start, start + pageSize);
  }, [filteredStaffs, currentPage]);


  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);


  // Auto-reset when role changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
    setSelectedStaffs([]);
    setShowResults(false);
  }, [searchCriteria.Role]);


  const handleSearch = useCallback(() => {
    setShowResults(true);
    setCurrentPage(1);
  }, []);


  const handleSort = useCallback((key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  }, []);


  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      const visibleIds = paginatedStaffs.map(s => s.id);
      const combined = Array.from(new Set([...selectedStaffs, ...visibleIds]));
      setSelectedStaffs(combined);
    } else {
      const visibleIds = new Set(paginatedStaffs.map(s => s.id));
      setSelectedStaffs(selectedStaffs.filter(id => !visibleIds.has(id)));
    }
  }, [paginatedStaffs, selectedStaffs]);


  const handleSelectStaff = useCallback((id) => {
    setSelectedStaffs(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);


  const handleGenerate = useCallback(() => {
    if (selectedStaffs.length === 0) {
      alert('Please select at least one staff to generate certificate.');
      return;
    }
    const selectedStaffData = selectedStaffs
      .map(id => staffs.find(s => s.id === id))
      .filter(Boolean);
    setPrintView({
      staffs: selectedStaffData,
      type: searchCriteria.certificate
    });
  }, [selectedStaffs, staffs, searchCriteria.certificate]);


  const handleViewCertificate = useCallback((staff) => {
    setPrintView({
      staffs: [staff],
      type: searchCriteria.certificate
    });
  }, [searchCriteria.certificate]);


  const closePrintView = useCallback(() => {
    setPrintView(null);
    setSelectedStaffs([]);
  }, []);


  // Certificate render functions (updated class names)
  const renderExperienceCertificate = useCallback((staff, certNumber) => (
    <div className="certificate-print121 experience-certificate">
      <div className="batch-cert-number121">Certificate {certNumber} of {printView?.staffs.length || 1}</div>
      <div className="print-header121">
        <button className="close-print121" onClick={closePrintView} aria-label="Close">✕</button>
        <div className="print-actions121">
          <button className="print-btn121" onClick={() => window.print()}>
            Print ({printView?.staffs.length || 1} certificates)
          </button>
          <button className="cancel-btn121" onClick={closePrintView}>Cancel</button>
        </div>
      </div>
      <div className="certificate-content121 experience-certificate">
        <div className="cert-header121">
          <div className="logo-section121">
            <div className="logo-placeholder121">🏫</div>
          </div>
          <div className="school-info121">
            <h1>MITTSURE - Mittsure Technology LLP</h1>
            <p>19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005</p>
            <p>AFFILIATION NO. : 1638 PU23000313</p>
          </div>
        </div>
       
        <div className="experience-header">
          <h2 className="experience-title">EXPERIENCE CERTIFICATE</h2>
          <div className="staff-details">
            <div><strong>Staff ID:</strong> {staff.id}</div>
            <div><strong>Name:</strong> {staff.STAFFNAME}</div>
          </div>
        </div>


        <div className="experience-content121">
          <p>This is to certify that <span className="bold-text121">{staff.STAFFNAME}</span>, S/o <span className="bold-text121">{staff.FATHERNAME}</span> has been working in our organization as <span className="bold-text121">{staff.DESIGNATION}</span> in <span className="bold-text121">{staff.DEPARTMENT}</span> Department from <span className="bold-text121">01-04-2020</span> to <span className="bold-text121">{formatDateDDMMMYYYY()}</span>.</p>
          <p>During his/her tenure, {staff.STAFFNAME} has demonstrated excellent professional conduct, dedication, and commitment towards their duties and responsibilities.</p>
          <p>We wish {staff.STAFFNAME} all the best for future endeavors.</p>
        </div>


        <div className="experience-footer">
          <div className="footer-item">
            <div className="footer-label">Date: {formatDateDDMMMYYYY()}</div>
          </div>
          <div className="footer-item">
            <div className="footer-label">Authorized Signatory</div>
          </div>
          <div className="footer-item">
            <div className="footer-label">Principal</div>
          </div>
        </div>
      </div>
    </div>
  ), [printView?.staffs.length, closePrintView]);


  const renderJoiningLetter = useCallback((staff, certNumber) => (
    <div className="certificate-print121 joining-certificate">
      <div className="batch-cert-number121">Certificate {certNumber} of {printView?.staffs.length || 1}</div>
      <div className="print-header121">
        <button className="close-print121" onClick={closePrintView} aria-label="Close">✕</button>
        <div className="print-actions121">
          <button className="print-btn121" onClick={() => window.print()}>
            Print ({printView?.staffs.length || 1} certificates)
          </button>
          <button className="cancel-btn121" onClick={closePrintView}>Cancel</button>
        </div>
      </div>
      <div className="certificate-content121 joining-certificate">
        <div className="cert-header121">
          <div className="logo-section121">
            <div className="logo-placeholder121">🏫</div>
          </div>
          <div className="school-info121">
            <h1>MITTSURE - Mittsure Technology LLP</h1>
            <p>19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005</p>
            <p>AFFILIATION NO. : 1638 PU23000313</p>
          </div>
        </div>
       
        <div className="joining-header">
          <h2 className="joining-title">JOINING LETTER</h2>
          <div className="staff-details">
            <div><strong>Ref No:</strong> MITTSURE/JL/{staff.id}/2025</div>
            <div><strong>Date:</strong> {formatDateDDMMMYYYY()}</div>
          </div>
        </div>


        <div className="joining-content">
          <p>Dear <span className="bold-text121">{staff.STAFFNAME}</span>,</p>
          <p>We are pleased to inform you that you have been selected for the position of <span className="bold-text121">{staff.DESIGNATION}</span> in <span className="bold-text121">{staff.DEPARTMENT}</span> Department at MITTSURE, Jaipur.</p>
          <p>Your joining date will be <span className="bold-text121">15-04-2025</span>. Please report to the Principal's office with all original documents and certificates.</p>
          <p>We welcome you to our organization and look forward to your valuable contribution.</p>
        </div>


        <div className="joining-footer">
          <div className="footer-item">
            <div className="footer-label">Regards MITTSURE TECHNOLOGY </div>
          </div>
          <div className="footer-item">
            <div className="footer-label">Authorized Signatory</div>
          </div>
          <div className="footer-item">
            <div className="footer-label">Principal</div>
          </div>
        </div>
      </div>
    </div>
  ), [printView?.staffs.length, closePrintView]);


  if (printView) {
    return (
      <div className="print-container121">
        <div className="certificates-batch121">
          {printView.staffs.map((staff, index) => (
            <div key={`${printView.type}-${staff.id}`} className="certificate-page121">
              {printView.type === 'Experience Certificate'
                ? renderExperienceCertificate(staff, index + 1)
                : renderJoiningLetter(staff, index + 1)
              }
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="certificate-container121">
      <div className="page-header121">
        <div className="header-icon121"><GrCertificate /></div>
        <h1>Staff Certificate</h1>
      </div>


      <div className="search-section121">
        <div className="section-header121">
          <span className="search-icon121"><IoSearch /></span>
          <h2>Select Criteria</h2>
        </div>


        <div className="criteria-fields121">
          <div className="field-group121">
            <label>Department <span className="required121">*</span></label>
            <select
              value={searchCriteria.Role}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, Role: e.target.value })}
            >
              <option value="All">All Departments</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Security">Security</option>
            </select>
          </div>


          <div className="field-group121">
            <label>Certificate <span className="required121">*</span></label>
            <select
              value={searchCriteria.certificate}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, certificate: e.target.value })}
            >
              <option value="Experience Certificate">Experience Certificate</option>
              <option value="Joining Letter">Joining Letter</option>
            </select>
          </div>
        </div>


        <div className="search-button-container121">
          <button className="search-button121" onClick={handleSearch}>
            <IoSearch /> Search
          </button>
        </div>
      </div>


      {showResults && (
        <div className="results-section121">
          <div className="results-header121">
            <div className="results-title121">
              <span className="list-icon121"><LiaCertificateSolid size="1.4em" /></span>
              <h2>Staff Certificate List
                <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>
                  ({roleFilteredStaffs.length} found in {searchCriteria.Role} dept)
                </span>
              </h2>
            </div>
            <button
              className="generate-button121"
              onClick={handleGenerate}
              disabled={selectedStaffs.length === 0}
            >
              Generate ({selectedStaffs.length})
            </button>
          </div>


          <div className="table-controls121">
            <div className="center-controls121">
              <div>Rows per page: <strong>10</strong> | Page {currentPage} of {totalPages}</div>
            </div>
            <div className="right-controls121">
              <label>Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="search-input121"
                placeholder="Search within selected department..."
              />
            </div>
          </div>


          <div className="table-wrapper121">
            <table className="staffs-table121" role="table" aria-label="Staffs">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={paginatedStaffs.length > 0 && paginatedStaffs.every(s => selectedStaffs.includes(s.id))}
                      aria-label="Select all visible"
                    />
                  </th>
                  <th onClick={() => handleSort('STAFFNAME')}>
                    STAFF NAME
                    <span className="sort-icons121">{sortConfig.key === 'STAFFNAME' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('DEPARTMENT')}>
                    DEPARTMENT
                    <span className="sort-icons121">{sortConfig.key === 'DEPARTMENT' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('DESIGNATION')}>
                    DESIGNATION
                    <span className="sort-icons121">{sortConfig.key === 'DESIGNATION' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('FATHERNAME')}>
                    FATHER NAME
                    <span className="sort-icons121">{sortConfig.key === 'FATHERNAME' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('DOB')}>
                    DATE OF BIRTH
                    <span className="sort-icons121">{sortConfig.key === 'DOB' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('GENDER')}>
                    GENDER
                    <span className="sort-icons121">{sortConfig.key === 'GENDER' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('CATEGORY')}>
                    CATEGORY
                    <span className="sort-icons121">{sortConfig.key === 'CATEGORY' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('MOBILENO')}>
                    MOBILE NUMBER
                    <span className="sort-icons121">{sortConfig.key === 'MOBILENO' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('status')}>
                    STATUS
                    <span className="sort-icons121">{sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStaffs.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={{ padding: '18px', textAlign: 'center', color: '#666' }}>
                      No records found for "{searchCriteria.Role}" department
                    </td>
                  </tr>
                ) : (
                  paginatedStaffs.map(staff => (
                    <tr key={staff.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStaffs.includes(staff.id)}
                          onChange={() => handleSelectStaff(staff.id)}
                          aria-label={`Select ${staff.STAFFNAME}`}
                        />
                      </td>
                      <td className="staff-name121">{staff.STAFFNAME}</td>
                      <td>{staff.DEPARTMENT}</td>
                      <td>{staff.DESIGNATION}</td>
                      <td>{staff.FATHERNAME || '—'}</td>
                      <td>{staff.DOB}</td>
                      <td>{staff.GENDER}</td>
                      <td>{staff.CATEGORY || '—'}</td>
                      <td>{staff.MOBILENO || '—'}</td>
                      <td className="status-cell121">{staff.status}</td>
                      <td>
                        <button
                          className="view-button121"
                          onClick={() => handleViewCertificate(staff)}
                          title="View certificate"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>


          <div className="pagination121" role="navigation" aria-label="Pagination">
            <button
              className="page-btn121"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  className={`page-btn121 ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="page-btn121"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default StaffCertificate;