import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODOS,
} from "../actions/types"

// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodoItem(state, action.todoText);
    case REMOVE_TODO:
      return removeTodoItem(state, action.todoId, action.target);
    case TOGGLE_TODO:
      return toggleTodoStatus(state, action.todoId, action.target);
    case CLEAR_COMPLETED_TODOS:
      return clearCompletedTodos(state);
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

const removeTodoItem = (state, todoId, target) => {
  const filteredTodos = state.filter(todo => {
    return todo.id !== todoId;
  });

   // TODO: REF EKLENİCEK
  const nextEl = target.nextElementSibling;
  if (nextEl) {
    nextEl.focus();
  } else {
    document.querySelector(".m-todo__input").focus();
  }

  return filteredTodos;
}

const toggleTodoStatus = (state, todoId, target) => {
  const newTodoList = state.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  target.classList.toggle("-done");

  return newTodoList;
}

const clearCompletedTodos = (state) => {
  return state.filter(todo => todo.done === false);
}


export default todos;
