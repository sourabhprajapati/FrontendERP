import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClassFeeAllocation.css";

const AllocateClassFee = () => {
  const { className } = useParams();
  const navigate = useNavigate();

  const [feeData, setFeeData] = useState([
    {
      id: 1,
      feeName: "Admission fee (year)",
      general: { new: 600, old: 350 },
      staff: { new: 0, old: 0 },
      gardain: { new: 0, old: 0 },
    },
    {
      id: 2,
      feeName: "Tuition Fee (month)",
      general: { new: 350, old: 350 },
      staff: { new: 0, old: 0 },
      gardain: { new: 0, old: 0 },
    },
    {
      id: 3,
      feeName: "Exam Fees (quarter)",
      general: { new: 150, old: 150 },
      staff: { new: 0, old: 0 },
      gardain: { new: 0, old: 0 },
    },
  ]);

  const handleChange = (index, category, type, value) => {
    const updated = [...feeData];
    updated[index][category][type] = value;
    setFeeData(updated);
  };

  const handleSave = () => {
    // 🔐 Basic validation
    const hasInvalid = feeData.some((fee) =>
      ["general", "staff", "gardain"].some(
        (cat) => fee[cat].new < 0 || fee[cat].old < 0
      )
    );

    if (hasInvalid) {
      toast.error("Amount cannot be negative");
      return;
    }

    // 🔥 API call will go here
    console.log("Saving fee allocation for class:", className);
    console.log(feeData);

    toast.success("Fee allocation saved successfully");
  };

  return (
    <div className="cfa-container">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="cfa-header-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="class-name-row">
          <label>Class Name</label>
          <input value={className} disabled />
        </div>
      </div>

      {/* Table */}
      <table className="cfa-table large">
        <thead>
          <tr>
            <th rowSpan="2">S. No.</th>
            <th rowSpan="2">Fee Name</th>
            <th colSpan="2">GENERAL</th>
            <th colSpan="2">Staff</th>
            <th colSpan="2">Gardain</th>
          </tr>
          <tr>
            <th>New</th>
            <th>Old</th>
            <th>New</th>
            <th>Old</th>
            <th>New</th>
            <th>Old</th>
          </tr>
        </thead>

        <tbody>
          {feeData.map((fee, index) => (
            <tr key={fee.id}>
              <td>{index + 1}</td>
              <td>{fee.feeName}</td>

              {["general", "staff", "gardain"].map((cat) => (
                <React.Fragment key={cat}>
                  <td>
                    <div className="input-box">
                      <small>New Student Amount (Rs.)</small>
                      <input
                        type="number"
                        value={fee[cat].new}
                        onChange={(e) =>
                          handleChange(index, cat, "new", e.target.value)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-box">
                      <small>Old Student Amount (Rs.)</small>
                      <input
                        type="number"
                        value={fee[cat].old}
                        onChange={(e) =>
                          handleChange(index, cat, "old", e.target.value)
                        }
                      />
                    </div>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <div className="save-wrap">
        <button onClick={handleSave}>💾 Save Here</button>
      </div>
    </div>
  );
};

export default AllocateClassFee;
