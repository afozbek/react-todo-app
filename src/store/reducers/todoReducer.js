import {
  INIT_TODO_STATE,
  CLEAR_TODO_STATE,
  ADD_TODO_ITEM, REMOVE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  CLEAR_COMPLETED_TODO_ITEMS,
  SELECT_ALL_TODO_ITEMS,
  CHANGE_TEXT_OF_TODO_ITEM,
  LOCALSTORAGE_TODO_STATE
} from "../actions/types"

import { getLocalStorageTodoState } from "../../util";

// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case INIT_TODO_STATE:
      return initTodoState(state);
    case CLEAR_TODO_STATE:
      return clearTodoState(state);
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
    case CHANGE_TEXT_OF_TODO_ITEM:
      return changeTextOfTodoItem(state, action.todoId, action.todoText);
    default:
      return state
  }
}

const initTodoState = state => {
  const newState = getLocalStorageTodoState()

  const concatted = state.concat(newState);

  return concatted;
}

const clearTodoState = state => {
  localStorage.removeItem(LOCALSTORAGE_TODO_STATE);
  state = [];

  return state;
}

const setToLocalStorage = newState => {
  localStorage.setItem(LOCALSTORAGE_TODO_STATE, JSON.stringify(newState));
}

const addTodoItem = (state, todoText) => {
    const uniqId = Math.ceil(Math.random() * 1000000);
    const todoObj = {
      id: uniqId,
      text: todoText.trim(),
      done: false
    };

    const newState = state.concat(todoObj);
    setToLocalStorage(newState);

    return newState;
}

const removeTodoItem = (state, todoId) => {
  const filteredTodos = state.filter(todo => {
    return todo.id !== todoId;
  });

  setToLocalStorage(filteredTodos);

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

  setToLocalStorage(newTodoList);

  return newTodoList;
}

const clearCompletedTodoItems = state => {
  const remainingTodoItems = state.filter(todo => todo.done === false);

  setToLocalStorage(remainingTodoItems);
  return remainingTodoItems;
}

const selectAllTodoItems = state => {
  const selectedAllTodoItems = state.map(todo => {
    return {
      ...todo,
      done: true
    };
  });

  setToLocalStorage(selectedAllTodoItems);

  return selectedAllTodoItems;
}

const changeTextOfTodoItem = (state, todoId, todoText) => {
  const changedTodoList = state.map(todo => {
    if (todo.id === todoId){
      return {
        ...todo,
        text: todoText
      }
    }
    return todo;
  });

  setToLocalStorage(changedTodoList);

  return changedTodoList;
}


export default todos;
