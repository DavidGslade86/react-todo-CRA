import React from "react"

export default function AddTodoForm (props) {

    //takes submit even as argument
    //sets value of input as variable and then sets state to value of input variable
    let handleAddTodo = (event) => {
        event.preventDefault();
        let todoTitle = event.target.elements.title.value;
        console.log(todoTitle);
        props.onAddTodo(prevTodo => ({...prevTodo, value: todoTitle}));
        event.target.reset();
    }

    return(
        <>
            <form onSubmit={handleAddTodo}>
                <label className="side--marg bold" htmlFor="todoTitle">Title</label>
                <input className="side--marg" id="todoTitle" name="title"></input>
                <button className="side--marg">ADD</button>
            </form>
        </>
    )
}