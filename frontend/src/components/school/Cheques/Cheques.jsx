// Cheques.jsx - FULLY FIXED: Dropdown never gets cut off + all classnames end with 90
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import './Cheques.css';

const initialCheques = [
  { id: 1, student: 'Vishal Sharma', chequeNo: '020685', bank: 'Canara Bank', amount: '5000', date: '13-06-2025', status: 'Bounced' },
  { id: 2, student: 'Karan Aswani', chequeNo: '4524185485', bank: 'PNB', amount: '5500', date: '12-06-2024', status: 'Cleared' },
  { id: 3, student: 'Ansh Test Sharma', chequeNo: '22321', bank: 'Test Bank', amount: '2000', date: '13-06-2024', status: 'Cancelled' },
  { id: 4, student: 'Priya Singh', chequeNo: '887755', bank: 'HDFC', amount: '8000', date: '10-06-2025', status: 'Deposited' },
  { id: 5, student: 'Rohan Mehta', chequeNo: '112233', bank: 'SBI', amount: '4500', date: '15-05-2025', status: 'Collected' },
  { id: 6, student: 'Neha Gupta', chequeNo: '998877', bank: 'Axis Bank', amount: '6000', date: '20-06-2025', status: 'Cleared' },
  { id: 7, student: 'Amit Kumar', chequeNo: '554433', bank: 'ICICI', amount: '7000', date: '01-07-2025', status: 'Bounced' },
  { id: 8, student: 'Sneha Verma', chequeNo: '221144', bank: 'Kotak', amount: '3500', date: '05-07-2025', status: 'Deposited' },
  { id: 9, student: 'Rahul Yadav', chequeNo: '667788', bank: 'Yes Bank', amount: '9000', date: '08-07-2025', status: 'Collected' },
  { id: 10, student: 'Pooja Rani', chequeNo: '334455', bank: 'Bank of Baroda', amount: '5200', date: '12-07-2025', status: 'Cleared' },
  // Add more entries to test bottom rows
  { id: 11, student: 'Rahul Sharma', chequeNo: '123456', bank: 'SBI', amount: '6000', date: '15-07-2025', status: 'Collected' },
  { id: 12, student: 'Priya Verma', chequeNo: '789012', bank: 'HDFC', amount: '7500', date: '18-07-2025', status: 'Bounced' },
];

function Cheques() {
  const [cheques, setCheques] = useState(initialCheques);
  const [form, setForm] = useState({ student: '', chequeNo: '', bank: '', amount: '', date: '', status: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [viewCheque, setViewCheque] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (Object.values(form).some(field => !field.trim())) {
      alert('All fields are required!');
      return;
    }
    if (editId) {
      setCheques(cheques.map(c => c.id === editId ? { ...form, id: editId } : c));
      setEditId(null);
    } else {
      setCheques([...cheques, { ...form, id: Date.now() }]);
    }
    setForm({ student: '', chequeNo: '', bank: '', amount: '', date: '', status: '' });
    setCurrentPage(1);
  };

  const handleEdit = (cheque) => {
    setForm(cheque);
    setEditId(cheque.id);
    setOpenMenuId(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cheque?')) {
      setCheques(cheques.filter(c => c.id !== id));
      setOpenMenuId(null);
      setCurrentPage(1);
    }
  };

  // Export functions
  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(cheques.map(c => ({
      Student: c.student, 'Cheque No': c.chequeNo, 'Bank Name': c.bank,
      Amount: c.amount, Date: c.date, Status: c.status
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cheques');
    XLSX.writeFile(wb, 'cheques.csv');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cheques.map(c => ({
      Student: c.student, 'Cheque No': c.chequeNo, 'Bank Name': c.bank,
      Amount: c.amount, Date: c.date, Status: c.status
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cheques');
    XLSX.writeFile(wb, 'cheques.xlsx');
  };

  // Search + Pagination
  const filtered = cheques.filter(c =>
    Object.values(c).join(' ').toLowerCase().includes(search.toLowerCase())
  );
  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
    if (totalEntries === 0) setCurrentPage(1);
  }, [totalEntries, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);
  const currentData = filtered.slice(startIndex, endIndex);

  // SMART DROPDOWN POSITIONING - Never gets cut off
  useEffect(() => {
    const updateDropdownPosition = () => {
      document.querySelectorAll('.action-menu90').forEach(menu => {
        const dropdown = menu.querySelector('.dropdown90');
        if (!dropdown) return;

        dropdown.classList.remove('upward90');
        const rect = menu.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const dropdownHeight = dropdown.offsetHeight || 150;

        if (spaceBelow < dropdownHeight + 60) {
          dropdown.classList.add('upward90');
        }
      });
    };

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
    const observer = new MutationObserver(updateDropdownPosition);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      observer.disconnect();
    };
  }, [openMenuId, currentData]);

  return (
    <div className="main-container90">
      <div className="content90">
        {/* FORM CARD */}
        <div className="form-card90">
          <div className="card-header90"><span>Add / Edit Cheque</span></div>
          <div className="form-body90">
            {/* form fields */}
            <div className="form-group90"><label>Student *</label><input type="text" name="student" value={form.student} onChange={handleChange} placeholder="Enter student name" /></div>
            <div className="form-group90"><label>Cheque No *</label><input type="text" name="chequeNo" value={form.chequeNo} onChange={handleChange} placeholder="Enter Cheque No" /></div>
            <div className="form-group90"><label>Bank Name *</label><input type="text" name="bank" value={form.bank} onChange={handleChange} placeholder="Enter Bank Name" /></div>
            <div className="form-group90"><label>Amount *</label><input type="text" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter Amount" /></div>
            <div className="form-group90"><label>Date *</label><input type="text" name="date" value={form.date} onChange={handleChange} placeholder="dd-mm-yyyy" /></div>
            <div className="form-group90">
              <label>Status *</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option>Collected</option><option>Deposited</option><option>Cleared</option><option>Bounced</option><option>Cancelled</option>
              </select>
            </div>
            <button className="save-btn90" onClick={handleSave}>{editId ? 'Update Cheque' : 'Save Cheque'}</button>
          </div>
        </div>

        {/* LIST CARD */}
        <div className="list-card90">
          <div className="card-header90">
            <span>Cheque List</span>
            <div className="export-buttons90">
              <button onClick={exportCSV}>CSV</button>
              <button onClick={exportExcel}>Excel</button>
              <button onClick={() => window.print()}>Print</button>
            </div>
          </div>

          <div className="table-header90">
            <input type="text" placeholder="Search anything..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="search-input90" />
          </div>

          <div className="table-container90">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th><th>CHEQUE NO</th><th>BANK NAME</th><th>AMOUNT</th><th>DATE</th><th>STATUS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No cheques found</td></tr>
                ) : (
                  currentData.map(c => (
                    <tr key={c.id}>
                      <td>{c.student}</td>
                      <td>{c.chequeNo}</td>
                      <td>{c.bank}</td>
                      <td>₹{c.amount}</td>
                      <td>{c.date}</td>
                      <td><span className={`status-badge90 ${c.status.toLowerCase()}90`}>{c.status}</span></td>
                      <td>
                        <div className="action-menu90">
                          <button className="action-btn90" onClick={() => toggleMenu(c.id)}>Action</button>
                          {openMenuId === c.id && (
                            <div className="dropdown90">
                              <button onClick={() => handleEdit(c)}>Edit</button>
                              <button onClick={() => { setViewCheque(c); toggleMenu(c.id); }}>View</button>
                              <button onClick={() => handleDelete(c.id)} className="delete90">Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer90">
            <div>Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of {totalEntries} entries</div>
            <div className="pagination90">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1 || totalEntries === 0}>Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'current90' : ''}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalEntries === 0}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewCheque && (
        <div className="modal90" onClick={() => setViewCheque(null)}>
          <div className="modal-content90" onClick={e => e.stopPropagation()}>
            <span className="close90" onClick={() => setViewCheque(null)}>×</span>
            <div className="receipt-header90">Cheque Receipt</div>
            <div className="receipt-body90">
              <p>19-K-4, Jyoti Nagar, Jaipur Rajasthan - 302005</p>
              <p>Affiliation No.: 1730 | Phone: 8058849888</p>
              <table className="receipt-table90">
                <tbody>
                  <tr><td><strong>Student's Name:</strong> {viewCheque.student}</td></tr>
                  <tr><td><strong>Cheque No.:</strong> {viewCheque.chequeNo}</td><td><strong>Bank Name:</strong> {viewCheque.bank}</td></tr>
                  <tr><td><strong>Amount:</strong> ₹{viewCheque.amount}</td><td><strong>Date:</strong> {viewCheque.date}</td></tr>
                  <tr><td colSpan="2"><strong>Status:</strong> {viewCheque.status}</td></tr>
                </tbody>
              </table>
              <div className="signature90">Auth. Signature ___________________</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cheques;