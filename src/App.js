import React from "react";

class App extends React.Component {
  state = {
    todoList: [],
    keyCodes: {
      enter: 13,
      space: 32
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

  toggleTodoStatus = (todoId, { keyCode, target }) => {
    if (keyCode !== this.state.keyCodes.space) return;

    const newTodoList = this.state.todoList.map(todo => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    this.setState({ todoList: newTodoList });

    target.classList.toggle("-done");
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
        onKeyDown={e => this.toggleTodoStatus(todo.id, e)}
      >
        {todo.item}
      </li>
    ));

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
          <ul className="m-todo__list">{todos}</ul>
        </div>
      </div>
    );
  }
}

export default App;
