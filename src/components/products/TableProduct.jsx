import { useNavigate } from "react-router-dom";

export default function TableProduct() {
  const navigate = useNavigate()

  const handleCreateProduct = () => {
    navigate('/products/create');
  };

  const handleEditProduct =(id)=>{
    navigate(`/products/edit/${id}`)
  }


  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  PRODUCTS
                </th>
                <th className="px-4 py-2 text-left text-white">STOCK</th>
                <th className="px-4 py-2 text-left text-white">PRICE</th>
                <th className="px-4 py-2 text-left text-white">CATEGORY</th>
                <th className="px-4 py-2 rounded-tr-lg text-white">
                  OPERATIONS
                </th>
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              <tr>
                <td className="px-4 py-2">Product Name</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2">Category A</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600">
                    Delete
                  </button>
                  <button onClick={handleEditProduct} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleCreateProduct} className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border">
            new product
          </button>
        </div>
      </div>
    </div>
  );
}
