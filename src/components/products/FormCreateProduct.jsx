import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../api/category";
import { createProduct, getProductById, updateProduct } from "../../api/products";

export default function FormCreateProduct({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams(); // solo para editar
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    categoryId: ""
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // 1. Cargar categorías
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Error al cargar categorías:", err);
        setError("Error al cargar categorías");
      });
  }, []);

  // 2. Si es modo edición, cargar datos del producto
  useEffect(() => {
    if (modo === "editar" && id) {
      getProductById(id)
        .then((res) => {
          const product = res.data;
          setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId
          });
        })
        .catch((err) => {
          console.error("Error al obtener el producto:", err);
          setError("Error al obtener datos del producto");
        });
    }
  }, [modo, id]);

  // 3. Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "stock" || name === "categoryId"
        ? Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // 4. Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (modo === "crear") {
        await createProduct(formData);
      } else if (modo === "editar" && id) {
        await updateProduct(id, formData);
      }
      navigate("/products");
    } catch (error) {
      console.error("Error al procesar el producto:", error);
      setError("Error al guardar el producto. Verifica los datos.");
    }
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t">
        <h1>{modo === "crear" ? "NUEVO PRODUCTO" : "EDITAR PRODUCTO"}</h1>
      </div>
      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-96 rounded">
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col mt-3">
            <label>NOMBRE DEL PRODUCTO</label>
            <input
              type="text"
              name="name"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mt-3">
            <label>PRECIO</label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mt-3">
            <label>STOCK</label>
            <input
              type="number"
              name="stock"
              min="0"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col mt-3">
            <label>CATEGORÍA</label>
            <select
              name="categoryId"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 px-2"
              value={formData.categoryId}
              onChange={handleChange}
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

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === "crear" ? "Crear Producto" : "Actualizar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
