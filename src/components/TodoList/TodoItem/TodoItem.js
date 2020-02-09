import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { keyCodes } from "../../../util"
import {
  removeTodoItem,
  toggleTodoItem,
  changeTextOfTodoItem
} from '../../../store/actions';

const TodoItem = ({ todo , removeTodoItem, toggleTodoItem, changeTextOfTodoItem }) => {
  const todoItem = useRef();
  const editableParagraph = useRef();

  const todoKeyDownHandler = (todoId, keyCode) => {
    if (Object.values(keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === keyCodes.delete) {
      return removeTodoHandler(todoId);
    }

    return focusElement(keyCode);
  }

  const removeTodoHandler = (todoId) => {
    removeTodoItem(todoId);

    // TODO: REF EKLENEBİLİR
    const defaultEl = document.querySelector(".m-todo__input");
    return focusNextElement(defaultEl);
  }
 
  const focusElement = (keyCode) => {
    const { left, up, down, right } = keyCodes;

    const firstTodoItem = todoItem.current.parentNode.firstChild;
    const lastTodoItem = todoItem.current.parentNode.lastChild;

    switch (keyCode) {
      case left:
      case up:
        focusPreviousElement(lastTodoItem);
        break;
      case down:
      case right:
        focusNextElement(firstTodoItem);
        break;

      default:
        return;
    }
  };

  const focusPreviousElement = (defaultEl) => {
    const prevEl = todoItem.current.previousElementSibling;

    let nextFocusEl = prevEl ? prevEl.firstChild : null;
    if (!nextFocusEl) {
      nextFocusEl = defaultEl ? defaultEl.firstChild : todoItem.current.lastChild;
    }

    nextFocusEl.focus();
  };

  const focusNextElement = (defaultEl) => {
    const nextEl = todoItem.current.nextElementSibling;

    let nextFocusEl = nextEl ? nextEl.firstChild : null
    if (!nextFocusEl) {
      nextFocusEl = defaultEl ? defaultEl.firstChild : todoItem.current.firstChild;
    }
    nextFocusEl.focus();
  };

  const doubleClickHandler = () => {
    editableParagraph.current.contentEditable = true;
  }

  const onFocusOutHandler = (todoId) => {
    const todoText = editableParagraph.current.textContent;
    changeTextOfTodoItem(todoId, todoText);

    editableParagraph.current.contentEditable = false;
  }

  return (
    <li
      className={`m-todo__item ${todo.done ? "-done" : ""}`}
      key={todo.id}
      ref={todoItem}
      onKeyDown={e => todoKeyDownHandler(todo.id, e.keyCode)}
    >
      <input
        className={`m-todo__checkbox ${todo.done ? "-done": ""}`}
        type="checkbox"
        name="todoCheckbox"
        id={`todoCheckbox-${todo.id}`}
        aria-label={`${todo.text}`}
        onClick={() => toggleTodoItem(todo.id)}
      />

      <label
        className="m-todo__label"
        id="todoLabel"
        htmlFor={`todoCheckbox-${todo.id}`}
        data-content="✔︎"
      ></label>

      <p
        className="m-todo__desc"
        onDoubleClick={doubleClickHandler}
        onBlur={() => onFocusOutHandler(todo.id)}
        ref={editableParagraph}
        >
        {todo.text}
      </p>

      <button
        className="m-todo__removeBtn"
        aria-label={`Do you want to delete this todo? ${todo.text}`}
        onClick={() => removeTodoHandler(todo.id)}
      >
        Delete Todo
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
  toggleTodoItem: PropTypes.func.isRequired,
  changeTextOfTodoItem: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  removeTodoItem,
  toggleTodoItem,
  changeTextOfTodoItem,
}

export default connect(null, mapDispatchToProps)(TodoItem);
