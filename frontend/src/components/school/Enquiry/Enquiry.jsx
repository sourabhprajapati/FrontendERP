import React, { useState, useEffect } from 'react';
import './Enquiry.css';

const Enquiry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - replace with your API later
  const [enquiries] = useState([
    { id: 1, date: '2025-04-15', ref: 'ENQ001', student: 'Rahul Sharma', father: 'Rajesh Sharma', fmob: '9876543210', mmob: '8765432109', class: 'UKG', session: '2025-2026', addedBy: 'Admin', status: 'pending' },
    { id: 2, date: '2025-04-16', ref: 'ENQ002', student: 'Priya Singh', father: 'Manoj Singh', fmob: '9988776655', mmob: '8877665544', class: 'LKG', session: '2025-2026', addedBy: 'Reception', status: 'accepted' },
    { id: 3, date: '2025-04-14', ref: 'ENQ003', student: 'Aman Verma', father: 'Suresh Verma', fmob: '9123456789', mmob: '8234567890', class: 'Class 1', session: '2024-2025', addedBy: 'Admin', status: 'denied' },
    // Add more rows as needed
  ]);

  const [filteredData, setFilteredData] = useState(enquiries);

  // Real-time filtering
  useEffect(() => {
    let filtered = enquiries;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fmob.includes(searchTerm) ||
        item.mmob.includes(searchTerm)
      );
    }

    if (selectedSession) {
      filtered = filtered.filter(item => item.session === selectedSession);
    }

    if (selectedDate) {
      filtered = filtered.filter(item => item.date === selectedDate);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedSession, selectedDate, filterStatus, enquiries]);

  return (
    <div className="enquiry-container">

      {/* ===== TOP FORM SECTION ===== */}
      <div className="enquiry-section">
        <div className="section-header">
          <h2 className="enquiry-heading">Enquiry Details</h2>
          <div className="header-line"></div>
        </div>

        <div className="search-form">
          <div className="form-group">
            <label className="form-label">
              Enter Enquiry Ref.no./Student name/Mobile no.:
            </label>
            <div className="search-input-wrapper">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                placeholder="Enter search term"
              />
              <button type="button" className="search-button">
                Search Enquiry
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Select Session:</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="form-select"
              >
                <option value="">All Sessions</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="status-buttons">
            <button
              className={`status-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All Enquiries
            </button>
            <button
              className={`status-btn ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              All Pending
            </button>
            <button
              className={`status-btn ${filterStatus === 'denied' ? 'active' : ''}`}
              onClick={() => setFilterStatus('denied')}
            >
              All Denied
            </button>
            <button
              className={`status-btn ${filterStatus === 'accepted' ? 'active' : ''}`}
              onClick={() => setFilterStatus('accepted')}
            >
              All Accepted
            </button>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM TABLE SECTION ===== */}
      <div className="enquiry-results">
        <div className="results-header">
          <h3>Enquiries</h3>
        </div>

        {filteredData.length === 0 ? (
          <div className="no-data">No enquiry found</div>
        ) : (
          <div className="table-container">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Ref.No.</th>
                  <th>Student Name</th>
                  <th>Father's Name</th>
                  <th>F. Mob.No</th>
                  <th>M. Mob.No</th>
                  <th>Admission Sought for Class</th>
                  <th>Session</th>
                  <th>Added By</th>
                  <th>Edit</th>
                  {/* <th>Admission</th> */}
                  <th>Deny</th>
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.ref}</td>
                    <td>{item.student}</td>
                    <td>{item.father}</td>
                    <td>{item.fmob}</td>
                    <td>{item.mmob}</td>
                    <td>{item.class}</td>
                    <td>{item.session}</td>
                    <td>{item.addedBy}</td>
                    <td><button className="btn-edit">Edit</button></td>
                    {/* <td><button className="btn-admit">Admit</button></td> */}
                    <td><button className="btn-deny">Deny</button></td>
                    <td><button className="btn-print">Print</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiry;