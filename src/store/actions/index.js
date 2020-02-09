import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODOS,
  CHANGE_ACTIVE_FILTER
} from "./types"

export const addTodoItem = todoText => ({
  type: ADD_TODO,
  todoText
});

export const removeTodoItem = todoId => ({
  type: REMOVE_TODO,
  todoId
});

export const toggleTodoStatus = todoId => ({
  type: TOGGLE_TODO,
  todoId
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS
});

export const changeActiveFilter = filter => ({
  type: CHANGE_ACTIVE_FILTER,
  filter
});