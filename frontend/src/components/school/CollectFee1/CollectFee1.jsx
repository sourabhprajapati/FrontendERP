import React, { useState } from "react";
import { FaSearch, FaMoneyBillWave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateLateFee } from "../LateFeeManagement/lateFeeUtils";
import "./CollectFee1.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
const CollectFee1 = () => {
  /* ===== Late Fee Config (FROM DB) ===== */
  const lateFeeConfig = {
    mode: "PERDAY", // ONETIME | PERDAY
    amount: 50,
  };

  /* ===== STATES ===== */
  const [searchName, setSearchName] = useState("");

  const [student, setStudent] = useState(null);
  const [paidDate, setPaidDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [fees, setFees] = useState({
    tuition: 1500,
    admission: 300,
    exam: 200,
    transport: 0,
  });

  /* ===== SEARCH ===== */
  const handleSearch = () => {
    setStudent({
      name: "AARUSHI GURJAR",
      class: "LKG",
      dueDate: "2026-08-10",
    });
    toast.success("Student loaded successfully");
  };
  const handleNameSearch = (value) => {
    setSearchName(value);

    if (!value) {
      setFilteredStudents([]);
      setStudent(null);
      return;
    }

    const results = studentsData.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStudents(results);
  };
  const generateReceiptPDF = async () => {
  if (!student) {
    toast.error("Please select a student first");
    return;
  }

  try {
    const doc = new jsPDF("p", "mm", "a4");

    const receiptNo = `REC-${Date.now()}`;
    const receiptDate = new Date().toLocaleDateString("en-GB");

    // QR Code (SAFE)
    const qrText = `Receipt:${receiptNo}|Student:${student.name}`;
    const qrDataUrl = await QRCode.toDataURL(qrText);

    const drawReceipt = (x, title) => {
      // Border
      doc.rect(x + 5, 10, 95, 270);

      // Header
      doc.setFontSize(14);
      doc.text("KSV", x + 52, 18, { align: "center" });

      doc.setFontSize(9);
      doc.text(
        "19-K-4, Jyoti Nagar Jaipur Rajasthan - 302005",
        x + 52,
        24,
        { align: "center" }
      );
      doc.text("AFFILIATION NO.: 1538", x + 52, 28, { align: "center" });
      doc.text("Phone No. - 8058848888", x + 52, 32, { align: "center" });

      // Title
      doc.setFillColor(204, 232, 199);
      doc.roundedRect(x + 10, 36, 85, 8, 4, 4, "F");
      doc.text(
        `Fee Receipt - 2025-26 (${title})`,
        x + 52,
        41,
        { align: "center" }
      );

      // Student table
      autoTable(doc, {
        startY: 48,
        margin: { left: x + 10 },
        tableWidth: 85,
        styles: { fontSize: 9 },
        body: [
          [`Receipt No : ${receiptNo}`, `Date : ${receiptDate}`],
          [`Student : ${student.name}`, ""],
          [`Class : ${student.class}`, ""],
          [`Payment Mode : ${paymentMode}`, ""],
          [`Total Paid :  ${totalPayable}`, ""],
        ],
      });

      // Fee table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        margin: { left: x + 10 },
        tableWidth: 85,
        head: [["Fee Type", "Amount"]],
        body: [
          ["Tuition Fee", fees.tuition],
          ["Admission Fee", fees.admission],
          ["Exam Fee", fees.exam],
          ["Late Fee", lateFee],
          ["Paid", totalPayable],
        ],
        styles: { fontSize: 9 },
        headStyles: { fillColor: [204, 232, 199] },
        columnStyles: { 1: { halign: "right" } },
      });

    //   // QR + signature
    //   doc.addImage(qrDataUrl, "PNG", x + 42, 230, 25, 25);
    //   doc.text("Auth. Signature", x + 60, 260);
    };

    drawReceipt(0, "Office Copy");
    drawReceipt(105, "Student Copy");

    // ✅ DOWNLOAD
    doc.save(`Fee_Receipt_${student.name}.pdf`);
  } catch (err) {
    console.error("PDF Error:", err);
    toast.error("Failed to generate receipt PDF");
  }
};


  /* ===== FEE CHANGE ===== */
  const handleFeeChange = (key, value) => {
    setFees({ ...fees, [key]: Number(value) });
  };

  /* ===== CALCULATIONS ===== */
  const baseFee = Object.values(fees).reduce((a, b) => a + b, 0);

  const lateFee = student
    ? calculateLateFee({
        dueDate: student.dueDate,
        paidDate: paidDate || null,
        mode: lateFeeConfig.mode,
        amount: lateFeeConfig.amount,
      })
    : 0;

  const totalPayable = baseFee + lateFee;

  /* ===== COLLECT ===== */
  const handleCollectFee = () => {
    if (!paidDate || !paymentMode) {
      toast.error("Please select payment date and mode");
      return;
    }

    toast.success("Fee collected successfully");

    console.log({
      student,
      fees,
      baseFee,
      lateFee,
      totalPayable,
      paidDate,
      paymentMode,
    });
  };

  return (
    <div className="cf-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ===== SEARCH ===== */}
      <div className="cf-card">
        <h3>Search Student</h3>

        <div className="cf-form-grid">
          <div>
            <label>Admission No *</label>
            <input placeholder="Enter admission no" />
          </div>

          <div>
            <label>Class *</label>
            <select>
              <option>LKG</option>
              <option>UKG</option>
            </select>
          </div>
        </div>

        <div className="cf-search">
          <button onClick={handleSearch}>
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {student && (
        <>
          {/* ===== STUDENT ===== */}
          <div className="cf-card">
            <h3>Student Details</h3>
            <div className="cf-student-grid">
              <div>
                <strong>Name:</strong> {student.name}
              </div>
              <div>
                <strong>Class:</strong> {student.class}
              </div>
              <div>
                <strong>Due Date:</strong> {student.dueDate}
              </div>
            </div>
          </div>

          {/* ===== FEES ===== */}
          <div className="cf-card">
            <h3>Fee Details</h3>

            <div className="cf-fee-inputs">
              {Object.entries(fees).map(([key, value]) => (
                <div key={key}>
                  <label>{key.toUpperCase()} FEE</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleFeeChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== SUMMARY ===== */}
          <div className="cf-card">
            <h3>Fee Summary</h3>

            <div className="cf-fee-table">
              <div>
                <span>Total Fee</span>
                <strong>₹ {baseFee}</strong>
              </div>

              <div>
                <span>
                  Late Fee (
                  {lateFeeConfig.mode === "PERDAY" ? "Per Day" : "One Time"})
                </span>
                <strong className={lateFee > 0 ? "late" : ""}>
                  ₹ {lateFee}
                </strong>
              </div>

              <div className="total">
                <span>Total Payable</span>
                <strong>₹ {totalPayable}</strong>
              </div>
            </div>

            {/* ================= PAYMENT DETAILS ================= */}
            <div className="cf-card">
              <h3>Payment Details</h3>

              <div className="cf-form-grid">
                <div>
                  <label>Payment Date *</label>
                  <input
                    type="date"
                    value={paidDate}
                    onChange={(e) => setPaidDate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Payment Mode *</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="CASH">Cash</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="DD">Demand Draft</option>
                    <option value="UPI">UPI</option>
                    <option value="NET_BANKING">Net Banking</option>
                    <option value="CARD">Debit / Credit Card</option>
                    <option value="WALLET">Wallet</option>
                    <option value="BANK_TRANSFER">
                      Bank Transfer (NEFT / RTGS / IMPS)
                    </option>
                  </select>
                </div>
              </div>

              {/* ===== CASH ===== */}
              {paymentMode === "CASH" && (
                <div className="cf-form-grid">
                  <div>
                    <label>Received By</label>
                    <input placeholder="Staff name" />
                  </div>
                  <div>
                    <label>Remarks</label>
                    <input placeholder="Optional remarks" />
                  </div>
                </div>
              )}

              {/* ===== CHEQUE / DD ===== */}
              {(paymentMode === "CHEQUE" || paymentMode === "DD") && (
                <div className="cf-form-grid">
                  <div>
                    <label>Bank Name</label>
                    <input />
                  </div>
                  <div>
                    <label>
                      {paymentMode === "CHEQUE" ? "Cheque No" : "DD No"}
                    </label>
                    <input />
                  </div>
                  <div>
                    <label>Instrument Date</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>Clearing Date</label>
                    <input type="date" />
                  </div>
                </div>
              )}

              {/* ===== UPI ===== */}
              {paymentMode === "UPI" && (
                <div className="cf-form-grid">
                  <div>
                    <label>UPI App</label>
                    <select>
                      <option>Google Pay</option>
                      <option>PhonePe</option>
                      <option>Paytm</option>
                      <option>BHIM</option>
                    </select>
                  </div>
                  <div>
                    <label>Transaction ID</label>
                    <input />
                  </div>
                </div>
              )}

              {/* ===== NET BANKING ===== */}
              {paymentMode === "NET_BANKING" && (
                <div className="cf-form-grid">
                  <div>
                    <label>Bank Name</label>
                    <input />
                  </div>
                  <div>
                    <label>Transaction ID</label>
                    <input />
                  </div>
                </div>
              )}

              {/* ===== CARD ===== */}
              {paymentMode === "CARD" && (
                <div className="cf-form-grid">
                  <div>
                    <label>Card Type</label>
                    <select>
                      <option>Debit Card</option>
                      <option>Credit Card</option>
                    </select>
                  </div>
                  <div>
                    <label>Last 4 Digits</label>
                    <input maxLength={4} />
                  </div>
                  <div>
                    <label>Bank Name</label>
                    <input />
                  </div>
                  <div>
                    <label>Transaction ID</label>
                    <input />
                  </div>
                </div>
              )}

              {/* ===== WALLET ===== */}
              {paymentMode === "WALLET" && (
                <div className="cf-form-grid">
                  <div>
                    <label>Wallet Provider</label>
                    <select>
                      <option>Paytm</option>
                      <option>PhonePe</option>
                      <option>Amazon Pay</option>
                    </select>
                  </div>
                  <div>
                    <label>Transaction ID</label>
                    <input />
                  </div>
                </div>
              )}

              {/* ===== BANK TRANSFER ===== */}
              {paymentMode === "BANK_TRANSFER" && (
                <div className="cf-form-grid">
                  <div>
                    <label>Transfer Type</label>
                    <select>
                      <option>NEFT</option>
                      <option>RTGS</option>
                      <option>IMPS</option>
                    </select>
                  </div>
                  <div>
                    <label>Bank Name</label>
                    <input />
                  </div>
                  <div>
                    <label>Transaction ID</label>
                    <input />
                  </div>
                  <div>
                    <label>Transaction Date</label>
                    <input type="date" />
                  </div>
                </div>
              )}
            </div>

            <div className="cf-pay">
              <button onClick={handleCollectFee}>
                <FaMoneyBillWave /> Collect Fee
              </button>

              <button
                type="button"
                className="receipt-btn"
                onClick={generateReceiptPDF}
              >
                Download Fee Receipt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectFee1;
