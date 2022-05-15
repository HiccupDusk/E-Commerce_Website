import * as React from 'react';
// LIBRARY
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './App.css';
// COMPONENTS
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Shop from './pages/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
