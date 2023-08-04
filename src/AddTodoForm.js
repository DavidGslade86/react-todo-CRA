import React from "react"
import InputWithLabel from "./InputWithLabel"

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
        onAddTodo({title:todoTitle});
        setTodoTitle("");
    }

    return(
        <>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    todoTitle = {todoTitle}
                    handleTitleChange = {handleTitleChange}
                    label = "Title"
                    isFocused
                />
                <button className="side--marg">ADD</button>
            </form>
        </>
    )
}