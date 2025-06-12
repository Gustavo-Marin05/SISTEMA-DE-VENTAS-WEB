// CustomerInvoice.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <--- importamos useParams
import { getcustomerbyId } from "../../api/customer";

const CustomerInvoice = () => {
  const { id } = useParams(); // <--- obtenemos id desde la URL
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getcustomerbyId(id);
        console.log("Respuesta API:", response.data);
        setCustomer(response.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Error: ${err.response.status} - ${
              err.response.data.message || "Error al obtener el cliente"
            }`
          );
        } else {
          setError("Error al obtener el cliente");
        }
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!customer) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold  mb-2">Cliente: {customer.fullName}</h2>
      <h2 className="text-2xl font-bold  mb-2">nit/ci: {customer.ci}</h2>
      <h3 className="text-xl  mb-4">Facturas:</h3>

      {customer.invoices?.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full text-sm text-left text-gray-200 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-xs uppercase text-gray-300">
              <tr>
                <th className="px-6 py-3">Número</th>
                <th className="px-6 py-3">iva</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">factura</th>
              </tr>
            </thead>
            <tbody>
              {customer.invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-600 hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{invoice.number}</td>
                  <td className="px-6 py-4">{invoice.tax}</td>
                  <td className="px-6 py-4">{invoice.total}</td>
                  <td className="px-6 py-4">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <a
                      href={`http://localhost:4000/api/invoice/${invoice.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      imprimir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Este cliente no tiene facturas.</p>
      )}
    </div>
  );
};

export default CustomerInvoice;
