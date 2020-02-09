import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { clearCompletedTodos, changeActiveFilter } from "../store/actions";

const Footer = ({todoListLength, clearTodos, changeFilter}) => {
  const setActiveFilter = (e) => {
    const filter = e.target.dataset.filter;
    changeFilter(filter);
  }

  return todoListLength > 0 ? (
    <footer className="o-app__footer">
      <p className="o-app__itemLeft" tabIndex="0">{todoListLength} Items Left</p>
      <button className="o-app__filterBtn" data-filter="ALL" onClick={setActiveFilter}>All</button>
      <button className="o-app__filterBtn" data-filter="ACTIVE" onClick={setActiveFilter}>Active</button>
      <button className="o-app__filterBtn" data-filter="COMPLETED" onClick={setActiveFilter}>Completed</button>
      <button className="o-app__filterBtn" onClick={clearTodos}>Clear Completed</button>
    </footer>
  ) : null;
}

Footer.propTypes = {
  todoListLength: PropTypes.number.isRequired,
  clearTodos: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todoListLength : state.todos.length,
});

const mapDispatchToProps = dispatch => ({
  clearTodos: () => {
    dispatch(clearCompletedTodos());
    dispatch(changeActiveFilter("ALL"));

    // TODO: REF EKLENEBİLİR
    document.querySelector(".m-todo__input").focus();
  },
  changeFilter: (filter) => dispatch(changeActiveFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
