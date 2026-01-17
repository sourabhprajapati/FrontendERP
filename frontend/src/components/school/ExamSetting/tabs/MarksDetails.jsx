export default function MarksDetails() {
  return (
    <div className="form-section">
      <div className="form-row">
        <div className="form-group">
          <label>Marks will be entered in form of <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Marks</label>
            <label><input type="radio" /> Grade</label>
          </div>
        </div>

        <div className="form-group">
          <label>
            In Case Of medical leave (ML), include max marks in marksheet
          </label>
          <div className="radio-group">
            <label><input type="radio" /> Yes</label>
            <label><input type="radio" /> No</label>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Rank Must Be Generated On Basis Of <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Total Marks</label>
            <label><input type="radio" /> Percentage</label>
          </div>
        </div>

        <div className="form-group">
          <label>Final Marks Should Be <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Total Of Term's Marks</label>
            <label><input type="radio" /> Average</label>
            <label><input type="radio" /> Percentage</label>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Show Scholastic Grade Scale In Marksheet <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Yes</label>
            <label><input type="radio" /> No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Grade Scale Format Should Be <span>*</span></label>
          <div className="radio-group">
            <label><input type="radio" /> Horizontally</label>
            <label><input type="radio" /> Vertically</label>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
