import React, { useState } from "react";
import { FaSearch, FaMoneyBillWave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateLateFee } from "../LateFeeManagement/lateFeeUtils";
import "./CollectFee1.css";

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
              <div><strong>Name:</strong> {student.name}</div>
              <div><strong>Class:</strong> {student.class}</div>
              <div><strong>Due Date:</strong> {student.dueDate}</div>
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
                    onChange={(e) =>
                      handleFeeChange(key, e.target.value)
                    }
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
                  Late Fee ({lateFeeConfig.mode === "PERDAY"
                    ? "Per Day"
                    : "One Time"})
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
        <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS / IMPS)</option>
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
        <label>{paymentMode === "CHEQUE" ? "Cheque No" : "DD No"}</label>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectFee1;
