import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'myBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);       
      }else{
        setIsLoggedIn(false);
      }
      setInit(true) ;
    });
  }, []);
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;