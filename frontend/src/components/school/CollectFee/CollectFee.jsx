import React, { useState, useMemo } from 'react';
import './CollectFee.css';
import {
  Search, Download, FileText, Printer, IndianRupee,
  X, Calendar, Wallet, CreditCard
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const classes = ['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const sections = ['A', 'B', 'C', 'D', 'E'];

// Generate 60 dummy students
const generateStudents = () => {
  const baseStudents = [];
  for (let i = 1; i <= 60; i++) {
    baseStudents.push({
      admNo: `STD${2000 + i}`,
      name: `Student Name ${i}`,
      class: classes[Math.floor(Math.random() * classes.length)],
      section: sections[Math.floor(Math.random() * sections.length)],
      dob: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}-04-20${Math.floor(Math.random() * 10) + 5}`,
      father: `Father ${i}`,
      mother: `Mother ${i}`,
      phone: `98${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`
    });
  }
  return baseStudents;
};

const students = generateStudents();

export default function CollectFee() {
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [keyword, setKeyword] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pay Fee Modal
  const [payFeeModal, setPayFeeModal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [remarks, setRemarks] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));

  // Filter logic
  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter(s => s.class === selectedClass);
    }
    if (section) {
      filtered = filtered.filter(s => s.section === section);
    }
    if (keyword) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(s =>
        s.admNo.toLowerCase().includes(kw) ||
        s.name.toLowerCase().includes(kw) ||
        s.phone.includes(kw)
      );
    }
    if (tableSearch) {
      const ts = tableSearch.toLowerCase();
      filtered = filtered.filter(s =>
        s.admNo.toLowerCase().includes(ts) ||
        s.name.toLowerCase().includes(ts) ||
        s.phone.includes(ts)
      );
    }

    return filtered;
  }, [selectedClass, section, keyword, tableSearch]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = filteredStudents.slice(startIndex, startIndex + pageSize);

  const handleSearch = () => {
    setShowTable(true);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const downloadCSV = () => {
    const csv = [
      ["Adm No", "Name", "Class", "Section", "DOB", "Father", "Mother", "Phone"],
      ...filteredStudents.map(s => [s.admNo, s.name, s.class, s.section, s.dob, s.father, s.mother, s.phone])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, "students.csv");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const openPayFeeModal = (student) => {
    setPayFeeModal(student);
  };

  const closeModal = () => {
    setPayFeeModal(null);
    setPaymentAmount('');
    setRemarks('');
    setPaymentMode('Cash');
  };

  const handlePayment = () => {
    alert(`Fee ₹${paymentAmount} collected from ${payFeeModal.name} via ${paymentMode}`);
    closeModal();
  };

  const handlePrint = (student) => {
    alert(`Printing receipt for ${student.name}... (Implement actual print logic)`);
  };

  return (
    <div className="page-container250">
      <main className="main-content250">
        <div className="card250">
          <div className="card-body250">
            {/* === Search Criteria === */}
            <div className="criteria-title250">
              <Search className="icon-search-title250" />
              <h2>Select Criteria</h2>
            </div>

            <div className="single-row-form250">
              <div className="field-group250">
                <label>Class <span className="required250">*</span></label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  <option value="">All Classes</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="field-group250">
                <label>Section</label>
                <select value={section} onChange={(e) => setSection(e.target.value)}>
                  <option value="">All Sections</option>
                  {sections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="keyword-field250">
                <label>Search by Keyword</label>
                <div className="search-box250">
                  <input
                    type="text"
                    placeholder="Admission no., Name, Phone"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button className="search-btn250" onClick={handleSearch}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            </div>

            {/* === Table === */}
            {showTable && (
              <>
                <div className="table-top-bar250">
                  <div className="left-tools250">
                    <button className="tool-btn250" onClick={downloadCSV}><Download size={18} /> CSV</button>
                    <button className="tool-btn250" onClick={downloadExcel}><FileText size={18} /> Excel</button>
                  </div>
                  <div className="right-tools250">
                    <label>Search:</label>
                    <input
                      type="text"
                      className="table-search250"
                      placeholder="Search in results..."
                      value={tableSearch}
                      onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
                    />
                  </div>
                </div>

                <div className="table-header-title250">
                  <h3>Student List ({totalItems})</h3>
                  <button className="cheque-reminder-btn250">
                    <FileText size={18} /> Cheque Reminder Report
                  </button>
                </div>

                <div className="table-responsive250">
                  <table className="student-table250 bordered250">
                    <thead>
                      <tr>
                        <th>ADMISSION NO.</th>
                        <th>NAME</th>
                        <th>CLASS</th>
                        <th>SECTION</th>
                        <th>DATE OF BIRTH</th>
                        <th>FATHER NAME</th>
                        <th>MOTHER NAME</th>
                        <th>GUARDIAN PHONE</th>
                        <th>ACTION</th>
                        <th>PRINT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length === 0 ? (
                        <tr><td colSpan={10} className="no-data250">No students found.</td></tr>
                      ) : (
                        currentData.map((student, i) => (
                          <tr key={i}>
                            <td><strong>{student.admNo}</strong></td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.section}</td>
                            <td>{student.dob}</td>
                            <td>{student.father}</td>
                            <td>{student.mother}</td>
                            <td>{student.phone}</td>
                            <td>
                              <button className="fee-btn250" onClick={() => openPayFeeModal(student)}>
                                <IndianRupee size={16} /> Fee
                              </button>
                            </td>
                            <td>
                              <button className="print-btn250" onClick={() => handlePrint(student)}>
                                <Printer size={16} /> Print
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer250">
                  <div className="entries-info250">
                    Showing {startIndex + 1} to {endIndex} of {totalItems} entries
                  </div>
                  <div className="pagination-wrapper250">
                    <select className="page-length250" value={pageSize} onChange={(e) => { setPageSize(+e.target.value); setCurrentPage(1); }}>
                      <option>10</option><option>25</option><option>50</option><option>100</option>
                    </select>
                    <div className="pagination250">
                      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (currentPage <= 3) pageNum = i + 1;
                        else if (currentPage > totalPages - 3) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;
                        return (
                          <button
                            key={pageNum}
                            className={currentPage === pageNum ? 'active250' : ''}
                            onClick={() => goToPage(pageNum)}
                          >{pageNum}</button>
                        );
                      })}
                      {totalPages > 5 && <button onClick={() => goToPage(totalPages)}>{totalPages}</button>}
                      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Pay Fee Modal */}
      {payFeeModal && (
        <div className="modal-overlay250" onClick={closeModal}>
          <div className="modal-content250" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header250">
              <h2>Collect Fee</h2>
              <button className="close-btn250" onClick={closeModal}><X size={24} /></button>
            </div>

            <div className="modal-body250">
              <div className="student-summary250">
                <p><strong>Adm No:</strong> {payFeeModal.admNo}</p>
                <p><strong>Name:</strong> {payFeeModal.name}</p>
                <p><strong>Class:</strong> {payFeeModal.class} - {payFeeModal.section}</p>
                <p><strong>Father:</strong> {payFeeModal.father}</p>
              </div>

              <div className="form-grid250">
                <div className="form-group250">
                  <label>Payment Date</label>
                  <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </div>

                <div className="form-group250">
                  <label>Amount <span className="required250">*</span></label>
                  <div className="input-with-icon250">
                    <IndianRupee size={20} />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group250">
                  <label>Payment Mode</label>
                  <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                </div>

                <div className="form-group250 full-width250">
                  <label>Remarks (optional)</label>
                  <textarea
                    rows="3"
                    placeholder="Late fee, scholarship, etc..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer250">
              <button className="cancel-btn250" onClick={closeModal}>Cancel</button>
              <button className="pay-btn250" onClick={handlePayment}>
                <Wallet size={18} /> Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}