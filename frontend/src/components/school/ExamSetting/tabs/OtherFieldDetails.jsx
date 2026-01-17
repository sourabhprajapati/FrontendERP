export default function OtherFieldDetails() {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label>Want To Show Other Value (i.e. Rank, Result) *</label>
          <div className="radio-group">
            <label><input type="radio"/> Yes</label>
            <label><input type="radio"/> No</label>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
