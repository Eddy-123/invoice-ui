export interface ApiArticle {
  id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ApiInvoice {
  id: number;
  invoice_number: string;
  client_name: string;
  client_email: string;
  total_amount: number;
  articles: ApiArticle[];
}
