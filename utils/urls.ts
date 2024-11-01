export const URLS = {
  HOME: "/",
  INVOICES: "/invoices/",
  INVOICE: (id: number) => `invoices/${id}`,
} as const;
