import React, { useState } from "react";
import "./Settings.css";

const DEFAULT_PERIODS = [
  { id: 1, name: "Period 1", start: "08:00", end: "08:40" },
  { id: 2, name: "Period 2", start: "08:45", end: "09:25" },
  { id: 3, name: "Period 3", start: "09:35", end: "10:15" },
  { id: 4, name: "Period 4", start: "10:20", end: "11:00" },
  { id: 5, name: "Period 5", start: "11:10", end: "11:50" },
];

export default function Settings() {
  const [days, setDays] = useState([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
  ]);

  const [periods, setPeriods] = useState(DEFAULT_PERIODS);
  const [newPeriodName, setNewPeriodName] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  function addPeriod() {
    if (!newPeriodName.trim() || !newStart || !newEnd) {
      alert("Please fill all fields");
      return;
    }
    if (newEnd <= newStart) {
      alert("End time must be greater than start time.");
      return;
    }

    const newPeriod = {
      id: Date.now(),
      name: newPeriodName,
      start: newStart,
      end: newEnd,
    };

    setPeriods((prev) => [newPeriod, ...prev]);
    setNewPeriodName("");
    setNewStart("");
    setNewEnd("");
  }

  function removePeriod(id) {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="set-page-container27">
    
      <div className="set-card27">
        <h2 className="set-title27">Time Table Settings</h2>

        {/* DAYS BLOCK */}
        <div className="set-block27">
          <h3>School Days</h3>
          <div className="set-day-list27">
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
              <label className="set-day27" key={d}>
                <input
                  type="checkbox"
                  checked={days.includes(d)}
                  onChange={() => {
                    setDays((prev) =>
                      prev.includes(d)
                        ? prev.filter((x) => x !== d)
                        : [...prev, d]
                    );
                  }}
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
          <p className="set-note27">
            Selected days will be used in all class & teacher timetables.
          </p>
        </div>

        {/* PERIODS BLOCK */}
        <div className="set-block27">
          <h3>Periods</h3>

          <div className="set-table-container27">
            <table className="set-table27">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.start}</td>
                    <td>{p.end}</td>
                    <td>
                      <button className="set-del27" onClick={() => removePeriod(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="set-add27">
            <input
              type="text"
              placeholder="Period Name"
              value={newPeriodName}
              onChange={(e) => setNewPeriodName(e.target.value)}
            />
            <input type="time" value={newStart} onChange={(e) => setNewStart(e.target.value)} />
            <input type="time" value={newEnd} onChange={(e) => setNewEnd(e.target.value)} />
            <button className="set-add-btn27" onClick={addPeriod}>
              Add
            </button>
          </div>

          <p className="set-tip27">
            First configure your week & periods. Timetable pages use these settings.
          </p>
        </div>
      </div>
    
    </div>
  );
}