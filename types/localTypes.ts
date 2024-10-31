export interface Article {
  id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  totalAmount: number;
  articles: Article[];
}
