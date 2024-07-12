import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import NewCategory from './components/categories/NewCategory';
import RecipeForm from './components/RecipeForm';

function App() {
  const token = window.localStorage.getItem('token')


  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      {token && <RecipeForm />}
    </>
  );
}

export default App;
