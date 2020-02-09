import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODOS, SELECT_ALL_TODO_ITEMS
} from "../actions/types"

// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodoItem(state, action.todoText);
    case REMOVE_TODO:
      return removeTodoItem(state, action.todoId);
    case TOGGLE_TODO:
      return toggleTodoStatus(state, action.todoId);
    case CLEAR_COMPLETED_TODOS:
      return clearCompletedTodos(state);
    case SELECT_ALL_TODO_ITEMS:
      return selectAllTodoItems(state);
    default:
      return state
  }
}

const addTodoItem = (state, todoText) => {
    const uniqId = Math.ceil(Math.random() * 1000000);
    const todoObj = {
      id: uniqId,
      item: todoText.trim(),
      done: false
    };

    return state.concat(todoObj);
}

const removeTodoItem = (state, todoId) => {
  const filteredTodos = state.filter(todo => {
    return todo.id !== todoId;
  });

  return filteredTodos;
}

const toggleTodoStatus = (state, todoId) => {
  const newTodoList = state.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  return newTodoList;
}

const clearCompletedTodos = (state) => {
  return state.filter(todo => todo.done === false);
}

const selectAllTodoItems = (state) => {
  return state.map(todo => {
    todo.done = true;
    return todo;
  });
}


export default todos;
