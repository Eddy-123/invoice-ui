"use client";

import Toast from "@/components/Toast";
import { fetchInvoiceDetail } from "@/services/invoiceService";

import { use, useEffect, useState } from "react";
import { Invoice } from "../../../../types/localTypes";
import DataTable from "@/components/DataTable";

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

const InvoicePage = ({ params }: InvoicePageProps) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  const headers = [
    { key: "description", title: "Description" },
    { key: "quantity", title: "Quantité" },
    { key: "total_price", title: "Prix Total" },
    { key: "unit_price", title: "Prix Unitaire" },
  ];

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

      <h2 className="mt-2 md:mt-8 lg:mt-16 text-center text-4xl">Articles</h2>
      <div className="my-2 md:my-8 lg:my-16 mx-2 md:mx-8 lg:mx-16">
        <DataTable
          headers={headers}
          data={invoice.articles}
          emptyMessage="Aucun Article"
          displayActions={false}
        />
      </div>
    </div>
  );
};

export default InvoicePage;
