import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Main from "./components/Main";
import InfoMessage from "./components/InfoMessage";

class App extends React.Component {
  componentDidMount() {
    // TODO: REF EKLENİCEK
    document.querySelector(".m-todo__input").focus();
  }

  render() {
    return (
      <div className="o-app">
        <h1 className="o-app__header">Today's TODO's</h1>
        <div className="m-todo">
          <Main />

          <InfoMessage />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  todoList: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  todoList: state.todos,
  activeFilter: state.activeFilter
});

export default connect(mapStateToProps)(App);
