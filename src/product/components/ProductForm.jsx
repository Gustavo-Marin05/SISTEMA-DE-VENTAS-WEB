import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Categories } from "../../category/api";
import { createProduct, getProductById, updateProduct } from "../api";

export default function ProductForm({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  //cargamos las categorias

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Categories()
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Error al cargar categorías:", err);
        setError("Error al cargar categorías");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSend = {
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: parseInt(formData.categoryId),
    };

    try {
      if (modo === "crear") {
        await createProduct(dataSend);
      } else if (modo === "editar" && id) {
        console.log("editar", dataSend);
        await updateProduct(dataSend, id);
      }

      navigate("/products");
    } catch (err) {
      console.error(
        "Error al crear producto:",
        err.response?.data || err.message
      );
      setError("No se pudo crear el producto");
    }
  };

  //me renderiza para que edite
  useEffect(() => {
    console.log("Producto recibido para editar:");
    if (modo === "editar" && id) {
      getProductById(id)
        .then((res) => {
          const { name, price, stock, categoryId } = res.data;
          console.log("Producto recibido para editar:", res.data);
          setFormData({
            name,
            price: price.toString(), // 👈 importante convertirlos a string para los inputs
            stock: stock.toString(),
            categoryId: categoryId.toString(),
          });
        })
        .catch((err) => {
          console.error("Error al obtener productos:", err);
        });
    }
  }, [modo, id]);

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#2E3A4B] border-2 border-[#29292D] rounded-lg shadow-lg">
        <div className="text-center px-6 pt-6">
          <h2 className="text-2xl font-bold text-white">
            {modo === "crear" ? "Crear Producto" : "Editar Producto"}
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Ingresa los datos del {modo === "crear" ? "nuevo " : ""}producto
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded text-center text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            {/* Nombre del producto */}
            <div className="w-full md:w-2/3 space-y-2">
              <label htmlFor="name" className="block text-white font-medium">
                Nombre del producto
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Laptop, Camiseta, Mesa..."
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>

            {/* Precio */}
            <div className="w-full md:w-1/3 space-y-2">
              <label htmlFor="price" className="block text-white font-medium">
                Precio
              </label>
              <input
                id="price"
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej: 199.99"
                className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="block text-white font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 50"
              className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="block text-white font-medium"
            >
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#29292D] text-white border border-[#29292D] rounded-md focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400"
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              {modo === "crear" ? "Crear Producto" : "Actualizar Producto"}
            </button>
            <button
              type="button"
              className="w-full border border-[#29292D] text-gray-300 hover:bg-[#29292D] hover:text-white py-2.5 rounded-md transition"
              onClick={() => navigate("/products")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
