import React from "react"

export default function AddTodoForm (props) {

    const [todoTitle, setTodoTitle] = React.useState("");
    
    const {onAddTodo} = props;
    
    //takes submit event as argument
    //sets value of input as variable and then sets state to value of input variable
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    } 

    let handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({id:Date.now(), title:todoTitle});
        setTodoTitle("");
    }

    return(
        <>
            <form onSubmit={handleAddTodo}>
                <label className="side--marg bold" htmlFor="todoTitle">Title</label>
                <input 
                    className="side--marg" 
                    id="todoTitle" 
                    name="title"
                    value = {todoTitle}
                    onChange = {handleTitleChange}
                >
                </input>
                <button className="side--marg">ADD</button>
            </form>
        </>
    )
}