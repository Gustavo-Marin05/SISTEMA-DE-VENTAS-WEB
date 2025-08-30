import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../api";
import { FaFileInvoice } from "react-icons/fa";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener clientes", err);
      });
  }, []);

  const handleCreateCustomer = () => {
    navigate("/customer/create");
  };

  return (
    <div className="flex justify-center px-2">
      <div className="bg-[#263556] p-4 md:p-5 rounded w-full max-w-full overflow-hidden">
        {/* Contenedor con scroll horizontal solo si es necesario */}
        <div className="overflow-x-auto">
          <table className="w-full md:min-w-[800px] table-auto border-separate border-spacing-0 rounded-lg text-sm md:text-base">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-2 md:px-4 py-2 text-left text-white rounded-tl-lg">
                  NOMBRE
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">CI</th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  FACTURAS
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#2E3A4B] text-white">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-2 md:px-4 py-2">{customer.fullName}</td>
                  <td className="px-2 md:px-4 py-2">{customer.ci}</td>
                  <td className="px-2 md:px-4 py-2 flex justify-center">
                    <button
                      className="bg-blue-500 text-white px-2 md:px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/customer/facturas/${customer.id}`)
                      }
                    >
                      <FaFileInvoice />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón crear cliente */}
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            onClick={() => navigate("/customer/create")}
          >
            New Customer
          </button>
        </div>
      </div>
    </div>
  );
}
