import { ReactNode } from "react";

type Column = {
  field: string;
  headerName: string;
  render?: (value: any, row: any) => ReactNode;
};

type TableProps = {
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
  isSerial?: boolean;
};

const statusTone: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-600",
  pending: "bg-amber-100 text-amber-600",
  escalated: "bg-rose-100 text-rose-600",
};

const Table = ({
  columns,
  rows,
  emptyMessage = "No records found.",
  isSerial = true,
}: TableProps) => {
  const renderCell = (row: any, column: Column) => {
    const value = row[column.field];
    if (column.render) {
      return column.render(value, row);
    }

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ));
      }
      return JSON.stringify(value);
    }

    if (typeof value === "string") {
      const normalized = value.toLowerCase();
      if (statusTone[normalized]) {
        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone[normalized]}`}
          >
            {value}
          </span>
        );
      }
    }

    return value ?? "--";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-slate-600">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
            {isSerial && <th className="pb-3 font-semibold">#</th>}
            {columns.map((column) => (
              <th key={column.field} className="pb-3 font-semibold">
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                className="py-6 text-center text-slate-400"
                colSpan={columns.length + (isSerial ? 1 : 0)}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="group border-b border-slate-200/70 last:border-b-0"
              >
                {isSerial && (
                  <td className="py-4 text-xs font-semibold text-slate-400">
                    {rowIndex + 1}
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.field}
                    className="py-4 text-sm text-slate-600 group-hover:text-slate-900"
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
