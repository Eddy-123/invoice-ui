import { ApiInvoice } from "../types/apiTypes";
import { Invoice } from "../types/localTypes";

export const transformInvoice = (apiInvoice: ApiInvoice): Invoice => ({
  id: apiInvoice.id,
  invoiceNumber: apiInvoice.invoice_number,
  clientName: apiInvoice.client_name,
  clientEmail: apiInvoice.client_email,
  totalAmount: apiInvoice.total_amount,
  articles: (apiInvoice.articles || []).map((item) => ({ ...item })),
});
