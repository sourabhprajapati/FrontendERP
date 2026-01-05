// src/components/school/AddClass/AddClass.jsx
import React, { useState, useEffect } from 'react';
import './AddClass.css';

const AddClass = () => {
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:5000/api/classes';

  const fetchClasses = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch classes');
      const data = await res.json();
      setClassList(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load classes');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSave = async () => {
    const trimmed = className.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setMessage('');

    const payload = {
      baseName: `CLASS ${trimmed.toUpperCase()}`
    };

    const isEdit = !!editingId;
    const url = isEdit ? `${API_BASE}/${editingId}` : `${API_BASE}/add`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Operation failed');
      }

      setMessage(isEdit ? 'Class updated successfully!' : 'Class added successfully!');
      setClassName('');
      setEditingId(null);
      await fetchClasses();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setError(null);
      }, 4000);
    }
  };

  const handleEdit = (cls) => {
    setEditingId(cls._id);
    setClassName(cls.baseName.replace(/^CLASS\s+/i, ''));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      setMessage('Class deleted successfully');
      await fetchClasses();
    } catch (err) {
      setError('Failed to delete class');
    } finally {
      setTimeout(() => {
        setMessage('');
        setError(null);
      }, 4000);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setClassName('');
    setError(null);
  };

  const displayMessage = error || message;
  const isError = !!error;

  return (
    <div className="add-class-container41">
      <h2>{editingId ? 'Edit Class' : 'Add New Class'}</h2>

      {displayMessage && (
        <div className={`message41 ${isError ? 'error' : 'success'}`}>
          {displayMessage}
        </div>
      )}

      <div className="input-group41">
        <input
          type="text"
          placeholder="e.g. 10, 11, 12, Nursery"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSave();
            }
          }}
          disabled={loading}
        />

        <div className="btn-group41">
          <button
            onClick={handleSave}
            disabled={loading || !className.trim()}
          >
            {loading ? 'Saving...' : editingId ? 'Update' : 'Add Class'}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="btn-cancel41"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="h341">Existing Classes ({classList.length})</h3>

      {classList.length === 0 ? (
        <p>No classes added yet</p>
      ) : (
        <div>
          {classList.map((cls) => (
            <div key={cls._id} className="class-item41">
              <span>{cls.baseName}</span>
              <div className="actions41">
                <button
                  onClick={() => handleEdit(cls)}
                  className="btn-edit41"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="btn-delete41"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddClass;