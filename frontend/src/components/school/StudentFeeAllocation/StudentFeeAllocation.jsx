import React, { useState } from "react";
import { FaSearch, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentFeeAllocation.css";

const months = [
  "APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER",
  "OCTOBER","NOVEMBER","DECEMBER","JANUARY","FEBRUARY","MARCH"
];

const StudentFeeAllocation = () => {
  const [bulkFees, setBulkFees] = useState(
    Object.fromEntries(months.map(m => [m, 0]))
  );

  const [students, setStudents] = useState([
    { name: "AARUSHI GURJAR", type: "old", fees: {} },
    { name: "ANAMIKA BHURIYA", type: "old", fees: {} },
    { name: "ANTIM BALA DAMAR", type: "new", fees: {} },
    { name: "ARUN KHARADI", type: "old", fees: {} },
  ]);

  /* ================= BULK ================= */
  const handleBulkChange = (month, value) => {
    setBulkFees({ ...bulkFees, [month]: value });
  };

  const applyBulkFees = () => {
    setStudents(
      students.map(s => ({ ...s, fees: { ...bulkFees } }))
    );
    toast.success("Bulk fees applied successfully");
  };

  /* ================= STUDENT ================= */
  const handleStudentChange = (index, month, value) => {
    const updated = [...students];
    updated[index].fees[month] = value;
    setStudents(updated);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    toast.success("Student fee allocation saved successfully");
    console.log("Saved data:", students);
    // API call here
  };

  return (
    <div className="sfa-container">

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= FILTER ================= */}
      <div className="sfa-card">
        <h3>Select a Class</h3>

        <div className="sfa-form-grid">
          <div>
            <label>Select a Class *</label>
            <select>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
            </select>
          </div>

          <div>
            <label>Select Section *</label>
            <select>
              <option>All</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          <div>
            <label>Select Category *</label>
            <select>
              <option>GENERAL</option>
              <option>Staff</option>
              <option>Gardain</option>
            </select>
          </div>

          <div>
            <label>Select Fee *</label>
            <select>
              <option>Admission Form</option>
              <option>Tuition Fee</option>
            </select>
          </div>
        </div>

        <div className="sfa-search">
          <button>
            <FaSearch style={{ marginRight: "6px" }} />
            Search
          </button>
        </div>
      </div>

      {/* ================= BULK ================= */}
      <div className="sfa-card">
        <h3>Bulk Fees Updation</h3>

        <div className="sfa-month-row">
          {months.map(month => (
            <div key={month}>
              <label>{month}</label>
              <input
                type="number"
                value={bulkFees[month]}
                onChange={(e) => handleBulkChange(month, e.target.value)}
              />
            </div>
          ))}

          <button className="update-btn" onClick={applyBulkFees}>
            Update Fees
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="sfa-card">
        <div className="sfa-table-wrapper">
          <table className="sfa-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Type</th>
                {months.map(m => <th key={m}>{m}</th>)}
              </tr>
            </thead>

            <tbody>
              {students.map((stu, index) => (
                <tr key={index}>
                  <td>{stu.name}</td>
                  <td className={stu.type}>{stu.type}</td>

                  {months.map(m => (
                    <td key={m}>
                      <input
                        type="number"
                        value={stu.fees[m] || 0}
                        onChange={(e) =>
                          handleStudentChange(index, m, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="save-wrap">
          <button onClick={handleSave}>
            <FaSave style={{ marginRight: "8px" }} />
            Save Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeAllocation;
