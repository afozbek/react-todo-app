import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoList from './TodoList/TodoList';
import TodoInput from './TodoList/Todo/TodoInput';
import Footer from './Footer';

import { selectAllTodoItems } from "../store/actions"

const Main = ({ selectAllTodoItems, todoListLength }) => {
  return (
    <main className="o-app__main">
      <button
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
