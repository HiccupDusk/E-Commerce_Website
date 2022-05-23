import React from 'react';
import { useEffect, useState, useContext } from 'react';

import {
  Heading,
  HStack,
  VStack,
  Wrap,
  Button,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

// local Component
import OrderCard from './OrderCard';

const OrderSummary = () => {
  // ORDER SUMMARY CARD
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState([]);
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
        setOrder(
          data.map((products) => {
            return <OrderCard key={products._id} OrderCardProp={products} />;
          })
        );
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:4000/api/products/addTotalOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotal(
          data.map((products) => {
            return (
              <Heading size='sm' key={products._id}>
                ${products.price}
              </Heading>
            );
          })
        );
      });
  }, []);

  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.600')}
      m='2rem'
      p='3rem'
      direction='column'
      borderRadius='lg'
      gap='2rem'
      h='max-content'
    >
      <Heading size='md'> ORDERS SUMMARY:</Heading>
      <Heading size='xs'>ITEMS:</Heading>
      {order}
      <HStack gap='10rem'>
        <Heading size='sm'>TOTAL PRICE:</Heading>
        {total}
      </HStack>
      {/* <OrderCard /> */}
      <Button
        bgGradient='linear(to-l,pink.300,  teal.400)'
        color='teal.400'
        ms='5px'
        href='#'
        fontWeight='bold'
        p='7'
      >
        <Text mx='3rem' color='white'>
          Proceed to Checkout
        </Text>
      </Button>
    </Flex>
  );
};

export default OrderSummary;
