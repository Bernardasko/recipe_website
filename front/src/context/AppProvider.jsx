import { useState } from 'react';
import { AppContext } from './AppContext';
function AppProvider({ children }) {
  const [token, setToken] = useState(null);
  const application = {
    token,
    setToken,
  };
  return (
    <AppContext.Provider value={application}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
