import { useState } from "react";
import jsPDF from "jspdf";
import jsPDFAutoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./PreviousFeeRecord.css";

export default function PreviousFeeRecord() {
  const [showTable, setShowTable] = useState(false);
  const [printStudent, setPrintStudent] = useState(null);

  const handleSearch = () => {
    setShowTable(true);
  };

  const handlePDF = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.text("Student Fee Collection Report", 20, 20);
      doc.text("SAKET PUBLIC SCHOOL VISHESHARGANJ, BASTI", 20, 30);

      const data = [
        ["Sno", "Student Name", "Father Name", "Class", "Section", "Receipt No", "Total"],
        ...[1, 2, 3, 4, 5].map(i => [i, "Tanishka Rai", "Rahul Kumar", "1st", "A", `00${i}77`, "700"])
      ];

      jsPDFAutoTable(doc, {
        head: [data[0]],
        body: data.slice(1),
        startY: 50,
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: 20 },
          4: { cellWidth: 15 },
          5: { cellWidth: 25 },
          6: { cellWidth: 20 }
        },
      });

      doc.save("fee_record.pdf");
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Check console for details.");
    }
  };

  const handleExcel = () => {
    const data = [
      ["Sno", "Student Name", "Father Name", "Class", "Section", "Receipt No", "Admission", "Tuition", "Exam", "Transport", "Late Fee", "Previous", "Total", "Discount", "Mode", "Date", "User"],
      ...[1, 2, 3, 4, 5].map(i => [i, "Tanishka Rai", "Rahul Kumar", "1st", "A", `00${i}77`, 300, 350, 50, 0, 0, 0, 700, 100, "Cash", "20/01/2025", "saket21"])
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fee Record");
    XLSX.writeFile(wb, "fee_record.xlsx");
  };

  const handlePrint = (student) => {
    setPrintStudent(student);
    setTimeout(() => {
      window.print();
      setPrintStudent(null);
    }, 100);
  };

  return (
    <div className="erp-page31">

      {/* ===== Search Card ===== */}
      <div className="search-card31">
        <h3>Search Student by Name / SR No</h3>

        <div className="search-grid31">
          <div className="field31">
            <label>Select Session</label>
            <select>
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>

          <div className="field31">
            <label>Student Name / Sr No</label>
            <input type="text" placeholder="Enter Name or SR No" />
          </div>
        </div>

        <div className="form-actions31">
          <button className="btn31 primary31" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* ===== Result Section ===== */}
      {showTable && (
        <div className="result-card31">

          {/* School Header */}
          <div className="report-header31">
            <h2>SAKET PUBLIC SCHOOL VISHESHARGANJ, BASTI</h2>
            <p>Student Fee Collection Report</p>
          </div>

          {/* Summary */}
          <div className="summary-bar31">
            <span><b>Total Cash:</b> ₹3300</span>
            <span><b>Total Cheque:</b> ₹0</span>
            <span><b>Total:</b> ₹3300</span>
            <span><b>Total Discount:</b> ₹250</span>
            <div className="download-buttons31">
              <button className="btn31 pdf31" onClick={handlePDF}>PDF</button>
              <button className="btn31 excel31" onClick={handleExcel}>Excel</button>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper31">
            <table className="attendance-table31">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Student Name</th>
                  <th>Father Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Receipt No</th>
                  <th>Admission</th>
                  <th>Tuition</th>
                  <th>Exam</th>
                  <th>Transport</th>
                  <th>Late Fee</th>
                  <th>Previous</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>User</th>
                  <th>Duplicate</th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5].map((i) => {
                  const student = {
                    sno: i,
                    name: "Tanishka Rai",
                    fatherName: "Rahul Kumar",
                    class: "1st",
                    section: "A",
                    receiptNo: `00${i}77`,
                    admission: 300,
                    tuition: 350,
                    exam: 50,
                    transport: 0,
                    lateFee: 0,
                    previous: 0,
                    total: 700,
                    discount: 100,
                    mode: "Cash",
                    date: "20/01/2025",
                    user: "saket21"
                  };
                  return (
                    <tr key={i}>
                      <td>{student.sno}</td>
                      <td>{student.name}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.class}</td>
                      <td>{student.section}</td>
                      <td>{student.receiptNo}</td>
                      <td>{student.admission}</td>
                      <td>{student.tuition}</td>
                      <td>{student.exam}</td>
                      <td>{student.transport}</td>
                      <td>{student.lateFee}</td>
                      <td>{student.previous}</td>
                      <td>{student.total}</td>
                      <td>{student.discount}</td>
                      <td>{student.mode}</td>
                      <td>{student.date}</td>
                      <td>{student.user}</td>
                      <td>
                        <button className="btn31 small31" onClick={() => handlePrint(student)}>Print</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ===== Print Area ===== */}
      {printStudent && (
        <div id="print-area">
          <div className="print-container31">
            {/* SCHOOL COPY */}
            <div className="receipt31">
              <div className="receipt-header31">
                <div className="school-logo31">
                  <img src="/vite.svg" alt="School Logo" />
                </div>
                <div className="school-name31">
                  <h1>SAKET PUBLIC SCHOOL</h1>
                  <p>VISHESHARGANJ, BASTI</p>
                </div>
              </div>
              <div className="copy-label31">SCHOOL COPY</div>
              <div className="receipt-details31">
                <div className="detail-row31">
                  <span>Receipt No:</span>
                  <span>{printStudent.receiptNo}</span>
                </div>
                <div className="detail-row31">
                  <span>Student Name:</span>
                  <span>{printStudent.name}</span>
                </div>
                <div className="detail-row31">
                  <span>Father Name:</span>
                  <span>{printStudent.fatherName}</span>
                </div>
                <div className="detail-row31">
                  <span>Class:</span>
                  <span>{printStudent.class} - {printStudent.section}</span>
                </div>
                <div className="detail-row31">
                  <span>Date:</span>
                  <span>{printStudent.date}</span>
                </div>
              </div>
              <table className="fee-table31">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Admission</td>
                    <td>₹{printStudent.admission}</td>
                  </tr>
                  <tr>
                    <td>Tuition</td>
                    <td>₹{printStudent.tuition}</td>
                  </tr>
                  <tr>
                    <td>Exam</td>
                    <td>₹{printStudent.exam}</td>
                  </tr>
                  <tr>
                    <td>Transport</td>
                    <td>₹{printStudent.transport}</td>
                  </tr>
                  <tr>
                    <td>Late Fee</td>
                    <td>₹{printStudent.lateFee}</td>
                  </tr>
                  <tr>
                    <td>Previous</td>
                    <td>₹{printStudent.previous}</td>
                  </tr>
                  <tr className="total-row31">
                    <td>Total</td>
                    <td>₹{printStudent.total}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>₹{printStudent.discount}</td>
                  </tr>
                  <tr className="net-total-row31">
                    <td>Net Total</td>
                    <td>₹{printStudent.total - printStudent.discount}</td>
                  </tr>
                </tbody>
              </table>
              <div className="payment-info31">
                <div>Payment Mode: {printStudent.mode}</div>
              </div>
              <div className="remark-signature31">
                <div className="remark31">
                  <strong>Remark:</strong> Fee paid successfully.
                </div>
                <div className="signature31">
                  <strong>Authorised Signature</strong>
                </div>
              </div>
            </div>

            {/* OFFICE COPY */}
            <div className="receipt31">
              <div className="receipt-header31">
                <div className="school-logo31">
                  <img src="/vite.svg" alt="School Logo" />
                </div>
                <div className="school-name31">
                  <h1>SAKET PUBLIC SCHOOL</h1>
                  <p>VISHESHARGANJ, BASTI</p>
                </div>
              </div>
              <div className="copy-label31">OFFICE COPY</div>
              <div className="receipt-details31">
                <div className="detail-row31">
                  <span>Receipt No:</span>
                  <span>{printStudent.receiptNo}</span>
                </div>
                <div className="detail-row31">
                  <span>Student Name:</span>
                  <span>{printStudent.name}</span>
                </div>
                <div className="detail-row31">
                  <span>Father Name:</span>
                  <span>{printStudent.fatherName}</span>
                </div>
                <div className="detail-row31">
                  <span>Class:</span>
                  <span>{printStudent.class} - {printStudent.section}</span>
                </div>
                <div className="detail-row31">
                  <span>Date:</span>
                  <span>{printStudent.date}</span>
                </div>
              </div>
              <table className="fee-table31">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Admission</td>
                    <td>₹{printStudent.admission}</td>
                  </tr>
                  <tr>
                    <td>Tuition</td>
                    <td>₹{printStudent.tuition}</td>
                  </tr>
                  <tr>
                    <td>Exam</td>
                    <td>₹{printStudent.exam}</td>
                  </tr>
                  <tr>
                    <td>Transport</td>
                    <td>₹{printStudent.transport}</td>
                  </tr>
                  <tr>
                    <td>Late Fee</td>
                    <td>₹{printStudent.lateFee}</td>
                  </tr>
                  <tr>
                    <td>Previous</td>
                    <td>₹{printStudent.previous}</td>
                  </tr>
                  <tr className="total-row31">
                    <td>Total</td>
                    <td>₹{printStudent.total}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>₹{printStudent.discount}</td>
                  </tr>
                  <tr className="net-total-row31">
                    <td>Net Total</td>
                    <td>₹{printStudent.total - printStudent.discount}</td>
                  </tr>
                </tbody>
              </table>
              <div className="payment-info31">
                <div>Payment Mode: {printStudent.mode}</div>
              </div>
              <div className="remark-signature31">
                <div className="remark31">
                  <strong>Remark:</strong> Fee paid successfully.
                </div>
                <div className="signature31">
                  <strong>Authorised Signature</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}