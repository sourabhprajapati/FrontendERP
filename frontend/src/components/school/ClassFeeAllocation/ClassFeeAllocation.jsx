import React from "react";
import { useNavigate } from "react-router-dom";
import "./ClassFeeAllocation.css";

const ClassFeeAllocation = () => {
  const navigate = useNavigate();

  const classes = [
    { id: 4, name: "UKG" },
    { id: 2, name: "Nursery" },
    { id: 3, name: "LKG" },
    { id: 13, name: "9TH" },
    { id: 12, name: "8TH" },
  ];

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
            <tr key={cls.id}>
              <td>{index + 1}</td>
              <td>{cls.name}</td>
              <td>
                <button
                  className="allocate-btn"
                  onClick={() => handleAllocate(cls.name)}
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
