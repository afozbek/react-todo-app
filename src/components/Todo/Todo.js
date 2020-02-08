import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { keyCodes } from "../../util"
import { removeTodoItem, toggleTodoStatus } from '../../store/actions/index';

const Todo = ({todo , removeTodoItem, toggleTodoStatus}) => {

  const todoKeyDownHandler = (todoId, { keyCode, target }) => {
    if (Object.values(keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === keyCodes.space) {
      return toggleTodoStatus(todoId, target);
    } else if (keyCode === keyCodes.delete) {
      return removeTodoItem(todoId, target);
    }

    return focusElement(keyCode, target);
  }

  const focusElement = (keyCode, target) => {
    const { left, up, down, right } = keyCodes;

    // TODO: REF EKLENICEK
    const todoItems = document.querySelector(".m-todo__list").children;
    const firstTodoItem = todoItems[0];
    const lastTodoItem = todoItems[todoItems.length - 1];

    switch (keyCode) {
      case left:
      case up:
        focusPreviousElement(target, lastTodoItem);
        break;
      case down:
      case right:
        focusNextElement(target, firstTodoItem);
        break;

      default:
        return;
    }
  };

  const focusPreviousElement = (target, defaultEl) => {
    const prevEl = target.previousElementSibling;

    let nextFocusEl = prevEl;
    if (!prevEl) {
      nextFocusEl = defaultEl;
    }

    nextFocusEl.focus();
  };

  const focusNextElement = (target, defaultEl) => {
    const nextEl = target.nextElementSibling;

    let nextFocusEl = nextEl;
    if (!nextEl) {
      nextFocusEl = defaultEl;
    }

    nextFocusEl.focus();
  };

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
        onClick={e => removeTodoItem(todo.id, e.target)}
      >
        Delete Todo
      </button>
    </li>
  );
};

const mapDispatchToProps = {
  removeTodoItem,
  toggleTodoStatus
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
  toggleTodoStatus: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Todo);
