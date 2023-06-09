import React from "react"
import TodoListItems from "./TodoListItems"

export default function TodoList () {

//array to store list items
const todoList = [
    { id: 1, title: 'Complete Assignment' },
    { id: 2, title: 'Complete Reading' },
    { id: 3, title: 'Annotate notes' },
    { id: 4, title: 'Watch Videos and update notes' }
]

    return(
        <>
            <ul>
                <TodoListItems todo = {todoList} />
            </ul>
        </>
    )
}