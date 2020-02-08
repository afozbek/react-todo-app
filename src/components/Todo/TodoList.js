import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Todo from './Todo'

const TodoList = ({ todos, activeFilter }) => {
  const filterTodoList = (filterType) => {
    switch (filterType) {
      case "ALL":
        return todos;
      case "ACTIVE":
        return todos.filter(todo => todo.done === false);
      case "COMPLETED":
        return todos.filter(todo => todo.done === true);
      default:
        return todos;
    }
  };

  const todoItems = filterTodoList(activeFilter).map(todo => <Todo key={todo.id} todo={todo} /> );

  return todoItems.length > 0 ? (
    <ul className="m-todo__list">
      {todoItems}
    </ul>
  ) : null;
}
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  activeFilter: state.activeFilter,
  todos: state.todos
});

export default connect(mapStateToProps)(TodoList)