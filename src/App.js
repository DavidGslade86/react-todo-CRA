import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'


function App() {

  //state variable and set function to set state to value added by user input

  const [todoList, setTodoList] = React.useState([]);

  const addTodo = (newTodo) => {
    setTodoList(prevList => ([...prevList, newTodo]));
  }

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList = {todoList}
      />
    </div>
  )
}

export default App
