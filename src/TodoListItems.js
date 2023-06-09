import React from "react"

export default function TodoListItems (props) {

    //map function to create list items from todoList array
    let listItem = props.todo.map(item => (
        <li className="list--items bold" key={item.id}>
        {item.title}
        </li>
    ))

    return(
        <>
            {listItem}
        </>
    )
}