// src/components/School/SearchEmployee.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search, Download, UserX, Edit3 } from "lucide-react"; // Added Edit3 icon
import EmployeeModal from "../EditEmployee/EmployeeModal/EmployeeModal"; // ← Your existing modal
import "./SearchEmployee.css";

const API_BASE_URL = "http://localhost:5000";
const ITEMS_PER_PAGE = 4;

function SearchEmployee() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schoolId = localStorage.getItem("schoolId") || "000000000000000000000001";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/staff/all?schoolId=${schoolId}`);
        const data = await response.json();

        if (!data.success) throw new Error(data.message || "Failed to fetch employees");

        setEmployees(data.data || []);
        setFilteredEmployees(data.data || []);
      } catch (err) {
        toast.error(err.message || "Error loading employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [schoolId]);

  // Real-time filtering
  useEffect(() => {
    let filtered = employees;

    if (searchName.trim()) {
      filtered = filtered.filter((emp) =>
        emp.employeeName?.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchCategory) {
      filtered = filtered.filter((emp) => emp.designation === searchCategory);
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchName, searchCategory, employees]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Open Edit Modal
  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Refresh list after successful edit
  const handleEditSuccess = () => {
    toast.success("Employee updated successfully!");
    // Refetch data to show updated info
    fetch(`${API_BASE_URL}/api/staff/all?schoolId=${schoolId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEmployees(data.data || []);
          setFilteredEmployees(data.data || []);
        }
      });
    closeModal();
  };

  const handleDownload = (emp) => {
    toast.success(`Downloading documents for ${emp.employeeName}`);
  };

 const handleInactive = async (emp) => {
  if (!window.confirm(`Are you sure you want to mark ${emp.employeeName} as Inactive?`)) {
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/staff/inactive/${emp._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId })
      }
    );

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);

      // Remove inactive staff from UI list
      setEmployees(prev => prev.filter(e => e._id !== emp._id));
      setFilteredEmployees(prev => prev.filter(e => e._id !== emp._id));
    } else {
      toast.error(result.message || "Failed to inactivate staff");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error while inactivating staff");
  }
};
const handleToggleStatus = async (emp) => {
  try {
    const newStatus = emp.status === "Inactive" ? "Active" : "Inactive";

    const confirmMsg =
      newStatus === "Inactive"
        ? `Mark ${emp.employeeName} as Inactive?`
        : `Activate ${emp.employeeName}?`;

    if (!window.confirm(confirmMsg)) return;

    const response = await fetch(
      `${API_BASE_URL}/api/staff/status/${emp._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          schoolId
        })
      }
    );

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);

      // Update UI instantly
      setEmployees(prev =>
        prev.map(e =>
          e._id === emp._id ? { ...e, status: newStatus } : e
        )
      );
    } else {
      toast.error(result.message || "Status update failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error");
  }
};


  return (
    <div className="search-emp-container-2026">
      <ToastContainer />

      <main className="search-emp-main-content-2026">
        <div className="search-emp-card-wrapper-2026">
          {/* Header */}
          <div className="search-emp-header-title-2026">
            <h1>Search Employee Details</h1>
          </div>

          {/* Red Alert Note */}
          <div className="search-emp-alert-note-2026">
            <span>⚠️</span>
            Note: Please select employee name from Autocomplete list
          </div>

          {/* Search By Name */}
          <div className="search-emp-section-wrapper-2026">
            <div className="search-emp-section-title-2026">
              Search Employee By Name
            </div>
            <div className="search-emp-input-row-2026">
              <input
                type="text"
                placeholder="Enter Employee Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="search-emp-search-input-2026"
              />
              <button className="search-emp-show-btn-2026">
                <Search size={20} />
                Show
              </button>
            </div>
          </div>

          <div className="search-emp-divider-line-2026" />

          {/* Search By Category (Designation) */}
          <div className="search-emp-section-wrapper-2026">
            <div className="search-emp-section-title-2026">
              Search Employee by Category
            </div>
            <div className="search-emp-input-row-2026">
              <span style={{ color: "#64748b", fontSize: "15.5px" }}>
                Select a category
              </span>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="search-emp-category-select-2026"
              >
                <option value="">Select here</option>
                <option value="Admin">Admin</option>
                <option value="Authority">Authority</option>
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Administrative Officer">Administrative Officer</option>
                <option value="Accounts">Accounts</option>
                <option value="Teacher">Teacher</option>
                <option value="Librarian">Librarian</option>
                <option value="Front Office">Front Office</option>
                <option value="Office Staff">Office Staff</option>
                <option value="Transport Manager">Transport Manager</option>
                <option value="Driver">Driver</option>
                <option value="Conductor">Conductor</option>
                <option value="Attendant">Attendant</option>
                <option value="Security">Security</option>
                <option value="Others">Others</option>
                <option value="Book Scanner">Book Scanner</option>
                <option value="Warden">Warden</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="search-emp-loading-text-2026">
              Loading employees...
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="search-emp-empty-text-2026">
              No employees found matching your search.
            </div>
          ) : (
            <>
              <div className="search-emp-results-grid-2026">
                {currentEmployees.map((emp) => (
                  <div key={emp._id} className="search-emp-result-card-2026">
                    <div className="search-emp-info-grid-2026">
                      <div>
                        <div className="search-emp-info-item-2026">
                          <strong>Name:</strong> {emp.employeeName || "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Father's Name:</strong> {emp.fatherName || "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Category:</strong> {emp.userType || "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Department:</strong> {emp.department || "-"}
                        </div>
                      </div>

                      <div>
                        <div className="search-emp-info-item-2026">
                          <strong>Kind of Teacher:</strong> {emp.kindOfTeacher || "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Nature of Appointment:</strong>{" "}
                          {emp.natureOfAppointment || "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Teaching Class:</strong>{" "}
                          {emp.teachingClass?.length > 0
                            ? emp.teachingClass.join(", ")
                            : "-"}
                        </div>
                        <div className="search-emp-info-item-2026">
                          <strong>Contact No.:</strong> {emp.mobile || "-"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="search-emp-action-buttons-2026">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => openEditModal(emp)}
                        className="search-emp-view-btn-2026" // Reuse blue style
                      >
                        <Edit3 size={19} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDownload(emp)}
                        className="search-emp-download-btn-2026"
                      >
                        <Download size={19} />
                        Download Documents
                      </button>

                     <button
  onClick={() => handleToggleStatus(emp)}
  className="search-emp-inactive-btn-2026"
  style={{
    background:
      emp.status === "Inactive"
        ? "linear-gradient(135deg, #22c55e, #16a34a)" // Green for Active
        : undefined
  }}
>
  <UserX size={19} />
  {emp.status === "Inactive" ? "Activate" : "Inactive"}
</button>

                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ padding: "20px 40px 40px", textAlign: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "16px",
                      background: "#f1f5f9",
                      padding: "14px 28px",
                      borderRadius: "16px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        padding: "10px 20px",
                        background: currentPage === 1 ? "#cbd5e1" : "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Previous
                    </button>

                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "10px 20px",
                        background: currentPage === totalPages ? "#cbd5e1" : "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {isModalOpen && selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={closeModal}
          onSaveSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

export default SearchEmployee;