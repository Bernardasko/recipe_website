import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';
import Signup from './compinents/Signup';

function App() {
  const { hello } = useContext(AppContext);
  console.log(hello);

  return <>
  <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  <Signup/>
    </>
}

export default App;
