import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { clearCompletedTodos, changeActiveFilter } from "../store/actions";

const Footer = ({todoListLength, clearCompletedTodos, changeActiveFilter}) => {
  const setActiveFilter = (e) => {
    const filter = e.target.dataset.filter;
    changeActiveFilter(filter);
  }

  return todoListLength > 0 ? (
    <footer className="o-app__footer">
      <p className="o-app__itemLeft" tabIndex="0">{todoListLength} Items Left</p>
      <button className="o-app__filterBtn" data-filter="ALL" onClick={setActiveFilter}>All</button>
      <button className="o-app__filterBtn" data-filter="ACTIVE" onClick={setActiveFilter}>Active</button>
      <button className="o-app__filterBtn" data-filter="COMPLETED" onClick={setActiveFilter}>Completed</button>
      <button className="o-app__filterBtn" onClick={clearCompletedTodos}>Clear Completed</button>
    </footer>
  ) : null;
}

Footer.propTypes = {
  todoListLength: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  todoListLength : state.todos.length
});

const mapDispatchToProps = {
  clearCompletedTodos,
  changeActiveFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
