import { useState } from "react";
import { toast } from "react-toastify";
import "./StudentPerformance.css";

export default function StudentPerformance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [filters, setFilters] = useState({
    class: "",
    section: "",
    examName: "",
    subjectArea: "",
    subject: ""
  });

  const [marksData, setMarksData] = useState({});

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!filters.class || !filters.section) {
      toast.warning("Please select Class and Section");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/performance/students?className=${filters.class}&section=${filters.section}`
      );
      const data = await res.json();

      if (res.ok) {
        setStudents(data);

        const initialMarks = {};
        data.forEach((s) => {
          initialMarks[s.id] = {
            studentId: s.id,
            admissionNo: s.adm,
            rollNo: s.roll,
            studentName: s.name,
            marks: "",
            status: "MARKS"
          };
        });
        setMarksData(initialMarks);
        toast.success(`${data.length} students loaded`);
      } else {
        toast.error(data.message || "Failed to load students");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (id, value) => {
    setMarksData((prev) => ({
      ...prev,
      [id]: { ...prev[id], marks: value }
    }));
  };

  const handleStatusChange = (id, status) => {
    setMarksData((prev) => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  const handleSave = async () => {
    if (!filters.examName || !filters.subjectArea || !filters.subject) {
      toast.warning("Please select Exam Name, Subject Area and Subject");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        class: filters.class,
        section: filters.section,
        examName: filters.examName,
        subjectArea: filters.subjectArea,
        subject: filters.subject,
        records: Object.values(marksData)
      };

      const res = await fetch("http://localhost:5000/api/performance/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Marks saved successfully!");
      } else {
        toast.error(data.message || "Failed to save marks");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sp-container-premium">
      {/* Header */}
      <div className="sp-header-premium">
        <h1>Marks Entry</h1>
        <p>Enter and manage student performance records</p>
      </div>

      {/* Filters Card */}
      <div className="sp-card-premium">
        <div className="sp-filters-premium">
          <div className="filter-group-premium">
            <label>Class *</label>
            <select name="class" value={filters.class} onChange={handleFilterChange}>
              <option value="">Select Class</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Class {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="filter-group-premium">
            <label>Section *</label>
            <select name="section" value={filters.section} onChange={handleFilterChange}>
              <option value="">Select Section</option>
              {["A", "B", "C", "D"].map((sec) => (
                <option key={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="filter-group-premium">
            <label>Exam Name *</label>
            <select name="examName" value={filters.examName} onChange={handleFilterChange}>
              <option value="">Select Exam</option>
              <option>Test 1</option>
              <option>Test 2</option>
              <option>Half-Yearly</option>
              <option>Annual Exam</option>
            </select>
          </div>

          <div className="filter-group-premium">
            <label>Subject Area *</label>
            <select name="subjectArea" value={filters.subjectArea} onChange={handleFilterChange}>
              <option value="">Select Area</option>
              <option>Scholastic</option>
              <option>Co-Scholastic</option>
              <option>Other Subjects</option>
              <option>Additional Subjects</option>
            </select>
          </div>

          <div className="filter-group-premium">
            <label>Subject *</label>
            <select name="subject" value={filters.subject} onChange={handleFilterChange}>
              <option value="">Select Subject</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Social Science">Social Science</option>
              <option value="Sanskrit">Sanskrit</option>
              <option value="Computer">Computer</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Economics">Economics</option>
              <option value="Political Science">Political Science</option>
              <option value="Physical Education">Physical Education</option>
              <option value="Art & Craft">Art & Craft</option>
              <option value="Music">Music</option>
              <option value="GK">General Knowledge</option>
              <option value="EVS">Environmental Studies</option>
              <option value="Moral Science">Moral Science</option>
            </select>
          </div>

          <div className="sp-actions-premium">
            <button
              className="btn-search-premium"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load Students"}
            </button>
            <button
              className="btn-save-premium"
              onClick={handleSave}
              disabled={saving || students.length === 0}
            >
              {saving ? "Saving..." : "Save Marks"}
            </button>
          </div>
        </div>
      </div>

      {/* Table Card - Only shows when students are loaded */}
      {students.length > 0 && (
        <div className="sp-card-premium">
          <div className="table-wrapper-premium">
            <table className="sp-table-premium">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Roll No</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>  Marks </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td>{i + 1}</td>
                    <td>{s.roll || "-"}</td>
                    <td>{s.adm}</td>
                    <td className="student-name-premium">{s.name}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="marks-input-premium"
                        value={marksData[s.id]?.marks || ""}
                        disabled={marksData[s.id]?.status !== "MARKS"}
                        onChange={(e) => handleMarksChange(s.id, e.target.value)}
                        placeholder="Enter marks"
                      />
                    </td>
                    <td className="status-cell-premium">
                      <label className="status-option-premium">
                        <input
                          type="radio"
                          name={`status-${s.id}`}
                          checked={marksData[s.id]?.status === "MARKS"}
                          onChange={() => handleStatusChange(s.id, "MARKS")}
                        />
                        <span>Present</span>
                      </label>
                      <label className="status-option-premium">
                        <input
                          type="radio"
                          name={`status-${s.id}`}
                          checked={marksData[s.id]?.status === "AB"}
                          onChange={() => handleStatusChange(s.id, "AB")}
                        />
                        <span>Absent</span>
                      </label>
                      <label className="status-option-premium">
                        <input
                          type="radio"
                          name={`status-${s.id}`}
                          checked={marksData[s.id]?.status === "ML"}
                          onChange={() => handleStatusChange(s.id, "ML")}
                        />
                        <span>Medical Leave</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}