import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./PaymentReceipt.css";

const MOCK_RECEIPTS = [
  { id: "RCPT001", adm: "ST1001", name: "Aarav Sharma", amount: 2500, mode: "Cash", date: "2025-11-01 10:30 AM" },
  { id: "RCPT002", adm: "ST1002", name: "Riya Patel", amount: 1500, mode: "UPI", date: "2025-11-02 02:15 PM" },
  { id: "RCPT003", adm: "ST1003", name: "Kabir Singh", amount: 5000, mode: "Cheque", date: "2025-11-03 11:00 AM" },
  { id: "RCPT004", adm: "ST1004", name: "Sia Kapoor", amount: 3000, mode: "Card", date: "2025-11-04 04:45 PM" },
  { id: "RCPT005", adm: "ST1005", name: "Arjun Verma", amount: 4200, mode: "UPI", date: "2025-10-15 09:20 AM" },
  { id: "RCPT006", adm: "ST1006", name: "Ishita Rao", amount: 2800, mode: "Cash", date: "2025-10-20 01:30 PM" },
];

export default function PaymentReceipt() {
  const [receipts] = useState(MOCK_RECEIPTS);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const printRef = useRef(); // For month-wise PDF

  const filtered = receipts.filter(r => {
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.adm.toLowerCase().includes(search.toLowerCase()) ||
      r.mode.toLowerCase().includes(search.toLowerCase());

    const matchesMonth = selectedMonth
      ? r.date.startsWith(selectedMonth)
      : true;

    return matchesSearch && matchesMonth;
  });

  // Extract unique months for dropdown
  const months = [...new Set(receipts.map(r => r.date.substring(0, 7)))]
    .sort((a, b) => b.localeCompare(a));

  // Individual Receipt PDF Download
  const downloadPDF = async (receipt) => {
    const doc = new jsPDF("p", "mm", "a4");
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246);
    doc.text("ABC International School", width / 2, 30, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Fee Payment Receipt", width / 2, 45, { align: "center" });

    // Dashed line
    doc.setDrawColor(200, 200, 200);
    doc.setLineDashPattern([5, 5], 0);
    doc.line(20, 55, width - 20, 55);
    doc.setLineDashPattern([], 0);

    // Receipt Details
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);

    const startY = 70;
    doc.text(`Receipt No: ${receipt.id}`, 30, startY);
    doc.text(`Student Name: ${receipt.name}`, 30, startY + 15);
    doc.text(`Admission No: ${receipt.adm}`, 30, startY + 30);
    doc.text(`Payment Mode: ${receipt.mode}`, 30, startY + 45);
    doc.text(`Date & Time: ${receipt.date}`, 30, startY + 60);

    // Amount Highlight
    doc.setFontSize(36);
    doc.setTextColor(16, 185, 129);
    doc.text(`₹${receipt.amount.toLocaleString()}`, width / 2, startY + 100, { align: "center" });

    // Footer
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your payment!", width / 2, height - 50, { align: "center" });
    doc.text("For queries: accounts@abcschool.edu.in", width / 2, height - 40, { align: "center" });

    doc.save(`Receipt_${receipt.id}.pdf`);
  };

  // Month-wise Bulk PDF Download
  const downloadMonthPDF = async () => {
    if (!selectedMonth) {
      alert("Please select a month first!");
      return;
    }

    const monthReceipts = receipts.filter(r => r.date.startsWith(selectedMonth));
    const doc = new jsPDF("p", "mm", "a4");
    let yOffset = 20;

    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text(`Monthly Receipts - ${selectedMonth.replace("-", " / ")}`, 105, yOffset, { align: "center" });
    yOffset += 15;

    for (let i = 0; i < monthReceipts.length; i++) {
      const r = monthReceipts[i];

      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFillColor(59, 130, 246);
      doc.rect(15, yOffset, 180, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(`${r.id} - ${r.name}`, 20, yOffset + 7);

      yOffset += 15;

      doc.setTextColor(60, 60, 60);
      doc.setFontSize(12);
      doc.text(`Adm No: ${r.adm} | Mode: ${r.mode} | Date: ${r.date}`, 20, yOffset);
      doc.setFontSize(16);
      doc.setTextColor(16, 185, 129);
      doc.text(`₹${r.amount.toLocaleString()}`, 170, yOffset, { align: "right" });

      yOffset += 20;
      doc.setDrawColor(220, 220, 220);
      doc.line(15, yOffset - 5, 195, yOffset - 5);
    }

    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()} | ABC International School`, 105, footerY, { align: "center" });

    doc.save(`Receipts_${selectedMonth}.pdf`);
  };

  return (
    <div className="pr20-root">
      <div className="pr20-container">
        <div className="pr20-header">
          <h1 className="pr20-title">Payment Receipts</h1>
          <p className="pr20-subtitle">View, print, or download all fee receipts</p>
        </div>

        {/* Search & Month Filter */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap", justifyContent: "center" }}>
          <div className="pr20-search">
            <input
              type="text"
              placeholder="Search by receipt ID, name, adm no, or mode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: "16px 20px",
              fontSize: "16px",
              borderRadius: "16px",
              border: "2px solid #e0e7ff",
              background: "white",
              minWidth: "200px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
            }}
          >
            <option value="">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>{m.replace("-", " / ")}</option>
            ))}
          </select>

          {selectedMonth && (
            <button
              onClick={downloadMonthPDF}
              style={{
                padding: "16px 24px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(139,92,246,0.3)"
              }}
            >
              Download All ({selectedMonth})
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="pr20-empty">
            <div className="pr20-empty-icon">No receipts found</div>
            <p>No receipts match your search or selected month</p>
          </div>
        ) : (
          <div className="pr20-grid">
            {filtered.map((r) => (
              <div key={r.id} className="pr20-card">
                <div className="pr20-card-header">
                  <h3 className="pr20-receipt-id">{r.id}</h3>
                  <div className="pr20-amount">₹{r.amount.toLocaleString()}</div>
                </div>
                <div className="pr20-card-body">
                  <div className="pr20-info">
                    <span className="pr20-label">Student</span>
                    <span className="pr20-value">{r.name}</span>
                  </div>
                  <div className="pr20-info">
                    <span className="pr20-label">Adm No</span>
                    <span className="pr20-value">{r.adm}</span>
                  </div>
                  <div className="pr20-info">
                    <span className="pr20-label">Mode</span>
                    <span className="pr20-value">{r.mode}</span>
                  </div>
                  <div className="pr20-date">{r.date}</div>

                  <div className="pr20-actions">
                    <button className="pr20-btn pr20-btn-print" onClick={() => printReceipt(r)}>
                      Print
                    </button>
                    <button
                      className="pr20-btn pr20-btn-download"
                      onClick={() => downloadPDF(r)}
                      style={{ background: "#ec4899" }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Keep your existing printReceipt function
const printReceipt = (r) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head><title>Receipt ${r.id}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
      .receipt { max-width: 500px; margin: 0 auto; background: white; padding: 50px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); text-align: center; }
      .header { font-size: 32px; font-weight: bold; color: #3b82f6; margin-bottom: 10px; }
      .subheader { font-size: 20px; color: #64748b; margin-bottom: 30px; }
      .info { text-align: left; line-height: 2.2; font-size: 18px; margin: 30px 0; }
      .amount { font-size: 56px; font-weight: 900; color: #10b981; margin: 40px 0; }
      hr { border: 2px dashed #e2e8f0; margin: 40px 0; }
      .footer { color: #94a3b8; font-size: 14px; }
    </style>
    </head><body>
    <div class="receipt">
      <div class="header">ABC International School</div>
      <div class="subheader">Fee Payment Receipt</div>
      <hr>
      <div class="info">
        <strong>Receipt No:</strong> ${r.id}<br>
        <strong>Student Name:</strong> ${r.name}<br>
        <strong>Admission No:</strong> ${r.adm}<br>
        <strong>Payment Mode:</strong> ${r.mode}<br>
        <strong>Date & Time:</strong> ${r.date}
      </div>
      <div class="amount">₹${r.amount.toLocaleString()}</div>
      <hr>
      <div class="footer">
        Thank you for your payment!<br>
        Contact: accounts@abcschool.edu.in
      </div>
    </div>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 800);
};