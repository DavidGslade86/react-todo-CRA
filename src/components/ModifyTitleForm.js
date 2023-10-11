import React from "react"
import InputWithLabel from "./InputWithLabel"
import styled from 'styled-components'
import PropType from 'prop-types';

const Container = styled.div `
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: space-between;
width: 20%;
`;

ModifyTitleForm.propTypes = {
    onFinishEditing: PropType.func.isRequired,
    todo: PropType.object.isRequired
}

export default function ModifyTitleForm (props) {

    const {onFinishEditing, todo} = props;
    
    const [title, setTitle] = React.useState(todo.title);

    //takes submit event as argument
    //sets value of input as variable and then sets state to value of input variable
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTitle(newTodoTitle);
    } 

    return(
        <>  
            <Container>
                <InputWithLabel
                    todoTitle = {title}
                    handleTitleChange = {handleTitleChange}
                    handleUpdate = {onFinishEditing}
                />
            </Container>
        </>
    )
}