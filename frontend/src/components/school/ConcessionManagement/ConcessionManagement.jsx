import React, { useState } from "react";
import "./ConcessionManagement.css";

const ConcessionManagement = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    "GENERAL",
    "Staff",
    "Gardain"
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add
  const handleAddCategory = () => {
    if (!categoryName.trim()) return alert("Enter category name");

    if (categories.includes(categoryName.trim()))
      return alert("Category already exists");

    setCategories([...categories, categoryName.trim()]);
    setCategoryName("");
  };

  // Delete
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  // Edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(categories[index]);
  };

  const handleUpdate = () => {
    if (!editValue.trim()) return alert("Category name required");

    const updated = [...categories];
    updated[editIndex] = editValue.trim();

    setCategories(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="cm-container">
      <h2 className="cm-title">Concession Management</h2>

      {/* Add Section */}
      <div className="cm-card">
        <div className="cm-card-header">Add Concession Category</div>
        <div className="cm-card-body">
          <div className="cm-form-row">
            <label>
              Category Name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              placeholder="Enter category name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="cm-divider"></div>

          <div className="cm-button-wrapper">
            <button onClick={handleAddCategory}>
              <span className="plus">+</span> Add Concession Category
            </button>
          </div>
        </div>
      </div>

      {/* View Section */}
      <div className="cm-card">
        <div className="cm-card-header">View Concession Category</div>

        <div className="cm-table">
          <div className="cm-table-header">Concession Category Name</div>

          {categories.map((item, index) => (
            <div key={index} className="cm-table-row cm-row-actions">
              {editIndex === index ? (
                <>
                  <input
                    className="cm-edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="cm-action-btns">
                    <button className="save" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="cancel"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <div className="cm-action-btns">
                    <button
                      className="edit"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcessionManagement;
