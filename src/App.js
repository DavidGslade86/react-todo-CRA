import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {

  //custom handler to store sringified array of data objects in local memory
  //and set state from parsed local memory data
  const useSemiPersistantState = () => {
    const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);

    React.useEffect(()=>{localStorage.setItem("savedTodoList", JSON.stringify(todoList))}, [todoList]);

    return [todoList, setTodoList]
  }

  const [todoList,setTodoList] = useSemiPersistantState();
  
  //creates array of objects with unique ID key and user generated title
  const addTodo = (newTodo) => {
    setTodoList(prevList => ([...prevList, newTodo]));
  }

  const removeTodo =(id) => {
    setTodoList(prevList => prevList.filter(listItem => listItem.id !== id));
  }

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList = {todoList}
        onRemoveTodo = {removeTodo}
      />
    </div>
  )
}

export default App
