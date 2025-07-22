import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoicesCustomer, printInvoiceCustomer } from "../api";
import { FaPrint } from "react-icons/fa";

export default function CustomerFacturas() {
  const [invoices, setInvoices] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getInvoicesCustomer(id)
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener facturas del cliente", err);
      });
  }, [id]);

  const handlePrint = async (invoiceId) => {
    try {
      const res = await printInvoiceCustomer(invoiceId);

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      // Abrir en una nueva pestaña
      window.open(fileURL);

      // Si prefieres descargar automáticamente en vez de abrir:
      // const link = document.createElement("a");
      // link.href = fileURL;
      // link.download = `factura-${invoiceId}.pdf`;
      // link.click();
    } catch (error) {
      console.error("Error al imprimir factura", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-[#263556] p-5 rounded max-w-4xl w-full overflow-hidden">
        <h2 className="text-white text-xl font-bold mb-4">
          Facturas de: {invoices[0]?.customer?.fullName || "Cliente"}
        </h2>

        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 text-left text-white">ID Factura</th>
                <th className="px-4 py-2 text-left text-white">Fecha</th>
                <th className="px-4 py-2 text-left text-white">Total</th>
                <th className="px-4 py-2 text-left text-white">Operacion</th>
              </tr>
            </thead>
            <tbody className="text-white bg-[#2E3A4B]">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-4 py-2">{invoice.id}</td>
                  <td className="px-4 py-2">
                    {new Date(invoice.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{invoice.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() => handlePrint(invoice.id)}
                    >
                      <FaPrint />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="w-40 border border-[#29292D] text-gray-300 hover:bg-[#29292D] hover:text-white py-2.5 rounded-md transition"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
