import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  )
}

export default App