
import React, { useState } from "react";
// import PageHeader from "../../components/PageHeader";
import "./StudentLeave.css";

export default function StudentLeave() {
  const initialRecords = [
    {
      id: 1,
      class: "6th-A",
      apply: "08-12-2025",
      days: "4 Days",
      leave: "08-12-2025 -- 11-12-2025",
      status: "Approved",
      reply: "",
      description: "Sick leave due to fever.",
    },
    {
      id: 2,
      class: "7th-B",
      apply: "09-12-2025",
      days: "2 Days",
      leave: "10-12-2025 -- 11-12-2025",
      status: "Approved",
      reply: "",
      description: "Family function.",
    },
    {
      id: 3,
      class: "8th-C",
      apply: "10-12-2025",
      days: "17 Days",
      leave: "12-12-2025 -- 28-12-2025",
      status: "Rejected",
      reply: "Max limit reached.",
      description: "Holiday trip.",
    },
    {
      id: 4,
      class: "6th-A",
      apply: "11-12-2025",
      days: "1 Day",
      leave: "12-12-2025 -- 12-12-2025",
      status: "Approved",
      reply: "Attend classes when back.",
      description: "Doctor's appointment.",
    },
    {
      id: 5,
      class: "9th-D",
      apply: "12-12-2025",
      days: "5 Days",
      leave: "15-12-2025 -- 19-12-2025",
      status: "Approved",
      reply: "",
      description: "Cousin's wedding.",
    },
    {
      id: 6,
      class: "10th-E",
      apply: "13-12-2025",
      days: "1 Day",
      leave: "13-12-2025 -- 13-12-2025",
      status: "Rejected",
      reply: "No single day leaves.",
      description: "Personal work.",
    },
  ];

  const [records, setRecords] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    class: true,
    apply: true,
    days: true,
    leave: true,
    status: true,
    reply: true,
    description: true,
    action: true,
  });
  const [openActionId, setOpenActionId] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState({
    className: "",
    section: "",
    student: "",
    applyDate: "",
    leaveDate: "",
    description: "",
    file: null,
  });

  const columns = [
    "class",
    "apply",
    "days",
    "leave",
    "status",
    "reply",
    "description",
    "action",
  ];

  const toggleColumn = (key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateStatus = (id, status) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredRecords = records.filter((record) => {
    const q = searchTerm.toLowerCase();
    return (
      record.class.toLowerCase().includes(q) ||
      record.status.toLowerCase().includes(q) ||
      record.description.toLowerCase().includes(q) ||
      record.apply.includes(q) ||
      record.leave.includes(q)
    );
  });

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((p) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const handleSaveForm = () => {
    if (!form.className || !form.section || !form.student || !form.description) {
      alert("Please fill required fields (class, section, student, description).");
      return;
    }

    const newRec = {
      id: records.length + 1,
      class: `${form.className}-${form.section}`,
      apply: form.applyDate || "",
      days: "-",
      leave: form.leaveDate || "",
      status: "Pending",
      reply: "",
      description: form.description,
    };

    setRecords((p) => [newRec, ...p]);
    setShowAddForm(false);

    setForm({
      className: "",
      section: "",
      student: "",
      applyDate: "",
      leaveDate: "",
      description: "",
      file: null,
    });
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
  };

  return (
    <div className="sl-page37">
      {/* <PageHeader title="Student Leave" subtitle="Leave Records List" /> */}

      {showAddForm ? (
        <div className="sl-add-page37">
          <div className="sl-add-card37 sl-colored-add37">
            <div className="sl-add-card-header37 sl-add-header-colored37">
              <div className="sl-add-card-title37">
                <i className="ri-pencil-line"></i> Add / Edit Leave
              </div>
              <div className="sl-add-close37">
                <button onClick={handleCancelForm} aria-label="close">✖</button>
              </div>
            </div>

            <div className="sl-add-grid37">
              <div className="sl-field37">
                <label>Class *</label>
                <select name="className" value={form.className} onChange={handleFormChange}>
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="K.G.">K.G.</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div className="sl-field37">
                <label>Section *</label>
                <select name="section" value={form.section} onChange={handleFormChange}>
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div className="sl-field37">
                <label>Student *</label>
                <select name="student" value={form.student} onChange={handleFormChange}>
                  <option value="">Select</option>
                  <option value="Student 1">Student 1</option>
                  <option value="Student 2">Student 2</option>
                </select>
              </div>

              <div className="sl-field37">
                <label>Apply Date</label>
                <input type="date" name="applyDate" value={form.applyDate} onChange={handleFormChange} />
              </div>

              <div className="sl-field37 file-field37">
                <label>Attach Document</label>
                <input type="file" name="file" onChange={handleFormChange} />
              </div>

              <div className="sl-field37">
                <label>Leave Date</label>
                <input
                  type="text"
                  name="leaveDate"
                  placeholder="2025-12-09 -- 2025-12-09"
                  value={form.leaveDate}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sl-field37 sl-full37">
                <label>Description *</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} />
              </div>
            </div>

            <div className="sl-add-actions37">
              <button className="sl-btn37 cancel37" onClick={handleCancelForm}>Cancel</button>
              <button className="sl-btn37 save37" onClick={handleSaveForm}>Save</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="sl-main-box37">
            <div className="sl-list-head37 sl-list-head-full-green37">
              <div className="sl-list-title37">
                <i className="ri-menu-line"></i> Student Leave List
              </div>

              <button className="sl-add-btn37" onClick={() => setShowAddForm(true)}>
                Add Leave
              </button>
            </div>

            <div className="sl-btn-row37">
              <div className="sl-dropdown37">
                <button className="sl-column-btn37" onClick={() => setShowColMenu(!showColMenu)}>
                  Column Visibility ▾
                </button>

                {showColMenu && (
                  <div className="sl-column-menu37">
                    {columns.map((col) => (
                      <label key={col} className="sl-col-item37">
                        <input
                          type="checkbox"
                          checked={visibleCols[col]}
                          onChange={() => toggleColumn(col)}
                        />
                        {col.toUpperCase()}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="sl-search-box37">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
              </div>
            </div>

            <div className="sl-table-wrap37">
              <table className="sl-table37">
                <thead>
                  <tr>
                    {visibleCols.class && <th>CLASS</th>}
                    {visibleCols.apply && <th>APPLY DATE</th>}
                    {visibleCols.days && <th>NO OF DAYS</th>}
                    {visibleCols.leave && <th>LEAVE DATE</th>}
                    {visibleCols.status && <th>STATUS</th>}
                    {visibleCols.reply && <th>REPLY</th>}
                    {visibleCols.description && <th>DESCRIPTION</th>}
                    {visibleCols.action && <th>ACTION</th>}
                  </tr>
                </thead>

                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id}>
                      {visibleCols.class && <td>{r.class}</td>}
                      {visibleCols.apply && <td>{r.apply}</td>}
                      {visibleCols.days && <td>{r.days}</td>}
                      {visibleCols.leave && <td>{r.leave}</td>}

                      {visibleCols.status && (
                        <td>
                          <span
                            className={
                              r.status === "Approved"
                                ? "sl-status37 sl-green37"
                                : "sl-status37 sl-red37"
                            }
                          >
                            {r.status}
                          </span>
                        </td>
                      )}

                      {visibleCols.reply && <td>{r.reply || "-"}</td>}
                      {visibleCols.description && <td>{r.description}</td>}

                      {visibleCols.action && (
                        <td className="sl-action-cell37">
                          <div
                            className="sl-action37"
                            onClick={() =>
                              setOpenActionId(openActionId === r.id ? null : r.id)
                            }
                          >
                            Action ▾
                          </div>

                          {openActionId === r.id && (
                            <div className="sl-action-menu37 active37">
                              <button
                                className="sl-approve37"
                                onClick={() => {
                                  updateStatus(r.id, "Approved");
                                  setOpenActionId(null);
                                }}
                              >
                                ✔ Approved
                              </button>

                              <button
                                className="sl-reject37"
                                onClick={() => {
                                  updateStatus(r.id, "Rejected");
                                  setOpenActionId(null);
                                }}
                              >
                                ✖ Rejected
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}