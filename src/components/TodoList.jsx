import { useState } from "react";

export default function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(["Spirited Away", "Breaking Bad", "Attack on Titan"]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>

      <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Tulis judul film, series, atau anime..."
      className="px-4 py-2 rounded-lg text-white bg-gray-800 border border-gray-600 placeholder-gray-400"
    />
    <button
     onClick={() => {
      if (input.trim() !== "") {
       setTodos([...todos, input]);
       setInput("");
     }
     }}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold ml-4"
    >
      Tambah ke Daftar
    </button>

    <ul className="mt-4">
  {todos.map((todo, index) => (
    <li key={index}>
      {todo}
      <button
        onClick={() => setTodos(todos.filter((_, i) => i !== index))}
        className="ml-4 text-red-400 hover:text-red-500"
      >
        Hapus
    </button>

           </li>
         ))}
      </ul>
    </div>
  );
}