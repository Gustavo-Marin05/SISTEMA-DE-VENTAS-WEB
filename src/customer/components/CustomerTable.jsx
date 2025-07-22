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
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 text-left text-white rounded-tl-lg">
                  NOMBRE
                </th>
                <th className="px-4 py-2 text-left text-white">CI</th>
                <th className="px-4 py-2 text-left text-white">FACTURAS</th>
              </tr>
            </thead>

            <tbody className="text-white bg-[#2E3A4B]">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2">{customer.fullName}</td>
                  <td className="px-4 py-2">{customer.ci}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
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
      </div>
    </div>
  );
}
