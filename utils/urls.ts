export const URLS = {
  HOME: "/",
  INVOICES: "/invoices/",
  INVOICE: (id: number) => `invoice/${id}`,
} as const;
