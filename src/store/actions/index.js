export const addTodo = event => ({
  type: 'ADD_TODO',
  event
})

export const removeTodo = (todoId, target) => ({
  type: 'REMOVE_TODO',
  todoId,
  target
})
