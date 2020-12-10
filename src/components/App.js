import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'myBase';

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
