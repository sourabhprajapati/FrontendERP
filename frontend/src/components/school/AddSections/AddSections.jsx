import React, { useState, useEffect } from 'react';
import './AddSections.css';

const AddSections = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [sectionInput, setSectionInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await fetch('http://localhost:5000/api/classes');
    const data = await res.json();
    setClasses(data);
  };

  const handleAddSection = async () => {
    if (!selectedClass || !sectionInput.trim()) return;

    const section = sectionInput.trim().toUpperCase();
    try {
      const res = await fetch(`http://localhost:5000/api/classes/${selectedClass}/section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section })
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(`Section ${section} added!`);
        setSectionInput('');
        fetchClasses();
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage('Error adding section');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRemoveSection = async (classId, section) => {
    if (!window.confirm(`Remove Section ${section}?`)) return;

    await fetch(`http://localhost:5000/api/classes/${classId}/section/${section}`, {
      method: 'DELETE'
    });
    fetchClasses();
  };

  return (
    <div className="add-sections-container42">
      <h2>Manage Sections</h2>
      {message && <div className="message42">{message}</div>}

      <div className="input-group42">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.baseName}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter section (e.g. A, B, C)"
          value={sectionInput}
          onChange={(e) => setSectionInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
        />
        <button onClick={handleAddSection}>Add Section</button>
      </div>

      <div className="sections-list42">
        {classes.map(cls => (
          <div key={cls._id} className="class-sections42">
            <h3>{cls.baseName}</h3>
            <div className="sections42">
              {cls.sections.length === 0 ? (
                <p>No sections added</p>
              ) : (
                cls.sections.map(sec => (
                  <span key={sec} className="section-tag42">
                    {cls.baseName} {sec}
                    <button onClick={() => handleRemoveSection(cls._id, sec)}>×</button>
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSections;