import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'


function App() {

  const [newTodo, setNewTodo] = React.useState({value:""});

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p className="bold">{newTodo.value}</p>
      <TodoList />
    </div>
  )
}

export default App
