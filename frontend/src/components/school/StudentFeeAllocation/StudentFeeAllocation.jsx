import React, { useEffect, useState } from "react";
import { FaSearch, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentFeeAllocation.css";

const API_BASE = "http://localhost:5000";
const schoolId = "000000000000000000000001";

const months = [
  "APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER",
  "OCTOBER","NOVEMBER","DECEMBER","JANUARY","FEBRUARY","MARCH"
];

const StudentFeeAllocation = () => {
  /* ================= STATE ================= */
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [concessions, setConcessions] = useState([]);
  const [fees, setFees] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFee, setSelectedFee] = useState("");

  const [bulkFees, setBulkFees] = useState(
    Object.fromEntries(months.map(m => [m, 0]))
  );

  const [students, setStudents] = useState([
    { name: "AARUSHI GURJAR", type: "old", fees: {} },
    { name: "ANAMIKA BHURIYA", type: "old", fees: {} },
    { name: "ANTIM BALA DAMAR", type: "new", fees: {} },
    { name: "ARUN KHARADI", type: "old", fees: {} },
  ]);

  /* ================= FETCH ALL DROPDOWNS ================= */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [classRes, concessionRes, feeRes] = await Promise.all([
          fetch(`${API_BASE}/api/classes`),
          fetch(`${API_BASE}/api/concession/${schoolId}`),
          fetch(`${API_BASE}/api/fees/${schoolId}`)
        ]);

        const classData = await classRes.json();
        const concessionData = await concessionRes.json();
        const feeData = await feeRes.json();

        setClasses(classData || []);
        setConcessions(concessionData.data || []);
        setFees(feeData.data || []);

        if (classData?.length) {
          setSelectedClassId(classData[0]._id);
          setSections(classData[0].sections || []);
        }

        if (concessionData?.data?.length) {
          setSelectedCategory(concessionData.data[0].categoryName);
        }

        if (feeData?.data?.length) {
          setSelectedFee(feeData.data[0].feeName);
        }
      } catch (err) {
        toast.error("Failed to load dropdown data");
      }
    };

    fetchInitialData();
  }, []);

  /* ================= CLASS CHANGE ================= */
  const handleClassChange = (classId) => {
    setSelectedClassId(classId);
    const cls = classes.find(c => c._id === classId);
    setSections(cls?.sections || []);
    setSelectedSection("All");
  };

  /* ================= BULK ================= */
  const handleBulkChange = (month, value) => {
    setBulkFees({ ...bulkFees, [month]: value });
  };

  const applyBulkFees = () => {
    setStudents(
      students.map(s => ({ ...s, fees: { ...bulkFees } }))
    );
    toast.success("Bulk fees applied successfully");
  };

  /* ================= STUDENT ================= */
  const handleStudentChange = (index, month, value) => {
    const updated = [...students];
    updated[index].fees[month] = value;
    setStudents(updated);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    toast.success("Student fee allocation saved successfully");
    console.log("Saved data:", {
      classId: selectedClassId,
      section: selectedSection,
      category: selectedCategory,
      fee: selectedFee,
      students
    });
  };

  return (
    <div className="sfa-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= FILTER ================= */}
      <div className="sfa-card">
        <h3>Select a Class</h3>

        <div className="sfa-form-grid">
          <div>
            <label>Select a Class *</label>
            <select
              value={selectedClassId}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>
                  {cls.baseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Section *</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="All">All</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Category *</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {concessions.map(c => (
                <option key={c._id} value={c.categoryName}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Fee *</label>
            <select
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
            >
              {fees.map(f => (
                <option key={f._id} value={f.feeName}>
                  {f.feeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sfa-search">
          <button>
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      {/* ================= BULK ================= */}
      <div className="sfa-card">
        <h3>Bulk Fees Updation</h3>

        <div className="sfa-month-row">
          {months.map(month => (
            <div key={month}>
              <label>{month}</label>
              <input
                type="number"
                value={bulkFees[month]}
                onChange={(e) => handleBulkChange(month, e.target.value)}
              />
            </div>
          ))}

          <button className="update-btn" onClick={applyBulkFees}>
            Update Fees
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="sfa-card">
        <div className="sfa-table-wrapper">
          <table className="sfa-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Type</th>
                {months.map(m => <th key={m}>{m}</th>)}
              </tr>
            </thead>

            <tbody>
              {students.map((stu, index) => (
                <tr key={index}>
                  <td>{stu.name}</td>
                  <td className={stu.type}>{stu.type}</td>

                  {months.map(m => (
                    <td key={m}>
                      <input
                        type="number"
                        value={stu.fees[m] || 0}
                        onChange={(e) =>
                          handleStudentChange(index, m, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="save-wrap">
          <button onClick={handleSave}>
            <FaSave />
            Save Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeAllocation;
