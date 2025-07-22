import { useNavigate } from "react-router-dom";
import { delteProduct, getproducts } from "../api";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TableProduct() {
  //estados para los productos
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  

  //el efecto para los productos

  useEffect(() => {
    getproducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener productos", err);
      });
  }, []);

  //borramos la categoria
  const handleDeleteProduct = async (id) => {
    console.log("Intentando eliminar el producto:");
    const confirmDelete = window.confirm("¿Seguro de borrar el producto?");
    if (!confirmDelete) return;

    try {
      await delteProduct(id);
      const res = await getproducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  PRODUCTOS
                </th>
                <th className="px-4 py-2 text-left text-white">CANTIDAD</th>
                <th className="px-4 py-2 text-left text-white">PRECIO</th>
                <th className="px-4 py-2 text-left text-white">CATEGORIA</th>
                <th className="px-4 py-2 rounded-tr-lg text-white">
                  OPERACIOBES
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#2E3A4B] text-white">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.category?.name}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product.id)}>
                     <FaTrash/>
                    </button>
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      <FaEdit/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateProduct}
            className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border"
          >
            new product
          </button>
        </div>
      </div>
    </div>
  );
}