// React Component
import React from 'react';
import { useEffect, useState, useContext } from 'react';

// Chakra Ui Components
import {
  Heading,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Button,
  Text,
  Flex,
  Container,
  Box,
} from '@chakra-ui/react';

// local Component
import NotSignIn from '../components/NotSignIn';
import HomeSection2 from '../components/HomeSection2';
import CartSection1 from '../components/CartSection1';
import OrderSummary from '../components/OrderSummary';
import CartItemCard from '../components/CartItemCard';

// useContext
import UserContext from '../UserContext';
const Cart = () => {
  const [products, setProducts] = useState([]);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/retrieveOrderUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((products) => {
            return <CartItemCard key={products._id} CardItemProp={products} />;
          })
        );
      });
  }, []);

  return user.id !== null ? (
    <>
      <CartSection1 />
      <Box>
        <Wrap justify='center' mt='5rem' gap='5rem'>
          <Flex direction='column'>
            <Text
              p='3'
              fontSize='2xl'
              fontWeight='extrabold'
              w='auto'
              bgGradient='linear(to-r, teal.300, pink.300)'
              color='white'
              bgClip='text'
              borderRadius='lg'
            >
              Shopping Cart Items:
            </Text>
            <Wrap direction='column'>{products}</Wrap>
          </Flex>

          <OrderSummary />
        </Wrap>
      </Box>
    </>
  ) : (
    <>
      <NotSignIn />
      <HomeSection2 />
    </>
  );
};

export default Cart;
