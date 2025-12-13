// src/components/School/EmployeeList.jsx
import React, { useState } from 'react';
import EmployeeModal from './EmployeeModal/EmployeeModal';

const dummyEmployees = [
  {
    id: "1",
    employeeName: "Ravi Kumar Sharma",
    employeeUserName: "ravi.sharma",
    designation: "Senior Mathematics Teacher",
    department: "Mathematics",
    mobile: "9876543210",
    email: "ravi.sharma@school.com",
    userType: "Teacher"
  },
  {
    id: "2",
    employeeName: "Priya Singh",
    employeeUserName: "priya.singh",
    designation: "Science Teacher",
    department: "Science",
    mobile: "8765432109",
    email: "priya.singh@school.com",
    userType: "Teacher"
  },
  {
    id: "3",
    employeeName: "Amit Verma",
    employeeUserName: "amit.verma",
    designation: "Admin Officer",
    department: "Administration",
    mobile: "7654321098",
    email: "amit.verma@school.com",
    userType: "Admin"
  },
  {
    id: "4",
    employeeName: "Neha Gupta",
    employeeUserName: "neha.gupta",
    designation: "Librarian",
    department: "Library",
    mobile: "6543210987",
    email: "neha.gupta@school.com",
    userType: "Staff"
  },
  {
    id: "5",
    employeeName: "Suresh Raina",
    employeeUserName: "suresh.raina",
    designation: "Physical Education Teacher",
    department: "Sports",
    mobile: "5432109876",
    email: "suresh.raina@school.com",
    userType: "Teacher"
  }
];

function EmployeeList() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (emp) => {
    setSelectedEmployee(emp);
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
            <h1>All Employees ({dummyEmployees.length})</h1>
          </div>

          <div style={{ padding: '30px 40px' }}>
            <div style={{ display: 'grid', gap: '16px' }}>
              {dummyEmployees.map(emp => (
                <div
                  key={emp.id}
                  onClick={() => openModal(emp)}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1e293b', fontWeight: '600' }}>
                        {emp.employeeName}
                      </h3>
                      <p style={{ margin: '4px 0', color: '#64748b', fontSize: '14.5px' }}>
                        <strong>{emp.designation}</strong> • {emp.department}
                      </p>
                      <p style={{ margin: '8px 0 0 0', color: '#475569', fontSize: '14px' }}>
                        {emp.mobile} • {emp.email}
                      </p>
                    </div>
                    <div style={{
                      background: emp.userType === 'Admin' ? '#dc2626' : 
                                 emp.userType === 'Teacher' ? '#3b82f6' : '#10b981',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      fontSize: '13px',
                      fontWeight: '600',
                      minWidth: '80px',
                      textAlign: 'center'
                    }}>
                      {emp.userType}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </div>
  );
}

export default EmployeeList;