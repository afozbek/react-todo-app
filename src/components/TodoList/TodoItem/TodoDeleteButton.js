import React from 'react'
import PropTypes from 'prop-types'


const TodoDeleteButton = ({ todoId, todoText, removeTodoHandler }) => {
  return (
    <button
        className="m-todo__removeBtn"
        aria-label={`Do you want to delete this todo? ${todoText}`}
        onClick={() => removeTodoHandler(todoId)}
      >
        Delete Todo
      </button>
  )
}

TodoDeleteButton.propTypes = {
  todoId: PropTypes.number.isRequired,
  todoText: PropTypes.string.isRequired,
  removeTodoHandler: PropTypes.func.isRequired
}

export default TodoDeleteButton
