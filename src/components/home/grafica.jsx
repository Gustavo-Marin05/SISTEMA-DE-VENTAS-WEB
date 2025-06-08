import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

import { getallinvoice } from "../../api/invoice";

export default function Graphic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        getallinvoice()
          .then((res) => {
            console.log("invoice recibidos:", res.data);
            setCustomers(res.data);
          })
          .catch((err) => {
            console.error("Error al obtener a los clientes", err);
          });
        // Convertir a formato para la gráfica
        const chartData = Object.entries(grouped).map(([date, total]) => ({
          date,
          total,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error al obtener invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Ventas a lo largo del tiempo</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
