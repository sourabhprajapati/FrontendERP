export default function SignatureDetails() {
  return (
    <div className="form-section">
      <h4 className="section-title">Class Teacher Signature Details</h4>

      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Sign. Name</th>
            <th>Class Name</th>
            <th>Type</th>
            <th>Upload (Only Image)</th>
            <th>Alignment</th>
          </tr>
        </thead>
        <tbody>
          {[1,2].map(i => (
            <tr key={i}>
              <td><input /></td>
              <td><input /></td>
              <td><input placeholder="2nd-A"/></td>
              <td>
                <label><input type="radio"/> Manual</label>
                <label><input type="radio"/> Image</label>
              </td>
              <td><input type="file"/></td>
              <td>
                <label><input type="radio"/> Left</label>
                <label><input type="radio"/> Center</label>
                <label><input type="radio"/> Right</label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="section-title">Other Signature Details</h4>

      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Sign. Name</th>
            <th>Type</th>
            <th>Upload</th>
            <th>Alignment</th>
          </tr>
        </thead>
        <tbody>
          {[2,3,4].map(i => (
            <tr key={i}>
              <td><input /></td>
              <td><input /></td>
              <td>
                <label><input type="radio"/> Manual</label>
                <label><input type="radio"/> Image</label>
              </td>
              <td><input type="file"/></td>
              <td>
                <div className="alignment-group">
  <label>
    <input type="radio" name="alignment" /> Left
  </label>
  <label>
    <input type="radio" name="alignment" /> Center
  </label>
  <label>
    <input type="radio" name="alignment" /> Right
  </label>
</div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-footer">
        <button className="btn-primary">Add Settings</button>
      </div>
    </div>
  );
}
