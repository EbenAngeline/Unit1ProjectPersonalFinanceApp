import "./Table.css";

function Table({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No data available.",
  className = "",
}) {
  return (
    <div className={`table-wrapper ${className}`.trim()}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (       //.. calculate the width auto ,each coln gets equal width ...display the coln title
              <th key={column.key} style={{ width: `${100 / columns.length}%` }}>
                {column.label}    
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="table-empty" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (     //.. create one table row //React efficiently update only the rows that change.
              <tr key={getRowKey(row)}>       
                {columns.map((column) => (     //for each row, loop thro every coln
                  <td key={column.key} className={column.cellClassName?.(row)}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
