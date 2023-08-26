import React from "react"
import InputNewList from "./InputNewList"
import styled from 'styled-components'
import styles from './NavBar.module.css';
import AddIcon from '@mui/icons-material/AddOutlined';

export default function AddNewListForm (props) {

    const Form = styled.form `
        display: flex;
        flex-direction : row;
        color: rgb(249, 212, 212);
        align-items: center;
        margin-left: 16px;
        font-weight: 600;
    `;

    const Button = styled.button `
        display: flex;
        background-color: rgb(194, 255, 132);
        border: none;
        border-radius: 50%; 
        height: 2em;
        width: 2em;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: rgb(0, 223, 15);
        }
    `;

    const [listTitle, setListTitle] = React.useState("");
    
    const {onAddList} = props;
    
    //takes submit event as argument
    //sets value of input as variable and then sets state to value of input variable
    const handleTitleChange = (event) => {
        let newListTitle = event.target.value;
        setListTitle(newListTitle);
    } 

    let handleAddList = (event) => {
        event.preventDefault();
        onAddList({title:listTitle});
        setListTitle("");
    }

    return(
        <div className={styles.sideItem}>
            <Form onSubmit={handleAddList}>
                <InputNewList
                    ListTitle = {listTitle}
                    handleTitleChange = {handleTitleChange}
                    isFocused
                />
                <Button type="button"><AddIcon/></Button>
            </Form>
        </div>
    )
}