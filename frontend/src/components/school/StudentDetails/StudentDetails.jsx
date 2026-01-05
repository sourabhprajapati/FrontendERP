import React, { useState, useEffect } from "react";
import "./StudentDetails.css";
import { useNavigate } from "react-router-dom";

/* ================= LABEL FORMATTER ================= */
const formatLabel = (key) => {
  const map = {
    admissionNo: "Admission No",
    rollNo: "Roll Number",
    dob: "Date of Birth",
    phone: "Phone Number",
    aadhaar: "Aadhaar Number",
    pinCode: "Pin Code",
    singleParent: "Single Parent",
    bloodGroup: "Blood Group",
    permanentAddress: "Permanent Address",
  };

  return (
    map[key] ||
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
  );
};

/* ================= DETAIL SECTION ================= */
// src/components/StudentDetails.jsx

const DetailSection = ({ title, data }) => (
  <div className="detail-section39">
    <h3 className="section-title39">{title}</h3>

    {data && Object.keys(data).length === 0 ? (
      <p className="muted39">No information provided</p>
    ) : (
      <div className="detail-grid39">
        {data && Object.entries(data).map(([key, value]) => {
          if (key === "photo" || value === undefined || value === null) return null;

          // Handle nested objects (like father, mother)
          if (typeof value === "object" && !Array.isArray(value)) {
            return (
              <div className="detail-card39 nested39" key={key}>
                <div className="detail-label39">{formatLabel(key)}</div>
                <div className="detail-value39">
                  {Object.entries(value)
                    .filter(([k]) => k !== "photo")
                    .map(([k, v]) => (
                      <div key={k}>
                        <strong>{formatLabel(k)}:</strong> {v || <span className="muted39">Not Entered</span>}
                      </div>
                    ))}
                </div>
              </div>
            );
          }

          return (
            <div className="detail-card39" key={key}>
              <div className="detail-label39">{formatLabel(key)}</div>
              <div className="detail-value39">
                {value ? value : <span className="muted39">Not Entered</span>}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

/* ================= MAIN COMPONENT ================= */
const StudentDetails = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [viewStudent, setViewStudent] = useState(null);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  /* ================= FILTER ================= */
  const filteredStudents = students.filter((s) => {
    const basic = s.basic || {};

    return (
      basic.class?.includes(classFilter) &&
      basic.section?.includes(sectionFilter) &&
      (
        basic.name?.toLowerCase().includes(keyword.toLowerCase()) ||
        basic.admissionNo?.includes(keyword) ||
        basic.phone?.includes(keyword)
      )
    );
  });

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="sd-page39">
      {/* HEADER */}
      <div className="sd-header39">
        <h1>Student Details</h1>
        <p>School Panel – All Student Records</p>
      </div>

      {/* FILTERS */}
      <div className="sd-filters39">
        <input
          type="text"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          placeholder="Class"
          className="filter-input39"
        />

        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="filter-select39"
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search name / admission / phone"
          className="filter-input39 search39"
        />
      </div>

      {/* TABLE */}
      <div className="sd-table-card39">
        <table className="modern-table39">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Student</th>
              <th>Admission No</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s._id || i} className="table-row-hover39">
                <td>{i + 1}</td>

                <td className="student-cell39">
                  <img
                    src={s.basic?.photo || "https://via.placeholder.com/60"}
                    alt={s.basic?.name}
                    className="student-photo39"
                  />
                  <div className="student-info39">
                    <strong>{s.basic?.name}</strong>
                    <span className="roll-text39">
                      Roll: {s.basic?.rollNo}
                    </span>
                  </div>
                </td>

                <td>{s.basic?.admissionNo}</td>

                <td>
                  {s.basic?.class} - {s.basic?.section}
                </td>

                <td>
                  <span
                    className={`badge39 badge-${s.basic?.gender?.toLowerCase()}39`}
                  >
                    {s.basic?.gender}
                  </span>
                </td>

                <td>{s.basic?.phone}</td>

                <td className="action-buttons39">
                  <button
                    className="btn39 btn-view39"
                    onClick={() => setViewStudent(s)}
                  >
                    View
                  </button>

                  <button
                    className="btn39 btn-edit39"
                    onClick={() =>
                      navigate("/studentAdmissionForm", {
                        state: { student: s, isEdit: true },
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {viewStudent && (
        <div className="sd-modal39" onClick={() => setViewStudent(null)}>
          <div
            className="sd-modal-card39 large39"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn39"
              onClick={() => setViewStudent(null)}
            >
              ×
            </button>

            <div className="modal-header39">
              <div className="modal-photo-wrapper39">
                <img
                  src={viewStudent.basic?.photo || "https://via.placeholder.com/120"}
                  alt={viewStudent.basic?.name}
                />
              </div>

              <div className="modal-title-info39">
                <h2>{viewStudent.basic?.name}</h2>
                <span className="class-section39">
                  {viewStudent.basic?.class} - {viewStudent.basic?.section} | Roll
                  No: {viewStudent.basic?.rollNo}
                </span>
              </div>
            </div>

            <div className="modal-body39">
              <DetailSection title="Basic Information" data={viewStudent.basic} />
              <DetailSection title="Personal Information" data={viewStudent.personal} />
              <DetailSection title="Admission Information" data={viewStudent.admission} />
              <DetailSection title="Guardian Information" data={viewStudent.guardians} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
