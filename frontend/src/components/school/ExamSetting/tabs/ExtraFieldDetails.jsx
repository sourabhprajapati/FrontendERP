export default function ExtraFieldDetails() {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label>Want To Show Extra Field Table (i.e. Height, Weight) *</label>
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
