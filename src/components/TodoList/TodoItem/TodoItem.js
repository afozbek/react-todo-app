import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { keyCodes } from "../../../util"
import {
  removeTodoItem,
  toggleTodoItem,
  changeTextOfTodoItem
} from '../../../store/actions';
import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
import TodoDeleteButton from "./TodoDeleteButton";

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

  const removeTodoHandler = todoId => {
    // TODO: REF EKLENEBİLİR
    const defaultEl = document.querySelector(".m-todo__input");
    focusNextElement(defaultEl);

    return removeTodoItem(todoId);
  }

  const focusElement = keyCode => {
    const { left, up, down, right } = keyCodes;

    const firstTodoItem = todoItem.current.parentNode.firstChild.firstChild;
    const lastTodoItem = todoItem.current.parentNode.lastChild.firstChild;

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

  const focusPreviousElement = defaultEl => {
    const prevEl = todoItem.current.previousElementSibling;

    let nextFocusEl = prevEl ? prevEl.firstChild : defaultEl;

    nextFocusEl.focus();
  };

  const focusNextElement = (defaultEl) => {
    const nextEl = todoItem.current.nextElementSibling;

    let nextFocusEl = nextEl ? nextEl.firstChild : defaultEl

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
      <CustomCheckbox todoId={todo.id} todoText={todo.text} todoDone={todo.done} />

      <p className="m-todo__desc" ref={editableParagraph}
        onDoubleClick={doubleClickHandler}
        onBlur={() => onFocusOutHandler(todo.id)}
      >
        {todo.text}
      </p>

      <TodoDeleteButton todoId={todo.id} todoText={todo.text} removeTodoHandler={removeTodoHandler} />
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
