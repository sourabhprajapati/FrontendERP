import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassFeeAllocation.css";

/* API CONSTANT */
const API_BASE = "http://localhost:5000";

const ClassFeeAllocation = () => {
  const navigate = useNavigate();

  /* 🔥 REPLACED STATIC ARRAY WITH STATE */
  const [classes, setClasses] = useState([]);

  /* ================= FETCH CLASSES ================= */
  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/classes`);
      const data = await res.json();

      // backend returns array directly
      setClasses(data || []);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAllocate = (className) => {
    navigate(`/AllocateClassFee/${className}`);
  };

  return (
    <div className="cfa-container">
      <h2>Class Fee Allocation</h2>

      <table className="cfa-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Class</th>
            <th>Fee Allocate / Edit</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls._id}>
              <td>{index + 1}</td>
              <td>{cls.baseName}</td>
              <td>
                <button
                  className="allocate-btn"
                  onClick={() => handleAllocate(cls.baseName)}
                >
                  ➕ Allocate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassFeeAllocation;
