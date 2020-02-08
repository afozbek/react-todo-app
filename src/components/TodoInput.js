import React from 'react'
import PropTypes from "prop-types"
import { connect } from 'react-redux';

import { addTodo } from "../store/actions";
import { keyCodes } from "../util";

const TodoInput = ({ dispatch }) => {
  const todoKeyDownHandler = e => {
    if (Object.values(keyCodes).indexOf(e.keyCode) === -1) return;

    dispatch(addTodo(e));

    e.target.value = "";
  }

  return (
    <input
      className="m-todo__input"
      onKeyDown={(e) => todoKeyDownHandler(e)}
      aria-label="Please enter your todo item"
      name="todo"
      id="todoInput"
      type="text"
      placeholder="What do you want to do today 🍓"
    />
  )
}

TodoInput.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(TodoInput);