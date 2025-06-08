import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCustomer } from "../../api/customer.js";

export default function TableCustomer() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);


  const handleviewCustomInvoice = (id) => {
    navigate(`/customer/invoice/${id}`);
  };

  useEffect(() => {
    getAllCustomer()
      .then((res) => {
        console.log("Clientes recibidos:", res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener a los clientes", err);
      });
  }, []);

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  CI/NIT
                </th>
                <th className="px-4 py-2 text-left text-white">
                  NOMBRE COMPLETO
                </th>
                <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2">{customer.ci}</td>
                  <td className="px-4 py-2">{customer.fullName}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleviewCustomInvoice(customer.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      ver facturas
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
