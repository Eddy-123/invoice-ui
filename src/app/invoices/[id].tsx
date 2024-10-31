import Toast from "@/components/Toast";
import { fetchInvoiceDetail } from "@/services/invoiceService";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Invoice } from "../../../types/localTypes";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const loadInvoice = async () => {
      if (id) {
        try {
          const data = await fetchInvoiceDetail(Number(id));
          setInvoice(data);
        } catch (err) {
          setError("La récupération de la facture a échoué.");
          console.log(err);
        }
      }
    };
    loadInvoice();
  }, [id]);

  useEffect(() => {
    if (error !== null) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  }, [error]);

  if (error) return <p>{error}</p>;
  if (!invoice) return <p>En cours de chargement...</p>;
  return (
    <div>
      <h1>Facture {invoice.invoiceNumber}</h1>
      <p>Nom du Client: {invoice.clientName}</p>
      <p>Email du Client: {invoice.clientEmail}</p>
      <p>Montant Total: {invoice.totalAmount}</p>

      <h2>Articles</h2>
      <ul>
        {invoice.articles.map((article) => (
          <li key={article.id}>
            {article.description} - {article.quantity} x {article.price} ={" "}
            {article.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceDetail;
