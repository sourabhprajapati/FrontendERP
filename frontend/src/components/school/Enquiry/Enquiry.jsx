// src/components/Enquiry.jsx
import React, { useState, useEffect } from 'react';
import './Enquiry.css';

const Enquiry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [allEnquiries, setAllEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const types = [
        { key: 'admission',   label: 'Admission Enquiry',     url: 'http://localhost:5000/api/admission' },
        { key: 'visitors',    label: 'Visitor Enquiry',      url: 'http://localhost:5000/api/visitors/all' },
        { key: 'complaints',  label: 'Complaint Enquiry',     url: 'http://localhost:5000/api/complaints' },
        { key: 'concessions', label: 'Concession Request',   url: 'http://localhost:5000/api/concessions' }
      ];

      let combined = [];

      for (const { label, url } of types) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();

          const formatted = data.map(item => {
            const base = {
              _id: item._id,
              date: new Date(item.date || item.createdAt || item.appliedAt || item.visitingDate || Date.now())
                .toISOString().split('T')[0],
              type: label,
              ref: item.ref || item._id?.slice(-6).toUpperCase() || 'N/A',
              classOrReason: item.class || item.classGrade || item.reason || item.purpose || item.subject || '-',
              fullDetails: item
            };

            if (label === 'Admission Enquiry') {
              return { 
                ...base, 
                name: item.studentName || 'N/A', 
                mobile: item.fatherMobile || item.motherMobile || '-', 
                classOrReason: item.admissionClass || '-' 
              };
            }
            if (label === 'Visitor Enquiry') {
              return { ...base, name: item.name || 'Visitor', mobile: item.phone || 'N/A', classOrReason: item.purpose || 'Visit' };
            }
            if (label === 'Complaint Enquiry') {
              return { ...base, name: item.name || 'Unknown', mobile: item.phone || 'N/A' };
            }
            if (label === 'Concession Request') {
              return { ...base, name: item.name || item.parentName || 'Unknown', mobile: 'N/A', classOrReason: item.classGrade || '-' };
            }
            return { ...base, name: 'Unknown', mobile: 'N/A' };
          });

          combined = [...combined, ...formatted];
        } catch (err) {
          console.error(`Error loading ${label}:`, err);
        }
      }

      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllEnquiries(combined);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const filteredData = allEnquiries.filter(item => {
    const search = searchTerm.toLowerCase();
    return (
      (search === '' ||
        item.ref.toLowerCase().includes(search) ||
        (item.name && item.name.toLowerCase().includes(search)) ||
        (item.mobile && item.mobile.includes(search))) &&
      (selectedType === 'all' || item.type === selectedType) &&
      (selectedDate === '' || item.date === selectedDate)
    );
  });

  const handleView = (item) => {
    setSelectedEnquiry(item);
  };

  const closeDetails = () => {
    setSelectedEnquiry(null);
  };

  if (loading) return <div className="loading">Loading...</div>;

  const details = selectedEnquiry?.fullDetails;

  return (
    <div className="enquiry-container">

      {/* Main Table */}
      <div className="enquiry-section">
        <div className="section-header">
          <h2 className="enquiry-heading">All Enquiries & Requests</h2>
          <div className="header-line"></div>
        </div>

        <div className="search-form">
          <div className="form-group">
            <label>Search by Name / Ref / Mobile:</label>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="search-input" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type:</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="all">All Types</option>
                <option>Admission Enquiry</option>
                <option>Visitor Enquiry</option>
                <option>Complaint Enquiry</option>
                <option>Concession Request</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="enquiry-results">
        <h3>Showing {filteredData.length} records</h3>

        {filteredData.length === 0 ? (
          <div className="no-data">No records found</div>
        ) : (
          <div className="table-container">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Ref ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Class / Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td><span className={`type-badge ${item.type.replace(/\s+/g, '-').toLowerCase()}`}>{item.type}</span></td>
                    <td>{item.ref}</td>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.classOrReason}</td>
                    <td>
                      <button className="btn-small btn-view" onClick={() => handleView(item)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Beautiful Popup Modal */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={closeDetails}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEnquiry.type}</h2>
              <button className="close-modal" onClick={closeDetails}>×</button>
            </div>
            <div className="modal-body">
              {details && (
                <>
                  {details.studentName && (
                    <div className="detail-row"><strong>Student Name:</strong> {details.studentName}</div>
                  )}
                  {details.name && (
                    <div className="detail-row"><strong>Name:</strong> {details.name}</div>
                  )}
                  {details.fatherName && (
                    <div className="detail-row"><strong>Father's Name:</strong> {details.fatherName}</div>
                  )}
                  {details.parentName && (
                    <div className="detail-row"><strong>Parent Name:</strong> {details.parentName}</div>
                  )}
                  {details.admissionClass && (
                    <div className="detail-row"><strong>Admission Class:</strong> {details.admissionClass}</div>
                  )}
                  {details.classGrade && (
                    <div className="detail-row"><strong>Class:</strong> {details.classGrade}</div>
                  )}
                  {details.purpose && (
                    <div className="detail-row"><strong>Purpose:</strong> {details.purpose}</div>
                  )}
                  {details.subject && (
                    <div className="detail-row"><strong>Subject:</strong> {details.subject}</div>
                  )}
                  {details.reason && (
                    <div className="detail-row"><strong>Reason:</strong> {details.reason}</div>
                  )}
                  {details.phone && (
                    <div className="detail-row"><strong>Mobile:</strong> {details.phone}</div>
                  )}
                  {details.fatherMobile && (
                    <div className="detail-row"><strong>Father Mobile:</strong> {details.fatherMobile}</div>
                  )}
                  {details.email && details.email !== '-' && (
                    <div className="detail-row"><strong>Email:</strong> {details.email}</div>
                  )}
                  {details.date && (
                    <div className="detail-row"><strong>Date:</strong> {details.date}</div>
                  )}
                  {details.inTime && (
                    <div className="detail-row"><strong>In Time:</strong> {details.inTime}</div>
                  )}
                  {details.outTime && details.outTime !== '-' && (
                    <div className="detail-row"><strong>Out Time:</strong> {details.outTime}</div>
                  )}
                  {details.description && (
                    <div className="detail-row"><strong>Description:</strong> <br/>{details.description}</div>
                  )}
                  {details.note && (
                    <div className="detail-row"><strong>Note:</strong> <br/>{details.note}</div>
                  )}
                  <div className="detail-row"><strong>Ref ID:</strong> {selectedEnquiry.ref}</div>
                  <div className="detail-row"><strong>Submitted On:</strong> {new Date(details.createdAt || details.appliedAt).toLocaleString()}</div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={closeDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiry;