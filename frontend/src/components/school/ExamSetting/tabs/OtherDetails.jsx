export default function OtherDetails() {
  const rows = [
    "Each Term will contain total of its exam",
    "Each Term will contain grade",
    "Marksheet will contain final total (last column)",
    "Marksheet will contain final grade (last column)",
    "Marksheet will contain final percentage (last column)",
    "Marksheet will contain total (last row)",
    "Marksheet will contain percentage (last row)",
    "Marksheet will contain grade (last row)",
  ];

  return (
    <div className="form-section">
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Detail</th>
            <th>Yes / No</th>
            <th>If Yes, Then Name</th>
            <th>Extra Setting</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{r}</td>
              <td>
                <label><input type="radio"/> Yes</label>
                <label><input type="radio"/> No</label>
              </td>
              <td><input /></td>
              <td></td>
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
