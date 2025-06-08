import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/products.js";
import { createInvoice } from "../../api/invoice.js";
import { getCustomerByCi } from "../../api/customer.js";

export default function InvoiceForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerCi: "",
    customerFullName: "",
    products: [{ productId: "", quantity: "", unitPrice: 0 }],
  });

  const [customerFound, setCustomerFound] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos");
      });
  }, []);

  useEffect(() => {
    const totalCalc = formData.products.reduce(
      (acc, item) => acc + (parseInt(item.quantity) || 0) * item.unitPrice,
      0
    );
    setTotal(totalCalc);
  }, [formData.products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomerCiBlur = async () => {
    if (!formData.customerCi) return;

    try {
      const res = await getCustomerByCi(formData.customerCi);
      setFormData({
        ...formData,
        customerFullName: res.data.fullName,
      });
      setCustomerFound(true);
    } catch (error) {
      console.log("Cliente no encontrado, puedes registrarlo");
      setFormData({ ...formData, customerFullName: "" });
      setCustomerFound(false);
    }
  };

  const handleProductChange = (index, e) => {
    const updatedProducts = [...formData.products];
    const name = e.target.name;
    let value = e.target.value;

    if (name === "quantity") {
      // permitir valores vacíos temporalmente
      updatedProducts[index][name] = value;
    } else {
      updatedProducts[index][name] = value;

      // si cambió el producto, actualizamos el precio unitario
      if (name === "productId") {
        const selectedProduct = products.find((p) => p.id === parseInt(value));
        updatedProducts[index].unitPrice = selectedProduct
          ? selectedProduct.price
          : 0;
      }
    }

    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { productId: "", quantity: "", unitPrice: 0 },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...formData,
        products: formData.products.map((p) => ({
          productId: p.productId,
          quantity: parseInt(p.quantity) || 1, // fallback por si acaso
        })),
      };

      const response = await createInvoice(payload);
      setSuccess("Factura creada correctamente");
      setFormData({
        customerCi: "",
        customerFullName: "",
        products: [{ productId: "", quantity: "", unitPrice: 0 }],
      });
    } catch (error) {
      console.error(
        "Detalles del error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || "Error al crear factura");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="p-6 rounded shadow-md max-w-3xl mx-auto mt-4 bg-[#131C31] text-white"
>
  <h2 className="mb-4 text-2xl font-semibold text-white">Crear Factura</h2>

  <label className="block mb-2 text-white">C.I. Cliente</label>
  <input
    type="text"
    name="customerCi"
    value={formData.customerCi}
    onChange={handleInputChange}
    onBlur={handleCustomerCiBlur}
    className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 mb-4 w-full text-white"
    required
  />

  {/* Repite esto para el nombre del cliente */}
  <label className="block mb-2 text-white">Nombre del cliente</label>
  <input
    type="text"
    name="customerFullName"
    value={formData.customerFullName}
    onChange={handleInputChange}
    readOnly={customerFound}
    className={`px-2 py-1 mb-4 w-full ${
      customerFound ? "bg-gray-500" : "bg-[#263556]"
    } border border-[#2E3A4B] text-white`}
    required
  />

  <h1 className="text-lg font-semibold mb-2">Sección del producto</h1>
  {formData.products.map((prod, index) => (
    <div
      key={index}
      className="mb-4 grid grid-cols-4 gap-4 items-center text-white"
    >
      <select
        name="productId"
        value={prod.productId}
        onChange={(e) => handleProductChange(index, e)}
        className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 text-white"
        required
      >
        <option value="">Seleccionar producto</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="quantity"
        min="1"
        value={prod.quantity}
        onChange={(e) => handleProductChange(index, e)}
        className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 text-white"
        required
      />

      <input
        type="text"
        readOnly
        value={`Bs ${prod.unitPrice.toFixed(2)}`}
        className="bg-[#2E3A4B] px-2 py-1 border border-[#2E3A4B] text-white"
      />

      {index > 0 && (
        <button
          type="button"
          onClick={() => removeProduct(index)}
          className="text-red-400 font-bold"
        >
          X
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={addProduct}
    className="mb-4 text-[#00BFFF] underline"
  >
    + Agregar producto
  </button>

  <div className="mb-4 font-semibold text-lg text-white">
    Total: <span className="text-green-400">Bs {total.toFixed(2)}</span>
  </div>

  {error && <p className="text-red-400 mb-2">{error}</p>}
  {success && <p className="text-green-400 mb-2">{success}</p>}

  <button
    type="submit"
    className="bg-[#2E3A4B] hover:bg-[#263556] text-white px-4 py-2 rounded"
  >
    Crear factura
  </button>
</form>

  );
}
