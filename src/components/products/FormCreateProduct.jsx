import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FormCreateProduct({ modo = 'crear', producto = {} }) {
  const navigate = useNavigate();

  // Estado de los inputs
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [categoria, setCategoria] = useState('');

  // Si es edición, llenar los campos
  useEffect(() => {
    if (modo === 'editar' && producto) {
      setNombre(producto.nombre || '');
      setStock(producto.stock || '');
      setPrice(producto.price || '');
      setCategoria(producto.categoria || '');
    }
  }, [modo, producto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modo === 'crear') {
      // Lógica para crear producto
      console.log('Crear producto', { nombre, stock, price, categoria });
    } else {
      // Lógica para editar producto
      console.log('Editar producto', { nombre, stock, price, categoria });
    }
    navigate('/products');
  };

  return (
    <div className="flex justify-center bg-[#2E3A4B] flex-col w-150 rounded ml-50 mr-50">
      <div className="bg-[#131C31] text-center h-10 rounded-t">
        <h1>{modo === 'crear' ? 'NEW PRODUCT' : 'EDIT PRODUCT'}</h1>
      </div>

      <div className="flex justify-center m-5">
        <form onSubmit={handleSubmit} className="bg-[#29292D] p-5 w-80 rounded">
          <div className="flex flex-col mt-5">
            <label>NOMBRE DEL PRODUCTO</label>
            <input
              type="text"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label>STOCK</label>
            <input
              type="number"
              className="bg-[#ffffffad] rounded text-black mt-2 h-8 p-3"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label>PRICE</label>
            <input
              type="number"
              className="bg-[#ffffff86] rounded text-black mt-2 h-8 p-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="category" className="text-white mb-1">CATEGORY</label>
            <select
              id="category"
              className="bg-[#ffffffad] rounded text-black mt-2 h-10 p-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="tecnologia">Tecnología</option>
              <option value="hogar">Hogar</option>
              <option value="ropa">Ropa</option>
              <option value="alimentos">Alimentos</option>
            </select>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-1 rounded hover:border"
            >
              {modo === 'crear' ? 'Create Product' : 'Edit Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
