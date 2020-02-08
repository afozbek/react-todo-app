import React from 'react'
import PropTypes from "prop-types"

const TodoInput = ({ addTodoItem }) => {
  return (
    <input
      className="m-todo__input"
      onKeyDown={addTodoItem}
      aria-label="Please enter your todo item"
      name="todo"
      id="todoInput"
      type="text"
      placeholder="What do you want to do today 🍓"
    />
  )
}

TodoInput.propTypes = {
  addTodoItem: PropTypes.func.isRequired
}

export default TodoInput;