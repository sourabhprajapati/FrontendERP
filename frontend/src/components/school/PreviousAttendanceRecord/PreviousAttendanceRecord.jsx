// PreviousAttendanceRecord.jsx
import React, { useState } from 'react';
import './PreviousAttendanceRecord.css';

const MONTHS = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
];

// Helper to generate demo attendance data
function generateDemoAttendance() {
  const map = { 0: 'P', 1: 'A', 2: 'L', 3: 'H' };
  return MONTHS.map((month, i) => {
    const days = Array.from({ length: 31 }, (_, d) => map[(i + d) % 4]);
    return { month, days };
  });
}

export default function PreviousAttendanceRecord() {
  const [session, setSession] = useState('2023-2024');
  const [student, setStudent] = useState('');
  const [stdClass, setStdClass] = useState('');
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendance, setAttendance] = useState([]);

  // Calculate cumulative totals
  const calculateTotals = () => {
    let totalP = 0, totalA = 0, totalL = 0;
    attendance.forEach(row => {
      totalP += row.days.filter(d => d === 'P').length;
      totalA += row.days.filter(d => d === 'A').length;
      totalL += row.days.filter(d => d === 'L').length;
    });
    return { totalP, totalA, totalL };
  };

  function onSearch(e) {
    e.preventDefault();
    if (!student.trim()) {
      alert('Please enter Student Name or Sr. No');
      return;
    }

    setLoading(true);
    setSearched(false);

    setTimeout(() => {
      setStudentInfo({
        name: student || 'Demo Student',
        father: 'Ram Kumar Sharma',
        class: stdClass || '8',
        section: section || 'B',
        session
      });
      setAttendance(generateDemoAttendance());
      setLoading(false);
      setSearched(true);

      document.getElementById('attendance-result-24')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  }

  function onReset() {
    setStudent('');
    setStdClass('');
    setSection('');
    setSearched(false);
    setStudentInfo(null);
    setAttendance([]);
  }

  function downloadPDF() {
    alert('PDF generation will be implemented using jsPDF or a backend service in production.');
  }

  const { totalP = 0, totalA = 0, totalL = 0 } = searched ? calculateTotals() : {};

  return (
    <div className="erp-page-24">
      <div className="container-24">
        <header className="erp-header-24">
          <div className="school-brand-24">
            <div className="logo-24">MS</div>
            <div>
              <div className="school-name-24">Mitdemo School</div>
              <div className="school-sub-24">Previous Attendance Record</div>
            </div>
          </div>
        </header>

        <main className="main-content-24">
          <section className="search-card-24">
            <form className="search-form-24" onSubmit={onSearch}>
              <div className="form-row-24">
                <label className="field-24">
                  <span className="label-24">Session</span>
                  <select value={session} onChange={e => setSession(e.target.value)}>
                    <option>2023-2024</option>
                    <option>2022-2023</option>
                    <option>2021-2022</option>
                    <option>2020-2021</option>
                  </select>
                </label>

                <label className="field-24 grow-24">
                  <span className="label-24">Student Name / Sr. No</span>
                  <input
                    value={student}
                    onChange={e => setStudent(e.target.value)}
                    placeholder="Enter name or roll number"
                  />
                </label>

                <label className="field-24">
                  <span className="label-24">Class (Optional)</span>
                  <input value={stdClass} onChange={e => setStdClass(e.target.value)} placeholder="e.g. 10" />
                </label>

                <label className="field-24">
                  <span className="label-24">Section (Optional)</span>
                  <input value={section} onChange={e => setSection(e.target.value)} placeholder="e.g. A" />
                </label>
              </div>

              <div className="form-actions-24">
                <button type="submit" className="btn-24 primary-24">Search</button>
                <button type="button" className="btn-24 ghost-24" onClick={onReset}>Reset</button>
              </div>
            </form>
          </section>

          <section
            id="attendance-result-24"
            className={`result-area-24 ${searched ? 'visible-24' : 'hidden-24'}`}
          >
            {loading && <div className="loader-24">Fetching attendance record...</div>}

            {searched && studentInfo && (
              <>
                <div className="result-top-24">
                  <div className="student-card-24">
                    <div className="student-row-24"><strong>Student Name:</strong> {studentInfo.name}</div>
                    <div className="student-row-24"><strong>Father's Name:</strong> {studentInfo.father}</div>
                    <div className="student-row-24"><strong>Class:</strong> {studentInfo.class}</div>
                    <div className="student-row-24"><strong>Section:</strong> {studentInfo.section}</div>
                    <div className="student-row-24"><strong>Session:</strong> {studentInfo.session}</div>
                  </div>

                  <div className="action-bar-24">
                    <button className="btn-24" onClick={downloadPDF}>PDF</button>
                    <button className="btn-24" onClick={() => window.print()}>Print</button>
                    <button className="btn-24 outline-24" onClick={onReset}>Search Another</button>
                  </div>
                </div>

                <div className="legend-24">
                  <div><span className="legend-box-24 present-24"></span> Present (P)</div>
                  <div><span className="legend-box-24 absent-24"></span> Absent (A)</div>
                  <div><span className="legend-box-24 leave-24"></span> Leave (L)</div>
                  <div><span className="legend-box-24 holiday-24"></span> Holiday (H)</div>
                </div>

                <div className="table-wrap-24">
                  <table className="attendance-table-24">
                    <thead>
                      <tr>
                        <th className="sticky-col-24">Month</th>
                        {Array.from({ length: 31 }, (_, i) => (
                          <th key={i}>{i + 1}</th>
                        ))}
                        <th className="summary-col-24">Present</th>
                        <th className="summary-col-24">Total P</th>
                        <th className="summary-col-24">Absent</th>
                        <th className="summary-col-24">Total A</th>
                        <th className="summary-col-24">Leave</th>
                        <th className="summary-col-24">Total L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((row, rIndex) => {
                        const presentCount = row.days.filter(d => d === 'P').length;
                        const absentCount = row.days.filter(d => d === 'A').length;
                        const leaveCount = row.days.filter(d => d === 'L').length;

                        return (
                          <tr key={rIndex}>
                            <td className="sticky-col-24 month-cell-24">{row.month}</td>
                            {row.days.map((day, cIndex) => (
                              <td key={cIndex} className={`cell-${day}-24`}>
                                <div className="cell-inner-24">{day}</div>
                              </td>
                            ))}
                            <td className="summary-col-24 number-24">{presentCount}</td>
                            <td className="summary-col-24 number-24">{calculateTotals().totalP}</td>
                            <td className="summary-col-24 number-24">{absentCount}</td>
                            <td className="summary-col-24 number-24">{calculateTotals().totalA}</td>
                            <td className="summary-col-24 number-24">{leaveCount}</td>
                            <td className="summary-col-24 number-24">{calculateTotals().totalL}</td>
                          </tr>
                        );
                      })}
                      {/* Final Total Row */}
                      <tr className="total-row-24">
                        <td className="sticky-col-24"><strong>Year Total</strong></td>
                        <td colSpan={31}></td>
                        <td className="summary-col-24 number-24"><strong>{totalP}</strong></td>
                        <td className="summary-col-24 number-24"><strong>{totalP}</strong></td>
                        <td className="summary-col-24 number-24"><strong>{totalA}</strong></td>
                        <td className="summary-col-24 number-24"><strong>{totalA}</strong></td>
                        <td className="summary-col-24 number-24"><strong>{totalL}</strong></td>
                        <td className="summary-col-24 number-24"><strong>{totalL}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {!loading && searched && attendance.length === 0 && (
              <div className="empty-state-24">No attendance record found for the given criteria.</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}