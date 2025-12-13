// src/components/SuperAdmin/Request.jsx
import React, { useState, useEffect, useMemo } from 'react';
import './Request.css';

const API_BASE = "http://localhost:5000/api";

function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/schools/pending`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const formatted = json.data.map((s, i) => ({
          sno: i + 1,
          _id: s._id,
          salesPerson: (s.salesExecutive || 'N/A').trim(),
          email: s.email?.trim() || 'N/A',
          school: s.schoolName?.trim() || 'Unknown',
          address: [s.district, s.state].filter(Boolean).join(', ') || 'N/A',
          receivedDate: new Date(s.createdAt).toISOString().split('T')[0],
          actionDate: s.actionDate ? new Date(s.actionDate).toISOString().split('T')[0] : '-',
          status: (s.status || 'Pending').toLowerCase(),
          username: s.username || null,
          password: s.plainPassword || null,
          uniqueCode: s.uniqueCode || null,
        }));
        setRequests(formatted);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    if (!globalSearch) return requests;
    const term = globalSearch.toLowerCase();
    return requests.filter(r =>
      r.school.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.salesPerson.toLowerCase().includes(term) ||
      String(r.uniqueCode || '').includes(term)
    );
  }, [requests, globalSearch]);

  const openModal = (req, type) => {
    setSelectedReq(req);
    setModalType(type);
    if (type === 'reject') setRejectionReason('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReq(null);
    setModalType('');
    setRejectionReason('');
  };

  // THIS IS THE FIXED APPROVE FUNCTION
  const handleApprove = async () => {
    try {
      const res = await fetch(`${API_BASE}/schools/approve/${selectedReq._id}`, {
        method: 'PATCH'
      });
      const data = await res.json();

      if (data.success) {
        setRequests(prev => prev.map(req => 
          req._id === selectedReq._id 
            ? {
                ...req,
                status: 'approved',
                username: data.data.username,
                password: data.data.plainPassword,     // Real password
                uniqueCode: data.data.uniqueCode,
                actionDate: new Date().toISOString().split('T')[0]
              }
            : req
        ));
        alert('Approved! Credentials sent');
        closeModal();
      } else {
        alert(data.message || 'Failed');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return alert('Enter reason');
    try {
      const res = await fetch(`${API_BASE}/schools/reject/${selectedReq._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectionReason })
      });
      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.map(r => 
          r._id === selectedReq._id 
            ? { ...r, status: 'rejected', actionDate: new Date().toISOString().split('T')[0] }
            : r
        ));
        alert('Rejected');
        closeModal();
      }
    } catch (e) {
      alert('Error');
    }
  };

  return (
    <div className="req-app">
      <div className="req-header">
        <h1 className="req-title">School Onboarding Requests</h1>
        <div className="req-search">
          <input
            type="text"
            placeholder="Search school, email, code..."
            value={globalSearch}
            onChange={e => setGlobalSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p style={{textAlign:'center', padding:'50px', color:'#004585'}}>Loading...</p>}

      <table className="req-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Sales Person</th>
            <th>Email</th>
            <th>School Name</th>
            <th>Address</th>
            <th>Received</th>
            <th>Action Date</th>
            <th>Status</th>
            <th>Credentials</th>
            <th>Unique Code</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r._id}>
              <td>{r.sno}</td>
              <td>{r.salesPerson}</td>
              <td>{r.email}</td>
              <td>{r.school}</td>
              <td>{r.address}</td>
              <td>{r.receivedDate}</td>
              <td><strong>{r.actionDate}</strong></td>
              <td>
                {r.status === 'pending' ? (
                  <div className="req-actions">
                    <button className="req-approve-sm" onClick={() => openModal(r, 'approve')}>Approve</button>
                    <button className="req-reject-sm" onClick={() => openModal(r, 'reject')}>Reject</button>
                  </div>
                ) : (
                  <span style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: r.status === 'approved' ? '#27ae60' : '#e74c3c'
                  }}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                )}
              </td>

              <td style={{fontSize:'14px', lineHeight:'2'}}>
                {r.status === 'approved' && r.username ? (
                  <div>
                    <div>
                      <strong>Username:</strong>{' '}
                      <span style={{background:'#e3f2fd', padding:'6px 12px', borderRadius:'6px', fontFamily:'monospace'}}>
                        {r.username}
                      </span>
                    </div>
                    <div style={{marginTop:'8px'}}>
                      <strong>Password:</strong>{' '}
                      <span style={{background:'#fff3cd', color:'#d35400', padding:'8px 14px', borderRadius:'8px', fontFamily:'monospace', fontWeight:'bold', fontSize:'16px'}}>
                        {r.password}
                      </span>
                    </div>
                  </div>
                ) : '-'}
              </td>

              <td>
                {r.uniqueCode ? (
                  <strong style={{color:'#d35400', fontSize:'26px', fontWeight:'bold'}}>
                    {r.uniqueCode}
                  </strong>
                ) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedReq && (
        <div className="req-modal-overlay" onClick={closeModal}>
          <div className="req-modal" onClick={e => e.stopPropagation()}>
            <h2>{modalType === 'approve' ? 'Approve School' : 'Reject School'}</h2>
            <p><strong>School:</strong> {selectedReq.school}<br/>
               <strong>Email:</strong> {selectedReq.email}</p>

            {modalType === 'approve' ? (
              <>
                <p>Credentials will be generated and emailed.</p>
                <div className="req-modal-actions">
                  <button className="req-approve-btn" onClick={handleApprove}>Yes, Approve</button>
                  <button className="req-close-btn" onClick={closeModal}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <textarea className="req-reject-reason" value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)} rows="4" placeholder="Reason..." />
                <div className="req-modal-actions">
                  <button className="req-reject-btn" onClick={handleReject}
                    disabled={!rejectionReason.trim()}>Reject</button>
                  <button className="req-close-btn" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Request;