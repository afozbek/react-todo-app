import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { keyCodes } from "../util"
import { removeTodo } from '../store/actions/index';

const Todo = ({todo ,removeTodoItem, dispatch}) => {

  const todoKeyDownHandler = (todoId, { keyCode, target }) => {
    if (Object.values(keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === keyCodes.space) {
      // return toggleTodoStatus(todoId, target);
    } else if (keyCode === keyCodes.delete) {
      return dispatch(removeTodo(todoId, target));
    }

    // return this.focusElement(keyCode, target);
  }

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
        // onClick={(e) => dispatch(removeTodo(todo.id, e))}
      >
        Delete Todo
      </button>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
  // todoKeyDownHandler: PropTypes.func.isRequired
}

export default connect()(Todo);
