import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./StudentPromotion.css";

// Helper function to get next academic year
const getNextSession = (currentSession) => {
  if (!currentSession) return '';
  const parts = currentSession.split('-');
  if (parts.length !== 2) return '';
  const startYear = parseInt(parts[0]);
  const endYear = parseInt(parts[1]);
  return `${startYear + 1}-${endYear + 1}`;
};

// Helper function to get next class
const getNextClass = (currentClass) => {
  const classNum = parseInt(currentClass);
  if (isNaN(classNum)) return '';
  return (classNum + 1).toString();
};

export default function StudentPromotion() {
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionData, setPromotionData] = useState({
    toClass: '',
    toSection: '',
    toSession: ''
  });
  const [currentClass, setCurrentClass] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [currentSession, setCurrentSession] = useState('2025-26');

  // Auto-update promotion data when modal opens or current class/session changes
  useEffect(() => {
    if (showPromotionModal && currentClass && currentSession) {
      setPromotionData(prev => ({
        ...prev,
        toClass: getNextClass(currentClass),
        toSession: getNextSession(currentSession)
      }));
    }
  }, [showPromotionModal, currentClass, currentSession]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/students/by-class-section?className=${currentClass}&section=${currentSection}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setSearched(true);
      setSelected({});
      setSelectAll(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePromotion = async () => {
    const selectedStudentIds = Object.keys(selected).filter(id => selected[id]);

    if (selectedStudentIds.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/students/promotion/promote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIds: selectedStudentIds,
          fromClass: currentClass,
          fromSection: currentSection,
          toClass: promotionData.toClass,
          toSection: promotionData.toSection,
          fromSession: currentSession,
          toSession: promotionData.toSession
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Successfully promoted ${result.promotedCount} student(s)!`);
        setShowPromotionModal(false);
        setSelected({});
        setSelectAll(false);
        // Refresh the student list
        await fetchStudents();
      } else {
        toast.error(result.message || 'Promotion failed');
      }
    } catch (err) {
      toast.error('Error during promotion: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };
      const allSelected = students.every((s) => newSelected[s._id]);
      setSelectAll(allSelected);
      return newSelected;
    });
  };

  const toggleAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    const newSelected = {};
    students.forEach((s) => (newSelected[s._id] = newVal));
    setSelected(newSelected);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="sp-container">
      {/* Header */}
      <div className="sp-header">
        <h1>Student Promotion</h1>
        <p>Promote students class-wise & section-wise</p>
      </div>

      {/* Filters */}
      <div className="sp-card">
        <h3>Select Class & Section</h3>
        <div className="sp-filters-grid">
          <div className="sp-form-group">
            <label>Class <span className="required">*</span></label>
            <select
              value={currentClass}
              onChange={(e) => setCurrentClass(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="sp-form-group">
            <label>Section <span className="required">*</span></label>
            <select
              value={currentSection}
              onChange={(e) => setCurrentSection(e.target.value)}
            ><option value="">Select Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div className="sp-form-group sp-actions">
            <button
              className="btn-primary"
              onClick={fetchStudents}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Show Class Strength'}
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Student List */}
      {searched && (
        <div className="sp-card">
          {students.length === 0 ? (
            <div className="sp-empty-state">
              <div className="sp-empty-icon">📚</div>
              <p>No students found for the selected class and section.</p>
            </div>
          ) : (
            <>
              <div className="sp-table-header">
                <h3>Student List ({students.length})</h3>
                {selectedCount > 0 && (
                  <div className="sp-selected-count">
                    {selectedCount} student{selectedCount > 1 ? 's' : ''} selected
                  </div>
                )}
              </div>

              <div className="sp-table-wrapper">
                <table className="sp-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleAll}
                        />
                      </th>
                      <th>Admission No</th>
                      <th>Student Name</th>
                      <th>Father Name</th>
                      <th>Class</th>
                      <th>Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selected[student._id] || false}
                            onChange={() => toggle(student._id)}
                          />
                        </td>
                        <td>{student.admissionNo}</td>
                        <td className="student-name">{student.studentName}</td>
                        <td>{student.fatherName}</td>
                        <td>{student.className}</td>
                        <td>{student.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedCount > 0 && (
                <div className="sp-footer">
                  <button
                    className="btn-success"
                    onClick={() => setShowPromotionModal(true)}
                  >
                    Promote Selected Students
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Promotion Modal */}
      {showPromotionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Promote Students</h3>
            <p>Promoting {selectedCount} student(s) from Class {currentClass} {currentSection} to:</p>

            <div className="promotion-form">
              <div className="form-row">
                <div className="sp-form-group">
                  <label>To Class</label>
                  <input
                    type="text"
                    value={`Class ${promotionData.toClass}`}
                    readOnly
                    className="readonly-field"
                  />
                  <small className="field-hint">Auto-calculated (Current + 1)</small>
                </div>
                <div className="sp-form-group">
                  <label>To Section <span className="required">*</span></label>
                  <select
                    value={promotionData.toSection}
                    onChange={(e) => setPromotionData({ ...promotionData, toSection: e.target.value })}
                  >
                    <option value="">Select Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>
                </div>
              </div>
              <div className="sp-form-group">
                <label>To Session</label>
                <input
                  type="text"
                  value={promotionData.toSession}
                  readOnly
                  className="readonly-field"
                />
                <small className="field-hint">Auto-calculated (Next academic year)</small>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowPromotionModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-success"
                onClick={handlePromotion}
                disabled={!promotionData.toClass || !promotionData.toSection || !promotionData.toSession || loading}
              >
                {loading ? 'Promoting...' : 'Confirm Promotion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}