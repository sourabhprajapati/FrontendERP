export default function PeriodicTest() {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label>Enter Test Name <span>*</span></label>
          <input type="text" placeholder="PT" />
        </div>

        <div className="form-group">
          <label>Enter No. Of Test <span>*</span></label>
          <input type="number" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Reflective Marks <span>*</span></label>
          <input type="number" />
        </div>

        <div className="form-group">
          <label>
            How Many Test You Want To Include For Final Evaluation
          </label>
          <select>
            <option>Select Here</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
