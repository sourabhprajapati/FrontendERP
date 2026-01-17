import { useState } from "react";

export default function SubjectDetails() {
  const [subTab, setSubTab] = useState("co");

  return (
    <div className="form-section">
      <div className="sub-tabs">
        <button onClick={() => setSubTab("co")} className={subTab==="co"?"active":""}>
          Co-scholastic Subject
        </button>
        <button onClick={() => setSubTab("other")} className={subTab==="other"?"active":""}>
          Other Subject
        </button>
        <button onClick={() => setSubTab("additional")} className={subTab==="additional"?"active":""}>
          Additional Subject
        </button>
        <button onClick={() => setSubTab("position")} className={subTab==="position"?"active":""}>
          Subject Group Position Setting
        </button>
      </div>

      {subTab === "co" && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Show Co-scholastic Area *</label>
              <div className="radio-group">
                <label><input type="radio"/> Yes</label>
                <label><input type="radio"/> No</label>
              </div>
            </div>

            <div className="form-group">
              <label>Header for Co-scholastic Area</label>
              <input />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Co-scholastic Header Contain Term Name At *</label>
              <div className="radio-group">
                <label><input type="radio"/> Beginning of Header</label>
                <label><input type="radio"/> End of Header</label>
                <label><input type="radio"/> Don't Add Term Name</label>
              </div>
            </div>

            <div className="form-group">
              <label>Co-scholastic Area Contain *</label>
              <div className="radio-group">
                <label><input type="radio"/> Each Term</label>
                <label><input type="radio"/> Last Term</label>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
