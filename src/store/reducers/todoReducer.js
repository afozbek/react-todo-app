// TODO REDUCER
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return addTodoItem(state, action.event);
    case 'REMOVE_TODO':
      return removeTodoItem(state, action.todoId, action.target);
    case 'TOGGLE_TODO':
      return toggleTodoStatus(state, action.todoId, action.target);
    case "CLEAR_COMPLETED_TODOS":
      return clearCompletedTodos(state);
    default:
      return state
  }
}

const addTodoItem = (state, { target }) => {
    const uniqId = Math.ceil(Math.random() * 1000000);
    const todo = target.value;
    const todoObj = {
      id: uniqId,
      item: todo.trim(),
      done: false
    };

    return state.concat(todoObj);
}

const removeTodoItem = (state, todoId, target) => {
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

const toggleTodoStatus = (state, todoId, target) => {
  console.log("TOGGLE TODO")
  const newTodoList = state.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });

  target.classList.toggle("-done");

  return newTodoList;
}

const clearCompletedTodos = (state) => {
  return state.filter(todo => todo.done === false);
}


export default todos;
