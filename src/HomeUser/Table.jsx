import { useState, useEffect } from "react";
import { getAllProducts } from "./api";
import { createInvoice } from "./api";
import { getCustomerByCi } from "./api";

export default function Table() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerCi: "",
    customerFullName: "",
    products: [],
  });

  const [search, setSearch] = useState("");
  const [customerFound, setCustomerFound] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);

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
    } catch {
      setFormData({ ...formData, customerFullName: "" });
      setCustomerFound(false);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const found = products.find(
        (p) => p.name.toLowerCase() === search.toLowerCase()
      );
      if (found) {
        setFormData((prev) => ({
          ...prev,
          products: [
            ...prev.products,
            {
              productId: found.id,
              name: found.name,
              quantity: 1,
              unitPrice: found.price,
            },
          ],
        }));
        setSearch("");
      }
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].quantity = value;
    setFormData({ ...formData, products: updatedProducts });
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
          productId: Number(p.productId),
          quantity: Number(p.quantity) || 1,
        })),
      };

      const response = await createInvoice(payload);
      setInvoiceId(response.data.id);
      setInvoiceNumber(response.data.number);
      setSuccess("Factura creada correctamente");
      setShowModal(true);

      setFormData({
        customerCi: "",
        customerFullName: "",
        products: [],
      });
    } catch (error) {
      console.error(
        "Detalles del error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || "Error al crear factura");
    }
  };

  const handlePrintInvoice = () => {
    if (invoiceId) {
      window.open(
        `https://backendventas-811n.onrender.com/invoice/${invoiceId}/pdf`,
        "_blank"
      );
      setShowModal(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md max-w-3xl mx-auto mt-4 bg-[#131C31] text-white"
      >
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Crear Factura
        </h2>

        {/* Cliente */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-white">C.I. Cliente</label>
            <input
              type="text"
              name="customerCi"
              value={formData.customerCi}
              onChange={handleInputChange}
              onBlur={handleCustomerCiBlur}
              className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 w-full text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Nombre del cliente</label>
            <input
              type="text"
              name="customerFullName"
              value={formData.customerFullName}
              onChange={handleInputChange}
              readOnly={customerFound}
              className={`px-2 py-1 w-full ${
                customerFound ? "bg-gray-500" : "bg-[#263556]"
              } border border-[#2E3A4B] text-white`}
              required
            />
          </div>
        </div>

        {/* Buscador único */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchEnter}
            placeholder="Buscar producto y presionar Enter..."
            className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 w-full text-white"
          />
          {search && (
            <ul className="absolute z-10 bg-white text-black border border-gray-300 mt-1 rounded shadow-lg max-h-32 overflow-y-auto w-full">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((p) => (
                  <li
                    key={p.id}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        products: [
                          ...prev.products,
                          {
                            productId: p.id,
                            name: p.name,
                            quantity: 1,
                            unitPrice: p.price,
                          },
                        ],
                      }));
                      setSearch("");
                    }}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  >
                    {p.name} - Bs {p.price.toFixed(2)}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Lista de productos agregados */}
        {formData.products.length > 0 && (
          <div className="mb-4">
            {formData.products.map((prod, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 items-center mb-2"
              >
                <span>{prod.name}</span>
                <input
                  type="number"
                  min="1"
                  value={prod.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, e.target.value)
                  }
                  className="bg-[#263556] border border-[#2E3A4B] px-2 py-1 text-white"
                />
                <span>Bs {(prod.unitPrice * prod.quantity).toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="text-red-400 font-bold"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              ¿Deseas imprimir la factura #{invoiceNumber}?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePrintInvoice}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Imprimir
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
