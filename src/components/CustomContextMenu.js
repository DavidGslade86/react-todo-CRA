import React from "react"
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/ClearOutlined';
import PropType from 'prop-types';

const MenuContainer = styled.div `
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid black'
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
}`

CustomContextMenu.propTypes = {
    onDelete: PropType.func.isRequired,
    xPos: PropType.string.isRequired,
    yPos: PropType.string.isRequired,
    listId: PropType.string.isRequired
}

export default function CustomContextMenu({ xPos, yPos, onDelete, listId}) {
    return (
        <MenuContainer style={{top: yPos, left: xPos}}>
            <Button className="remove--button" type = "button" onClick = {() => onDelete(listId, "name", listId)}><DeleteIcon fontSize='small'/></Button>
        </MenuContainer>
    );
}