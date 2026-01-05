import React, { useState, useEffect, useRef } from 'react';
import './Subjectmaster.css';

const Subjectmaster = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]); // BACKEND CLASSES
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  /* ---------- DROPDOWN ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    area: 'Scholastic',
    addInExam: 'Yes',
    type: 'mandatory',
    classes: []
  });

  /* ---------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------- FETCH SUBJECTS ---------- */
  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/subjects');
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch {
      setMessage('Failed to load subjects');
    }
  };

  /* ---------- FETCH CLASSES FROM BACKEND ---------- */
  const fetchClasses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/classes');
      const data = await res.json();

      // extract baseName only
      const classNames = data.map(cls => cls.baseName);
      setClasses(classNames);
    } catch (err) {
      console.error('Failed to load classes');
    }
  };

  /* ---------- CLASS SELECTION ---------- */
  const toggleClass = (cls) => {
    setForm(prev => {
      const exists = prev.classes.includes(cls);
      return {
        ...prev,
        classes: exists
          ? prev.classes.filter(c => c !== cls)
          : [...prev.classes, cls]
      };
    });
  };

  const toggleAllClasses = () => {
    setForm(prev => ({
      ...prev,
      classes:
        prev.classes.length === classes.length ? [] : [...classes]
    }));
  };

  /* ---------- SAVE SUBJECT ---------- */
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setMessage('Please enter Subject Name');
      return;
    }

    const payload = editingId ? { id: editingId, ...form } : form;

    try {
      const res = await fetch('http://localhost:5000/api/subjects/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage(editingId ? 'Subject updated successfully' : 'Subject saved successfully');
        resetForm();
        fetchSubjects();
      } else {
        const err = await res.json();
        setMessage(err.message || 'Save failed');
      }
    } catch {
      setMessage('Network error');
    }
  };

  /* ---------- RESET ---------- */
  const resetForm = () => {
    setForm({
      name: '',
      area: 'Scholastic',
      addInExam: 'Yes',
      type: 'mandatory',
      classes: []
    });
    setEditingId(null);
    setIsOpen(false);
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (sub) => {
    setForm({
      name: sub.name,
      area: sub.area,
      addInExam: sub.addInExam,
      type: sub.type,
      classes: sub.classes || []
    });
    setEditingId(sub._id);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete subject?')) return;
    await fetch(`http://localhost:5000/api/subjects/${id}`, {
      method: 'DELETE'
    });
    fetchSubjects();
  };

  return (
    <div className="subject-master-container">
      <h2>{editingId ? 'Edit Subject' : 'Add New Subject'}</h2>

      {message && <div className="message">{message}</div>}

      <div className="form-grid">
        {/* Subject Name */}
        <div className="form-group">
          <label>Subject Name *</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Mathematics"
          />
        </div>

        {/* Area */}
        <div className="form-group">
          <label>Area</label>
          <select
            value={form.area}
            onChange={e => setForm({ ...form, area: e.target.value })}
          >
            <option>Scholastic</option>
            <option>Co-Scholastic</option>
            <option>Other Subject</option>
            <option>AdditionalSubjects</option>
          </select>
        </div>

        {/* Add In Exam */}
        <div className="form-group">
          <label>Add in Exam</label>
          <select
            value={form.addInExam}
            onChange={e => setForm({ ...form, addInExam: e.target.value })}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="mandatory">Mandatory</option>
            <option value="optional">Optional</option>
          </select>
        </div>

        {/* CLASSES MULTI SELECT */}
        <div className="form-group">
          <label>Classes</label>

          <div className="multi-select" ref={dropdownRef}>
            <div
              className="multi-select-input"
              onClick={() => setIsOpen(!isOpen)}
            >
              {form.classes.length === 0
                ? 'Select Classes'
                : form.classes.length === classes.length
                ? 'All Classes Selected'
                : form.classes.join(', ')}
            </div>

            {isOpen && (
              <div className="multi-select-dropdown">
                <label>
                  <input
                    type="checkbox"
                    checked={form.classes.length === classes.length && classes.length > 0}
                    onChange={toggleAllClasses}
                  />{' '}
                  <strong>All Classes</strong>
                </label>

                <hr />

                {classes.map(cls => (
                  <label key={cls}>
                    <input
                      type="checkbox"
                      checked={form.classes.includes(cls)}
                      onChange={() => toggleClass(cls)}
                    />{' '}
                    {cls}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="btn-group">
        <button onClick={handleSubmit} className="save-btn">
          {editingId ? 'Update' : 'Save'}
        </button>
        {editingId && (
          <button onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>

      {/* SUBJECT LIST */}
      <div className="subjects-list">
        <h3>All Subjects ({subjects.length})</h3>

        <ul>
          {subjects.map(sub => (
            <li key={sub._id} className="subject-item">
              <div>
                <strong>{sub.name}</strong>
                <div className="meta">
                  <small>
                    Area: {sub.area} | Exam: {sub.addInExam} | Type: {sub.type}
                    <br />
                    Classes: {sub.classes?.join(', ') || 'N/A'}
                  </small>
                </div>
              </div>

              <div className="actions">
                <button onClick={() => handleEdit(sub)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(sub._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Subjectmaster;