const Table = ({
  columns,
  rows,
}: {
  columns: any[];
  rows: any[];
  isSerial?: boolean;
  isAction?: boolean;
}) => {
  const renderCell = (row: any, field: string) => {
    const value = row[field];

    if (typeof value === "object" && !Array.isArray(value)) {
      // Render nested object
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      // Render array
      return value.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ));
    }

    return value; // Default rendering
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.field}>{renderCell(row, column.field)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
