import React, { useMemo, useState, useCallback, useEffect } from 'react';
import './StudentCertificate.css'; // Ensure this imports the CSS version with 35 suffixes if needed
import { GrCertificate } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";

const formatDateDDMMMYYYY = (date = new Date()) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = date.toLocaleString('en-GB', { month: 'short' });
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const StudentCertificate = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    class: '1st',
    section: 'A',
    certificate: 'TC'
  });
  const [showResults, setShowResults] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [printView, setPrintView] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [students] = useState([
    {
      id: 1,
      admissionNo: '2322211992',
      studentName: 'New Student',
      class: '1st(A)',
      fatherName: 'Test',
      dob: '03-04-2025',
      gender: 'Male',
      category: '',
      mobile: '',
      status: 'Issued By : Demo User On : 29-04-2025 06:21 PM'
    },
    {
      id: 2,
      admissionNo: '2322211993',
      studentName: 'Test',
      class: '1st(A)',
      fatherName: '',
      dob: '02-04-2025',
      gender: 'Male',
      category: '',
      mobile: '',
      status: 'Issued By : Demo User'
    },
    {
      id: 3,
      admissionNo: '2322211994',
      studentName: 'Test',
      class: '1st(A)',
      fatherName: '',
      dob: '03-04-2025',
      gender: 'Male',
      category: '',
      mobile: '',
      status: 'Issued By : Demo User'
    }
  ]);

  const sortedStudents = useMemo(() => {
    if (!sortConfig.key) return [...students];
    return [...students].sort((a, b) => {
      const aVal = (a[sortConfig.key] ?? '').toString().toLowerCase();
      const bVal = (b[sortConfig.key] ?? '').toString().toLowerCase();
      if (aVal === bVal) return 0;
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [students, sortConfig]);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sortedStudents;
    return sortedStudents.filter(s =>
      Object.values(s).join(' ').toLowerCase().includes(term)
    );
  }, [sortedStudents, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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
      const visibleIds = paginatedStudents.map(s => s.id);
      const combined = Array.from(new Set([...selectedStudents, ...visibleIds]));
      setSelectedStudents(combined);
    } else {
      const visibleIds = new Set(paginatedStudents.map(s => s.id));
      setSelectedStudents(selectedStudents.filter(id => !visibleIds.has(id)));
    }
  }, [paginatedStudents, selectedStudents]);

  const handleSelectStudent = useCallback((id) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleGenerate = useCallback(() => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student to generate certificate.');
      return;
    }
    const selectedStudentData = selectedStudents
      .map(id => students.find(s => s.id === id))
      .filter(Boolean);
    setPrintView({
      students: selectedStudentData,
      type: searchCriteria.certificate
    });
  }, [selectedStudents, students, searchCriteria.certificate]);

  const handleViewCertificate = useCallback((student) => {
    setPrintView({
      students: [student],
      type: searchCriteria.certificate
    });
  }, [searchCriteria.certificate]);

  const closePrintView = useCallback(() => {
    setPrintView(null);
    setSelectedStudents([]);
  }, []);

  const renderTransferCertificate = useCallback((student, certNumber) => (
    <div className="certificate-print35 tc-certificate35" key={`tc-${student.id}`}>
      <div className="batch-cert-number35" style={{ display: 'none' }}>
        Certificate {certNumber} of {printView?.students.length || 1}
      </div>
      <div className="print-header35">
        <button className="close-print35" onClick={closePrintView} aria-label="Close">✕</button>
        <div className="print-actions35">
          <button className="print-btn35" onClick={() => window.print()}>
            Print ({printView?.students.length || 1} certificates)
          </button>
          <button className="cancel-btn35" onClick={closePrintView}>Cancel</button>
        </div>
      </div>
      <div className="certificate-content35 tc-certificate35" role="document">
        <div className="cert-header35">
          <div className="logo-section35">
            <div className="logo-placeholder35">🏫</div>
          </div>
          <div className="school-info35">
            <h1>NLET - Institute Management Software</h1>
            <p>19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005</p>
            <p>AFFILIATION NO. : 1638 PU23000313</p>
          </div>
        </div>
        <div className="tc-header-row35">
          <div className="tc-no35">TC No. :</div>
          <div className="tc-title35">TRANSFER CERTIFICATE</div>
          <div className="admission-no35">Admission No. : {student.admissionNo}</div>
        </div>
        <div className="tc-content35">
          <div className="tc-line35">1. Name of Pupil : <span className="bold-text35">{student.studentName}</span></div>
          <div className="tc-line35">2. Fathers/Guardian's Name : <span className="bold-text35">{student.fatherName || '—'}</span></div>
          <div className="tc-line35">3. Mother's Name : <span className="bold-text35">—</span></div>
          <div className="tc-line35">4. Aadhar No. : <span className="bold-text35">—</span></div>
          <div className="tc-line35">5. Nationality : <span className="bold-text35">INDIAN</span></div>
          <div className="tc-line35">6. Date of first admission in the School : <span className="bold-text35">03-04-2025</span> | Class : <span className="bold-text35">{searchCriteria.class}</span></div>
          <div className="tc-line35">7. Caste : <span className="bold-text35">—</span></div>
          <div className="tc-line35">8. Date of Birth according to the Admission & Withdrawal Register : (In Figures) <span className="bold-text35">{student.dob}</span></div>
          <div className="tc-line35">(In Words) <span className="bold-text35">—</span></div>
          <div className="tc-line35">9. Class in which the pupil last studied : <span className="bold-text35">—</span></div>
          <div className="tc-line35">10. School Board Annual examination last taken with result : <span className="bold-text35">—</span></div>
          <div className="tc-line35">11. Whether failed, if so once/twice in the same class : <span className="bold-text35">—</span></div>
          <div className="tc-line35">12. Address : <span className="bold-text35">—</span></div>
          <div className="tc-line35">13. Subjects Studied : <span className="bold-text35">—</span></div>
          <div className="tc-line35">14. Whether qualified for promotion to the higher class : <span className="bold-text35">—</span></div>
          <div className="tc-line35">15. Month upto which the pupil has paid school dues : <span className="bold-text35">—</span> | Due Fees : <span className="bold-text35">0</span></div>
          <div className="tc-line35">16. Total No. of working days : <span className="bold-text35">—</span></div>
          <div className="tc-line35">17. Total No. of present days : <span className="bold-text35">—</span></div>
          <div className="tc-line35">18. Any fee concession availed : <span className="bold-text35">No</span></div>
          <div className="tc-line35">19. Whether NCC Cadet/Boy Scout/Girl Guide : <span className="bold-text35">—</span></div>
          <div className="tc-line35">20. Games played or extra-curricular activities : <span className="bold-text35">—</span></div>
          <div className="tc-line35">21. Date of Application : <span className="bold-text35">—</span></div>
          <div className="tc-line35">22. Date of issue of certificate : <span className="bold-text35">{formatDateDDMMMYYYY()}</span></div>
          <div className="tc-line35">23. Reasons for leaving the school : <span className="bold-text35">—</span></div>
          <div className="tc-line35">24. General conduct : <span className="bold-text35">—</span></div>
          <div className="tc-line35">25. Any other remarks : <span className="bold-text35">—</span></div>
        </div>
        <div className="signature-section35">
          <div className="signature-box35"><div className="sign-label35">Sign of Class Teacher</div></div>
          <div className="signature-box35"><div className="sign-label35">Checked by Office Incharge</div></div>
          <div className="signature-box35"><div className="sign-label35">Principal</div></div>
        </div>
      </div>
    </div>
  ), [searchCriteria.class, printView?.students.length, closePrintView]);

  const renderCharacterCertificate = useCallback((student, certNumber) => (
    <div className="certificate-print35 cc-certificate35" key={`cc-${student.id}`}>
      <div className="batch-cert-number35" style={{ display: 'none' }}>
        Certificate {certNumber} of {printView?.students.length || 1}
      </div>
      <div className="print-header35">
        <button className="close-print35" onClick={closePrintView} aria-label="Close">✕</button>
        <div className="print-actions35">
          <button className="print-btn35" onClick={() => window.print()}>
            Print ({printView?.students.length || 1} certificates)
          </button>
          <button className="cancel-btn35" onClick={closePrintView}>Cancel</button>
        </div>
      </div>
      <div className="certificate-content35 cc-certificate35" role="document">
        <div className="cc-border35">
          <div className="cert-header35">
            <div className="logo-section35">
              <div className="logo-placeholder35">🏫</div>
            </div>
            <div className="school-info35">
              <h1>NLET - Institute Management Software</h1>
              <p>19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005</p>
              <p>AFFILIATION NO. : 1638</p>
            </div>
          </div>
          <div className="cc-header-row35">
            <div className="cc-admission35">Admission No. : {student.admissionNo}</div>
            <div className="cc-title35">CHARACTER CERTIFICATE</div>
            <div className="cc-sno35">S. No. :</div>
          </div>
          <div className="cc-content35">
            <p className="cc-text35">
              This is to certify that Mr./Ms. <span className="bold-text35">{student.studentName}</span> S/D Mr. - <span className="bold-text35">{student.fatherName || '—'}</span> Admission No. - <span className="bold-text35">{student.admissionNo}</span> is a bonafide student of this school studying in Class - <span className="bold-text35">{searchCriteria.class}</span> Section - <span className="bold-text35">{searchCriteria.section}</span> Date of Birth - <span className="bold-text35">{student.dob}</span> For Session - <span className="bold-text35">2025-26</span>
            </p>
            <p className="cc-text35">He/She bears a good moral character & was never found taking part in activities subversive of the school discipline.</p>
            <p className="cc-text35">He/She took part in various extra-curricular activities in the school.</p>
            <p className="cc-text35">I wish him/her every success in Life.</p>
          </div>
          <div className="cc-footer35">
            <div className="footer-item35"><div className="footer-label35">Issue Date : {formatDateDDMMMYYYY()}</div></div>
            <div className="footer-item35"><div className="footer-label35">Checked by Office Incharge</div></div>
            <div className="footer-item35"><div className="footer-label35">Principal</div></div>
          </div>
        </div>
      </div>
    </div>
  ), [searchCriteria.class, searchCriteria.section, printView?.students.length, closePrintView]);

  if (printView) {
    return (
      <div className="print-container35">
        <div className="certificates-batch35">
          {printView.students.map((student, index) => (
            <div key={`${printView.type}-${student.id}`} className="certificate-page35">
              {printView.type === 'TC'
                ? renderTransferCertificate(student, index + 1)
                : renderCharacterCertificate(student, index + 1)
              }
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-container35">
      <div className="page-header35">
        <div className="header-icon35"><GrCertificate /></div>
        <h1>Certificate</h1>
      </div>

      <div className="search-section35">
        <div className="section-header35">
          <span className="search-icon35"><IoSearch /></span>
          <h2>Select Criteria</h2>
        </div>

        <div className="criteria-fields35">
          <div className="field-group35">
            <label>Class <span className="required35">*</span></label>
            <select
              value={searchCriteria.class}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, class: e.target.value })}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
            </select>
          </div>

          <div className="field-group35">
            <label>Section <span className="required35">*</span></label>
            <select
              value={searchCriteria.section}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, section: e.target.value })}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="field-group35">
            <label>Certificate <span className="required35">*</span></label>
            <select
              value={searchCriteria.certificate}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, certificate: e.target.value })}
            >
              <option value="TC">TC</option>
              <option value="CC">CC</option>
            </select>
          </div>
        </div>

        <div className="search-button-container35">
          <button className="search-button35" onClick={handleSearch}>
            <IoSearch /> Search
          </button>
        </div>
      </div>

      {showResults && (
        <div className="results-section35">
          <div className="results-header35">
            <div className="results-title35">
              <span className="list-icon35"><LiaCertificateSolid size="1.4em" /></span>
              <h2>Student Certificate List</h2>
            </div>
            <button
              className="generate-button35"
              onClick={handleGenerate}
              disabled={selectedStudents.length === 0}
            >
              Generate ({selectedStudents.length})
            </button>
          </div>

          <div className="table-controls35">
            <div className="center-controls35">
              <div>Rows per page: <strong>{pageSize}</strong></div>
            </div>
            <div className="right-controls35">
              <label>Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="search-input35"
                placeholder="Search admission, name, mobile..."
              />
            </div>
          </div>

          <div className="table-wrapper35">
            <table className="students-table35" role="table" aria-label="Students">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={paginatedStudents.length > 0 && paginatedStudents.every(s => selectedStudents.includes(s.id))}
                      aria-label="Select all visible"
                    />
                  </th>
                  <th onClick={() => handleSort('admissionNo')}>
                    ADMISSION NO.
                    <span className="sort-icons35">{sortConfig.key === 'admissionNo' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('studentName')}>
                    STUDENT NAME
                    <span className="sort-icons35">{sortConfig.key === 'studentName' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('class')}>
                    CLASS
                    <span className="sort-icons35">{sortConfig.key === 'class' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('fatherName')}>
                    FATHER NAME
                    <span className="sort-icons35">{sortConfig.key === 'fatherName' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('dob')}>
                    DATE OF BIRTH
                    <span className="sort-icons35">{sortConfig.key === 'dob' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('gender')}>
                    GENDER
                    <span className="sort-icons35">{sortConfig.key === 'gender' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('category')}>
                    CATEGORY
                    <span className="sort-icons35">{sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('mobile')}>
                    MOBILE NUMBER
                    <span className="sort-icons35">{sortConfig.key === 'mobile' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                  <th onClick={() => handleSort('status')}>
                    STATUS
                    <span className="sort-icons35">{sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ padding: '18px', textAlign: 'center', color: '#666' }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          aria-label={`Select ${student.studentName}`}
                        />
                      </td>
                      <td>{student.admissionNo}</td>
                      <td className="student-name35">{student.studentName}</td>
                      <td>{student.class}</td>
                      <td>{student.fatherName || '—'}</td>
                      <td>{student.dob}</td>
                      <td>{student.gender}</td>
                      <td>{student.category || '—'}</td>
                      <td>{student.mobile || '—'}</td>
                      <td className="status-cell35">{student.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination35" role="navigation" aria-label="Pagination">
            <button
              className="page-btn35"
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
                  className={`page-btn35 ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="page-btn35"
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

export default StudentCertificate;