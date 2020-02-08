import React from "react";
import PropTypes from "prop-types";

const Todo = ({todo ,removeTodoItem, todoKeyDownHandler}) => {
  return (
    <li
      className={`m-todo__item ${todo.done ? "-done" : ""}`}
      aria-label={"You want to do: " + todo.item}
      key={todo.id}
      tabIndex="0"
      onKeyDown={e => todoKeyDownHandler(todo.id, e)}
    >
      <p className="m-todo__desc">{todo.item}</p>
      <button
        className="m-todo__removeBtn"
        onClick={e => removeTodoItem(todo.id, e)}
      >
        Delete Todo
      </button>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
  todoKeyDownHandler: PropTypes.func.isRequired
}

export default Todo;
