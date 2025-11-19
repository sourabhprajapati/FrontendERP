import React, { useState, useMemo } from 'react';
import './Request.css';

function Request() {
  /* -------------------------- DATA -------------------------- */
  const [requests, setRequests] = useState([
    {
      sno: 1,
      salesPerson: 'PusphRaj Tiwari',
      email: 'pushparaj.tiwari@mittsure.com',
      school: 'Sunshine Public School',
      address: 'Alwar Rajasthan',
      receivedDate: '2025-11-01',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
    {
      sno: 2,
      salesPerson: 'Mohit',
      email: 'mohit@mittsure.in',
      school: 'Jaishree school',
      address: 'C scheme, Jaipur Rajasthan',
      receivedDate: '2025-11-03',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
    {
      sno: 3,
      salesPerson: 'Sourabh Prajapati',
      email: 'sourabh.prajapati@mittsure.com',
      school: 'Bhagirath Public School',
      address: 'Raja Park Jaipur Rajasthan',
      receivedDate: '2025-11-01',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
    {
      sno: 4,
      salesPerson: 'Lakshita Joshi',
      email: 'lakshita.joshi@mittsure.com',
      school: 'Mnemonic Public School',
      address: 'Alwar Rajasthan',
      receivedDate: '2025-11-01',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
    {
      sno: 5,
      salesPerson: 'Tushar Joshi',
      email: 'tushar.joshi@mittsure.com',
      school: 'Mnemonic Public School',
      address: 'Alwar Rajasthan',
      receivedDate: '2025-11-01',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
    {
      sno: 6,
      salesPerson: 'PusphRaj Tiwari',
      email: 'pushparaj.tiwari@mittsure.com',
      school: 'Sunshine Public School',
      address: 'Alwar Rajasthan',
      receivedDate: '2025-11-01',
      status: 'pending',
      id: null,
      password: null,
      actionDate: null,
      rejectionReason: null,
      document: new File(
        ["(sample PDF content)"],
        "sunshine-letter.pdf",
        { type: "application/pdf" }
      ),
      uniqueCode: null,
    },
  ]);

  /* -------------------------- GLOBAL SEARCH STATE -------------------------- */
  const [globalSearch, setGlobalSearch] = useState('');

  /* -------------------------- FILTERED LIST -------------------------- */
  const filteredRequests = useMemo(() => {
    if (!globalSearch.trim()) return requests;

    const term = globalSearch.toLowerCase().trim();

    return requests.filter((req) => {
      return (
        req.sno.toString().includes(term) ||
        req.salesPerson.toLowerCase().includes(term) ||
        req.email.toLowerCase().includes(term) ||
        req.school.toLowerCase().includes(term) ||
        req.address.toLowerCase().includes(term) ||
        req.receivedDate.includes(term) ||
        (req.actionDate || '').includes(term) ||
        req.status.toLowerCase().includes(term) ||
        (req.id || '').toLowerCase().includes(term) ||
        (req.password || '').toLowerCase().includes(term) ||
        (req.uniqueCode || '').toString().toLowerCase().includes(term) ||
        (req.rejectionReason || '').toLowerCase().includes(term)
      );
    });
  }, [requests, globalSearch]);

  /* -------------------------- MODAL & ACTION STATES -------------------------- */
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSno, setSelectedSno] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const openModal = (sno, type) => {
    setSelectedSno(sno);
    setModalType(type);
    if (type === 'reject') setRejectionReason('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedSno(null);
    setRejectionReason('');
  };

  /* -------------------------- HELPERS -------------------------- */
  const generateRandomString = (len) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  const generateUniqueCode = (schoolName) => {
    const prefix = schoolName
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')[0]
      .toUpperCase()
      .slice(0, 3);
    const randomDigits = Math.floor(Math.random() * 90 + 10);
    return `${prefix}${randomDigits}`;
  };

  /* -------------------------- APPROVE / REJECT -------------------------- */
  const handleApprove = async () => {
    const now = new Date().toLocaleDateString('en-CA');
    const id = generateRandomString(8);
    const password = generateRandomString(10);
    const selectedReq = requests.find((r) => r.sno === selectedSno);
    const uniqueCode = generateUniqueCode(selectedReq.school);

    const updated = requests.map((r) =>
      r.sno === selectedSno
        ? {
            ...r,
            status: 'approved',
            id,
            password,
            actionDate: now,
            rejectionReason: null,
            uniqueCode,
          }
        : r
    );
    setRequests(updated);

    const approvedReq = updated.find((r) => r.sno === selectedSno);
    await sendApprovalEmail(approvedReq);
    closeModal();
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    const now = new Date().toLocaleDateString('en-CA');
    const updated = requests.map((r) =>
      r.sno === selectedSno
        ? {
            ...r,
            status: 'rejected',
            actionDate: now,
            rejectionReason: rejectionReason.trim(),
            id: null,
            password: null,
            uniqueCode: null,
          }
        : r
    );
    setRequests(updated);

    const rejectedReq = updated.find((r) => r.sno === selectedSno);
    await sendRejectionEmail(rejectedReq);
    closeModal();
  };

  const sendApprovalEmail = async (req) => {
    console.log('APPROVAL EMAIL →', {
      to: req.email,
      name: req.salesPerson,
      school: req.school,
      id: req.id,
      password: req.password,
      uniqueCode: req.uniqueCode,
      date: req.actionDate,
      documentName: req.document?.name || 'None',
    });
  };

  const sendRejectionEmail = async (req) => {
    console.log('REJECTION EMAIL →', {
      to: req.email,
      name: req.salesPerson,
      school: req.school,
      reason: req.rejectionReason,
      date: req.actionDate,
      documentName: req.document?.name || 'None',
    });
  };

  const viewDocument = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  /* -------------------------- RENDER -------------------------- */
  return (
    <div className="req-app">
      <div className="req-header">
        <h1 className="req-title">Approved / Rejected Requests</h1>

        {/* GLOBAL SEARCH – TOP RIGHT */}
        <div className="req-search">
          <input
            type="text"
            placeholder="Search all columns..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ==================== TABLE ==================== */}
      <table className="req-table">
        <thead>
          <tr>
            <th>S.no.</th>
            <th>Sales Person</th>
            <th>Email Id</th>
            <th>School Name</th>
            <th>Address</th>
            <th>Document</th>
            <th>Received Date</th>
            <th>Approved/Rejected Date</th>
            <th>Status</th>
            <th>Credentials</th>
            <th>Unique Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="11" className="req-no-records">
                No records match your search.
              </td>
            </tr>
          ) : (
            filteredRequests.map((req) => (
              <tr key={req.sno}>
                <td data-label="S.no.">{req.sno}</td>
                <td data-label="Sales Person">{req.salesPerson}</td>
                <td data-label="Email">{req.email}</td>
                <td data-label="School">{req.school}</td>
                <td data-label="Address">{req.address}</td>
                <td data-label="Document">
                  {req.document ? (
                    <div className="req-doc-cell">
                      <button
                        className="req-view-btn"
                        onClick={() => viewDocument(req.document)}
                      >
                        View
                      </button>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td data-label="Received">{req.receivedDate}</td>
                <td data-label="Date">{req.actionDate || '-'}</td>
                <td data-label="Status">
                  {req.status === 'pending' ? (
                    <div className="req-actions">
                      <button
                        className="req-approve-sm"
                        onClick={() => openModal(req.sno, 'approve')}
                      >
                        Approve
                      </button>
                      <button
                        className="req-reject-sm"
                        onClick={() => openModal(req.sno, 'reject')}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`req-status-${req.status}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  )}
                </td>
                <td data-label="Credentials">
                  {req.status === 'approved' && req.id ? (
                    <div className="req-creds">
                      <strong>Username: </strong>
                      <strong>{req.id}</strong>
                      <br />
                      <strong>Password: </strong>
                      <strong>{req.password}</strong>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td data-label="Unique Code">
                  {req.uniqueCode ? (
                    <strong className="req-unique-code">{req.uniqueCode}</strong>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ==================== MODAL ==================== */}
      {showModal && (
        <div className="req-modal-overlay" onClick={closeModal}>
          <div className="req-modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </h2>

            {modalType === 'approve' ? (
              <>
                <p>
                  This will generate login credentials, unique school code, and
                  send them via email.
                </p>
                <div className="req-modal-actions">
                  <button className="req-approve-btn" onClick={handleApprove}>
                    Yes, Approve & Email
                  </button>
                  <button className="req-close-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  Please provide a reason for rejection (will be sent via
                  email):
                </p>
                <textarea
                  className="req-reject-reason"
                  placeholder="Enter reason (required)"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows="4"
                />
                <div className="req-modal-actions">
                  <button
                    className="req-reject-btn"
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                  >
                    Reject & Notify
                  </button>
                  <button className="req-close-btn" onClick={closeModal}>
                    Cancel
                  </button>
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