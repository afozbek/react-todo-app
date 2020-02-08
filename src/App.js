import React from "react";
import { connect } from "react-redux";

import TodoList from './components/TodoList';
import TodoInput from "./components/TodoInput";

// import { addTodo } from './store/actions/index';

class App extends React.Component {
  state = {
    todoList: [],
    keyCodes: {
      enter: 13,
      space: 32,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46
    },
    activeFilter: "ALL"
  };

  // addTodoItem = ({ keyCode, target }) => {
  //   if (keyCode !== this.state.keyCodes.enter) return;

  //   const uniqId = Math.ceil(Math.random() * 1000000);
  //   const todo = target.value;
  //   const todoObj = { 
  //     id: uniqId,
  //     item: todo.trim(),
  //     done: false
  //   };

  //   this.setState(prevState => ({
  //     todoList: prevState.todoList.concat(todoObj)
  //   }));

  //   target.value = "";
  // };

  todoKeyDownHandler = (todoId, { keyCode, target }) => {
    if (Object.values(this.state.keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === this.state.keyCodes.space) {
      return this.toggleTodoStatus(todoId, target);
    } else if (keyCode === this.state.keyCodes.delete) {
      return this.removeTodoItem(todoId, target);
    }

    return this.focusElement(keyCode, target);
  };

  removeTodoItem = (todoId, target) => {
    const filteredTodos = this.state.todoList.filter(todo => {
      return todo.id !== todoId;
    });

    this.setState({
      todoList: filteredTodos
    });

    // TODO: REF EKLENİCEK
    const nextEl = target.nextElementSibling;
    if (nextEl) {
      nextEl.focus();
    } else {
      document.querySelector(".m-todo__input").focus();
    }
  };

  toggleTodoStatus = (todoId, target) => {
    const newTodoList = this.state.todoList.map(todo => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    this.setState({
      todoList: newTodoList
    });

    target.classList.toggle("-done");
  };

  clearCompletedTodos = () => {
    let unfinishedTodos = this.state.todoList.filter(todo => todo.done === false);

    this.setState({
      activeFilter: "ALL",
      todoList: unfinishedTodos
    });
  }

  setActiveStatus = (status) => {
    this.setState({
      activeFilter: status
    });
  }

  focusElement = (keyCode, target) => {
    const { left, up, down, right } = this.state.keyCodes;

    // TODO: REF EKLENICEK
    const todoItems = document.querySelector(".m-todo__list").children;
    const firstTodoItem = todoItems[0];
    const lastTodoItem = todoItems[todoItems.length - 1];

    switch (keyCode) {
      case left:
      case up:
        this.focusPreviousElement(target, lastTodoItem);
        break;
      case down:
      case right:
        this.focusNextElement(target, firstTodoItem);
        break;

      default:
        return;
    }
  };

  focusPreviousElement = (target, defaultEl) => {
    const prevEl = target.previousElementSibling;

    let nextFocusEl = prevEl;
    if (!prevEl) {
      nextFocusEl = defaultEl;
    }

    nextFocusEl.focus();
  };

  focusNextElement = (target, defaultEl) => {
    const nextEl = target.nextElementSibling;

    let nextFocusEl = nextEl;
    if (!nextEl) {
      nextFocusEl = defaultEl;
    }

    nextFocusEl.focus();
  };

  componentDidMount() {
    // TODO: REF EKLENİCEK
    document.querySelector(".m-todo__input").focus();
    console.log("PROPS:", this.props.todoList)
  }

  render() {
    const todoList = this.props.todoList.length > 0 ? (
      <TodoList
        todos={this.props.todoList}
        activeFilter={this.state.activeFilter}
        removeTodoItem={this.removeTodoItem}
        todoKeyDownHandler={this.todoKeyDownHandler}
      />
    ) : null;

    const footer = (
      <footer className="o-app__footer">
        <p>{this.props.todoList.length} Items Left</p>
        <button onClick={() => this.setActiveStatus("ALL")}>All</button>
        <button onClick={() => this.setActiveStatus("ACTIVE")}>Active</button>
        <button onClick={() => this.setActiveStatus("COMPLETED")}>Completed</button>
        <button onClick={this.clearCompletedTodos}>Clear Completed</button>
      </footer>
    );

    const main = (
      <main className="o-app__main">
        {todoList}
      </main>
    );

    return (
      <div className="o-app">
        <h1 className="o-app__header">Today's TO DO's</h1>
        <div className="m-todo">
          <TodoInput />

          {main}
          {this.props.todoList.length > 0 ? footer: null}

          <p className="o-app__infoMsg">To remove an item press <code>del</code> in your keyboard when you focus the item</p>
          <p className="o-app__infoMsg">You can also delete todo by hovering the item and then press the <code>delete</code> button</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todos
  }
}

export default connect(mapStateToProps, null)(App);
