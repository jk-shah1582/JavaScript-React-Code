import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: nanoid(), text: "Sample Todo"}]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) => {
            console.log("Removing todo with id:", action.payload);
            state.todos =  state.todos.filter((todo)=>todo.id !== action.payload)
        },
        // Add reducers like updateTodo
        updateTodo: (state, action) => {
            const {id, newText} = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = newText;    
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;