import React, { useState } from "react";
import "./StudentDetails.css";
import { FiSearch, FiEye, FiEdit2, FiDollarSign } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const [classFilter, setClassFilter] = useState("KSV 6th");
  const [sectionFilter, setSectionFilter] = useState("A");
  const [keyword, setKeyword] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); // ← NEW
  const [isModalOpen, setIsModalOpen] = useState(false);

  const students = [
    {
      id: 1,
      admissionNo: "PNGWing/45454",
      rollNo: "",
      name: "lakh asda",
      class: "KSV 6th",
      section: "A",
      gender: "Male",
      dob: "06-05-2024",
      father: "Test Father",
      mother: "",
      phone: "1234567890",
    },
    {
      id: 2,
      admissionNo: "PNGWing/20620",
      rollNo: "",
      name: "Hetashvi Choudhary",
      class: "KSV 6th",
      section: "A",
      gender: "Female",
      dob: "01-01-2017",
      father: "ddd",
      mother: "fff",
      phone: "1234567890",
    },
    {
      id: 3,
      admissionNo: "NLET/2025",
      rollNo: "8",
      name: "devesh",
      class: "KSV 6th",
      section: "A",
      gender: "Male",
      dob: "01-01-2022",
      father: "mr haridas",
      mother: "",
      phone: "07355335204",
    },
    {
      id: 4,
      admissionNo: "NLET/5575",
      rollNo: "9",
      name: "NAMAN",
      class: "KSV 6th",
      section: "A",
      gender: "Male",
      dob: "10-06-2017",
      father: "GYAN SINGH",
      mother: "REKHA YADAV",
      phone: "Non",
    },
    {
      id: 5,
      admissionNo: "NLET/5556",
      rollNo: "10",
      name: "Daksh",
      class: "KSV 6th",
      section: "A",
      gender: "Male",
      dob: "09-06-2018",
      father: "Vipin kumar",
      mother: "REETA DEVI",
      phone: "7307488087",
    },
    {
      id: 6,
      admissionNo: "NLET/125",
      rollNo: "11",
      name: "RIDVI",
      class: "KSV 6th",
      section: "A",
      gender: "Female",
      dob: "07-05-2019",
      father: "",
      mother: "",
      phone: "9999999999",
    },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.class.includes(classFilter) &&
      s.section.includes(sectionFilter) &&
      (s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.admissionNo.includes(keyword) ||
        s.phone.includes(keyword))
  );
  const openViewModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  const handleEdit = (student) => {
  // Navigate to AddStudent with student data
  const studentData = {
    id: student.id,
    admissionNo: student.admissionNo,
    rollNo: student.rollNo,
    name: student.name,
    class: student.class,
    section: student.section,
    gender: student.gender,
    dob: student.dob,
    father: student.father,
    mother: student.mother,
    phone: student.phone
  };
  const navigate = useNavigate();
  // Method 1: Using React Router (Recommended)
  navigate('/StudentAdmissionForm', { 
    state: { student: studentData, isEdit: true } 
  });
  
  // Method 2: Using URL params (if no router)
  // const queryString = new URLSearchParams(studentData).toString();
  // window.location.href = `/add-student?${queryString}`;
};


  return (
    <div className="student-details-container28">
      {/* Header */}
      <div className="header28">
        <h1>Student Details</h1>
        <div className="breadcrumb28">
          Student Information / <span>Student Details</span>
        </div>
      </div>

      {/* Search Criteria Card */}
      <div className="criteria-card28">
        <h3 className="card-title28">Select Criteria</h3>

        <div className="search-row28">
          <div className="input-group28">
            <label>Class *</label>
            <input
              type="text"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              placeholder="e.g. KSV 6th"
            />
          </div>

          <div className="input-group28">
            <label>Section</label>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>

          <div className="input-group28 keyword28">
            <label>Search by Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by Admission no, Student Name, Phone"
            />
          </div>
        </div>

        <div className="search-buttons28">
          <button className="search-btn28">Search</button>
          {/* <button className="search-btn28 secondary28">
            Search
          </button> */}
        </div>
      </div>

      {/* Student List Card */}
      <div className="list-card28">
        <h3 className="card-title28">Student List</h3>

        <div className="toolbar28">
          <div className="left-tools28">
            <button className="tool-btn28">Excel</button>

            <button className="tool-btn28">PDF</button>
          </div>

          <div className="right-tools28">
            <select className="entries-select28" defaultValue="10">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <input
              type="text"
              placeholder="Search:"
              className="table-search28"
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container28">
          <table className="student-table28">
            <thead>
              <tr>
                <th>#</th>
                <th>ADMISSION NO.</th>
                <th>ROLL NUMBER</th>
                <th>NAME</th>
                <th>CLASS</th>
                <th>SECTION</th>
                <th>GENDER</th>
                <th>DATE OF BIRTH</th>
                <th>FATHER NAME</th>
                <th>MOTHER NAME</th>
                <th>GUARDIAN PHONE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.admissionNo}</td>
                  <td>{student.rollNo || "-"}</td>
                  <td className="name-cell28">{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.section}</td>
                  <td>{student.gender}</td>
                  <td>{student.dob}</td>
                  <td>{student.father}</td>
                  <td>{student.mother}</td>
                  <td>{student.phone}</td>
                  <td>
                    <div className="action-dropdown28">
                      <button className="action-btn28">Action</button>
                      <div className="dropdown-menu28">
                        <button
                          className="dropdown-item28"
                          onClick={() => openViewModal(student)} // ← THIS MAKES VIEW WORK
                        >
                          View
                        </button>
                        <button
                          className="dropdown-item28 edit-btn28"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ==================== BEAUTIFUL STUDENT PROFILE MODAL (Exactly like your screenshot) ==================== */}
        {isModalOpen && selectedStudent && (
          <div className="modal-overlay28">
            <div className="profile-card28">
              {/* Close Button */}
              <button className="close-btn28" onClick={closeModal}>
                Close
              </button>

              {/* Profile Header */}
              <div className="profile-header28">
                <div className="profile-photo28">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Student"
                    className="student-img28"
                  />
                </div>
                <h2 className="student-name28">{selectedStudent.name}</h2>
              </div>

              {/* Details Table */}
              <div className="profile-table28">
                <div className="profile-row28">
                  <span className="label28">Admission No.</span>
                  <span className="value28 highlight28">
                    {selectedStudent.admissionNo}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Biometric Id</span>
                  <span className="value28">2232</span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Roll Number</span>
                  <span className="value28">
                    {selectedStudent.rollNo || "—"}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Class</span>
                  <span className="value28 highlight28">
                    {selectedStudent.class} (2025-26)
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Section</span>
                  <span className="value28">{selectedStudent.section}</span>
                </div>
                <div className="profile-row28">
                  <span className="label28">RTE</span>
                  <span className="value28">No</span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Gender</span>
                  <span className="value28 highlight28">
                    {selectedStudent.gender}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Date of Birth</span>
                  <span className="value28">{selectedStudent.dob}</span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Father Name</span>
                  <span className="value28">
                    {selectedStudent.father || "—"}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Mother Name</span>
                  <span className="value28">
                    {selectedStudent.mother || "—"}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Phone</span>
                  <span className="value28">{selectedStudent.phone}</span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Blood Group</span>
                  <span className="value28">
                    {selectedStudent.bloodGroup || "Not Set"}
                  </span>
                </div>
                <div className="profile-row28">
                  <span className="label28">Address</span>
                  <span className="value28">
                    {selectedStudent.address || "Not Provided"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="profile-footer28">
                <button className="print-btn28" onClick={() => window.print()}>
                  Print Profile
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="table-info28">
          Showing {filteredStudents.length} entries
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
