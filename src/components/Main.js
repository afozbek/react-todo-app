import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoList from './TodoList/TodoList';
import TodoInput from './TodoList/TodoItem/TodoInput';
import Footer from './Footer';

import { toggleAllTodoItems } from "../store/actions"

const Main = ({ todoListLength, toggleAllTodoItems, toggled }) => {
  return (
    <main className="o-app__main">
      <button
        aria-label="To select all todos done, please press enter or space."
        className={`o-app__todoToggleBtn ${todoListLength ? "-visible": ""} ${toggled ? "-toggled": ""}`}
        onClick={toggleAllTodoItems}
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
  toggleAllTodoItems: PropTypes.func.isRequired,
  toggled: PropTypes.bool
}

const mapStateToProps = state => ({
  toggled: state.todos.allTodosSelected
});

const mapDispatchToProps = {
  toggleAllTodoItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
