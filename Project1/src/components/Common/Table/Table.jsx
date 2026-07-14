import "./Table.css";

function Table({ headers, children, className = "" }) {
  return (
    <div className={`table-wrapper ${className}`.trim()}>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
