import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoList from './TodoList/TodoList';
import TodoInput from './TodoList/TodoItem/TodoInput';
import Footer from './Footer';

import { selectAllTodoItems } from "../store/actions"

const Main = ({ todoListLength, selectAllTodoItems }) => {
  return (
    <main className="o-app__main">
      <button
        aria-label="To select all todos done, please press enter or space."
        className={`o-app__todoToggleBtn ${todoListLength ? "-visible": ""}`}
        onClick={selectAllTodoItems}
        >
          ❯
      </button>
      <TodoInput />
      <TodoList />
      <Footer />
    </main>
  )
}

Main.propTypes = {
  todoListLength: PropTypes.number.isRequired,
  selectAllTodoItems: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  selectAllTodoItems
}

export default connect(null, mapDispatchToProps)(Main);
