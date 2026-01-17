export default function HeaderDetails() {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label>Marksheet Header Line 1 <span>*</span></label>
          <input />
        </div>

        <div className="form-group">
          <label>Marksheet Header Line 2</label>
          <input />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Marksheet Header Line 3</label>
          <input />
        </div>

        <div className="form-group">
          <label>Apply School Header In Marksheet <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Yes</label>
            <label><input type="radio" /> No</label>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Show Student Image <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Yes</label>
            <label><input type="radio" /> No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Allow Exam Full Name In Marksheet</label>
          <div className="radio-group">
            <label><input type="radio" /> Yes</label>
            <label><input type="radio" /> No</label>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
