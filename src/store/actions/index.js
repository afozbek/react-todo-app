// TODOS
export const addTodoItem = (todoText) => ({
  type: 'ADD_TODO',
  todoText
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