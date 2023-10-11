import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropType from 'prop-types';

MyDateComponent.propTypes = {
    todoItem: PropType.object.isRequired,
    setCompleteDate: PropType.func.isRequired
}

export default function MyDateComponent(props) {
  const { setCompleteDate, todoItem } = props;

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className={`date--picker--button ${todoItem.completedAt ? "checked" : ""}`} onClick={onClick} ref={ref}>
      {value || "Click to set date"}
    </button>
  ));

  const dateValue = todoItem.completedBy && !isNaN(new Date(todoItem.completedBy).valueOf())
    ? new Date(todoItem.completedBy)
    : null;

  return (
    <DatePicker 
      selected={dateValue} 
      onChange={date => setCompleteDate(todoItem.id, date)} 
      customInput={<CustomInput />}
    />
  );
}