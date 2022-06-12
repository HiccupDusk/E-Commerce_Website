// React Component
import React from 'react';
import { useEffect, useState, useContext } from 'react';

// Chakra Ui Components
import {
  Wrap,
  Flex,
  Stack,
  useColorModeValue,
  Text,
  WrapItem,
} from '@chakra-ui/react';

// local Component
import NotSignIn from '../components/NotSignIn';
import HomeSection2 from '../components/sectionComponents/HomeSection2';
import CartSection1 from '../components/sectionComponents/CartSection1';
import OrderSummary from '../components/OrderSummary';
import CartItemCard from '../components/cardComponents/CartItemCard';

// useContext
import UserContext from '../UserContext';
const Cart = () => {
  const bg = useColorModeValue('white', 'gray.800');

  const [products, setProducts] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(
      'https://stark-spire-46613.herokuapp.com/api/products/retrieveOrderUser',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((products) => {
            return <CartItemCard key={products._id} CardItemProp={products} />;
          })
        );
      });
  });

  return user.id !== null ? (
    <>
      <CartSection1 />

      <Wrap justify='center' mt='5rem' direction='row'>
        <WrapItem>
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
            <Flex
              w='full'
              bg='gray.100'
              alignItems='center'
              justifyContent='center'
            >
              <Stack
                direction={{ base: 'column' }}
                w='full'
                bg={{ md: bg }}
                shadow='lg'
              >
                {products}
              </Stack>
            </Flex>
          </Flex>
        </WrapItem>
        <WrapItem>
          <OrderSummary />
        </WrapItem>
      </Wrap>
    </>
  ) : (
    <>
      <NotSignIn />
      <HomeSection2 />
    </>
  );
};

export default Cart;
