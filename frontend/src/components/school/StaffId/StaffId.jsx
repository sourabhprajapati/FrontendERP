import React, { useState } from 'react';
import './StaffId.css';
import { IoSearch } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import { PiNotepad } from "react-icons/pi";
import { IoPrintOutline } from "react-icons/io5";

const StaffId = () => {
  const [formData, setFormData] = useState({
    role: 'All',
    template: 'format1'
  });
  
  const [showTable, setShowTable] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const staffMembers = [
    {
      id: 1,
      staffId: 'STF001',
      name: 'John Doe',
      department: 'Administration',
      designation: 'Principal',
      dob: '15-06-1980',
      gender: 'Male',
      mobile: '9876543210',
      email: 'john.doe@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'O+',
      role: 'Admin'
    },
    {
      id: 2,
      staffId: 'STF002',
      name: 'Sarah Smith',
      department: 'Teaching',
      designation: 'Senior Teacher',
      dob: '22-08-1985',
      gender: 'Female',
      mobile: '9876543211',
      email: 'sarah.smith@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'A+',
      role: 'Teacher'
    },
    {
      id: 3,
      staffId: 'STF003',
      name: 'Michael Johnson',
      department: 'Teaching',
      designation: 'Mathematics Teacher',
      dob: '10-03-1988',
      gender: 'Male',
      mobile: '9876543212',
      email: 'michael.j@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'B+',
      role: 'Teacher'
    },
    {
      id: 4,
      staffId: 'STF004',
      name: 'Rajesh Kumar',
      department: 'Security',
      designation: 'Security Guard',
      dob: '05-12-1975',
      gender: 'Male',
      mobile: '9876543213',
      email: 'rajesh.k@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'O+',
      role: 'Security'
    },
    {
      id: 5,
      staffId: 'STF005',
      name: 'Emily Brown',
      department: 'Teaching',
      designation: 'English Teacher',
      dob: '18-09-1990',
      gender: 'Female',
      mobile: '9876543214',
      email: 'emily.b@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'AB+',
      role: 'Teacher'
    },
    {
      id: 6,
      staffId: 'STF006',
      name: 'Amit Sharma',
      department: 'Administration',
      designation: 'Vice Principal',
      dob: '12-04-1982',
      gender: 'Male',
      mobile: '9876543215',
      email: 'amit.s@school.com',
      address: 'Jaipur, Rajasthan',
      bloodGroup: 'B+',
      role: 'Admin'
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
    const filteredStaff = getFilteredStaff();
    if (e.target.checked) {
      setSelectedStaff(filteredStaff.map(s => s.id));
    } else {
      setSelectedStaff([]);
    }
  };

  const handleSelectStaff = (id) => {
    setSelectedStaff(prev => {
      if (prev.includes(id)) {
        return prev.filter(staffId => staffId !== id);
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

  const getFilteredStaff = () => {
    let filtered = [...staffMembers];
    
    // Filter by role
    if (formData.role !== 'All') {
      filtered = filtered.filter(staff => staff.role === formData.role);
    }
    
    return filtered;
  };

  const getSortedStaff = () => {
    let sortedStaff = getFilteredStaff();
    
    if (searchTerm) {
      sortedStaff = sortedStaff.filter(staff =>
        Object.values(staff).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      sortedStaff.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedStaff;
  };

  const handleGenerate = () => {
    if (selectedStaff.length > 0) {
      setShowPrintPreview(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedStaffData = staffMembers.filter(s => selectedStaff.includes(s.id));

  return (
    <div className="staff-id-container62">
      {!showPrintPreview ? (
        <>
          <header className="header62">
            <div className="header-left62">
              <span className="icon62"><FaRegIdCard /></span>
              <h1>Staff Id Card</h1>
            </div>
            <div className="header-right62">
              <span className="certificate-link62"><PiNotepad /> Certificate</span>
              <span className="divider62">/</span>
              <span className="active-link62">Staff Id Card</span>
            </div>
          </header>

          <div className="criteria-container62">
            <h2 className="section-title62"><IoSearch /> Select Criteria</h2>
            <div className="form-row62">
              <div className="form-group62">
                <label>Role <span className="required62">*</span></label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="All">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div className="form-group62">
                <label>Template <span className="required62">*</span></label>
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
            <button className="search-btn62" onClick={handleSearch}>
              <IoSearch /> Search
            </button>
          </div>

          {showTable && (
            <div className="table-container62">
              <div className="table-header62">
                <h2 className="section-title62"><IoSearch /> Staff Id Card List</h2>
                <button className="generate-btn62" onClick={handleGenerate}>
                  Generate
                </button>
              </div>

              <div className="table-controls62">
                <div className="action-buttons62">
                  
                </div>
                <div className="search-box62">
                  <label>Search:</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
              </div>

              <div className="table-wrapper62">
                <table className="staff-table62">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedStaff.length === getFilteredStaff().length && getFilteredStaff().length > 0}
                        />
                      </th>
                      <th onClick={() => handleSort('name')}>
                        NAME
                        <span className="sort-arrows62">⇅</span>
                      </th>
                      <th onClick={() => handleSort('department')}>
                        DEPARTMENT
                        <span className="sort-arrows62">⇅</span>
                      </th>
                      <th onClick={() => handleSort('designation')}>
                        DESIGNATION
                        <span className="sort-arrows62">⇅</span>
                      </th>
                      <th onClick={() => handleSort('dob')}>
                        DATE OF BIRTH
                        <span className="sort-arrows62">⇅</span>
                      </th>
                      <th onClick={() => handleSort('gender')}>
                        GENDER
                        <span className="sort-arrows62">⇅</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedStaff().map((staff) => (
                      <tr key={staff.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedStaff.includes(staff.id)}
                            onChange={() => handleSelectStaff(staff.id)}
                          />
                        </td>
                        <td className="staff-name62">{staff.name}</td>
                        <td>{staff.department}</td>
                        <td>{staff.designation}</td>
                        <td>{staff.dob}</td>
                        <td>{staff.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="print-preview62">
          <div className="print-controls62 no-print">
            <button onClick={() => setShowPrintPreview(false)}>← Back</button>
            <button onClick={handlePrint}><IoPrintOutline /> Print</button>
          </div>
          
          <div className={`id-cards-wrapper62 ${formData.template}62`}>
            {selectedStaffData.map((staff) => (
              <div key={staff.id} className={`id-card62 ${formData.template}62`}>
                {formData.template === 'format1' ? (
                  <div className="id-card-portrait62">
                    <div className="card-header62">
                      <div className="logo62">
                        <div className="logo-placeholder62">MITT</div>
                      </div>
                      <div className="school-info62">
                        <h3>MITTSURE - TECHNOLOGY</h3>
                        <h4>MANAGEMENT</h4>
                        <p>SOFTWARE</p>
                        <p className="address62">B-121, Bapu Nagar, Jaipur Rajasthan - 302019</p>
                        <p className="contact62">An exclusively configured</p>
                        <p className="phone62">EXAM#2211 xxV xx#CMS-ndi - 15555</p>
                      </div>
                    </div>
                    
                    <div className="card-body62">
                      <div className="photo-section62">
                        <div className="photo-placeholder62">
                          <div className="no-image62">NO IMAGE AVAILABLE</div>
                        </div>
                        <p className="class-badge62">{staff.department}</p>
                        <p className="class-label62">Department</p>
                      </div>
                      
                      <div className="details-section62">
                        <p><span className="label62">Staff ID:</span> {staff.staffId}</p>
                        <p><span className="label62">Staff Name:</span> {staff.name}</p>
                        <p><span className="label62">Designation:</span> {staff.designation}</p>
                        <p><span className="label62">Date of Birth:</span> {staff.dob}</p>
                        <p><span className="label62">Mobile No:</span> {staff.mobile}</p>
                        <p><span className="label62">Email:</span> {staff.email}</p>
                        <p><span className="label62">Blood Group:</span> {staff.bloodGroup}</p>
                        <p><span className="label62">Gender:</span> {staff.gender}</p>
                      </div>
                      
                      <div className="signature-section62">
                        <div className="signature62">
                          <div className="signature-line62"></div>
                          <p>Address</p>
                        </div>
                        <div className="signature62">
                          <div className="signature-line62"></div>
                          <p>Authorisation Sign</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="id-card-landscape62">
                    <div className="landscape-left62">
                      <div className="landscape-header62">
                        <div className="logo-small62">MITT</div>
                        <div className="school-info-compact62">
                          <h3>MITTSURE- Management Software</h3>
                          <p>B-121, Bapu Nagar, Jaipur Rajasthan - 302019</p>
                          <p>An exclusively configured | EXAM#2211 xxV xx#CMS-ndi - 15555</p>
                        </div>
                      </div>
                      <div className="landscape-content62">
                        <div className="staff-info-landscape62">
                          <h4>{staff.name}</h4>
                          <p><strong>Department:</strong> {staff.department}</p>
                          <p><strong>Designation:</strong> {staff.designation}</p>
                          <p><strong>Staff ID:</strong> {staff.staffId}</p>
                          <p><strong>Date of Birth:</strong> {staff.dob}</p>
                          <p><strong>Mobile No:</strong> {staff.mobile}</p>
                          <p><strong>Email:</strong> {staff.email}</p>
                          <p><strong>Blood Group:</strong> {staff.bloodGroup}</p>
                        </div>
                        <div className="landscape-signature62">
                          <div className="signature-line62"></div>
                          <p>Authorisation Sign</p>
                        </div>
                      </div>
                    </div>
                    <div className="landscape-right62">
                      <div className="photo-placeholder-landscape62">
                        <div className="no-image62">NO IMAGE</div>
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

export default StaffId;