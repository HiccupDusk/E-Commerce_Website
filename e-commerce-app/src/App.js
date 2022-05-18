import * as React from 'react';

// HOOKS
import { useState, useEffect } from 'react';

// LIBRARY
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './App.css';

// COMPONENTS
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Shop from './pages/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// USERCONTEXT
import { UserProvider } from './UserContext';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });
  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== 'undefined') {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
