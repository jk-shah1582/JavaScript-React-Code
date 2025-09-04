import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function addTodos() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };
  return (
    <form onSubmit={addTodoHandler} className="flex">
      <div className="flex w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mt-2">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full bg-transparent outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </div>
    </form>
  );
}
export default addTodos;
