import React, { useEffect, useState, useMemo } from 'react';
import './ApproveRequest1.css';

// Generate User ID & Password
const generateUserId = (idx) => `USER${String(idx + 1).padStart(3, '0')}`;
const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Generate approved date (last 30 days)
const generateApprovedDate = () => {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return past.toLocaleDateString('en-IN'); // DD/MM/YYYY
};

const ApproveRequest1 = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    schoolName: '',
    salesExec: '',
    state: '',
    district: '',
    schoolCode: ''
  });

  useEffect(() => {
    const rawData = [
      {
        entryType: 'New',
        salesExec: 'VIMAL NIGAM',
        state: 'Uttar Pradesh',
        district: 'Jaunpur',
        schoolCode: 'MSHSA',
        schoolName: 'MAA SHARDA JR HIGH SCHOOL',
        contactPerson: 'OM NARAYAN',
        contactNo: '9838667066',
        email: 'msibvkhanapatti@gmail.com',
        address: 'KHANA PATTI SIKARARA , JAUNPUR',
        board: 'RBSE HM',
        grade: '6-8',
        strength: ''
      },
      {
        entryType: 'Renew',
        salesExec: 'SUREN DRA SHARMA',
        state: 'Rajasthan',
        district: 'Jhunjhunu',
        schoolCode: 'VISHNU',
        schoolName: 'The Vishnu Scho ol, Alsisar H.M.',
        contactPerson: 'Mr. Rahul kumar',
        contactNo: '9828457562',
        email: 'vishnuschoolalsisar@gmail.com',
        address: 'Behind Telephone Exchange, Main Bus Stand, Alsisar\nPadmavati Nagar Society',
        board: 'RBSE HM',
        grade: '1-8',
        strength: ''
      },
      {
        entryType: 'new',
        salesExec: ' Souraabh',
        state: 'Punjab',
        district: '',
        schoolCode: 'asnda',
        schoolName: 'Guru Harikshan Public School',
        contactPerson: 'Mr. Vishal kumar',
        contactNo: '9828457562',
        email: 'Sourabh@gmail.com',
        address: 'Main Bus Stand, AlsisarnPadmavati Nagar Society',
        board: 'RBSE HM',
        grade: '1-8',
        strength: ''
      }
    ];

    const enriched = rawData.map((item, i) => ({
      ...item,
      userId: generateUserId(i),
      password: generatePassword(),
      approvedDate: generateApprovedDate()
    }));

    setRequests(enriched);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      return (
        (filters.schoolName === '' || req.schoolName.toLowerCase().includes(filters.schoolName.toLowerCase())) &&
        (filters.salesExec === '' || req.salesExec.toLowerCase().includes(filters.salesExec.toLowerCase())) &&
        (filters.state === '' || req.state.toLowerCase().includes(filters.state.toLowerCase())) &&
        (filters.district === '' || req.district.toLowerCase().includes(filters.district.toLowerCase())) &&
        (filters.schoolCode === '' || req.schoolCode.toLowerCase().includes(filters.schoolCode.toLowerCase()))
      );
    });
  }, [requests, filters]);

  return (
    <div className="apr-container">
      <header className="apr-header">
        <h1 className="apr-title">Approved Requests</h1>
      </header>

      <div className="apr-filter-panel">
        <div className="apr-filter-group">
          <label>School Name</label>
          <input
            type="text"
            placeholder="e.g., MAA SHARDA"
            value={filters.schoolName}
            onChange={(e) => handleFilterChange('schoolName', e.target.value)}
          />
        </div>

        <div className="apr-filter-group">
          <label>Sales Exec.</label>
          <input
            type="text"
            placeholder="e.g., VIMAL"
            value={filters.salesExec}
            onChange={(e) => handleFilterChange('salesExec', e.target.value)}
          />
        </div>

        <div className="apr-filter-group">
          <label>State</label>
          <input
            type="text"
            placeholder="e.g., Uttar Pradesh"
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
          />
        </div>

        <div className="apr-filter-group">
          <label>District</label>
          <input
            type="text"
            placeholder="e.g., Jaunpur"
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
          />
        </div>

        <div className="apr-filter-group">
          <label>School Code</label>
          <input
            type="text"
            placeholder="e.g., MSHSA"
            value={filters.schoolCode}
            onChange={(e) => handleFilterChange('schoolCode', e.target.value)}
          />
        </div>

        <button
          className="apr-clear-btn"
          onClick={() => setFilters({ schoolName: '', salesExec: '', state: '', district: '', schoolCode: '' })}
        >
          Clear All
        </button>
      </div>

      <div className="apr-results-info">
        Showing <strong>{filteredRequests.length}</strong> of <strong>{requests.length}</strong> requests
      </div>

      <div className="apr-card-wrapper">
        {filteredRequests.length === 0 ? (
          <div className="apr-no-data">No requests match your filters.</div>
        ) : (
          filteredRequests.map((req, idx) => (
            <div key={idx} className="apr-card">
              <div className="apr-card-header">
                <span className="apr-sno">{idx + 1}</span>
                <span className={`apr-badge ${req.entryType.toLowerCase()}`}>{req.entryType}</span>
              </div>

              <div className="apr-grid">
                <div className="apr-field">
                  <label>Sales Executive</label>
                  <p>{req.salesExec}</p>
                </div>
                <div className="apr-field">
                  <label>State / District</label>
                  <p>{req.state} / {req.district}</p>
                </div>
                <div className="apr-field">
                  <label>School</label>
                  <p>{req.schoolName} ({req.schoolCode})</p>
                </div>
                <div className="apr-field">
                  <label>Contact</label>
                  <p>{req.contactPerson}<br />{req.contactNo}</p>
                </div>

                <div className="apr-field">
                  <label>Email</label>
                  <p>{req.email}</p>
                </div>

                <div className="apr-field">
                  <label>Address</label>
                  <p className="apr-address">{req.address}</p>
                </div>

                <div className="apr-field">
                  <label>Board</label>
                  <p>{req.board}</p>
                </div>

                <div className="apr-field">
                  <label>Approved Date</label>
                  <p className="apr-uid">{req.approvedDate}</p>
                </div>

                <div className="apr-field">
                  <label>Grade</label>
                  <p>{req.grade}</p>
                </div>

                <div className="apr-field apr-highlight">
                  <label>User ID</label>
                  <p className="apr-uid">{req.userId}</p>
                </div>
                <div className="apr-field apr-highlight">
                  <label>Password</label>
                  <p className="apr-pwd">{req.password}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApproveRequest1;