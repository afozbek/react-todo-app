import {
  ADD_TODO_ITEM, REMOVE_TODO_ITEM,
  TOGGLE_TODO_ITEM, CLEAR_COMPLETED_TODO_ITEMS,
  SELECT_ALL_TODO_ITEMS, CHANGE_TEXT_OF_TODO_ITEM
} from "./types"

// TODO OPERATIONS
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

const selectAllTodoItems = () => ({
  type: SELECT_ALL_TODO_ITEMS
});

const changeTextOfTodoItem = (todoId, todoText) => ({
  type: CHANGE_TEXT_OF_TODO_ITEM,
  todoId,
  todoText
});

export {
  addTodoItem,
  removeTodoItem,
  toggleTodoItem,
  clearCompletedTodoItems,
  selectAllTodoItems,
  changeTextOfTodoItem
}