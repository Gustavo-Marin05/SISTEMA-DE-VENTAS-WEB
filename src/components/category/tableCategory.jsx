import { useNavigate } from "react-router-dom";

export default function TableCategory() {
  const navigate = useNavigate()

  const handleCreateCategory = () => {
    navigate('/category/create');
  };

  const handleEditCategory = (id) => {
    navigate(`/category/edit/${id}`);
  }
  


  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  NAME CATEGORY
                </th>
                <th className="px-4 py-2 text-left text-white">CANT. PRODUCT</th>
                <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
                
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              <tr>
                <td className="px-4 py-2">Product Name</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 text-white px-4 py-1 rounded mr-2 hover:bg-red-600">
                    Delete
                  </button>
                  <button onClick={handleEditCategory} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleCreateCategory} className="bg-amber-400 text-white px-4 py-1 rounded mr-2 hover:border">
            new Category
          </button>
        </div>
      </div>
    </div>
  );
}
