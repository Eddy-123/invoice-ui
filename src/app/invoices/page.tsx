"use client";

import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import { fetchInvoices } from "@/services/invoiceService";
import { Invoice } from "../../../types/localTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const headers = [
    { key: "invoiceNumber", title: "Numéro de Facture" },
    { key: "clientName", title: "Nom du Client" },
    { key: "clientEmail", title: "Email du Client" },
    { key: "totalAmount", title: "Montant Total" },
  ];

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (err) {
        setError("La récupération des factures a échoué.");
        console.log(err);
      }
    };
    loadInvoices();
  }, []);

  useEffect(() => {
    if (error !== null) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  }, [error]);

  return (
    <div>
      <h1 className="mt-2 md:mt-8 lg:mt-16 text-center text-4xl">Factures</h1>
      <div className="my-2 md:my-8 lg:my-16 mx-2 md:mx-8 lg:mx-16">
        <DataTable headers={headers} data={invoices} />
      </div>
    </div>
  );
};

export default InvoiceList;
