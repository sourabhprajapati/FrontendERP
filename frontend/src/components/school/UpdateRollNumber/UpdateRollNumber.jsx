import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Hash,
  Users,
  Save,
  Search,
  Lock,
  Unlock,
  ChevronDown,
  UserCheck,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  SortAsc
} from "lucide-react";
import "./UpdateRollNumber.css";

const API_BASE = "http://localhost:5000";

const CLASS_LIST = ["Nursery", "K.G.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SECTION_LIST = ["A", "B", "C", "D", "E"];
const SESSION_LIST = ["2023-2024", "2024-2025", "2025-2026"];

const UpdateRollNumber = ({ role = "ADMIN" }) => {
  const [filters, setFilters] = useState({
    academicYear: "2024-2025",
    className: "",
    section: ""
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [startRollNo, setStartRollNo] = useState(1);

  // Fetch students based on filters
  const loadStudents = async () => {
    if (!filters.academicYear || !filters.className || !filters.section) {
      return toast.warning("Please select all filters");
    }

    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await fetch(`${API_BASE}/api/students/roll-mgmt?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch students");

      const data = await res.json();
      // Initialize with original data
      const initializedStudents = data.students.map(s => ({
        ...s,
        newRollNo: s.rollNo || "",
        isModified: false
      }));

      setStudents(initializedStudents);
      setIsLocked(data.isLocked);
      setSelectedIds([]);
      toast.success(`Loaded ${data.students.length} students`);
    } catch (err) {
      toast.error(err.message || "Error loading students");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRollChange = (id, value) => {
    if (isLocked) return;
    setStudents(prev =>
      prev.map(s => s._id === id ? {
        ...s,
        newRollNo: value,
        isModified: true
      } : s)
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Auto assignment logic
  const autoGenerate = () => {
    if (isLocked) return;
    const targets = selectedIds.length > 0
      ? students.filter(s => selectedIds.includes(s._id))
      : students;

    if (targets.length === 0) return toast.warning("No students selected");

    let current = parseInt(startRollNo) || 1;
    const updatedStudents = students.map(s => {
      const isTarget = selectedIds.length > 0 ? selectedIds.includes(s._id) : true;
      if (isTarget) {
        return { ...s, newRollNo: current++, isModified: true };
      }
      return s;
    });

    setStudents(updatedStudents);
    toast.success("Roll numbers auto-generated");
  };

  const assignAlphabetically = () => {
    if (isLocked) return;
    // Sort students by name
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));

    let current = parseInt(startRollNo) || 1;
    const rollMap = {};
    sorted.forEach(s => {
      rollMap[s._id] = current++;
    });

    setStudents(prev => prev.map(s => ({
      ...s,
      newRollNo: rollMap[s._id],
      isModified: true
    })));

    toast.success("Assigned alphabetically");
  };

  // Validation: Check for duplicates
  const validation = useMemo(() => {
    const rolls = students.map(s => s.newRollNo?.toString().trim()).filter(r => r);
    const duplicates = rolls.filter((item, index) => rolls.indexOf(item) !== index);
    const hasInvalid = students.some(s => s.newRollNo && !/^\d+$/.test(s.newRollNo));

    return {
      duplicates: [...new Set(duplicates)],
      hasInvalid,
      isValid: duplicates.length === 0 && !hasInvalid
    };
  }, [students]);

  const handleSave = async () => {
    if (!validation.isValid) {
      return toast.error("Please fix duplicate or invalid roll numbers");
    }

    const modified = students.filter(s => s.isModified);
    if (modified.length === 0) return toast.info("No changes to save");

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/students/bulk-update-roll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...filters,
          updates: students.map(s => ({
            studentId: s._id,
            rollNo: s.newRollNo
          }))
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Save failed");
      }

      toast.success("Roll numbers saved successfully");
      loadStudents(); // Reload to clear modified flags
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleLock = async () => {
    // Check if role is admin (simple check)
    if (role !== "ADMIN") return toast.error("Unauthorized");

    const confirmMsg = isLocked
      ? "Are you sure you want to UNLOCK roll numbers? (Only allowed for Super Admin)"
      : "Are you sure you want to LOCK roll numbers? This will prevent further changes.";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${API_BASE}/api/students/toggle-roll-lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...filters,
          isLocked: !isLocked
        })
      });

      if (!res.ok) throw new Error("Lock operation failed");
      const data = await res.json();
      setIsLocked(data.isLocked);
      toast.success(`Roll numbers ${data.isLocked ? 'Locked' : 'Unlocked'}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="rm-container">
      {/* Header */}
      <div className="rm-header">
        <div className="header-text">
          <h1>Assign / Manage Roll Numbers</h1>
          <p>Manage student IDs and roll allotments for the current session</p>
        </div>
        <div className="header-badges">
          {isLocked ? (
            <div className="lock-badge locked">
              <Lock size={14} /> Locked
            </div>
          ) : (
            <div className="lock-badge unlocked">
              <Unlock size={14} /> Available
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="rm-filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Academic Session *</label>
            <select name="academicYear" value={filters.academicYear} onChange={handleFilterChange}>
              {SESSION_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-item">
            <label>Class *</label>
            <select name="className" value={filters.className} onChange={handleFilterChange}>
              <option value="">Select Class</option>
              {CLASS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-item">
            <label>Section *</label>
            <select name="section" value={filters.section} onChange={handleFilterChange}>
              <option value="">Select Section</option>
              {SECTION_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn-load" onClick={loadStudents} disabled={loading}>
              {loading ? <RefreshCcw className="spinning" size={18} /> : <Search size={18} />}
              Load Students
            </button>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div className="rm-main-content">
          {/* Controls Bar */}
          <div className="rm-controls-bar">
            <div className="control-group">
              <div className="start-input">
                <label>Starting From:</label>
                <input
                  type="number"
                  value={startRollNo}
                  onChange={(e) => setStartRollNo(e.target.value)}
                  min="1"
                  disabled={isLocked}
                />
              </div>
              <button className="btn-ctrl secondary" onClick={autoGenerate} disabled={isLocked}>
                <Hash size={16} /> Auto Generate
              </button>
              <button className="btn-ctrl secondary" onClick={assignAlphabetically} disabled={isLocked}>
                <SortAsc size={16} /> Assign Alphabetically
              </button>
            </div>

            <div className="control-group right">
              {role === "ADMIN" && (
                <button
                  className={`btn-ctrl ${isLocked ? 'danger-outline' : 'warning-outline'}`}
                  onClick={handleToggleLock}
                >
                  {isLocked ? <Unlock size={16} /> : <Lock size={16} />}
                  {isLocked ? "Unlock All" : "Lock Roll Numbers"}
                </button>
              )}
              <button className="btn-ctrl primary" onClick={handleSave} disabled={saving || isLocked}>
                {saving ? <RefreshCcw className="spinning" size={16} /> : <Save size={16} />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Validation Warnings */}
          {!validation.isValid && (
            <div className="validation-banner">
              <AlertCircle size={18} />
              <span>
                {validation.duplicates.length > 0 && `Duplicate roll numbers found: ${validation.duplicates.join(", ")}`}
                {validation.hasInvalid && " Some roll numbers are non-numeric!"}
              </span>
            </div>
          )}

          {/* Table */}
          <div className="rm-table-wrapper">
            <table className="rm-table">
              <thead>
                <tr>
                  <th width="40">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === students.length && students.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Current Roll</th>
                  <th width="200">New Roll Number</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const isDup = validation.duplicates.includes(student.newRollNo?.toString());
                  const isInvalid = student.newRollNo && !/^\d+$/.test(student.newRollNo);

                  return (
                    <tr key={student._id} className={student.isModified ? "is-modified" : ""}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(student._id)}
                          onChange={() => toggleSelect(student._id)}
                        />
                      </td>
                      <td className="font-mono">{student.admissionNo}</td>
                      <td className="name-cell">{student.name}</td>
                      <td className="text-gray">{student.rollNo || "—"}</td>
                      <td>
                        <div className={`input-container ${isDup || isInvalid ? 'error' : ''}`}>
                          <input
                            type="text"
                            value={student.newRollNo}
                            onChange={(e) => handleRollChange(student._id, e.target.value)}
                            disabled={isLocked}
                            placeholder="Enter Roll"
                          />
                          {(isDup || isInvalid) && <AlertCircle className="error-icon" size={14} />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rm-footer">
            <div className="footer-stats">
              <span>Total Students: {students.length}</span>
              <span>Selected: {selectedIds.length}</span>
              <span>Modified: {students.filter(s => s.isModified).length}</span>
            </div>
          </div>
        </div>
      )}

      {!students.length && !loading && (
        <div className="rm-empty-state">
          <Users size={48} />
          <h3>No Students Loaded</h3>
          <p>Select criteria above and click Load Students to manage roll numbers.</p>
        </div>
      )}
    </div>
  );
};

export default UpdateRollNumber;