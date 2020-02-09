import React from 'react'
import TodoList from './TodoList/TodoList';
import TodoInput from './TodoList/Todo/TodoInput';
import Footer from './Footer';

const Main = () => {
  return (
    <main className="o-app__main">
        <TodoInput />
        <TodoList />
        <Footer />
    </main>
  )
}

export default Main;
