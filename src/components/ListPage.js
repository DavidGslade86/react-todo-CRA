import React from "react"
import '../App.css'
import TodoList from './TodoList'
import AddTodoForm from "./AddTodoForm"
import { useParams } from "react-router-dom";

  
export default function ListPage(props) {
    
    const { listId } = useParams();

    const {activeList, isLoading, setLoading} = props;

    const [todoList, setTodoList] = React.useState([]);
 
    //API call for individual list information
    //uses data from previous API call to generate list
    const fetchActiveListData = async (currentListId) => {
      
        const options = {
            method: "GET",
            headers: 
            {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}
        };
    
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${currentListId}?view=Grid%20view`
    
        try{
            const response = await fetch(url, options)
            if(!response.ok){
            console.log(response)
            const errMessage = `${response.status}`
            throw new Error(errMessage);
            }
    
            const data = await response.json();
    
            const todos = data.records.map(record => ({ id : record.id, title : record.fields.title, completedBy : record.fields.completedBy, completedAt : record.fields.completedAt}));
    
            return todos
    
        } catch (error) {
            console.log(error.message)
        }
    }
  
    React.useEffect(() => {

      const cachedItem = localStorage.getItem(`${listId}TodoList`);

      if(cachedItem){
        setTodoList(JSON.parse(cachedItem));
        setLoading(false);
        return;
      }

      const fetchListData = async function () {
          try {
              const todos = await fetchActiveListData(listId);
              setTodoList(todos);
              setLoading(false);
          } catch (error) {
              console.error(error.message);
              setLoading(false);
          }
      }
  
      fetchListData();
  
  }, [activeList, listId]); 

    React.useEffect(()=>{
        if(isLoading === false && localStorage.getItem(`${activeList.id}TodoList`) === null){
        localStorage.setItem(`${activeList.id}TodoList`, JSON.stringify(todoList))
        } 
    }, [todoList, isLoading, activeList]);

    //updates Airtable through API with new user generated todoList item
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

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${listId}`
        
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
  
    //updates todo list state to array without item of given id (not connected to API yet)
    const removeTodo = async (id) => {
  
      const delUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${listId}/${id}`
  
      const auth = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      }
  
      console.log("Removing Todo with ID:", id);
  
      try{
  
        const response = await fetch(delUrl, auth);
  
        if(!response.ok) {
          const message = `Error has occurred: ${response.status}`;
          throw new Error(message)
        }
  
        const data = await response.json();
  
        const apiDelData = {
          id: data.id,
          deleted: data.deleted
        }
  
        if(apiDelData.deleted){
          setTodoList(todoList.filter(todo => todo.id !== id));
        }      
      
      } catch (error) {
        console.log(error.message)
      }
    }

    return(
            <div className="container">
              <div className="contents">
                {isLoading ? (<p className="title bold">Loading...</p>) : 
                  <>
                    <div className="titleContainer">
                      <h1 className="title">{activeList.name}</h1>
                    </div>
                    <TodoList 
                      todoList = {todoList}
                      setList = {setTodoList}
                      onRemoveTodo = {removeTodo}
                    />
                  </>
                }
                <AddTodoForm
                  onAddTodo = {addTodo}
                />
              </div>
            </div>
    )
  }