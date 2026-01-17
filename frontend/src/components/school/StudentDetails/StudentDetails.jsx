import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit2,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreVertical,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import "./StudentDetails.css";

// Student Photo Component to prevent flickering
const StudentPhoto = ({ photo, name, baseURL }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states
    setLoading(true);
    setError(false);
    
    if (photo) {
      const photoUrl = photo.startsWith("http") ? photo : `${baseURL}${photo}`;
      // Preload image to prevent flickering
      const img = new Image();
      img.onload = () => {
        setImgSrc(photoUrl);
        setLoading(false);
      };
      img.onerror = () => {
        setError(true);
        setLoading(false);
        setImgSrc(null);
      };
      img.src = photoUrl;
    } else {
      setImgSrc(null);
      setLoading(false);
      setError(true);
    }
  }, [photo, baseURL]);

  if (error || !imgSrc) {
    return (
      <div className="erp-student-photo-placeholder">
        <User size={24} />
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="erp-student-photo-loading">
          <div className="erp-photo-spinner"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={name || "Student"}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
          setImgSrc(null);
        }}
        style={{ display: loading ? "none" : "block" }}
        loading="lazy"
        key={imgSrc} // Key to prevent unnecessary re-renders
      />
    </>
  );
};

const StudentDetails = () => {
  const navigate = useNavigate();
  // Use relative URL in development (works with Vite proxy) or absolute URL as fallback
  const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "" : "http://localhost:5000");

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseURL}/api/students`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      
      // Handle different response formats
      let studentsArray = [];
      if (Array.isArray(data)) {
        studentsArray = data;
      } else if (data.students && Array.isArray(data.students)) {
        studentsArray = data.students;
      } else if (data.data && Array.isArray(data.data)) {
        studentsArray = data.data;
      } else {
        console.warn("Unexpected API response format:", data);
        studentsArray = [];
      }
      
      setStudents(studentsArray);
      console.log(`Loaded ${studentsArray.length} students`);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
      toast.error("Failed to load students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  useEffect(() => {
    let filtered = [...students];

    // Search filter
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((s) => {
        const b = s.basic || {};
        const p = s.parents || {};
        return (
          b.name?.toLowerCase().includes(lower) ||
          b.admissionNo?.toLowerCase().includes(lower) ||
          b.mobile?.includes(search) ||
          b.email?.toLowerCase().includes(lower) ||
          p.father?.name?.toLowerCase().includes(lower) ||
          p.mother?.name?.toLowerCase().includes(lower)
        );
      });
    }

    // Class filter
    if (classFilter) {
      filtered = filtered.filter((s) => s.basic?.class === classFilter);
    }

    // Section filter
    if (sectionFilter) {
      filtered = filtered.filter((s) => s.basic?.section === sectionFilter);
    }

    // Academic year filter
    if (academicYearFilter) {
      filtered = filtered.filter((s) => s.basic?.academicYear === academicYearFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => (s.status || "active") === statusFilter);
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = getNestedValue(a, sortConfig.key);
        const bVal = getNestedValue(b, sortConfig.key);
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [search, classFilter, sectionFilter, academicYearFilter, statusFilter, sortConfig, students]);

  const getNestedValue = (obj, path) => {
    const keys = path.split(".");
    let value = obj;
    for (const key of keys) {
      value = value?.[key];
    }
    return value || "";
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const uniqueClasses = useMemo(
    () => [...new Set(students.map((s) => s.basic?.class).filter(Boolean))].sort((a, b) => a - b),
    [students]
  );

  const uniqueSections = useMemo(() => {
    if (!classFilter) return [];
    return [
      ...new Set(
        students.filter((s) => s.basic?.class === classFilter).map((s) => s.basic?.section).filter(Boolean)
      ),
    ].sort();
  }, [students, classFilter]);

  const uniqueAcademicYears = useMemo(
    () => [...new Set(students.map((s) => s.basic?.academicYear).filter(Boolean))].sort().reverse(),
    [students]
  );

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(paginatedStudents.map((s) => s._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedStudents.length === 0) {
      toast.warning("Please select students first");
      return;
    }
    toast.info(`${action} action for ${selectedStudents.length} students`);
    // Implement bulk actions here
  };

  const handleExport = () => {
    toast.success("Exporting student data...");
    // Implement export functionality
  };

  if (loading) {
    return (
      <div className="erp-student-container">
        <div className="erp-loading-state">
          <div className="erp-spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="erp-student-container">
        <div className="erp-error-state">
          <div className="erp-error-icon">⚠️</div>
          <h3>Error Loading Students</h3>
          <p>{error}</p>
          <button onClick={fetchStudents} className="erp-btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="erp-student-container">
      {/* Header */}
      <div className="erp-page-header">
        <div>
          <h1>Student Management</h1>
          <p>Manage and view all enrolled students</p>
        </div>
        <div className="erp-header-actions">
          <button onClick={handleExport} className="erp-btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button
            onClick={() => navigate("/studentadmissionform")}
            className="erp-btn-primary"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="erp-stats-grid">
        <div className="erp-stat-card">
          <div className="erp-stat-icon blue">
            <UserCheck size={24} />
          </div>
          <div>
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="erp-stat-card">
          <div className="erp-stat-icon green">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3>{filteredStudents.length}</h3>
            <p>Filtered Results</p>
          </div>
        </div>
        <div className="erp-stat-card">
          <div className="erp-stat-icon orange">
            <Calendar size={24} />
          </div>
          <div>
            <h3>{uniqueClasses.length}</h3>
            <p>Active Classes</p>
          </div>
        </div>
        <div className="erp-stat-card">
          <div className="erp-stat-icon purple">
            <UserCheck size={24} />
          </div>
          <div>
            <h3>{selectedStudents.length}</h3>
            <p>Selected</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="erp-filters-card">
        <div className="erp-filters-header">
          <div className="erp-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, admission no, mobile, email, or parent name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`erp-filter-toggle ${showFilters ? "active" : ""}`}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="erp-filters-grid">
            <div className="erp-filter-group">
              <label>Class</label>
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                <option value="">All Classes</option>
                {uniqueClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="erp-filter-group">
              <label>Section</label>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                disabled={!classFilter}
              >
                <option value="">All Sections</option>
                {uniqueSections.map((sec) => (
                  <option key={sec} value={sec}>
                    Section {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="erp-filter-group">
              <label>Academic Year</label>
              <select
                value={academicYearFilter}
                onChange={(e) => setAcademicYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueAcademicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="erp-filter-group">
              <label>Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        )}

        {selectedStudents.length > 0 && (
          <div className="erp-bulk-actions">
            <span>{selectedStudents.length} selected</span>
            <div className="erp-bulk-buttons">
              <button onClick={() => handleBulkAction("Export")} className="erp-btn-small">
                Export Selected
              </button>
              <button onClick={() => setSelectedStudents([])} className="erp-btn-small">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="erp-table-card1">
        <div className="erp-table-header">
          <div className="erp-table-info">
            <span>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </span>
          </div>
          <div className="erp-table-controls">
            <label>
              Items per page:
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      paginatedStudents.length > 0 &&
                      paginatedStudents.every((s) => selectedStudents.includes(s._id))
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Photo</th>
                <th onClick={() => handleSort("basic.name")} className="sortable">
                  Name {sortConfig.key === "basic.name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("basic.admissionNo")} className="sortable">
                  Admission No.{" "}
                  {sortConfig.key === "basic.admissionNo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("basic.class")} className="sortable">
                  Class {sortConfig.key === "basic.class" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Roll No.</th>
                <th>Contact</th>
                <th>Parents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <div className="erp-empty-state">
                      <div className="erp-empty-icon">📭</div>
                      <h3>No students found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => {
                  const b = student.basic || {};
                  const p = student.parents || {};
                  const isSelected = selectedStudents.includes(student._id);

                  return (
                    <tr key={student._id} className={isSelected ? "selected" : ""}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectStudent(student._id)}
                        />
                      </td>
                      <td>
                        <div className="erp-student-photo">
                          <StudentPhoto 
                            photo={b.photo} 
                            name={b.name}
                            baseURL={baseURL}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="erp-student-name">
                          <strong>{b.name || "Unnamed"}</strong>
                          <span className="erp-student-gender">{b.gender || "-"}</span>
                        </div>
                      </td>
                      <td>
                        <span className="erp-admission-no">{b.admissionNo || "-"}</span>
                      </td>
                      <td>
                        <span className="erp-class-badge">
                          {b.class || "-"}
                          {b.section && `-${b.section}`}
                        </span>
                      </td>
                      <td>{b.rollNo || "-"}</td>
                      <td>
                        <div className="erp-contact-info">
                          {b.mobile && (
                            <a href={`tel:${b.mobile}`} className="erp-contact-link">
                              <Phone size={14} />
                              {b.mobile}
                            </a>
                          )}
                          {b.email && (
                            <a href={`mailto:${b.email}`} className="erp-contact-link">
                              <Mail size={14} />
                              {b.email}
                            </a>
                          )}
                          {!b.mobile && !b.email && <span>-</span>}
                        </div>
                      </td>
                      <td>
                        <div className="erp-parent-info">
                          {p.father?.name && <span>F: {p.father.name}</span>}
                          {p.mother?.name && <span>M: {p.mother.name}</span>}
                          {!p.father?.name && !p.mother?.name && <span>-</span>}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`erp-status-badge ${
                            (student.status || "active") === "active" ? "active" : "inactive"
                          }`}
                        >
                          {student.status || "active"}
                        </span>
                      </td>
                      <td>
                        <div className="erp-action-buttons">
                          <button
                            onClick={() => navigate(`/student-view/${student._id}`)}
                            className="erp-action-btn view"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() =>
                              navigate("/studentadmissionform", {
                                state: { student, isEdit: true },
                              })
                            }
                            className="erp-action-btn edit"
                            title="Edit Student"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="erp-pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="erp-pagination-btn"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <div className="erp-pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="erp-pagination-btn"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
