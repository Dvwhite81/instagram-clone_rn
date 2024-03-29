import React, { useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack } from './navigation';
import { getAuth, onAuthStateChanged } from './firebase';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => userHandler(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentUser ? <SignedInStack /> : <SignedOutStack />;
};

export default AuthNavigation;
