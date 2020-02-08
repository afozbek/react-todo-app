import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, activeFilter, todoKeyDownHandler, removeTodoItem }) => {
  const filterByStatus = (status) => {
    switch (status) {
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

  const getTodos = (status) => {
    return filterByStatus(status).map(todo => (
      <Todo key={todo.id} todo={todo} removeTodoItem={removeTodoItem} todoKeyDownHandler={todoKeyDownHandler}/>
    ));
  }

  const todoItems = getTodos(activeFilter);

  return (
    <ul className="m-todo__list">
      {todoItems}
    </ul>
  );
}
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  todoKeyDownHandler: PropTypes.func.isRequired,
  removeTodoItem: PropTypes.func.isRequired
}

export default TodoList