import {
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  CLEAR_COMPLETED_TODO_ITEMS,
  TOGGLE_ALL_TODO_ITEMS,
  CHANGE_TEXT_OF_TODO_ITEM,
  INIT_TODO_STATE,
  CLEAR_TODO_STATE
} from "./types";

// TODO OPERATIONS

const initTodoListState = () => ({
  type: INIT_TODO_STATE
});

const clearTodoState = () => ({
  type: CLEAR_TODO_STATE
});

const addTodoItem = todoText => ({
  type: ADD_TODO_ITEM,
  todoText
});

const removeTodoItem = todoId => ({
  type: REMOVE_TODO_ITEM,
  todoId
});

const toggleTodoItem = todoId => ({
  type: TOGGLE_TODO_ITEM,
  todoId
});

const clearCompletedTodoItems = () => ({
  type: CLEAR_COMPLETED_TODO_ITEMS
});

const toggleAllTodoItems = () => ({
  type: TOGGLE_ALL_TODO_ITEMS
});

const changeTextOfTodoItem = (todoId, todoText) => ({
  type: CHANGE_TEXT_OF_TODO_ITEM,
  todoId,
  todoText
});

export {
  initTodoListState,
  clearTodoState,
  addTodoItem,
  removeTodoItem,
  toggleTodoItem,
  clearCompletedTodoItems,
  toggleAllTodoItems,
  changeTextOfTodoItem
};