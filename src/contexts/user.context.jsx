import { useState, useEffect, createContext } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      console.log(user);
      setCurrentUser(user);
    });

    return unsubscribe; // unsubscribe() will run when this component unmounts. We need to do this to avoid a memory leak.
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}