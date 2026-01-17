import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClassFeeAllocation.css";

const API_BASE = "http://localhost:5000";
const schoolId = "000000000000000000000001";

const AllocateClassFee = () => {
  const { className } = useParams();
  const navigate = useNavigate();

  const [feeData, setFeeData] = useState([]);
  const [concessions, setConcessions] = useState([]);

  /* ================= FETCH ALL ================= */
  const fetchAll = async () => {
    try {
      const feeRes = await fetch(`${API_BASE}/api/fees/${schoolId}`);
    const concessionRes = await fetch(`${API_BASE}/api/concession/${schoolId}`);
    const allocationRes = await fetch(
      `${API_BASE}/api/class-fee-allocation/${schoolId}/${className}`
    );

    console.log("Fee status:", feeRes.status);
    console.log("Concession status:", concessionRes.status);
    console.log("Allocation status:", allocationRes.status);

    const feeResult = await feeRes.json();
    const concessionResult = await concessionRes.json();
    const allocationResult = await allocationRes.json();

    console.log("Fees API:", feeResult);
    console.log("Concession API:", concessionResult);
    console.log("Allocation API:", allocationResult);
      const fees = feeResult.data || [];
      const concessionList = concessionResult.data || [];
      const savedAllocations = allocationResult.data || [];

      setConcessions(concessionList);

      /* Map saved allocations by fee name */
     const allocationMap = {};
savedAllocations.forEach(item => {
  allocationMap[item.feeName] = item.concessions || {};
});


      /* Build table data */
      const preparedData = fees.map((fee, index) => {
        const row = {
          id: index + 1,
          feeName: fee.feeName
        };

        concessionList.forEach(c => {
          row[c.categoryName] =
            allocationMap[fee.feeName]?.[c.categoryName] || {
              new: 0,
              old: 0
            };
        });

        return row;
      });

      setFeeData(preparedData);
    } catch (err) {
        console.error("Allocation fetch error:", err);

      toast.error("Failed to load allocation data");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (rowIndex, concessionName, type, value) => {
    const updated = [...feeData];
    updated[rowIndex][concessionName][type] = Number(value);
    setFeeData(updated);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      const payload = feeData.map(row => ({
        feeName: row.feeName,
        concessions: Object.fromEntries(
          concessions.map(c => [c.categoryName, row[c.categoryName]])
        )
      }));

      await fetch(`${API_BASE}/api/class-fee-allocation/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          className,
          feeData: payload
        })
      });

      toast.success("Fee allocation saved successfully");
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <div className="cfa-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="cfa-header-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="class-name-row">
          <label>Class Name</label>
          <input value={className} disabled />
        </div>
      </div>

      <table className="cfa-table large">
        <thead>
          <tr>
            <th rowSpan="2">S. No.</th>
            <th rowSpan="2">Fee Name</th>
            {concessions.map(c => (
              <th key={c._id} colSpan="2">
                {c.categoryName.toUpperCase()}
              </th>
            ))}
          </tr>
          <tr>
            {concessions.map(c => (
              <React.Fragment key={c._id}>
                <th>New</th>
                <th>Old</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {feeData.map((fee, rowIndex) => (
            <tr key={fee.id}>
              <td>{rowIndex + 1}</td>
              <td>{fee.feeName}</td>

              {concessions.map(c => (
                <React.Fragment key={c._id}>
                  <td>
                    <div className="input-box">
                      <small>New Student Amount (Rs.)</small>
                      <input
                        type="number"
                        value={fee[c.categoryName]?.new || 0}
                        onChange={e =>
                          handleChange(
                            rowIndex,
                            c.categoryName,
                            "new",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-box">
                      <small>Old Student Amount (Rs.)</small>
                      <input
                        type="number"
                        value={fee[c.categoryName]?.old || 0}
                        onChange={e =>
                          handleChange(
                            rowIndex,
                            c.categoryName,
                            "old",
                            e.target.value
                          )
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

      <div className="save-wrap">
        <button onClick={handleSave}>💾 Save Here</button>
      </div>
    </div>
  );
};

export default AllocateClassFee;
