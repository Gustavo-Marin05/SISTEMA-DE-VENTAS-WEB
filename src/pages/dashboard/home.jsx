import { useEffect, useState } from "react";
import Card from "../../components/home/card";
import Graphic from "../../components/home/grafica";
import { getAllProducts } from "../../api/products";
import { getAllAtm } from "../../api/atm";
import { getAllCategories } from "../../api/category";

export default function Home() {
  const [totals, setTotals] = useState({
    productos: 0,
    cajeros: 0,
    categorias: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener productos
        const resProducts = await getAllProducts();
        const products =  resProducts.data;

        //obtner los cajeros o atm

        const resAtm =await getAllAtm();
        const atm = await resAtm.data;

        // obtener las categorias

        const resCategory =await getAllCategories();
        const category =await resCategory.data;

        setTotals({
          productos: products.length,
          atm: atm.length, // cambiar cuando tengas datos reales
          category: category.length, // cambiar cuando tengas datos reales
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Sección del gráfico */}
      <div className="w-full max-w-4xl flex justify-center">
        <Graphic />
      </div>

      {/* Sección de las cards en wrap */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        <Card title="Productos" description={`TOTAL: ${totals.productos}`} />
        <Card title="Cajeros" description={`TOTAL: ${totals.atm}`}/>
        <Card title="Categorías" description={`TOTAL: ${totals.category}`} />
      </div>
    </div>
  );
}
