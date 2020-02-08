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
      down: 40
    }
  };

  addTodoItem = ({ keyCode, target }) => {
    if (keyCode !== this.state.keyCodes.enter) return;
    if (target.value.length < 3) return;

    const todo = target.value;
    const todoObj = { id: Math.random(), item: todo.trim(), done: false };

    this.setState(prevState => ({
      todoList: prevState.todoList.concat(todoObj)
    }));

    target.value = "";
  };

  todoKeyDownHandler = (todoId, { keyCode, target }) => {
    if (Object.values(this.state.keyCodes).indexOf(keyCode) === -1) return;

    if (keyCode === this.state.keyCodes.space) {
      return this.toggleTodoStatus(todoId, target);
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

  removeTodoItem = (todoId, e) => {
    const filteredTodos = this.state.todoList.filter(todo => {
      return todo.id !== todoId;
    });

    this.setState(prevState => ({
      todoList: filteredTodos
    }));

    this.refs.todoInputRef.focus();
  };

  componentDidMount() {
    this.refs.todoInputRef.focus();
  }

  render() {
    const todos = this.state.todoList.map(todo => (
      <li
        className="m-todo__item"
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

    const todoList = (
      <ul className="m-todo__list" ref="todoListRef">
        {todos}
      </ul>
    );

    const main =
      todos.length > 0 ? (
        <main className="o-app__main">
          {todoList}
          <footer className="o-app__footer">
            <p>{this.state.todoList.length} Items Left</p>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
            <button>Clear Completed</button>
          </footer>
        </main>
      ) : null;

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
        </div>
      </div>
    );
  }
}

export default App;
