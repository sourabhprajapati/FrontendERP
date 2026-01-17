import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ConcessionManagement.css";

/* REQUIRED CONSTANTS */
const schoolId = "000000000000000000000001";
const API_BASE = "http://localhost:5000";

const ConcessionManagement = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/concession/${schoolId}`
      );
      const result = await res.json();

      setCategories(result.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ADD ================= */
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await fetch(`${API_BASE}/api/concession/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          categoryName: categoryName.trim(),
        }),
      });

      setCategoryName("");
      toast.success("Category added successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const id = categories[index]._id;

      await fetch(`${API_BASE}/api/concession/delete/${id}`, {
        method: "DELETE",
      });

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(categories[index].categoryName);
  };

  const handleUpdate = async () => {
    if (!editValue.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const id = categories[editIndex]._id;

      await fetch(`${API_BASE}/api/concession/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryName: editValue.trim(),
        }),
      });

      setEditIndex(null);
      setEditValue("");
      toast.success("Category updated successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="cm-container">
      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={3000} />

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
            <div key={item._id} className="cm-table-row cm-row-actions">
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
                  <span>{item.categoryName}</span>
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
