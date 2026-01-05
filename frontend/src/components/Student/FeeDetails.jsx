import { FiDownload, FiFileText, FiAlertCircle } from "react-icons/fi";
import "./FeeDetails.css";

const student = {
  name: "Aman Sharma",
  roll: "23",
  classSection: "10 A",
  mobile: "9545456789"
};

const feeSummary = {
  total: 35000,
  paid: 28000,
  balance: 7000,
  nextDueDate: "30 Nov 2025",
  lastPayment: "15 Sep 2025"
};

const fees = [
  { head: "Tuition Fee", amount: 20000, paid: 20000, due: 0, dueDate: "Paid", status: "Paid", receipt: "#" },
  { head: "Exam Fee", amount: 2000, paid: 2000, due: 0, dueDate: "Paid", status: "Paid", receipt: "#" },
  { head: "Transport Fee", amount: 8000, paid: 4000, due: 4000, dueDate: "30 Nov 2025", status: "Partial", receipt: "#" },
  { head: "Uniform Fee", amount: 5000, paid: 2000, due: 3000, dueDate: "30 Nov 2025", status: "Due", receipt: "#" }
];

const transactions = [
  { date: "15 Sep 2025", head: "Tuition", amount: 10000, mode: "Online", receipt: "#" },
  { date: "01 Jun 2025", head: "Transport", amount: 4000, mode: "Cash", receipt: "#" }
];

export default function FeeDetails() {
  return (
    <div className="fee-main">
      <div className="fee-profile-bar">
        <span className="fee-profile-chip">{student.name}</span>
        <span>Class: {student.classSection}</span>
        <span>Roll No: {student.roll}</span>
        <span>Mobile: {student.mobile}</span>
      </div>

      <div className="fee-cards-row">
        <div className="fee-card">
          <div className="fee-card-label">Total Fee</div>
          <div className="fee-card-amt fee-total">₹{feeSummary.total}</div>
        </div>
        <div className="fee-card">
          <div className="fee-card-label">Amount Paid</div>
          <div className="fee-card-amt fee-paid">₹{feeSummary.paid}</div>
        </div>
        <div className="fee-card">
          <div className="fee-card-label">Balance Due</div>
          <div className="fee-card-amt fee-due">₹{feeSummary.balance}</div>
        </div>
        <div className="fee-card">
          <div className="fee-card-label">Next Due Date</div>
          <div className="fee-card-amt">{feeSummary.nextDueDate}</div>
        </div>
      </div>

      {feeSummary.balance > 0 && <div className="fee-alert"><FiAlertCircle /> Outstanding due: ₹{feeSummary.balance}. Please pay before {feeSummary.nextDueDate}.</div>}

      <div className="fee-section-label-row">
        <span>Fees Breakdown</span>
        <button className="fee-statement-download"><FiDownload /> Download Statement</button>
      </div>
      <table className="fees-table">
        <thead>
          <tr>
            <th>Fee Head</th>
            <th>Amount</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, i) => (
            <tr key={i}>
              <td>{fee.head}</td>
              <td>₹{fee.amount}</td>
              <td>₹{fee.paid}</td>
              <td>₹{fee.due}</td>
              <td>{fee.dueDate}</td>
              <td>
                <span className={`fee-status-pill ${fee.status.toLowerCase()}`}>{fee.status}</span>
              </td>
              <td>
                <a href={fee.receipt} className="fee-receipt-link"><FiFileText /> View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fee-section-label">Recent Transactions</div>
      <table className="fees-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Fee Head</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr, i) => (
            <tr key={i}>
              <td>{tr.date}</td>
              <td>{tr.head}</td>
              <td>₹{tr.amount}</td>
              <td>{tr.mode}</td>
              <td>
                <a href={tr.receipt} className="fee-receipt-link"><FiFileText /> View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fee-pay-btn-row">
        <button className={`fee-pay-now${feeSummary.balance === 0 ? " disabled" : ""}`} disabled={feeSummary.balance === 0}>
          Pay Now
        </button>
      </div>
    </div>
  );
}
