import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { clearCompletedTodoItems, changeActiveFilter } from "../store/actions";

const Footer = ({ todoListLength, clearTodos, changeFilter }) => {
  const filterButtonContainer = useRef();

  const setActiveFilter = (e) => {
    setSelectedData(e.target);
    const filter = e.target.dataset.filter;
    changeFilter(filter);
  }

  const setSelectedData = (target) => {
    const buttonContainer = Array.from(filterButtonContainer.current.children)
    buttonContainer
      .forEach(btn => {
        if (btn === target) {
          btn.dataset.selected = true
        } else {
          btn.dataset.selected = false
        }
    });
  }

  const setSelectedDataAfterClear = ({ target }) => {
    const buttonContainer = Array.from(filterButtonContainer.current.children)
    buttonContainer
      .forEach(btn => {
        if (btn === target) {
          btn.dataset.selected = false;
          filterButtonContainer.current.firstChild.dataset.selected = true
        } else {
          btn.dataset.selected = false;
        }
    });

    clearTodos(target);
  }

  return todoListLength > 0 ? (
    <footer className="o-app__footer">
      <p className="o-app__itemLeft" tabIndex="0">{todoListLength} Items Left</p>
      <div className="o-app__filterBtnContainer" ref={filterButtonContainer}>
        <button
          aria-label="Filter By: ALL TODOS"
          className="o-app__filterBtn"
          data-filter="ALL"
          onClick={setActiveFilter}>
          All
        </button>
        <button
          aria-label="Filter By: ACTIVE TODOS"
          className="o-app__filterBtn"
          data-filter="ACTIVE"
          onClick={setActiveFilter}>
          Active
        </button>
        <button
          aria-label="Filter By: COMPLETED TODOS"
          className="o-app__filterBtn"
          data-filter="COMPLETED"
          onClick={setActiveFilter}>
          Completed
        </button>
        <button
          className="o-app__filterBtn"
          data-clear data-filter="ALL"
          onClick={setSelectedDataAfterClear}>
          Clear Completed
        </button>
      </div>
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
  clearTodos: (target) => {
    const filter = target.dataset.filter;
    dispatch(clearCompletedTodoItems());
    dispatch(changeActiveFilter(filter));

    // TODO: REF EKLENEBİLİR
    document.querySelector(".m-todo__input").focus();
  },
  changeFilter: (filter) => dispatch(changeActiveFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
