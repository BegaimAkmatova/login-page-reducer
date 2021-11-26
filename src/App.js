import React,{useState, useEffect} from 'react';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLogged = localStorage.getItem('isLoggedIn')

    if(storedUserLogged === '1') {
      setIsLoggedIn (true);
    }
  }, [])

  const loginHandler = (email,password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  }
  return (
    <React.Fragment>
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}>
        <MainHeader />
          <main>
            {!isLoggedIn && <Login onLogin={loginHandler}/>}
            {isLoggedIn && <Home onLogout={logoutHandler}/>}
          </main>
        </AuthContext.Provider>
    </React.Fragment>  
  );
}

export default App;
