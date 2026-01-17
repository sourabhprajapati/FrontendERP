export default function MarksheetDesign() {
  return (
    <div className="form-section">
      <h4 className="section-title">Student Profile</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Font Size</label>
          <input />
        </div>
        <div className="form-group">
          <label>Font Weight</label>
          <div className="radio-group">
            <label><input type="radio"/> Bold</label>
            <label><input type="radio"/> Normal</label>
          </div>
        </div>
      </div>

      <h4 className="section-title">Table Header</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Font Size</label>
          <input />
        </div>
        <div className="form-group">
          <label>Font Weight</label>
          <div className="radio-group">
            <label><input type="radio"/> Bold</label>
            <label><input type="radio"/> Normal</label>
          </div>
        </div>
      </div>

      <h4 className="section-title">Subject Column</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Font Size</label>
          <input />
        </div>
      </div>

      <h4 className="section-title">Marks Column</h4>
      <div className="form-row">
        <div className="form-group">
          <label>Font Size</label>
          <input />
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
