import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./Contexts";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState(()=> {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const addTodo =(todo) => {
    setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev]);
  }
  
  const updateTodo = (id, todo) => {
    setTodos((prev)=>prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  const deleteTodo = (id) => {
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id !== id));
  }

  const toggleCompletion = (id) => {
    console.log("Toggle Called for ID : "+id);
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo)));
  }

  /* useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    console.log("Stored Todos initial : "+storedTodos);
    if(storedTodos && storedTodos.length>0) {
      setTodos(JSON.parse(storedTodos));
    }
  },[]) */

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log("Stored Todos for every update : "+localStorage.getItem("todos"));
  }, [todos])
  
  return (
    <TodoProvider value ={{todos, addTodo, updateTodo, deleteTodo, toggleCompletion}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
          </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            console.log("Todo Info : "+todo.id+todo.todoTitle),
            <div key={todo.id} className="w-full">
            <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  );
}

export default App;
