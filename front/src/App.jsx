import { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';

function App() {
  const { hello } = useContext(AppContext);
  console.log(hello);

  return <></>;
}

export default App;
