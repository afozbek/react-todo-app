import {
  ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODOS,
  CHANGE_ACTIVE_FILTER
} from "./types"

export const addTodoItem = (todoText) => ({
  type: ADD_TODO,
  todoText
});

export const removeTodoItem = (todoId, target) => ({
  type: REMOVE_TODO,
  todoId,
  target
});

export const toggleTodoStatus = (todoId, target) => ({
  type: TOGGLE_TODO,
  todoId,
  target
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS
});

export const changeActiveFilter = filter => ({
  type: CHANGE_ACTIVE_FILTER,
  filter
});