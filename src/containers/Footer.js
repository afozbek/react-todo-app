import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import FilterButtonContainer from '../components/FilterButton/FilterButtonContainer';

const Footer = ({ todoListLength }) => {
  return todoListLength > 0 ? (
    <footer className="o-app__footer">
      <p className="o-app__itemLeft" tabIndex="0">{todoListLength} Items Left</p>

      <FilterButtonContainer />
    </footer>
  ) : null;
}

const mapStatToProps = state => ({
  todoListLength : state.todos.todoList.length,
});

Footer.propTypes = {
  todoListLength: PropTypes.number.isRequired,
}

export default connect(mapStatToProps)(Footer);
