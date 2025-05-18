export default function Customer() {
  return (
    <div className="flex justify-center">
      <div className="bg-[#263556] p-5 rounded max-w-3xl w-full overflow-hidden">
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead className="bg-[#1A2438]">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg text-left text-white">
                  CI
                </th>
                <th className="px-4 py-2 text-left text-white">
                  NOMBRE COMPLETO
                </th>
                <th className="px-4 py-2 text-left text-white">OPERATIONS</th>
              </tr>
            </thead>

            <tbody className="text-white text-center bg-[#2E3A4B]">
              <tr>
                <td className="px-4 py-2">132135</td>
                <td className="px-4 py-2">luis alberto</td>
                <td className="px-4 py-2">
                
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    ver facturas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
