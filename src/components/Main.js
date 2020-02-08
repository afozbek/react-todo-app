import React from 'react'
import TodoList from './Todo/TodoList';
import TodoInput from './Todo/TodoInput';
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
