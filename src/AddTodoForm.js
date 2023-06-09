import React from "react"

export default function AddTodoForm (props) {

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