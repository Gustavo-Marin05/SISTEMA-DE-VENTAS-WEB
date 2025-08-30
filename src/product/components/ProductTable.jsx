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
    <div className="flex justify-center px-2">
      <div className="bg-[#263556] p-4 md:p-5 rounded w-full overflow-hidden">
        {/* Scroll horizontal para tablas grandes */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-2 md:px-4 py-2 rounded-tl-lg text-left text-white">
                  PRODUCTOS
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  CANTIDAD
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  PRECIO
                </th>
                <th className="px-2 md:px-4 py-2 text-left text-white">
                  CATEGORIA
                </th>
                <th className="px-2 md:px-4 py-2 rounded-tr-lg text-white">
                  OPERACIONES
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#2E3A4B] text-white">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-2 md:px-4 py-2">{product.name}</td>
                  <td className="px-2 md:px-4 py-2">{product.stock}</td>
                  <td className="px-2 md:px-4 py-2">{product.price}</td>
                  <td className="px-2 md:px-4 py-2">
                    {product.category?.name}
                  </td>
                  <td className="px-2 md:px-4 py-2 flex gap-2">
                    <button
                      className="bg-red-500 text-white px-2 md:px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className="bg-blue-500 text-white px-2 md:px-4 py-1 rounded hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón de crear producto */}
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            onClick={handleCreateProduct}
            className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
          >
            New Product
          </button>
        </div>
      </div>
    </div>
  );
}
