import React, { useMemo, useState } from "react";
import "./AttendanceReport.css"; // ← Make sure this imports the CSS with 42 suffixes

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const STUDENTS = [
  { id: "S001", name: "Abhi", cls: "3rd A", percent: 100, present: 2, late: 0, leave: 0, absent: 0, holiday: 0, halfday: 0, days: { 5: "P", 12: "LA", 19: "L" } },
  { id: "S002", name: "Amit", cls: "3rd A", percent: 0, present: 0, late: 1, leave: 1, absent: 0, holiday: 0, halfday: 0, days: { 6: "LA", 21: "L" } },
  { id: "S003", name: "Arpit", cls: "3rd A", percent: 0, present: 0, late: 0, leave: 1, absent: 1, holiday: 0, halfday: 0, days: { 5: "L", 18: "A" } },
  { id: "S004", name: "Arpit Sharma", cls: "3rd A", percent: 0, present: 0, late: 0, leave: 1, absent: 0, holiday: 0, halfday: 1, days: { 7: "F", 23: "L" } },
  { id: "S005", name: "Capt. Anbuchelvan", cls: "3rd A", percent: 50, present: 1, late: 0, leave: 0, absent: 0, holiday: 0, halfday: 1, days: { 4: "P", 11: "P" } },
];
const CLASS_LIST = ["Nursery", "K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const MONTHS = [
  "January","February","March","April","May","June","July",
  "August","September","October","November","December"
];

export default function AttendanceReport() {
  const [category, setCategory] = useState("student");
  const [range, setRange] = useState("month");
  const [clsFilter, setClsFilter] = useState("");
  const [section, setSection] = useState("");
  const [month, setMonth] = useState("December");
  const [year, setYear] = useState(new Date().getFullYear());
  const [filterPreset, setFilterPreset] = useState("Default");
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);

  const defaultVisibility = useMemo(() => {
    const vis = {
      percent: true,
      present: true,
      late: true,
      leave: true,
      absent: true,
      holiday: true,
      halfday: true,
    };
    DAYS.forEach((d) => (vis[`d${d}`] = true));
    return vis;
  }, []);

  const [colVisible, setColVisible] = useState(defaultVisibility);
  const [colDropdownOpen, setColDropdownOpen] = useState(false);

  function toggleCol(key) {
    setColVisible((s) => ({ ...s, [key]: !s[key] }));
  }
  function setAllDaysVisible(val) {
    setColVisible((s) => {
      const copy = { ...s };
      DAYS.forEach((d) => (copy[`d${d}`] = val));
      return copy;
    });
  }
  function setAllColumns(val) {
    setColVisible((s) => {
      const copy = {};
      Object.keys(defaultVisibility).forEach((k) => (copy[k] = val));
      return copy;
    });
  }

  const filtered = useMemo(() => {
    let arr = STUDENTS.filter((s) => (category === "student" ? true : false));
    if (clsFilter) arr = arr.filter((s) => s.cls.startsWith(clsFilter));
    if (searchText) {
      const q = searchText.toLowerCase();
      arr = arr.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    return arr;
  }, [category, clsFilter, searchText]);

  const totals = useMemo(() => {
    const initialTotals = {
      present: 0, late: 0, leave: 0, absent: 0, holiday: 0, halfday: 0, totalPercent: 0,
    };
    const finalTotals = filtered.reduce((acc, student) => {
      acc.present += student.present;
      acc.late += student.late;
      acc.leave += student.leave;
      acc.absent += student.absent;
      acc.holiday += student.holiday;
      acc.halfday += student.halfday;
      acc.totalPercent += student.percent;
      return acc;
    }, initialTotals);

    finalTotals.avgPercent = filtered.length > 0 ? Math.round(finalTotals.totalPercent / filtered.length) : 0;
    finalTotals.totalPresent = finalTotals.present + finalTotals.late + finalTotals.halfday;
    finalTotals.totalAbsent = finalTotals.absent + finalTotals.leave;
    return finalTotals;
  }, [filtered]);

  return (
    <div className="ar-page42">
      <div className="ar-card42">
        <div className="ar-header42 criteria-bg42">
          <div className="ar-header-left42">
            <h2 className="title42">Select Criteria</h2>
          </div>
        </div>

        <div className="ar-filters42 criteria-bg42">
          <div className="ar-field42">
            <label>Class *</label>
            <select value={clsFilter} onChange={(e) => setClsFilter(e.target.value)}>
              <option value="">All</option>
              {CLASS_LIST.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="ar-field42">
            <label>Section *</label>
            <select value={section} onChange={(e) => setSection(e.target.value)}>
              <option value="">All</option>
              <option>A</option><option>B</option><option>C</option>
            </select>
          </div>

          <div className="ar-field42">
            <label>Month *</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="year-filter-wrap42 same-gap">
            <div className="ar-field42 small">
              <label>Year</label>
              <input
                type="number"
                value={year}
                placeholder="Year"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="ar-field42 small">
              <label>Filter</label>
              <select value={filterPreset} onChange={(e) => setFilterPreset(e.target.value)}>
                <option>Default</option>
                <option>Only Present</option>
              </select>
            </div>
          </div>

          <div className="ar-field42" style={{ width: 120 }}>
            <label>&nbsp;</label>
            <button
              className="btn42 btn-green42 search-blue42"
              style={{ width: "100%" }}
              onClick={() => setShowResults(true)}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="ar-card42 ar-results42">
          <div className="search-header-wrap42">
            <h3 className="search-title42">Student Attendance List</h3>
            <div className="search-bar-box42">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="visibility-btn-wrap42 left-align">
            <button
              className="btn42 btn-green42"
              onClick={() => setColDropdownOpen((s) => !s)}
            >
              Column Visibility Down Arrow
            </button>
          </div>

          {colDropdownOpen && (
            <div className="col-dropdown42 below-results">
              <div className="col-actions42">
                <button onClick={() => setAllColumns(true)} className="linkish">Show all</button>
                <button onClick={() => setAllColumns(false)} className="linkish">Hide all</button>
                <button onClick={() => setAllDaysVisible(true)} className="linkish">Show days</button>
                <button onClick={() => setAllDaysVisible(false)} className="linkish">Hide days</button>
              </div>
              <div className="col-grid42">
                <label><input type="checkbox" checked={colVisible.percent} onChange={() => toggleCol("percent")} /> %</label>
                <label><input type="checkbox" checked={colVisible.present} onChange={() => toggleCol("present")} /> Present</label>
                <label><input type="checkbox" checked={colVisible.late} onChange={() => toggleCol("late")} /> Late</label>
                <label><input type="checkbox" checked={colVisible.leave} onChange={() => toggleCol("leave")} /> Leave</label>
                <label><input type="checkbox" checked={colVisible.absent} onChange={() => toggleCol("absent")} /> Absent</label>
                <label><input type="checkbox" checked={colVisible.holiday} onChange={() => toggleCol("holiday")} /> Holiday</label>
                <label><input type="checkbox" checked={colVisible.halfday} onChange={() => toggleCol("halfday")} /> Half Day</label>
                <div className="days-sep42">Days</div>
                {DAYS.map((d) => (
                  <label key={d} className="day-checkbox42">
                    <input type="checkbox" checked={colVisible[`d${d}`]} onChange={() => toggleCol(`d${d}`)} /> {d}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="table-area42">
            <div className="table-wrap42">
              <table className="att-table42">
                <thead>
                  <tr>
                    <th className="sticky-left42">STUDENT</th>
                    {colVisible.percent && <th className="summary-col42">%</th>}
                    {colVisible.present && <th className="summary-col42">PRESENT (P)</th>}
                    {colVisible.late && <th className="summary-col42">LATE (LA)</th>}
                    {colVisible.leave && <th className="summary-col42">LEAVE (L)</th>}
                    {colVisible.absent && <th className="summary-col42">ABSENT (A)</th>}
                    {colVisible.holiday && <th className="summary-col42">HOLIDAY (H)</th>}
                    {colVisible.halfday && <th className="summary-col42">HALF DAY (F)</th>}
                    <th className="days-header42" colSpan={DAYS.length} style={{ minWidth:"max-content", padding:0 }}>
                      <div className="days-row42">
                        {DAYS.map((d) =>
                          colVisible[`d${d}`] ? (
                            <div className="day-cell42 day-darker42" key={d}>
                              <div className="day-num42">{d}</div>
                              <div className="day-week42"></div>
                            </div>
                          ) : null
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td className="sticky-left42 student-cell42">
                        <div className="student-name42">{s.name}</div>
                        <div className="student-id42">{s.id} · {s.cls}</div>
                      </td>
                      {colVisible.percent && <td>{s.percent}</td>}
                      {colVisible.present && <td>{s.present}</td>}
                      {colVisible.late && <td>{s.late}</td>}
                      {colVisible.leave && <td>{s.leave}</td>}
                      {colVisible.absent && <td>{s.absent}</td>}
                      {colVisible.holiday && <td>{s.holiday}</td>}
                      {colVisible.halfday && <td>{s.halfday}</td>}
                      <td style={{ padding: 0 }}>
                        <div className="days-row42 body-days42">
                          {DAYS.map((d) =>
                            colVisible[`d${d}`] ? (
                              <div key={d} className="day-cell42 body-cell42">
                                <div className="mark42">{s.days && s.days[d] ? s.days[d] : ""}</div>
                              </div>
                            ) : null
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* TOTAL PRESENT ROW */}
                  <tr className="total-row42 total-present-row42">
                    <td className="sticky-left42 student-cell42">
                      <div className="student-name42">TOTAL PRESENT</div>
                    </td>
                    {colVisible.percent && <td>{totals.avgPercent}%</td>}
                    {colVisible.present && <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>{totals.totalPresent}</td>}
                    <td colSpan={1} style={{ padding: 0 }}>
                      <div className="days-row42 body-days42">
                        {DAYS.map((d) =>
                          colVisible[`d${d}`] ? (
                            <div key={`total-present-${d}`} className="day-cell42 total-day-cell42 present-day-cell42"></div>
                          ) : null
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* TOTAL ABSENT ROW */}
                  <tr className="total-row42 total-absent-row42">
                    <td className="sticky-left42 student-cell42">
                      <div className="student-name42">TOTAL ABSENT</div>
                    </td>
                    {colVisible.percent && <td>{100 - totals.avgPercent}%</td>}
                    {colVisible.present && <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>{totals.totalAbsent}</td>}
                    <td colSpan={1} style={{ padding: 0 }}>
                      <div className="days-row42 body-days42">
                        {DAYS.map((d) =>
                          colVisible[`d${d}`] ? (
                            <div key={`total-absent-${d}`} className="day-cell42 total-day-cell42 absent-day-cell42"></div>
                          ) : null
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}