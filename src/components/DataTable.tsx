import { Invoice } from "../../types/localTypes";
import React from "react";

interface DataTableProps {
  data: Array<Invoice>;
  headers: Array<{ key: string; title: string }>;
}

const DataTable: React.FC<DataTableProps> = ({ data, headers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {headers.map((header, idx) => (
                <td
                  key={idx}
                  className="px-4 py-2 border-t text-sm text-gray-700 whitespace-nowrap"
                >
                  {/* @ts-ignore */}
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
