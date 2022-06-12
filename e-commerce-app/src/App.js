import * as React from 'react';

// HOOKS
import { useState, useEffect } from 'react';

// LIBRARY
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

// COMPONENTS
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

// PAGES
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Logout from './pages/logout';
import Error from './pages/error';
import Shop from './pages/shop';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard';
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
    fetch('https://stark-spire-46613.herokuapp.com/api/users/details', {
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
  // const gradient = (bgGradient = 'linear(to-l, #7928CA, #FF0080)');
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
            <Route path='/cart' element={<Cart />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
