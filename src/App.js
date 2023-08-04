import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {

  //stateful variables for todo list and loading status
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    
    const options = {
      method: "GET",
      headers: 
        {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`

    try{
      const response = await fetch(url, options)
      if(!response.ok){
        console.log(response)
        const errMessage = `${response.status}`
        throw new Error(errMessage);
      }

      const data = await response.json();
      console.log(data)

      const todos = data.records.map(record => ({id : record.id, title : record.fields.title}));
      console.log(todos)

      return todos

      } catch (error) {
        console.log(error.message)
      }
    }



  //promise based useEffect to simulate API call
  //resolves after 2 seconds then creates data object with todolist key set to local storage "savedTodoList"
  React.useEffect(() => {
    fetchData().then((result) => {
        setTodoList(result);
        setIsLoading(false);
      });
  }, []);

  //sets local storage "savedTodoList" to stateful variable todoList when loading is complete
  React.useEffect(()=>{
    if(isLoading === false){
      localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    } 
  }, [todoList, isLoading]);
  
  //creates array of objects with unique ID key and user generated title
  const addTodo = async (newTodo) => {

    const newTodoData = {
      fields: {
        title: newTodo.title
      }
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(newTodoData)
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
    
    try{

      const response = await fetch(url, options);

      if(!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message)
      }

      const data = await response.json();

      const addedTodoFromAPI = {
        id: data.id,
        title:data.fields.title
      }

      setTodoList([...todoList, addedTodoFromAPI]);

    } catch (error) {
      console.log(error.message)
    }

  }

  //updates todo list state to array without item of given id
  const removeTodo =(id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p className="side--marg bold">Loading...</p>) : 
      <TodoList 
        todoList = {todoList}
        onRemoveTodo = {removeTodo}
      />}
    </div>
  )
}

export default App
