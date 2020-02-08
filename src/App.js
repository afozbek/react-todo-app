import React from "react";

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

  addTodoItem = ({ keyCode, target }) => {
    if (keyCode !== this.state.keyCodes.enter) return;

    const todo = target.value;
    const todoObj = { 
      id: Math.random(),
      item: todo.trim(),
      done: false
    };

    this.setState(prevState => ({
      todoList: prevState.todoList.concat(todoObj)
    }));

    target.value = "";
  };

  todoKeyDownHandler = (todoId, { keyCode, target }) => {
    if (Object.values(this.state.keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === this.state.keyCodes.space) {
      return this.toggleTodoStatus(todoId, target);
    } else if (keyCode === this.state.keyCodes.delete) {
      return this.removeTodoItem(todoId);
    }

    return this.focusElement(keyCode, target);
  };

  focusElement = (keyCode, target) => {
    const { left, up, down, right } = this.state.keyCodes;
    const todoItems = this.refs.todoListRef.children;
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

  toggleTodoStatus = (todoId, target) => {
    const newTodoList = this.state.todoList.map(todo => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    this.setState(prevState => ({
      todoList: newTodoList
    }));

    target.classList.toggle("-done");
  };

  removeTodoItem = (todoId) => {
    const filteredTodos = this.state.todoList.filter(todo => {
      return todo.id !== todoId;
    });

    this.setState(prevState => ({
      todoList: filteredTodos
    }));

    this.refs.todoInputRef.focus();
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

  filterByStatus = (status) => {
    switch (status) {
      case "ALL":
        return this.state.todoList;
      case "ACTIVE":
        return this.state.todoList.filter(todo => todo.done === false);
      case "COMPLETED":
        return this.state.todoList.filter(todo => todo.done === true);
      default:
        return this.state.todoList;
    }
  };

  getTodos = (status) => {
    return this.filterByStatus(status).map(todo => (
      <li
        className={`m-todo__item ${todo.done ? "-done": ""}`}
        aria-label={"You want to do: " + todo.item}
        key={todo.id}
        tabIndex="0"
        onKeyDown={e => this.todoKeyDownHandler(todo.id, e)}
      >
        <p className="m-todo__desc">{todo.item}</p>
        <button
          className="m-todo__removeBtn"
          onClick={e => this.removeTodoItem(todo.id, e)}
        >
          Delete Todo
        </button>
      </li>
    ));
  }

  componentDidMount() {
    this.refs.todoInputRef.focus();
  }

  render() {
    const todos = this.getTodos(this.state.activeFilter);

    const todoList = todos.length > 0 ? (
      <ul className="m-todo__list" ref="todoListRef">
        {todos}
      </ul>
    ) : null;

    const footer = (
      <footer className="o-app__footer">
        <p>{this.state.todoList.length} Items Left</p>
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
          <input
            ref="todoInputRef"
            className="m-todo__input"
            onKeyDown={this.addTodoItem}
            aria-label="Please enter your todo item"
            name="todo"
            id="todoInput"
            type="text"
            placeholder="What do you want to do today 🍓"
          />

          {main}
          {this.state.todoList.length > 0 ? footer: null}
          
          <p className="o-app__infoMsg">To remove an item press <code>del</code> in your keyboard when you focus the item</p>
          <p className="o-app__infoMsg">You can also delete todo by hovering the item and then press the <code>delete</code> button</p>
        </div>
      </div>
    );
  }
}

export default App;
