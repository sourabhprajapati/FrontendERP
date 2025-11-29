// src/components/SuperAdmin/Digital.jsx
import React, { useState } from "react";
import "./Digital.css";

const Digital = () => {
  const allClasses = ["NURSERY", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"];
  const bookSeries = ["B4 EMAGIX", "Olympiad"];
  const subjects = ["English", "Hindi", "Mathematics", "Science", "EVS"];

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const toggleClass = (cls) => {
    setSelectedClasses(prev => 
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
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

  return (
    <div className="container">
      <h2>Assign Digital Content</h2>

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
          <div key={classIdx} className="class-section">
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
        <button className="submit-btn" onClick={() => alert("Saved!")}>Save Assignment</button>
      </div>
    </div>
  );
};

export default Digital;