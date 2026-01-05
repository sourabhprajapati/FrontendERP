// src/components/School/EmployeeList.jsx
import React, { useState, useEffect } from 'react';
import EmployeeModal from './EmployeeModal/EmployeeModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const API_BASE_URL = 'http://localhost:5000';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded fallback - use this while login system is not implemented
  const schoolId = localStorage.getItem('schoolId') || "000000000000000000000001";

  useEffect(() => {
    console.log('Using schoolId:', schoolId); // ← for debugging

    const fetchStaff = async () => {
      if (!schoolId) {
        toast.error("School ID not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/staff/all?schoolId=${schoolId}`, {
  method: 'GET',  // ← change to GET
})

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch staff');
        }

        setEmployees(data.data || []);
      } catch (err) {
        setError(err.message);
        toast.error('Fetch staff error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [schoolId]);

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="stf-container13">
      <main className="stf-main-content13">
        <div className="stf-form-container13" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div className="stf-form-header13 centered13">
            <h1>All Employees ({employees.length})</h1>
          </div>

          {loading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading employees...</div>}

          {error && (
            <div style={{ color: 'red', textAlign: 'center', padding: '20px', fontWeight: '500' }}>
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <div style={{ padding: '30px 40px' }}>
              {employees.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px' }}>
                  No employees found for this school yet.
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {employees.map((emp) => (
                    <div
                      key={emp._id}
                      onClick={() => openEditModal(emp)}
                      style={{
                        background: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      className="employee-card"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1e293b' }}>
                            {emp.employeeName}
                          </h3>
                          <p style={{ margin: '4px 0', color: '#64748b' }}>
                            <strong>{emp.designation}</strong> • {emp.department || 'N/A'}
                          </p>
                          <p style={{ color: '#475569' }}>
                            {emp.mobile} • {emp.email}
                          </p>
                        </div>
                        <span
                          style={{
                            background: emp.userType === 'Admin' ? '#dc2626' :
                                       emp.userType === 'Teacher' ? '#3b82f6' : '#10b981',
                            color: 'white',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: '600',
                          }}
                        >
                          {emp.userType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={closeModal}
          onSaveSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default EmployeeList;