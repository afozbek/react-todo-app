import {
  ADD_TODO_ITEM, REMOVE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  CLEAR_COMPLETED_TODO_ITEMS,
  SELECT_ALL_TODO_ITEMS
} from "../actions/types"

// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      return addTodoItem(state, action.todoText);
    case REMOVE_TODO_ITEM:
      return removeTodoItem(state, action.todoId);
    case TOGGLE_TODO_ITEM:
      return toggleTodoItem(state, action.todoId);
    case CLEAR_COMPLETED_TODO_ITEMS:
      return clearCompletedTodoItems(state);
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

const toggleTodoItem = (state, todoId) => {
  const newTodoList = state.map(todo => {
    if (todo.id === todoId) {
      return {
        ...todo,
        done: !todo.done
      }
    }
    return todo;
  });

  return newTodoList;
}

const clearCompletedTodoItems = (state) => {
  return state.filter(todo => todo.done === false);
}

const selectAllTodoItems = (state) => {
  return state.map(todo => {
    return {
      ...todo,
      done: true
    };
  });
}


export default todos;
