import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface InvoiceDownloadButtonProps {
  invoiceId: number;
}
const InvoiceDownloadButton: React.FC<InvoiceDownloadButtonProps> = ({
  invoiceId,
}) => {
  const pdfUrl = `${BASE_URL}/api/download/invoice/${invoiceId}/`;
  return <Link href={pdfUrl}>Télécharger</Link>;
};

export default InvoiceDownloadButton;
