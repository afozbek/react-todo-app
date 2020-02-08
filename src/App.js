import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TodoList from './components/Todo/TodoList';
import TodoInput from "./components/Todo/TodoInput";
import Footer from './components/Footer';

class App extends React.Component {
  componentDidMount() {
    // TODO: REF EKLENİCEK
    document.querySelector(".m-todo__input").focus();
  }

  render() {
    const main = (
      <main className="o-app__main">
        <TodoList />
      </main>
    );

    return (
      <div className="o-app">
        <h1 className="o-app__header">Today's TO DO's</h1>
        <div className="m-todo">
          <TodoInput />

          {main}
          {this.props.todoList.length > 0 ? <Footer /> : null}

          <p className="o-app__infoMsg">To remove an item press <code>del</code> in your keyboard when you focus the item</p>
          <p className="o-app__infoMsg">You can also delete todo by hovering the item and then press the <code>delete</code> button</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  todoList: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    todoList: state.todos,
    activeFilter: state.activeFilter
  }
}

export default connect(mapStateToProps)(App);
