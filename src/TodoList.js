import React from "react"
import TodoListItems from "./TodoListItems"

export default function TodoList (props) {
    const {todoList} = props

    return(
        <>
            <ul>
                <TodoListItems todo = {todoList} />
            </ul>
        </>
    )
}