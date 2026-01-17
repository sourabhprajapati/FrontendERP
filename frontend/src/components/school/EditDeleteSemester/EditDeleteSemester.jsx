import React, { useState } from "react";
import "./EditDeleteSemester.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialData = [
  { id: 1, className: "Nursary", semester: "Ist Term" },
  { id: 2, className: "Nursary", semester: "IInd Term" },
  { id: 3, className: "Nursary", semester: "IIIrd Term" },
  { id: 4, className: "LKG", semester: "Ist Term" },
  { id: 5, className: "LKG", semester: "IInd Term" },
  { id: 6, className: "LKG", semester: "IIIrd Term" },
  { id: 7, className: "UKG", semester: "Ist Term" },
];

const EditDeleteSemester = () => {
  const [data, setData] = useState(initialData);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === editItem.id ? editItem : item
      )
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setData((prev) =>
      prev.filter((item) => item.id !== deleteItem.id)
    );
    setDeleteItem(null);
  };

  return (
    <div className="eds__container">
      <h2 className="eds__title">Edit/Delete Semester</h2>

      <div className="eds__card">
        <div className="eds__cardHeader">Edit Semester</div>

        <div className="eds__tableWrapper">
          <div className="eds__tableTitle">All Semester/Terms</div>

          <table className="eds__table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Class Name ↑↓</th>
                <th>Semester ↑↓</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.className}</td>
                  <td>{item.semester}</td>
                  <td>
                    <button
                      className="eds__btn eds__editBtn"
                      onClick={() => setEditItem({ ...item })}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="eds__btn eds__deleteBtn"
                      onClick={() => setDeleteItem(item)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="eds__modalOverlay">
          <div className="eds__modal">
            <h3>Edit Semester</h3>

            <label>Class Name</label>
            <input
              value={editItem.className}
              onChange={(e) =>
                setEditItem({ ...editItem, className: e.target.value })
              }
            />

            <label>Semester</label>
            <input
              value={editItem.semester}
              onChange={(e) =>
                setEditItem({ ...editItem, semester: e.target.value })
              }
            />

            <div className="eds__modalActions">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button className="cancel" onClick={() => setEditItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteItem && (
        <div className="eds__modalOverlay">
          <div className="eds__modal delete">
            <h3>Delete Semester</h3>
            <p>
              Are you sure you want to delete
              <b> {deleteItem.semester}</b>?
            </p>

            <div className="eds__modalActions">
              <button className="delete" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel"
                onClick={() => setDeleteItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeleteSemester;
