import { useState } from 'react'
import './App.css'
import TodoList from './components/todo'
import AddTodo from './components/addTodos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-xl bg-blue-200'>React-Redux</h1>
      <AddTodo />
      <TodoList />
    </>
  )
}

export default App
