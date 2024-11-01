import { ApiInvoice } from "../../types/apiTypes";
import { Invoice } from "../../types/localTypes";
import { transformInvoice } from "../../utils/transform";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch(`${BASE_URL}/api/invoices/`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  const data: ApiInvoice[] = await response.json();
  return data.map(transformInvoice);
};

export const fetchInvoiceDetail = async (id: number): Promise<Invoice> => {
  const response = await fetch(`${BASE_URL}/api/invoice/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch invoice details");
  }
  const data = await response.json();
  return transformInvoice(data);
};
