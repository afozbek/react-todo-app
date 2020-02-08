import React from 'react'
import PropTypes from "prop-types"
import { connect } from 'react-redux';

import { addTodoItem } from "../../store/actions";
import { keyCodes } from "../../util";

const TodoInput = ({ dispatch }) => {
  const inputKeyDownHandler = e => {
    if (Object.values(keyCodes).indexOf(e.keyCode) === -1 || e.target.value.length < 2) return;

    dispatch(addTodoItem(e));

    e.target.value = "";
  }

  return (
    <input
      className="m-todo__input"
      onKeyDown={inputKeyDownHandler}
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