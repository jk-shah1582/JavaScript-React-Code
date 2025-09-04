import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = React.useState("");
  const [editId, setEditId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const openEditModal = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setEditText("");
  };

  const handleUpdate = () => {
     if (editText.trim()) {
      dispatch(updateTodo({ id: editId, newText: editText }));
      closeModal();
    }
  };
  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex border w-full bg-transparent rounded-lg justify-left flex px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black"
        >
          <label className="outline-none " >{todo.text}</label>

          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm justify-right items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => dispatch(removeTodo(todo.id))}
          >
            🗑️
          </button>
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm justify-right items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => openEditModal(todo) }            
          >
            🖊️
          </button>
        </div>
      ))}
      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
            <input
              className="border px-2 py-1 rounded w-full mb-4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
