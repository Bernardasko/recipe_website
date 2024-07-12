import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import NewCategory from './components/categories/NewCategory';
import RecipeForm from './components/RecipeForm';

function App() {
  // const { hello } = useContext(AppContext);
  // console.log(hello);
  const token = window.localStorage.getItem('token')
  console.log(token);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      {/* <NewCategory/> */}
      {token && <RecipeForm />}
    </>
  );
}

export default App;
