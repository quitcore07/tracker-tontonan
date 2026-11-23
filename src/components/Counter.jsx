import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      <p className="text-4xl mb-4">{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
      >
        Tambah
      </button>

      <button
         onClick={() => setCount(Math.max(0, count - 1))}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold ml-4"
      >
        Kurangi
      </button>

      <button
        onClick={() => setCount(0)}
        className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold ml-4"
      >
        Reset
      </button>
    </div>
  );
}