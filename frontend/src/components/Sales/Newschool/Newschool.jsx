// src/components/SalesExecutive/Newschool.jsx
import React, { useState, useEffect } from "react";
import "./Newschool.css";

const API_BASE = "http://localhost:5000/api";

const Newschool = () => {
  const [executives, setExecutives] = useState([]);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [showDigital, setShowDigital] = useState(false);
  const [loading, setLoading] = useState(false);

  // School Form
  const [form, setForm] = useState({
    salesExecutive: "", state: "", district: "", schoolName: "", address: "", email: "",
    contactNo: "", contactPerson: "", selectBoard: "", grade: "", strength: "", noOfStudents: "",
    tpg: false, talentBox: false, distributor: "Direct Supply",
    consentFile: null, loginFile: null,
  });

  // DIGITAL CONTENT — 100% SAME AS YOUR ORIGINAL Digital.jsx
  const allClasses = ["NURSERY", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"];
  const bookSeries = ["B4 EMAGIX", "Olympiad"];
  const subjects = ["English", "Hindi", "Mathematics", "Science", "EVS"];
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/sales-executives`)
      .then(r => r.json())
      .then(data => setExecutives(data.filter(e => e.isActive)))
      .catch(() => alert("Failed to load executives"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (["contactNo", "strength", "noOfStudents"].includes(name)) {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e, field) => {
    setForm(prev => ({ ...prev, [field]: e.target.files[0] }));
  };

  // SAVE SCHOOL → GO DIRECTLY TO DIGITAL
  const handleSchoolSubmit = async (e) => {
    e.preventDefault();
    if (form.contactNo.length !== 10) return alert("Contact number must be 10 digits");
    if (!form.consentFile || !form.loginFile) return alert("Both files are required");

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/schools/new`, { method: "POST", body: formData });
      const result = await res.json();
      if (res.ok) {
        setCurrentSchool(result.data);
        setShowDigital(true);
        alert(`School "${result.data.schoolName}" saved! Now assign digital content.`);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      } else {
        alert(result.message || "Failed to save school");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  // DIGITAL CONTENT — EXACT SAME LOGIC AS YOUR ORIGINAL Digital.jsx
  const toggleClass = (cls) => {
    setSelectedClasses(prev => prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]);
  };

  const updateClasses = () => {
    const newAssignments = selectedClasses.map(cls => ({
      className: cls,
      bookSeries: [{ series: "", subjects: [""] }]
    }));
    setAssignments(prev => [...prev, ...newAssignments]);
    setSelectedClasses([]);
  };

  const addBookSeries = (classIdx) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries.push({ series: "", subjects: [""] });
      return updated;
    });
  };

  const addSubject = (classIdx, seriesIdx) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries[seriesIdx].subjects.push("");
      return updated;
    });
  };

  const updateSeries = (classIdx, seriesIdx, value) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries[seriesIdx].series = value;
      return updated;
    });
  };

  const updateSubject = (classIdx, seriesIdx, subjIdx, value) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries[seriesIdx].subjects[subjIdx] = value;
      return updated;
    });
  };

  const removeSubject = (classIdx, seriesIdx, subjIdx) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries[seriesIdx].subjects.splice(subjIdx, 1);
      return updated;
    });
  };

  const removeSeries = (classIdx, seriesIdx) => {
    setAssignments(prev => {
      const updated = [...prev];
      updated[classIdx].bookSeries.splice(seriesIdx, 1);
      return updated;
    });
  };

  const removeClass = (classIdx) => {
    setAssignments(prev => prev.filter((_, i) => i !== classIdx));
  };

  const saveDigital = async () => {
    if (assignments.length === 0) return alert("Please add at least one class");

    try {
      await fetch(`${API_BASE}/digital/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: currentSchool._id, assignments })
      });
      alert("Complete! School onboarding finished successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to save digital content");
    }
  };

  return (
    <div className="newschool-container">
      <h1 className="page-title">Complete School Onboarding</h1>

      {/* SCHOOL FORM */}
      {!currentSchool && (
        <form onSubmit={handleSchoolSubmit} className="newschool-form">
          {/* All your existing form fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Sales Executive <span className="required">*</span></label>
              <select name="salesExecutive" value={form.salesExecutive} onChange={handleChange} required>
                <option value="">Select Executive</option>
                {executives.map(e => <option key={e._id} value={e.name}>{e.name} ({e.code})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>School Name <span className="required">*</span></label>
              <input type="text" name="schoolName" value={form.schoolName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <select name="state" value={form.state} onChange={handleChange} required>
                <option value="">Select State</option>
                {["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "UP"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>District <span className="required">*</span></label>
              <input type="text" name="district" value={form.district} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Address <span className="required">*</span></label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Contact No <span className="required">*</span></label>
              <input type="tel" name="contactNo" value={form.contactNo} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Person <span className="required">*</span></label>
              <input type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Board <span className="required">*</span></label>
              <select name="selectBoard" value={form.selectBoard} onChange={handleChange} required>
                <option value="">Select Board</option>
                {["CBSE", "ICSE", "State Board", "IB", "Cambridge"].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Grade <span className="required">*</span></label>
              <input type="text" name="grade" value={form.grade} onChange={handleChange} placeholder="e.g. 1-12" required />
            </div>
            <div className="form-group">
              <label>Strength <span className="required">*</span></label>
              <input type="text" name="strength" value={form.strength} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            {/* <div className="form-group">
              <label>No. of Students <span className="required">*</span></label>
              <input type="text" name="noOfStudents" value={form.noOfStudents} onChange={handleChange} required />
            </div> */}
            <div className="form-group">
              <label>Features</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="tpg" checked={form.tpg} onChange={handleChange} /> TPG</label>
                <label><input type="checkbox" name="talentBox" checked={form.talentBox} onChange={handleChange} /> Talent Box</label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Distributor <span className="required">*</span></label>
              <div className="radio-group">
                <label><input type="radio" name="distributor" value="Direct Supply" checked={form.distributor === "Direct Supply"} onChange={handleChange} /> Direct Supply</label>
                <label><input type="radio" name="distributor" value="Other Distributor" checked={form.distributor === "Other Distributor"} onChange={handleChange} /> Other Distributor</label>
              </div>
            </div>
          </div>

          <div className="form-row file-row">
            <div className="file-group">
              <label>Consent Form <span className="required">*</span></label>
              <input type="file" accept=".doc,.docx,.pdf" onChange={(e) => handleFile(e, "consentFile")} required />
              {form.consentFile && <div className="file-name">{form.consentFile.name}</div>}
            </div>
            <div className="file-group">
              <label>Login Form <span className="required">*</span></label>
              <input type="file" accept=".doc,.docx,.pdf" onChange={(e) => handleFile(e, "loginFile")} required />
              {form.loginFile && <div className="file-name">{form.loginFile.name}</div>}
            </div>
          </div>

          <div className="submit-wrapper">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save School & Assign Digital Content"}
            </button>
          </div>
        </form>
      )}

      {/* YOUR EXACT SAME DIGITAL PAGE — APPEARS IMMEDIATELY AFTER SAVING SCHOOL */}
      {showDigital && currentSchool && (
        <div className="digital-full-section">
          <h2>Assign Digital Content — {currentSchool.schoolName}</h2>

          <div className="school-classes">
            <h3>Select Classes</h3>
            <div className="classes-grid">
              {allClasses.map(cls => (
                <div key={cls} className={`class-checkbox ${selectedClasses.includes(cls) ? "selected" : ""}`}>
                  <input type="checkbox" checked={selectedClasses.includes(cls)} onChange={() => toggleClass(cls)} />
                  <label>{cls}</label>
                </div>
              ))}
            </div>
            <button className="update-btn" onClick={updateClasses} disabled={selectedClasses.length === 0}>
              Add Selected ({selectedClasses.length})
            </button>
          </div>

          <div className="digital-content">
            {assignments.map((cls, classIdx) => (
              <div key={classIdx} className="class-sectionure-section">
                <h3>{cls.className} <button className="remove-btn" onClick={() => removeClass(classIdx)}>Remove</button></h3>
                {cls.bookSeries.map((series, seriesIdx) => (
                  <div key={seriesIdx} className="bookseries-section">
                    <select value={series.series} onChange={(e) => updateSeries(classIdx, seriesIdx, e.target.value)}>
                      <option value="">Select Series</option>
                      {bookSeries.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {cls.bookSeries.length > 1 && <button className="remove-btn" onClick={() => removeSeries(classIdx, seriesIdx)}>Remove Series</button>}
                    <div className="subjects-container">
                      {series.subjects.map((subj, subjIdx) => (
                        <div key={subjIdx} className="dropdown-container">
                          <select value={subj} onChange={(e) => updateSubject(classIdx, seriesIdx, subjIdx, e.target.value)}>
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s}>{s}</option>)}
                          </select>
                          {series.subjects.length > 1 && <button className="remove-btn" onClick={() => removeSubject(classIdx, seriesIdx, subjIdx)}>×</button>}
                        </div>
                      ))}
                      <button className="add-more-btn" onClick={() => addSubject(classIdx, seriesIdx)}>+ Add Subject</button>
                    </div>
                  </div>
                ))}
                <button className="add-more-btn" onClick={() => addBookSeries(classIdx)}>+ Add Book Series</button>
              </div>
            ))}
          </div>

          <div className="submit-section">
            <button className="submit-btn" onClick={saveDigital}>Complete Onboarding</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newschool;