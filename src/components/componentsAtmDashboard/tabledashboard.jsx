import { useState } from 'react';

export default function TableDashboard() {
  // Estado para manejar los productos añadidos
  const [products, setProducts] = useState([{}]); // Array que contiene los productos

  // Función para añadir un nuevo producto
  const handleAddProduct = () => {
    setProducts([...products, {}]); // Añadir un objeto vacío para el nuevo producto
  };

  return (
    <div className="bg-[#364b79] w-200 mt-5 rounded-2xl">
      <table className="min-w-full">
        {/* Sección de datos del cliente */}
        <div className="bg-[#131C31] p-3 m-4 rounded-lg shadow-lg  text-white">
          <h1 className="text-2xl font-bold mb-4 text-center">DATOS DEL CLIENTE</h1>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-2" htmlFor="name">Nombre del cliente</label>
              <input 
                type="text" 
                name="name" 
                className="px-4 py-2 bg-[#2C3B56] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#364b79] text-white"
                placeholder="Ingrese el nombre" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-2" htmlFor="ci">CI del cliente</label>
              <input 
                type="text" 
                name="ci" 
                className="px-4 py-2 bg-[#2C3B56] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#364b79] text-white"
                placeholder="Ingrese el CI" 
              />
            </div>
          </div>
        </div>

        {/* Sección de datos de productos */}
        <div className="bg-[#131C31] p-6 m-4 rounded-lg shadow-lg text-white ">
          <h1 className="text-2xl font-bold mb-4 text-center">DATOS DE LOS PRODUCTOS</h1>

          {/* Contenedor con scroll */}
          <div className="max-h-35 overflow-y-auto"> 
            {/* Renderizar cada producto */}
            {products.map((product, index) => (
              <div key={index} className="mb-6 overflow-hidden border-1 m-2 p-2 border-amber-300">
                <div className="flex justify-between gap-8">
                  <div className="flex flex-col w-1/3">
                    <label htmlFor={`nameProduct${index}`} className="text-sm text-gray-300 mb-2">Seleccionar Producto</label>
                    <select
                      name={`nameProduct${index}`}
                      id={`nameProduct${index}`}
                      className="px-4 py-2 bg-[#2C3B56] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#364b79] text-white"
                    >
                      <option value="">Seleccionar Producto</option>
                      <option value="producto1">Producto 1</option>
                      <option value="producto2">Producto 2</option>
                      <option value="producto3">Producto 3</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label htmlFor={`cantidad${index}`} className="text-sm text-gray-300 mb-2">Cantidad</label>
                    <input
                      type="number"
                      name={`cantidad${index}`}
                      id={`cantidad${index}`}
                      className="px-4 py-2 bg-[#2C3B56] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#364b79] text-white"
                      placeholder="Cantidad"
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label htmlFor={`price${index}`} className="text-sm text-gray-300 mb-2">Precio</label>
                    <input
                      type="number"
                      name={`price${index}`}
                      id={`price${index}`}
                      className="px-4 py-2 bg-[#2C3B56] border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#364b79] text-white"
                      placeholder="Precio"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para agregar un nuevo producto */}
          <div className="flex justify-center mb-4">
            <button 
              onClick={handleAddProduct} 
              className="px-6 py-2 bg-[#364b79] text-white rounded-md hover:bg-[#2c4b74]"
            >
              ADD PRODUCT
            </button>
          </div>

        </div>

        {/* Botón para crear la factura */}
        <div className="flex justify-center mb-4">
          <button className="px-6 py-2 bg-[#131C31] text-white rounded-md hover:bg-[#2C3B56]">
            Crear Factura
          </button>
        </div>
      </table>
    </div>
  );
}
