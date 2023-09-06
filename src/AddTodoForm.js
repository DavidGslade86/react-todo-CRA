import React from "react"
import InputWithLabel from "./InputWithLabel"
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/AddOutlined';

export default function AddTodoForm (props) {

    const Form = styled.form `
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        margin: 12px;
        padding: 10px;
        font-weight: 600;
        background-color: rgb(11, 0, 23);
        box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
        -webkit-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
        -moz-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
        width: 75%;

        @media (min-width: 800px) {
            width: 50%;
            margin-left: 100px;
        }

        @media (min-width: 1300px) {
            width: 35%;
            margin-left: auto;
            margin-right: auto;
        }
    `;

    const Button = styled.button `
        margin-inline: 10px;
        display: flex;
        background-color: rgb(194, 255, 132);
        border: none;
        border-radius: 50%; 
        height: 2em;
        width: 2em;
        justify-content: center;
        align-items: center;

        &:hover {
            transition: background-color .3s ease-in-out;
            background-color: rgb(0, 223, 15);
        }
    `;

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
            <Form onSubmit={handleAddTodo}>
                <InputWithLabel
                    todoTitle = {todoTitle}
                    handleTitleChange = {handleTitleChange}
                    isFocused
                />
                <Button><AddIcon/></Button>
            </Form>
        </>
    )
}