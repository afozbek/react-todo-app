// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log("ADD TODO");
      return addTodo(state, action.event)
    case 'TOGGLE_TODO':
      console.log("TOGGLE TODO")
      return state
    case 'REMOVE_TODO':
      console.log("REMOVE TODO")
      return removeTodo(state, action.todoId, action.target);

    default:
      return state
  }
}

const addTodo = (state, { target }) => {
    const uniqId = Math.ceil(Math.random() * 1000000);
    const todo = target.value;
    const todoObj = {
      id: uniqId,
      item: todo.trim(),
      done: false
    };

    return state.concat(todoObj);
}

const removeTodo = (state, todoId, target) => {
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



export default todos;
