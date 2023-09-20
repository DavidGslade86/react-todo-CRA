import React from "react"
import './App.css'
import SideNavBar from './components/SideNavBar'
import ListPage from './components/ListPage'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"

function App() {

  //stateful variables for todo list and loading status
  const [allLists, setAllLists] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablesLoading, setTablesLoading] = React.useState(true);

  //calls to Airtable API using fetch() 
  //converts retrieved data to array of list objects with "id" and "name" key values
  //"id" is used for fetching individual lists 

  const handleSetCurrentList = (id) => {
    const currentList = allLists.find(list => list.id === id);
    setCurrentList(currentList);
  }

  const fetchTableData = async () => {
    const options = {
      method: "GET",
      headers: 
        {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}
    };

    const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`

    try{
      const response = await fetch(url, options)
      if(!response.ok){
        console.log(response)
        const errMessage = `${response.status}`
        throw new Error(errMessage);
      }

      const tableData = await response.json();

      const lists = tableData.tables.map(table => ({id : table.id, name : table.name}));
      console.log(lists);
      return lists

      } catch (error) {
        console.log(error.message)
      }
    }

  //useEffect called on mount which updates the todoList and allList variables after successful API call
  React.useEffect(() => {

    const fetchData = async function () {
      try {
        const lists = await fetchTableData();
        setAllLists(lists);
        
        if(lists.length > 0) {
          setCurrentList(lists[0])
        }
        setTablesLoading(false);

      } catch (error) {
          console.error(error.message);
      }
    }

    fetchData();
}, []);

    //updates Airtable through API with new user generated Lists
  const addList = async (newList) => {

    const newListData = {
      'description':`A todo list concerning ${newList}`,
      'fields': [
        {
          "description": `${newList} items`,
          "name": "title",
          "type": "singleLineText"
        },
        {
          "name": "completedAt",
          "type": "date",
          "options": {
            "dateFormat": {
              "name": "iso",
              "format": "YYYY-MM-DD"
            }
          }
        },
        {
          "name": "completedBy",
          "type": "date",
          "options": {
            "dateFormat": {
              "name": "iso",
              "format": "YYYY-MM-DD"
            }
          }
        }
      ],
      'name': `${newList}`
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(newListData)
    };

    const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`
    
    try{

      const response = await fetch(url, options);

      if(!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        const responseBody = await response.json(); // Log the response body for more details.
        console.error(errorMessage, responseBody);
        throw new Error(errorMessage);
      } else {
        console.log('add list api call complete')
      }

      const data = await response.json();

      const addedListFromAPI = {
        id: data.id,
        name:data.name
      }

      setAllLists([...allLists, addedListFromAPI]);

    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="App">
      <BrowserRouter>
        <SideNavBar
          onAddList={addList}
          lists={allLists}
          isLoading ={tablesLoading}
          setActiveList={handleSetCurrentList}
        />
          <Routes>
            <Route
              path="/lists/new"
              element = {
                <h1>New Todo List</h1>
              }
            />
            <Route
              path="/list/:listId" 
              element={<ListPage
                activeList={currentList}
                isLoading ={isLoading}
                setLoading ={setIsLoading}
              />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App