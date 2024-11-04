import Link from "next/link";
import { Article, Invoice } from "../../types/localTypes";
import React from "react";
import { URLS } from "../../utils/urls";
import InvoiceDownloadButton from "./InvoiceDownloadButton";

interface DataTableProps {
  data: Array<Invoice | Article>;
  headers: Array<{ key: string; title: string }>;
  emptyMessage: string;
  displayActions: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  headers,
  emptyMessage,
  displayActions,
}) => {
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
            {displayActions && (
              <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            )}
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
                  {/* @ts-expect-error string can't be used as index of Invoice*/}
                  {row[header.key]}
                </td>
              ))}

              {displayActions && (
                <td className="px-4 py-2 border-t text-sm text-gray-700 whitespace-nowrap">
                  <Link href={URLS.INVOICE(row.id)} className="m-2">
                    Détail
                  </Link>
                  |
                  <span className="m-2">
                    <InvoiceDownloadButton invoiceId={row.id} />
                  </span>
                </td>
              )}
            </tr>
          ))}

          {data.length == 0 && (
            <tr className="even:bg-gray-50 hover:bg-gray-100 transition-colors text-center">
              <td
                colSpan={headers.length}
                className="px-4 py-2 border-t text-sm text-gray-700 whitespace-nowrap"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
