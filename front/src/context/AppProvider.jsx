import { useState } from 'react';
import { AppContext } from './AppContext';
function AppProvider({ children }) {
  const application = {
    hello: 123,
  };
  return (
    <AppContext.Provider value={application}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
