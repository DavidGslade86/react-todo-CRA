import React from "react";
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/ClearOutlined';
import PropType from 'prop-types';

const Li = styled.li `
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
margin: 0 12px 12px 12px;
padding: 10px;
font-weight: 600;
background-color: rgb(34, 1, 25);
box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
-webkit-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
-moz-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
width: 75%;
color:rgb(249, 212, 212);
transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;

&:hover {
    box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    -webkit-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    -moz-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;
}

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

const LiTitle = styled.span `
width: 50%;
`

const LiButContain = styled.span `
width 25%
`

const Button = styled.button `
display: flex;
background-color: rgb(255, 126, 126);
border: none;
border-radius: 50%; 
height: 2em;
width: 2em;
justify-content: center;
align-items: center;

&:hover {
    background-color: rgb(255, 17, 17);
    transition: background-color .3s ease-in-out;
}
`

TodoListItems.propTypes = {
    todo: PropType.array.isRequired,
    onRemoveTodo: PropType.func.isRequired,
}

export default function TodoListItems (props) {

    const {todo, onRemoveTodo} = props;

    //map function to create list items from todoList array
    let listItem = todo.map(item => (
        <Li key={item.id}>
            <LiTitle>{item.title}</LiTitle>
            <LiButContain> 
                <Button className="remove--button" type = "button" onClick ={() => onRemoveTodo(item.id)}><DeleteIcon fontSize='small'/></Button>
            </LiButContain>
        </Li>
    ))

    return(
        <>
            {listItem}
        </>
    )
}