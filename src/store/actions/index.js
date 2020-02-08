// TODOS
export const addTodoItem = event => ({
  type: 'ADD_TODO',
  event
});

export const removeTodoItem = (todoId, target) => ({
  type: 'REMOVE_TODO',
  todoId,
  target
});

export const toggleTodoStatus = (todoId, target) => ({
  type: "TOGGLE_TODO",
  todoId,
  target
});

export const clearCompletedTodos = () => ({
  type: "CLEAR_COMPLETED_TODOS"
});

// STATUS
export const changeActiveFilter = filter => ({
  type: "CHANGE_ACTIVE_FILTER",
  filter
});