import { useContext, createContext } from "react";

/* export const TodoContext = createContext({
  todos: [
    {
      id: null,
      todoTitle: null,
      isCompleted: null,
    },
  ],
  addTodo: (todoTitle) => {},
  updateTodo: (id, updatedTitle) => {},
  deleteTodo: (id) => {},
  toggleCompletion: (id) => {},
}); */
export const TodoContext = createContext();

export const TodoProvider = TodoContext.Provider;

export const useTodos = () => {
  return useContext(TodoContext);
};
