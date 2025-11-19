// Document.jsx - Fully Renamed Classes
import React, { useState } from 'react';
import './Document.css';

function Document() {
  const [rows, setRows] = useState([
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [nextId, setNextId] = useState(6);

  const handleFileChange = (id, file) => {
    if (file) {
      setUploadedFiles(prev => {
        const filtered = prev.filter(f => f.id !== id);
        return [...filtered, { id, name: file.name, file }];
      });
    } else {
      setUploadedFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  const addRow = () => {
    setRows(prev => [...prev, { id: nextId }]);
    setNextId(prev => prev + 1);
  };

  const removeRow = (id) => {
    setRows(prev => prev.filter(row => row.id !== id));
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.doc-title-input');
    const allFilled = Array.from(inputs).every(i => i.value.trim() !== '');
    
    if (!allFilled) {
      alert('Please enter a name for every document.');
      return;
    }
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file.');
      return;
    }

    alert('Documents submitted successfully!');
    console.log('Submitted:', uploadedFiles);
  };

  const removeDocument = (id) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <main className="doc-page-wrapper">
      <div className="doc-layout">

        {/* UPLOAD CARD */}
        <section className="doc-upload-card">
          <h2>Upload School Documents</h2>
          <form onSubmit={handleSubmit}>
            <table className="doc-upload-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Document Name</th>
                  <th>Upload file (jpg, jpeg, png, pdf)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter document name"
                        className="doc-title-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(row.id, e.target.files[0])}
                        className="hidden-file-input"
                        id={`file-${row.id}`}
                      />
                      <label htmlFor={`file-${row.id}`} className="file-choose-btn">
                        Choose File
                      </label>
                      <span className="file-status-text">
                        {uploadedFiles.find(f => f.id === row.id)?.name || 'No file chosen'}
                      </span>
                    </td>
                    <td>
                      {rows.length > 1 && (
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => removeRow(row.id)}
                        >
                          ×
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="doc-action-buttons">
              <button type="button" className="btn-add-row" onClick={addRow}>
                + Add Row
              </button>
              <button type="submit" className="btn-submit-all">
                Submit
              </button>
            </div>
          </form>
        </section>

        {/* VIEW CARD */}
        <section className="doc-view-card">
          <h2>View Documents</h2>
          <table className="doc-list-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Document Name</th>
                <th>View Documents</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-state-msg">
                    No records found.
                  </td>
                </tr>
              ) : (
                uploadedFiles.map((file, idx) => (
                  <tr key={file.id}>
                    <td>{idx + 1}</td>
                    <td>{file.name}</td>
                    <td>
                      <a href="#" className="link-view-doc" onClick={(e) => e.preventDefault()}>
                        View
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-remove-doc"
                        onClick={() => removeDocument(file.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

      </div>
    </main>
  );
}

export default Document;