import React, { useState } from 'react';
import './StudentId.css'; // ← This should be the CSS with "38" in class names
import { IoSearch } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";

const StudentId = () => {
  const [formData, setFormData] = useState({
    class: '1st',
    section: 'A',
    template: 'format1'
  });
  
  const [showTable, setShowTable] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      admissionNo: '2322211992',
      name: 'NEW STUDENT',
      class: '1st(A)',
      fatherName: 'Test',
      dob: '03-04-2025',
      gender: 'Male',
      category: '',
      mobile: '',
      rollNo: '3',
      busNo: 'RJ14QWE#12',
      bloodGroup: 'galta ji Gate'
    },
    {
      id: 2,
      admissionNo: '2322211993',
      name: 'Test',
      class: '1st(A)',
      fatherName: '',
      dob: '02-04-2025',
      gender: 'Male',
      category: '',
      mobile: ''
    },
    {
      id: 3,
      admissionNo: '2322211994',
      name: 'Test',
      class: '1st(A)',
      fatherName: '',
      dob: '03-04-2025',
      gender: 'Male',
      category: '',
      mobile: ''
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setShowTable(true);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents(prev => {
      if (prev.includes(id)) {
        return prev.filter(studentId => studentId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedStudents = () => {
    let sortedStudents = [...students];
    
    if (searchTerm) {
      sortedStudents = sortedStudents.filter(student =>
        Object.values(student).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      sortedStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedStudents;
  };

  const handleGenerate = () => {
    if (selectedStudents.length > 0) {
      setShowPrintPreview(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedStudentData = students.filter(s => selectedStudents.includes(s.id));

  return (
    <div className="student-id-container38">
      {!showPrintPreview ? (
        <>
          <header className="header38">
            <div className="header-left38">
              <span className="icon38"><FaRegIdCard /></span>
              <h1>Student Id Card</h1>
            </div>
            <div className="header-right38">
              <span className="certificate-link38"><FaRegIdCard /> Certificate</span>
              <span className="divider38">/</span>
              <span className="active-link38">Student Id Card</span>
            </div>
          </header>

          <div className="criteria-container38">
            <h2 className="section-title38"><IoSearch />Select Criteria</h2>
            <div className="form-row38">
              <div className="form-group38">
                <label>Class <span className="required38">*</span></label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  placeholder="1st"
                />
              </div>
              <div className="form-group38">
                <label>Section <span className="required38">*</span></label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                >
                  <option value="All">All</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="form-group38">
                <label>Template <span className="required38">*</span></label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                >
                  <option value="format1">Format 1</option>
                  <option value="format2">Format 2</option>
                </select>
              </div>
            </div>
            <div className="search-button-container38">
              <button className="search-btn38" onClick={handleSearch}>
                <IoSearch /> Search
              </button>
            </div>
          </div>

          {showTable && (
            <div className="table-container38">
              <div className="table-header38">
                <h2 className="section-title38"><FaRegIdCard /> Student Id Card List</h2>
                <button className="generate-btn38" onClick={handleGenerate}>
                  Generate
                </button>
              </div>

              <div className="table-controls38">
                <div className="search-box38">
                  <label>Search:</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
              </div>

              <div className="table-wrapper38">
                <table className="student-table38">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedStudents.length === students.length}
                        />
                      </th>
                      <th onClick={() => handleSort('admissionNo')}>
                        ADMISSION NO.
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('name')}>
                        STUDENT NAME
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('class')}>
                        CLASS
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('fatherName')}>
                        FATHER NAME
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('dob')}>
                        DATE OF BIRTH
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('gender')}>
                        GENDER
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('category')}>
                        CATEGORY
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                      <th onClick={() => handleSort('mobile')}>
                        MOBILE NUMBER
                        <span className="sort-arrows38">Up/Down</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedStudents().map((student) => (
                      <tr key={student.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                          />
                        </td>
                        <td className="admission-no38">{student.admissionNo}</td>
                        <td className="student-name38">{student.name}</td>
                        <td>{student.class}</td>
                        <td>{student.fatherName}</td>
                        <td>{student.dob}</td>
                        <td>{student.gender}</td>
                        <td>{student.category}</td>
                        <td>{student.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="print-preview38">
          <div className="print-controls38 no-print38">
            <button onClick={() => setShowPrintPreview(false)}>Back</button>
            <button onClick={handlePrint}><IoPrintOutline size="1.2em" /> Print</button>
          </div>
          
          <div className={`id-cards-wrapper38 ${formData.template}`}>
            {selectedStudentData.map((student) => (
              <div key={student.id} className={`id-card38 ${formData.template === 'format1' ? 'format138' : 'format238'}`}>
                {formData.template === 'format1' ? (
                  <div className="id-card-portrait38">
                    <div className="card-header38">
                      <div className="logo38">
                        <div className="logo-placeholder38">MITT</div>
                      </div>
                      <div className="school-info38">
                        <h3>MITTSURE - TECHNOLOGY</h3>
                        <h4>MANAGEMENT</h4>
                        <p>SOFTWARE</p>
                        <p className="address38">B-121, Bapu Nagar, Jaipur Rajasthan - 302019</p>
                        <p className="contact38">An exclusively configured</p>
                        <p className="phone38">EXAM#2211 xxV xx#CMS-ndi - 15555</p>
                      </div>
                    </div>
                    
                    <div className="card-body38">
                      <div className="photo-section38">
                        <div className="photo-placeholder38">
                          <div className="no-image38">NO IMAGE AVAILABLE</div>
                        </div>
                        <p className="class-badge38">{student.class.split('(')[0]} : {student.class.match(/\(([^)]+)\)/)?.[1] || 'A'}</p>
                        <p className="class-label38">Class</p>
                      </div>
                      
                      <div className="details-section38">
                        <p><span className="label38">Admission No:</span> {student.admissionNo}</p>
                        <p><span className="label38">Student Name:</span> {student.name}</p>
                        <p><span className="label38">Father Name:</span> {student.fatherName}</p>
                        <p><span className="label38">Date of Birth:</span> {student.dob}</p>
                        <p><span className="label38">Roll No.:</span> {student.rollNo || 'N/A'}</p>
                        <p><span className="label38">Mobile No:</span> {student.mobile || '1234567890'}</p>
                        <p><span className="label38">Bus No.:</span> {student.busNo || 'RJ14QWE#12'}</p>
                        <p><span className="label38">Bus Stop:</span> {student.bloodGroup || 'galta ji Gate'}</p>
                      </div>
                      
                      <div className="signature-section38">
                        <div className="signature38">
                          <div className="signature-line38"></div>
                          <p>Address</p>
                        </div>
                        <div className="signature38">
                          <div className="signature-line38"></div>
                          <p>Authorisation Sign</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="id-card-landscape38">
                    <div className="landscape-left38">
                      <div className="landscape-header38">
                        <div className="logo-small38">MITTSURE</div>
                        <div className="school-info-compact38">
                          <h3>MITTSURE - Technology Management Software</h3>
                          <p>B-121, Bapu Nagar, Jaipur Rajasthan - 302019</p>
                          <p>An exclusively configured | EXAM#2211 xxV xx#CMS-ndi - 15555</p>
                        </div>
                      </div>
                      <div className="landscape-content38">
                        <div className="student-info-landscape38">
                          <h4>{student.name}</h4>
                          <p><strong>Father Name:</strong> {student.fatherName}</p>
                          <p><strong>Class - Section:</strong> {student.class}</p>
                          <p><strong>Date of Birth:</strong> {student.dob}</p>
                          <p><strong>Admission No.:</strong> {student.admissionNo}</p>
                          <p><strong>Roll No.:</strong> {student.rollNo || '3'}</p>
                          <p><strong>Bus No.:</strong> {student.busNo || 'RJ14QWE#12'}</p>
                          <p><strong>Bus Stop:</strong> {student.bloodGroup || 'galta ji Gate'}</p>
                        </div>
                        <div className="landscape-signature38">
                          <div className="signature-line38"></div>
                          <p>Authorisation Sign</p>
                        </div>
                      </div>
                    </div>
                    <div className="landscape-right38">
                      <div className="photo-placeholder-landscape38">
                        <div className="no-image38">NO IMAGE</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentId;